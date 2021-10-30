/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2015-2020, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import fse from 'fs-extra';
import path from 'path';
import {connect, install, launch} from './cli/sdb.js';
import {activateProfile, buildWgt, uninstall} from './cli/tizen.js';
import {parseXml, attachLogger} from './cli/utils.js';

import {AbstractPlatform, Application, logger as zbLogger} from 'zombiebox';

const logger = zbLogger.createChild('Tizen');
attachLogger(logger);


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
		return (new URL('lib', import.meta.url)).pathname;
	}

	/**
	 * @override
	 */
	buildCLI(yargs, app) {
		return yargs
			.command(
				'install [device]',
				'Installs application on a device',
				(yargs) => yargs
					.positional('device', {
						describe: 'Device name or IP address'
					}),
				async ({device}) => {
					const config = app.getConfig();
					const pathHelper = app.getPathHelper();
					const {sdbDir} = config.platforms.tizen;

					const applicationId = await this._getApplicationId(app);

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

						logger.debug(`Found wgt file: ${wgtPath}`);

						if (wgtPath) {
							return install(sdbDir, applicationId, wgtPath, device);
						}
					}

					logger.error(`Could not find .wgt file. in ${distDir}`);
				}
			)
			.command(
				'launch [device]',
				'Launches application on a device',
				(yargs) => yargs
					.positional('device', {
						describe: 'Device name or IP address'
					}),
				async ({device}) => {
					const config = app.getConfig();

					const applicationId = await this._getApplicationId(app);
					const {sdbDir} = config.platforms.tizen;

					const output = await launch(sdbDir, applicationId, device);
					logger.output(output);
				}
			)
			.command(
				'uninstall [device]',
				'Uninstalls application from device',
				(yargs) => yargs
					.positional('device', {
						describe: 'Device name or IP address'
					})
					.positional('pkgId', {
						describe: 'Application pkg identifier'
					}),
				async ({device}) => {
					const config = app.getConfig();

					const pkgId = await this._getApplicationId(app);
					const {sdbDir, tizenToolsDir} = config.platforms.tizen;

					if (device) {
						const serialNo = await connect(sdbDir, device);
						await uninstall(tizenToolsDir, pkgId, serialNo);
					} else {
						await uninstall(tizenToolsDir, pkgId);
					}
				}
			)
			.demandCommand(1, 1, 'No command specified')
			.fail((message, error) => {
				yargs.showHelp();
				if (message) {
					logger.error(message);
				}
				if (error instanceof Error) {
					logger.error(error.toString());
					logger.debug(error.stack);
				}
			});
	}

	/**
	 * @override
	 */
	getConfig() {
		const fullPath = (filename) => (new URL(filename, import.meta.url)).pathname;
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
						fullPath('externs/avplay.js'),
						fullPath('externs/tizen.js'),
						fullPath('externs/webapis.js'),
						fullPath('externs/productinfo.js'),
						fullPath('externs/appcommon.js')
					]
				},
				{
					name: 'Tizen multiscreen',
					inlineScripts: [fullPath('vendor/msf-2.3.3.min.js')],
					externs: [fullPath('externs/msf.js')]
				},
				{
					name: 'Tizen Preview SDK',
					externs: [fullPath('externs/preview.js')]
				}
			]
		};
	}

	/**
	 * @override
	 */
	async pack(app, distDir) {
		const config = app.getConfig();

		const {securityProfile, tizenToolsDir} = config.platforms.tizen;

		const configXml = await this._resolveConfigXmlPath(app);
		await fse.copy(configXml, path.join(distDir, 'config.xml'));

		await activateProfile(tizenToolsDir, securityProfile);

		logger.info('Building wgt');

		await buildWgt(tizenToolsDir, securityProfile, distDir);

		logger.output(`The wgt package was built into ${distDir}`);

		await this._renameWgtFile(app, distDir)
			.catch((error) => {
				logger.error(error.toString());
			});
	}

	/**
	 * @param {Application} app
	 * @return {Promise<string>}
	 * @protected
	 */
	async _resolveConfigXmlPath(app) {
		const defaultPath = (new URL('default-config.xml', import.meta.url)).pathname;
		const configXml = app.getConfig().platforms.tizen.widget;

		if (configXml && await fse.pathExists(configXml)) {
			return configXml;
		}

		logger.warn('Using default config.xml');
		return defaultPath;
	}

	/**
	 * @param {Application} app
	 * @return {Promise<string>}
	 * @protected
	 */
	async _getApplicationId(app) {
		const configXmlPath = await this._resolveConfigXmlPath(app);
		const xml = await fse.readFile(configXmlPath, 'utf-8');
		const data = await parseXml(xml);
		const appId = data.widget['tizen:application'][0].$.id;

		logger.silly(`Resolved app id "${appId}"`);
		return appId;
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

			logger.silly(`Moving ${distDir}/${wgtFileName} to ${distDir}/${generatedWgtName}.wgt`);
			await fse.rename(`${distDir}/${wgtFileName}`, `${distDir}/${generatedWgtName}.wgt`);
		} else {
			throw new Error(`Can't find .wgt file in "${distDir}"`);
		}
	}
}


/**
 */
export default Tizen;
