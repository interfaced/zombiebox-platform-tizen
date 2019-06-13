/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2015-2019, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const fse = require('fs-extra');
const path = require('path');
const {install, launch} = require('./cli/sdb.js');
const {activateProfile, buildWgt} = require('./cli/tizen');
const {parseXml} = require('./cli/utils');

const {AbstractPlatform} = require('zombiebox');


/**
 */
class Tizen extends AbstractPlatform {
	/**
	 * @override
	 */
	getName() {
		return 'tizen';
	}

	/**
	 * @override
	 */
	getSourcesDir() {
		return path.join(__dirname, 'lib');
	}

	/**
	 * @override
	 */
	buildCLI(yargs, app) {
		return yargs
			.command(
				'install [device] [year]',
				'Installs application on a device',
				(yargs) => yargs
					.positional('device', {
						describe: 'Device name or IP address'
					})
					.positional('year', {
						describe: 'Device year'
					}),
				async({device, year}) => {
					const config = app.getConfig();
					const pathHelper = app.getPathHelper();
					const {sdbDir} = config.platforms.tizen;

					const distDir = pathHelper.getDistDir({
						baseDir: config.project.dist,
						version: app.getAppVersion(),
						platformName: this.getName()
					});

					if (await fse.pathExists(distDir)) {
						const wgtPath = path.join(
							distDir,
							(await fse.readdir(distDir))
								.filter((file) => path.extname(file) === '.wgt')
								.shift()
						);

						if (wgtPath) {
							return install(sdbDir, wgtPath, device, year);
						}
					}

					console.error(`Could not find .wgt file. in ${distDir}`);
				}
			)
			.command(
				'launch <device>',
				'Launches application on a device',
				(yargs) => yargs
					.positional('device', {
						describe: 'Device name or IP address'
					}),
				async({device}) => {
					const config = app.getConfig();

					const configXml = await this._resolveConfigXmlPath(app)
						.then((file) => fse.readFile(file, 'utf-8'))
						.then((xml) => parseXml(xml));

					const applicationId = configXml.widget['tizen:application'][0].$.id;
					const {sdbDir} = config.platforms.tizen;

					await launch(sdbDir, applicationId, device);
				}
			)
			.demandCommand(1, 1, 'No command specified');
	}

	/**
	 * @override
	 */
	getConfig() {
		return {
			platforms: {
				tizen: {
					widget: undefined,
					tizenToolsDir: undefined,
					sdbDir: undefined,
					securityProfile: undefined
				}
			},
			include: [
				{
					name: 'Tizen APIs',
					externalScripts: ['$WEBAPIS/webapis/webapis.js'],
					externs: [
						path.join(__dirname, 'externs', 'avplay.js'),
						path.join(__dirname, 'externs', 'tizen.js'),
						path.join(__dirname, 'externs', 'webapis.js'),
						path.join(__dirname, 'externs', 'productinfo.js'),
						path.join(__dirname, 'externs', 'appcommon.js')
					]
				},
				{
					name: 'Tizen multiscreen',
					inlineScripts: [path.join(__dirname, 'vendor', 'msf-2.3.3.min.js')],
					externs: [path.join(__dirname, 'externs', 'msf.js')]
				},
				{
					name: 'Tizen Preview SDK',
					externs: [path.join(__dirname, 'externs', 'preview.js')]
				}
			]
		};
	}

	/**
	 * @override
	 */
	async buildApp(app, distDir) {
		const buildHelper = app.getBuildHelper();
		const config = app.getConfig();

		const fileName = path.join(distDir, 'index.html');
		const {securityProfile, tizenToolsDir} = config.platforms.tizen;

		let allWarnings = [];

		const gccWarnings = await buildHelper.writeIndexHTML(fileName);
		allWarnings = allWarnings.concat(gccWarnings);

		buildHelper.copyStaticFiles(distDir);

		const configXml = await this._resolveConfigXmlPath(app);
		await fse.copy(configXml, path.join(distDir, 'config.xml'));

		await activateProfile(tizenToolsDir, securityProfile);

		console.log('Building wgt');

		await buildWgt(tizenToolsDir, securityProfile, distDir);

		console.log(`The wgt package was built into ${distDir}`);

		await this._renameWgtFile(app, distDir)
			.catch((error) => {
				allWarnings.push(`Package widget build warnings:\n${error}`);
			});

		return allWarnings.join('\n');
	}

	/**
	 * @param {Application} app
	 * @return {Promise<string>}
	 * @protected
	 */
	async _resolveConfigXmlPath(app) {
		const defaultPath = path.resolve(__dirname, 'default-config.xml');
		const configXml = app.getConfig().platforms.tizen.widget;

		if (configXml && await fse.pathExists(configXml)) {
			return configXml;
		}

		console.warn('Using default config.xml');
		return defaultPath;
	}

	/**
	 * @param {Object} zbApp
	 * @param {string} distDir
	 * @protected
	 */
	async _renameWgtFile(zbApp, distDir) {
		const wgtFileName = (await fse.readdir(distDir)).find((file) => file.endsWith('.wgt'));
		if (wgtFileName) {
			const generatedWgtName = `${zbApp.getConfig().project.name}-${zbApp.getAppVersion()}`;

			await fse.rename(`${distDir}/${wgtFileName}`, `${distDir}/${generatedWgtName}.wgt`);
		} else {
			throw `Can't find .wgt file in "${distDir}"`;
		}
	}
}


/**
 */
module.exports = Tizen;