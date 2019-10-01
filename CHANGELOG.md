# 2.1.7 (01.10.2019)

* CLI was refactored and its usage simplified. No longer required device year parameter.
* Fix installation on 2018 models.

# 2.1.6 (19.09.2019)

Replace IThenable with Promise in jsdoc annotations to resolve linter/compiler warnings. 

# 2.1.5 (09.09.2019)

Technical release to resolve some issues with ZombieBox version verification.

No notable changes. 

# 2.1.4 (26.08.2019)

* Update dependencies and fix GCC warnings.

# 2.1.3 was skipped

# 2.1.2 (18.08.2019)

* Fixed error during installation of device year was not provided
* Update to ESLint 6

# 2.1.1 (05.08.2019)

## Features
* Improved video loading performance when starting playback from a specific position.

## Fixes
* Fixed full screen behavior on 2019 models.

# 2.1.0 (23.07.2019)

## Features
* `Video` and `Device` classes adapted to removal of video container from ZombieBox.

# 2.0.1 (15.07.2019)

## Fixes
* Fix `Video` not firing `EVENT_VOLUME_CHANGE`
* Fix video aspect ratio on 2019 models

# 2.0.0 (13.06.2019)

## Features
* Support ZombieBox 2.0

# 2.0.0-alpha.3 (23.05.2019)

## Features
* Support ZombieBox alpha.8 (implement `AbstractPlatform`)
* Drop support for Node 8

# 2.0.0-alpha.2 (21.03.2019)

## Fixes
* **0000** Updated zb-platform-test to 2.0
* **0000** Migrated from APIs removed from ZombieBox

# 2.0.0-alpha.1 (13.02.2019)

Platform code migrated to ECMAScript modules.

# v1.0.0 (31.01.2019)

## Fixes
* **6047** Fixed `Viewport.setArea` behavior on 2016 TVs
## Features
* **7430** Implemented `Video.getUrl` method
## Improvements
* **0000** More specific platform detection
* **6464** Use `zb.std.plain.Rect` instead of `zb.device.AbstractViewPort.Rect`

# 0.7.5 (22.01.2019)

## Fixes
* **#7520** Fixed wrong native state after stop
## Features
* **#0000** Added exceptions handling for play and seek
* **#0000** Added state monitoring during a preparation to prevent the task manager from getting stuck
* **#0000** Reworked replay when application is suspended during a preparation
* **#0000** Removed workarounds for outdated async problems

# 0.7.4 (28.08.2018)

## Fixes
* **#0000** Fixed path to `tizen` util
## Features
* **#0000** Added `zb-platform-test` dependency and related npm tasks

# 0.7.3 (09.07.2018)

## Features
* **#7297** Added check of security profile for exists and active while build WGT file
* **#0000** Added renaming WGT file for successful installation on devices with unnecessary symbols in project name
* **#0000** Fixed exception during an update of viewport on Tizen 4.0
* **#7262** Config option `sdbPath` renamed to `sdbDir`

# 0.7.2 (08.06.2018)

## Features
* **#0000** Added Video.EVENT_PLUGIN_OPEN Video.EVENT_PLUGIN_CLOSE events. Useful for setup DRM.

# 0.7.1 (08.06.2018)

## Fixes
* **#0000** Reworked replay after visibilitychange
* **#0000** Fixed endless preparation when a broken url is played
* **#0000** Fixed video state after prepareAsync

# v0.7.0 (26.01.2018)

## Features
* **#6167** Throw error `zb.device.errors.UnsupportedFeature` for unsupported platform feature. **[BREAKING]**

# v0.6.6 (30.11.2017)

## Features
* **#6482** Added Tizen launch command to platform

## Fixes
* Added `minimal-preview-service.js` to npm-package

## Improvements
* **#6499** Updated eslint and fixed errors

# v0.6.5 (05.10.2017)

## Fixes
* Fixed dependencies

# v0.6.4 (05.10.2017)

## Fixes
* **#6291** Fixed installation on Tizen 3.0

## Improvements
* **#6395** Fix jsdoc in `externs/avplay.js`: untyped property param in AVPlay#setStreamingProperty
* Cleared warnings about missing sourcemap

# v0.6.3 (27.09.2017)

## Features
* **#6310** Added support of setting preview through a service

# v0.6.2 (27.09.2017)

## Fixes
* **#6332** Added checking before playback suspend
* **#6368** Stopped playback on network error

# v0.6.1 (11.09.2017)

## Fixes
* **#6334** Fix rejection of `_asyncPrepare` on error event

# v0.6.0 (06.09.2017)

## Features
* **#6314** Added set/getVolume/mute methods
* **#6267** Added zb.device.platforms.tizen.Device#hide 
* Updated info about using tizen-cli 

## Fixes
* **#6308** Fixed video cropping 
* **#6187** Returned missed warnings 
* Fixed eslint warnings :BREAKING_BACK: 

# v0.5.0 (24.05.2017)

## Features
* **#6165** Added troubleshooting section into DOCS.md.
* **#6166** Enhanced handling of video suspend.
* **#6146** **#5431** Renamed namespace **zb.platform.tizen.consts.avplay** to **zb.device.platforms.tizen.consts**. [BREAKING]

## Fixes
* **#6134** Fixed start hang up.

# v0.4.0 (28.04.2017)

## Features
* **#6054** **#6052** Added supporting Preview SDK
* **#6069** Added supporting SmartView
* **#6088** Implemented getting device locale
* **#5981** Implemented installation wgt file to device with CLI

## Fixes
* **#6051** Fixed platform crashes on multiple play

# v0.3.0 (13.03.2017)

## Fixes
* **#6043** Fixed handling arguments on binding listeners on platform's events.
* **#6003** Fixed aspect-ratio namespaces.

# v0.2.2 (14.02.2017)

## Features
* **#5798** Added building wgt-file if tizen-cli installed

## Fixes
* **#5938** Removed constant value of 5 seconds for minimum seek position

# v0.2.1 (11.01.2017)

## Features
* **#5040** Added factory method `zb.device.platforms.tizen.factory.createDevice` for create Device instances. All global dependencies now located in factory method.
* **#5040** All *.es6 files renamed to *.js
* **#4590** Remove search key from the default keys
* **#4087** Add default `config.xml`, getting `config.xml` from specified path
* **#5431** Renamed namespace **zb.platform.tizen.consts.avplay** to **zb.device.platforms.tizen.consts**

## Fixes
* **#4928** Fix warning in class Video, method `_createStateSnapshot`

## Improvements
* **#5262** Using prepareAsync instead of prepare
* **#5211** Viewport changes now affected to the video object
* **#5160** Rely on native platform values on detecting resolution 


# v0.2.0 (27.07.2016)

## Features
* **#3992** Add ViewPort class which is responsible for managing display area sizes and aspect ratio
* **#4248** Implement getting current video url
* **#4425** Rename abstract Video class (zb.device.Video) to AbstractVideo (zb.device.AbstractVideo)
* **#4496** Transpiled client-side files to ES6

## Improvements
* **#4150** Replaced string by enum in *zb.device.platforms.tizen.ViewPort.prototype._initDisplayMethodsMap*
* **#4318** Removed call `_createViewPort()` method from Video constructor
* **#4372** Extracted AVPlay enums and constants from typedef to lib/constants (namespace **zb.platform.tizen.consts.avplay**)
* **#4504** Move calling parent class constructor to the top of child constructors
