
## Prerequisites

* Install [Tizen Studio](https://developer.tizen.org/development/tizen-studio/download) IDE or only CLI tools.
* [Create a Tizen certificate profile](https://developer.tizen.org/development/training/.net-application/getting-certificates/creating-certificates)
* Create a `config.xml` file with Tizen app configuration. See [Configuring Applications](https://developer.tizen.org/development/tizen-studio/web-tools/configuring-your-app/configuration-editor).

### Required Tizen privileges

ZombieBox requires the following privileges to work:

* `http://tizen.org/privilege/application.launch`
* `http://tizen.org/privilege/download`
* `http://tizen.org/privilege/filesystem.read`
* `http://tizen.org/privilege/notification`
* `http://tizen.org/privilege/tv.inputdevice`
* `http://tizen.org/privilege/tv.audio`
* `http://tizen.org/privilege/power`
* `http://developer.samsung.com/privilege/productinfo`
* `http://tizen.org/privilege/system`
* `http://tizen.org/feature/network.ethernet`
* `http://tizen.org/feature/network.wifi`


## Configuration

Platform build scripts are configured with this properties in application config file.

```js
platforms: {
	tizen: {
		widget: '/path/to/config.xml',
		tizenToolsDir: '/path/to/tizen-studio/tools/ide/bin',
		securityProfile: 'security profile name',
		sdbDir: '/path/to/tizen-studio/tools/',
		iconPath: '/path/to/custom/icon.png'
	}
}
```

`tizenToolsDir` and `sdbDir` can be omitted if `tizen` and `sdb` binaries are available in `$PATH`.

### `securityProfile`

Name of Tizen security profile. 

Find installed certificates with:
```bash
tizen security-profiles list
```

### Building and installing application

Use ZombieBox CLI to build application: 

```bash
npx zb build tizen
```

`zombiebox-platform-tizen` exposes two additional commands to CLI: `install` and `launch` 

#### Installation

```bash
npx zb tizen install [device]
npx zb tizen install --device 192.168.0.0
```

Installs `.wgt` file that was build with `zb build`. 

`device` parameter can be omitted if it's already connected to sdb and only one device is connected at the time. 

#### Running

```bash
npx zb tizen launch [device]
npx zb tizen launch --device 192.168.0.0 
```

Launches application with id from `config.xml`.

`device` parameter can be omitted if it's already connected to sdb and only one device is connected at the time.

### Troubleshooting

#### There is no profile.

If Tizen tools can't find the profile application was built with: 

```
Starting package
-----------------------------------------------------

There is no profile.
-----------------------------------------------------
Finished package
```

Verify `default.profiles.path` points to a correct `profile.xml` file:

```bash
tizen cli-config -l
``` 

Or update it as necessary

```bash
tizen cli-config default.profiles.path=/Your/Tizen/workspace/.metadata/.plugins/org.tizen.common.sign/profiles.xml
```
