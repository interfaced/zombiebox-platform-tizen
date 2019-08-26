/**
 * Privilege: http://developer.samsung.com/privilege/avplay
 * @see http://www.samsungdforum.com/TizenApiGuide/?FolderName=tizen3001&FileName=index.html
 * @constructor
 */
let AVPlay = function() {};


/**
 * This method instantiates the player object and take input url as input parameter.
 * @param {string} url
 */
AVPlay.prototype.open = function(url) {};


/**
 * Since : 1.0
 * Privilege level: public
 * Privilege: http://developer.samsung.com/privilege/avplay
 * Constraint
 * To be called in these states - 'NONE', 'IDLE', 'READY', 'PAUSED' , 'PLAYING'
 * Exceptions:
 *  WebAPIException
 *  with error type TypeMismatchError, if the input parameter is not compatible with the expected type.
 *  with error type NotSupportedError, if this feature is not supported.
 *  with error type InvalidValuesError, if any of the input parameters contain an invalid value.
 *  with error type UnknownError in any other error case.
 */
AVPlay.prototype.close = function() {};


/**
 * This method prepare the media player for playback. Player must have been created before this with a valid URI.
 * void prepare() raises(WebAPIException);
 * Since : 1.0
 * Privilege level: public
 * Privilege: http://developer.samsung.com/privilege/avplay
 * Constraint
 * To be called in this state - 'IDLE'
 * Exceptions:
 *  WebAPIException
 *  with error type TypeMismatchError, if the input parameter is not compatible with the expected type.
 *  with error type NotSupportedError, if this feature is not supported.
 *  with error type InvalidValuesError, if any of the input parameters contain an invalid value.
 *  with error type UnknownError in any other error case.
 */
AVPlay.prototype.prepare = function() {};


/**
 * This method prepares the media player for playback, asynchronously. This API, would prepare the MM core module
 *  asynchronously. It means internal media elements will change the state asynchronously.
 * void prepareAsync(opitional SuccessCallback? successCallback, optional ErrorCallback? errorCallback)
 *  raises(WebAPIException);
 * Since : 1.0
 * Privilege level: public
 * Privilege: http://developer.samsung.com/privilege/avplay
 * Parameters:
 * successCallback [optional]: Callback method to be invoked when this api success.
 * errorCallback [optional]: Callback method to be invoked when an error occurs.
 * Constraint
 * To be called in this state - 'IDLE'
 * Exceptions:
 *  WebAPIException
 *  with error type TypeMismatchError, if the input parameter is not compatible with the expected type.
 *  with error type NotSupportedError, if this feature is not supported.
 *  with error type InvalidValuesError, if any of the input parameters contain an invalid value.
 *  with error type UnknownError in any other error case.
 * @param {function()=} successCallback
 * @param {function(*)=} errorCallback
 */
AVPlay.prototype.prepareAsync = function(successCallback, errorCallback) {};


/**
 * This method sets the display area for playing video content on TV screen.
 * It should be called for showing video after calling open method.
 * When all the value set as rect are set as 0, the Video Screen in the App disappears.
 * Hide Function replacement.
 * void setDisplayRect( long x, long y, long width, long height )
 *  raises(WebAPIException);
 * Since : 1.0
 * Privilege level: public
 * Privilege: http://developer.samsung.com/privilege/avplay
 * Parameters:
 * x: Specifies the initial x-coordinate of display area in TV screen coordinates. This x value is smaller
 *  than TV screen width.
 * y: Specifies the initial y-coordinate of display area in TV screen coordinates. This y value is smaller
 *  than TV screen height.
 * width: The width of display area. This value is smaller than width of TV screen
 * height: The height of display area from source image. This value is smaller than height of source image
 *  If all members of display_rect is 0, video is hided
 * Constraint
 * To be called in these states - 'IDLE', 'PAUSE'
 * Exceptions:
 *  WebAPIException
 *  with error type TypeMismatchError, if the input parameter is not compatible with the expected type.
 *  with error type NotSupportedError, if this feature is not supported.
 *  with error type InvalidValuesError, if any of the input parameters contain an invalid value.
 *  with error type UnknownError in any other error case
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 */
AVPlay.prototype.setDisplayRect = function(x, y, width, height) {};


/**
 * This method starts the playback of the stream.
 * void play() raises(WebAPIException);
 * Since : 1.0
 * Privilege level: public
 * Privilege: http://developer.samsung.com/privilege/avplay
 * Exceptions:
 *  WebAPIException
 *  with error type TypeMismatchError, if the input parameter is not compatible with the expected type.
 *  with error type NotSupportedError, if this feature is not supported.
 *  with error type InvalidValuesError, if any of the input parameters contain an invalid value.
 *  with error type UnknownError in any other error case.
 */
AVPlay.prototype.play = function() {};


/**
 * This method used for the seeking. If you give the seconds value, then it plays by jumping to the position desired
 *  to play. It fails when you input the value outside the total Playback Time scope
 * void seekTo(long milliseconds, optional SuccessCallback? successCallback, optional ErrorCallback? errorCallback)
 *  raises(WebAPIException);
 * Since : 1.0
 * Privilege level: public
 * Privilege: http://developer.samsung.com/privilege/avplay
 * Parameters:
 * milliseconds: position relevant to the specific duration value
 * successCallback [optional]: Callback method to be invoked when this api success.
 * errorCallback [optional]: Callback method to be invoked when an error occurs.
 * Constraint
 * To be called in these states - 'IDLE', 'PAUSE'
 *  (Buffered Data gets Flushed and the Buffering starts again from the beginning.)
 * Exceptions:
 *  WebAPIException
 *  with error type TypeMismatchError, if the input parameter is not compatible with the expected type.
 *  with error type NotSupportedError, if this feature is not supported.
 *  with error type InvalidValuesError, if any of the input parameters contain an invalid value.
 *  with error type UnknownError in any other error case.
 * @param {number} milliseconds
 * @param {function()=} successCallback
 * @param {function()=} errorCallback
 */
AVPlay.prototype.seekTo = function(milliseconds, successCallback, errorCallback) {};


/**
 * This method stops the player and hence any video currently being played. Also this function should be
 *  called after the video completes playing.
 * void stop() raises(WebAPIException);
 * Since : 1.0
 * Privilege level: public
 * Privilege: http://developer.samsung.com/privilege/avplay
 * Constraint
 * To be called in these states - 'IDLE', 'PAUSE', 'PLAYING'
 * Exceptions:
 *  WebAPIException
 *  with error type TypeMismatchError, if the input parameter is not compatible with the expected type.
 *  with error type NotSupportedError, if this feature is not supported.
 *  with error type InvalidValuesError, if any of the input parameters contain an invalid value.
 *  with error type UnknownError in any other error case.
 */
AVPlay.prototype.stop = function() {};


/**
 * This method return the current state of underlying player which is associated with AVPLAY object.
 *  AVPlayPlayerState getState() raises(WebAPIException);
 * Since : 1.0
 * Privilege level: public
 * Privilege: http://developer.samsung.com/privilege/avplay
 * Return value:
 * AVPlayPlayerState - 'NONE', 'IDLE', 'READY', 'PLAYING', 'PAUSED'.
 * Constraint
 * To be called in these states - 'NONE', 'IDLE', 'READY', 'PLAYING', 'PAUSED'.
 * Exceptions:
 *  WebAPIException
 *  with error type TypeMismatchError, if the input parameter is not compatible with the expected type.
 *  with error type NotSupportedError, if this feature is not supported.
 *  with error type InvalidValuesError, if any of the input parameters contain an invalid value.
 *  with error type UnknownError in any other error case.
 * @return {string}
 * @see AVPlayPlayerState
 */
AVPlay.prototype.getState = function() {};


/**
 * This method pauses the playback.
 * void pause() raises(WebAPIException);
 * Since : 1.0
 * Privilege level: public
 * Privilege: http://developer.samsung.com/privilege/avplay
 * Constraint
 * To be called in this state - 'PLAYING'
 * Exceptions:
 *  WebAPIException
 *  with error type TypeMismatchError, if the input parameter is not compatible with the expected type.
 *  with error type NotSupportedError, if this feature is not supported.
 *  with error type InvalidValuesError, if any of the input parameters contain an invalid value.
 *  with error type UnknownError in any other error case.
 */
AVPlay.prototype.pause = function() {};


/**
 * This method forwards the currently played video by the specified number of milliseconds. While playing maintaining
 *  the State mode, it plays again after the jumpfoward, and in the pause, it gets paused after the jumpfoward.
 * void jumpForward(long milliseconds, optional SuccessCallback? successCallback, optional ErrorCallback? errorCallback)
 *  raises(WebAPIException);
 * Since : 1.0
 * Privilege level: public
 * Privilege: http://developer.samsung.com/privilege/avplay
 * Parameters:
 * milliseconds: The number of milliseconds to be forwarded.
 * successCallback [optional]: Callback method to be invoked when this api success.
 * errorCallback [optional]: Callback method to be invoked when an error occurs.
 * Constraint
 * To be called in these states - 'PAUSE', 'PLAYING'
 * Exceptions:
 *  WebAPIException
 *  with error type TypeMismatchError, if the input parameter is not compatible with the expected type.
 *  with error type NotSupportedError, if this feature is not supported.
 *  with error type InvalidValuesError, if any of the input parameters contain an invalid value.
 *  with error type UnknownError in any other error case.
 * @param {number} milliseconds
 * @param {function()=} successCallback
 * @param {function()=} errorCallback
 */
AVPlay.prototype.jumpForward = function(milliseconds, successCallback, errorCallback) {};


/**
 * @param {number} milliseconds
 * @param {function()=} successCallback
 * @param {function()=} errorCallback
 */
AVPlay.prototype.jumpBackward = function(milliseconds, successCallback, errorCallback) {};


/**
 * This method gets the duration time in milliseconds.
 *  unsigned long getDuration() raises(WebAPIException);
 * Since : 1.0
 * Privilege level: public
 * Privilege: http://developer.samsung.com/privilege/avplay
 * Return value:
 * unsigned long number Total duration time in milliseconds
 * Constraint
 * To be called in these states - 'PAUSE', 'PLAYING'
 * Exceptions:
 *  WebAPIException
 *  with error type TypeMismatchError, if the input parameter is not compatible with the expected type.
 *  with error type NotSupportedError, if this feature is not supported.
 *  with error type InvalidValuesError, if any of the input parameters contain an invalid value.
 *  with error type UnknownError in any other error case.
 * @return {number}
 */
AVPlay.prototype.getDuration = function() {};


/**
 * This method returns the current play time in milliseconds.
 *  unsigned long getCurrentTime() raises(WebAPIException);
 * Since : 1.0
 * Privilege level: public
 * Privilege: http://developer.samsung.com/privilege/avplay
 * Return value:
 * unsigned long number Current Playback time in milliseconds.
 * Constraint
 * To be called in these states - 'PAUSE', 'PLAYING'
 * Exceptions:
 *  WebAPIException
 *  with error type TypeMismatchError, if the input parameter is not compatible with the expected type.
 *  with error type NotSupportedError, if this feature is not supported.
 *  with error type InvalidValuesError, if any of the input parameters contain an invalid value.
 *  with error type UnknownError in any other error case.
 * @return {number}
 */
AVPlay.prototype.getCurrentTime = function() {};


/**
 * This method sets the current playback speed. This value can be positive or negative. If the value is set to negative,
 *  the video starts playing in the reverse direction.
 * void setSpeed(long playbackSpeed) raises(WebAPIException);
 * Since : 1.0
 * Privilege level: public
 * Privilege: http://developer.samsung.com/privilege/avplay
 * Parameters:
 * playbackSpeed: -32x, -16x, -8x, -2x, -4x, -1x, 1x, 2x, 4x, 8x, 16x, 32x
 * Constraint
 * To be called in these states - 'PAUSE', 'PLAYING'
 * Exceptions:
 *  WebAPIException
 *  with error type TypeMismatchError, if the input parameter is not compatible with the expected type.
 *  with error type NotSupportedError, if this feature is not supported.
 *  with error type InvalidValuesError, if any of the input parameters contain an invalid value.
 *  with error type UnknownError in any other error case.
 * Limitation
 *  Widevine : -32~32
 *  Smooth Streaming, Dash : -16~16
 *  HLS : Not support
 *  HTTP(s) : -8~8
 * @param {number} playbackSpeed
 * @see AVPlaySpeed
 */
AVPlay.prototype.setSpeed = function(playbackSpeed) {};


/**
 * This method is used in order to obtain the Buffering, Playback Time, Playback mode, DRM mode information etc.,
 *  the Callback Function is registered. When the relevant Event is occurred, the relevant Callback Function gets
 *  called asynchronouly, Invoked during playback.
 * void setListener(AVPlayPlaybackCallback playbackCallback)
 *  raises(WebAPIException);
 * Since : 1.0
 * Privilege level: public
 * Privilege: http://developer.samsung.com/privilege/avplay
 * Parameters:
 * playbackCallback: AVPlayPlaybackCallback
 * Constraint
 * To be called in this state - 'IDLE'
 * Exceptions:
 *  WebAPIException
 *  with error type TypeMismatchError, if the input parameter is not compatible with the expected type.
 *  with error type NotSupportedError, if this feature is not supported.
 *  with error type InvalidValuesError, if any of the input parameters contain an invalid value.
 *  with error type UnknownError in any other error case.
 * @param {AVPlay.AVPlayPlaybackCallback} playbackCallback
 */
AVPlay.prototype.setListener = function(playbackCallback) {};


/**
 * This method sets the streaming bufferring time of player. When the desired amount of Buffering completes before
 *  the time set as milliseconds, the success returns. if it is the time set in milliseconds even if the desired
 *  amount of Buffering is not done.
 * void setTimeoutForBuffering(long initialTimeOutInSec)
 *  raises(WebAPIException);
 * Since : 1.0
 * Privilege level: public
 * Privilege: http://developer.samsung.com/privilege/avplay
 * Parameters:
 * initialTimeOutInSec: long
 * Constraint
 * To be called in this state - 'IDLE'
 * Exceptions:
 *  WebAPIException
 *  with error type TypeMismatchError, if the input parameter is not compatible with the expected type.
 *  with error type NotSupportedError, if this feature is not supported.
 *  with error type InvalidValuesError, if any of the input parameters contain an invalid value.
 *  with error type UnknownError in any other error case.
 * @param {number} initialTimeOutInSec
 */
AVPlay.prototype.setTimeoutForBuffering = function(initialTimeOutInSec) {};


/**
 * This method gets the analysis result of the playing Audio's Spectrum is called in a cycle of 30ms by using
 *  the CallbackFunction. It can be used in the Equalizer effect video or in the App for PartyTV. Bands return
 *  in 31 Arrays, and among the Bands Array, the Bands[14]~Bands[18] value is the area that occupies
 *  the Sound's effect most.
 * void setSoundAnalysisListener(AVPlaySoundAnalysisCallback soundAnalysisCallback)
 *  raises(WebAPIException);
 * Since : 1.0
 * Privilege level: public
 * Privilege: http://developer.samsung.com/privilege/avplay
 * Parameters:
 * soundAnalysisCallback: AVPlaySoundAnalysisCallback
 * Constraint
 * To be called in this state - 'IDLE'
 * Exceptions:
 *  WebAPIException
 *  with error type TypeMismatchError, if the input parameter is not compatible with the expected type.
 *  with error type NotSupportedError, if this feature is not supported.
 *  with error type InvalidValuesError, if any of the input parameters contain an invalid value.
 *  with error type UnknownError in any other error case.
 * @param {AVPlay.AVPlaySoundAnalysisCallback} soundAnalysisCallback
 */
AVPlay.prototype.setSoundAnalysisListener = function(soundAnalysisCallback) {};


/**
 * This method unregister the soundAnalysisListener callback.
 * void unsetSoundAnalysisListener() raises(WebAPIException);
 * Since : 1.0
 * Privilege level: public
 * Privilege: http://developer.samsung.com/privilege/avplay
 * Constraint
 * To be called in this state - 'PLAYING'
 * Exceptions:
 *  WebAPIException
 *  with error type TypeMismatchError, if the input parameter is not compatible with the expected type.
 *  with error type NotSupportedError, if this feature is not supported.
 *  with error type InvalidValuesError, if any of the input parameters contain an invalid value.
 *  with error type UnknownError in any other error case.
 */
AVPlay.prototype.unsetSoundAnalysisListener = function() {};


/**
 * This method is used in the case of Stream with Subtitle when you want to show or hide the Subtitle.
 *  In the case of ExternalSubtitle, when the setExternalSubtitlePath Function is called, it is shown by default
 *  even if the setSilentSubtitle is not called
 * void setSilentSubtitle(bool onoff) raises(WebAPIException);
 * Since : 1.0
 * Privilege level: public
 * Privilege: http://developer.samsung.com/privilege/avplay
 * Parameters:
 * onoff: false Subtitle is shown. true : It hides the playing Subtitle.
 * Constraint
 * To be called in these states - 'PAUSE', 'PLAYING'
 * Exceptions:
 *  WebAPIException
 *  with error type TypeMismatchError, if the input parameter is not compatible with the expected type.
 *  with error type NotSupportedError, if this feature is not supported.
 *  with error type InvalidValuesError, if any of the input parameters contain an invalid value.
 *  with error type UnknownError in any other error case.
 * @param {boolean} onoff
 */
AVPlay.prototype.setSilentSubtitle = function(onoff) {};


/**
 * This method is used in the case of Stream that uses External Subtitle, you should put the Local URI having
 *  Subtitle File. In the case of URL, you should put the Local URL after downloading it by using the DOWNLOAD WebApi
 * void setExternalSubtitlePath(DOMString pFilePath) raises(WebAPIException);
 * Since : 1.0
 * Privilege level: public
 * Privilege: http://developer.samsung.com/privilege/avplay
 * Parameters:
 * pFilePath: URI of Local File with Subtitle
 * Constraint
 * To be called in these states - 'IDLE' , 'PAUSE'
 * Exceptions:
 *  WebAPIException
 *  with error type TypeMismatchError, if the input parameter is not compatible with the expected type.
 *  with error type NotSupportedError, if this feature is not supported.
 *  with error type InvalidValuesError, if any of the input parameters contain an invalid value.
 *  with error type UnknownError in any other error case.
 * @param {string} pFilePath
 */
AVPlay.prototype.setExternalSubtitlePath = function(pFilePath) {};


/**
 * This method is used for matching the A/V and sync when you play the ExternalSubtitle.
 * void setSubtitlePosition(unsigned long position) raises(WebAPIException);
 * Since : 1.0
 * Privilege level: public
 * Privilege: http://developer.samsung.com/privilege/avplay
 * Parameters:
 * position: The Subtitle output's timing is adjusted as much as the inputted time. (Positive, Negative)
 * Constraint
 * To be called in this state - 'PLAYING'
 * Exceptions:
 *  WebAPIException
 *  with error type TypeMismatchError, if the input parameter is not compatible with the expected type.
 *  with error type NotSupportedError, if this feature is not supported.
 *  with error type InvalidValuesError, if any of the input parameters contain an invalid value.
 *  with error type UnknownError in any other error case.
 *  @param {number} position
 */
AVPlay.prototype.setSubtitlePosition = function(position) {};


/**
 * This method sets the Video Screen’s Mode within the given DISPLAY area.
 * void setDisplayMethod(AVPlayDisplayMode displayMode) raises(WebAPIException);
 * Since : 1.0
 * Privilege level: public
 * Privilege: http://developer.samsung.com/privilege/avplay
 * Parameters:
 * displayMode: e.g. PLAYER_DISPLAY_MODE_FULL_SCREEN
 * Constraint
 * To be called in this state - 'IDLE'
 * Exceptions:
 *  WebAPIException
 *  with error type TypeMismatchError, if the input parameter is not compatible with the expected type.
 *  with error type NotSupportedError, if this feature is not supported.
 *  with error type InvalidValuesError, if any of the input parameters contain an invalid value.
 *  with error type UnknownError in any other error case.
 * @param {string} displayMode
 * @see AVPlayDisplayMethod
 */
AVPlay.prototype.setDisplayMethod = function(displayMode) {};


/**
 * @param {string} trackType
 * @see AVPlayStreamType
 * @param {number} trackIndex
 */
AVPlay.prototype.setSelectTrack = function(trackType, trackIndex) {};


/**
 * This method is used in the case of Multi Audio/Subtitle and when you want to change the Audio& Subtitle while
 *  playing. In the case of Video, it can’t be used.
 * void setSelectTrack(AVPlayStreamType trackType, long trackIndex)
 *  raises(WebAPIException);
 * Since : 1.0
 * Privilege level: public
 * Privilege: http://developer.samsung.com/privilege/avplay
 * Parameters:
 * trackType: It may be AUDIO or TEXT value.
 * trackIndex: It sets the index value of the AVPlayStreamInfo obtained through the
 *  webapis.avplay.getTrackInfo Function.
 * Constraint
 * To be called in these states - 'PAUSE', 'PLAYING'
 * Exceptions:
 *  WebAPIException
 *  with error type TypeMismatchError, if the input parameter is not compatible with the expected type.
 *  with error type NotSupportedError, if this feature is not supported.
 *  with error type InvalidValuesError, if any of the input parameters contain an invalid value.
 *  with error type UnknownError in any other error case.
 * @return {AVPlay.AVPlayStreamInfo}
 */
AVPlay.prototype.getCurrentStreamInfo = function() {};


/**
 * This method gets the currently playing Stream’s information.
 * AVPlayStreamInfo[] getTotalTrackInfo() raises(WebAPIException);
 * Since : 1.0
 * Privilege level: public
 * Privilege: http://developer.samsung.com/privilege/avplay
 * Return value:
 * AVPlayStreamInfo structure containing tracktype, extraInfo and Index of current stream
 * Constraint
 * To be called in these states - 'READY', 'PLAYING'
 * Exceptions:
 *  WebAPIException
 *  with error type TypeMismatchError, if the input parameter is not compatible with the expected type.
 *  with error type NotSupportedError, if this feature is not supported.
 *  with error type InvalidValuesError, if any of the input parameters contain an invalid value.
 *  with error type UnknownError in any other error case.
 * @return {AVPlay.AVPlayStreamInfo}
 */
AVPlay.prototype.getTotalTrackInfo = function() {};


/**
 * This method sets the value for specific Feature in the HTTP, MMS & Streaming Engine
 *  (Smooth Streaming, HLS, DASH, DivX Plus Streaming, Widevine).
 * When special setting is required in Streaming Engine for the Start Bitrate setting &specific CP,
 *  the CUSTOM_MESSAGE Property can be set
 * void setStreamingProperty(AVPlayStreamingPropertyType propertyType, Any propparam)
 *  raises(WebAPIException);
 * Since : 1.0
 * Privilege level: public
 * Privilege: http://developer.samsung.com/privilege/avplay
 * Parameters:
 * propertyType:
 *  'COOKIE', 'USER_AGENT', 'PREBUFFER_MODE', 'ADAPTIVE_INFO', 'SET_MODE_3D', 'SET_MODE_4K', 'HD_AUDIO', 'WIDEVINE'
 * propparam: Value according to the propertyType. e.g. 'ADAPTIVE_INFO' PropetyTypes are
 *  'BITRATES','CUSTOM_MESSAGE', 'AD_MODE', 'STARTBITRATE', 'START_TIME', 'FAST_START', 'SKIPBITRATE'.
 * Constraint
 * To be called in these states - 'PAUSE' 'PLAYING'
 * Exceptions:
 *  WebAPIException
 *  with error type TypeMismatchError, if the input parameter is not compatible with the expected type.
 *  with error type NotSupportedError, if this feature is not supported.
 *  with error type InvalidValuesError, if any of the input parameters contain an invalid value.
 *  with error type UnknownError in any other error case.
 * @param {string} propertyType
 * @see AVPlayStreamingPropertyType
 * @param {?} propParam
 */
AVPlay.prototype.setStreamingProperty = function(propertyType, propParam) {};


/**
 * This method gets the Specific Property value is obtained through the Streaming Engine
 *  (Smooth Streaming, HLS, DASH, DivX Plus Streaming, Widevine).
 * Any getStreamingProperty(AVPlayStreamingPropertyType propertyType)
 *  raises(WebAPIException);
 * Since : 1.0
 * Privilege level: public
 * Privilege: http://developer.samsung.com/privilege/avplay
 * Parameters:
 * propertyType: AVPlayStreamingPropertyType
 * Return value:
 * Any It returns the value according to the Property decided to obtain
 * Constraint
 * To be called in these states - 'PAUSE' 'PLAYING'
 * Exceptions:
 *  WebAPIException
 *  with error type TypeMismatchError, if the input parameter is not compatible with the expected type.
 *  with error type NotSupportedError, if this feature is not supported.
 *  with error type InvalidValuesError, if any of the input parameters contain an invalid value.
 *  with error type UnknownError in any other error case.
 * @param {string} propertyType
 * @see AVPlayStreamingPropertyType
 */
AVPlay.prototype.getStreamingProperty = function(propertyType) {};


/**
 * This method gets the version of avplay.
 * DOMString getVersion() raises(WebAPIException);
 * Since : 1.0
 * Privilege level: public
 * Privilege: http://developer.samsung.com/privilege/avplay
 * Return value:
 * DOMString current version
 * Constraint
 * To be called in these states - 'NONE', 'IDLE', 'READY', 'PAUSED', 'PLAYING'
 * Exceptions:
 *  WebAPIException
 *  with error type TypeMismatchError, if the input parameter is not compatible with the expected type.
 *  with error type NotSupportedError, if this feature is not supported.
 *  with error type InvalidValuesError, if any of the input parameters contain an invalid value.
 *  with error type UnknownError in any other error case.
 * @return {string}
 */
AVPlay.prototype.getVersion = function() {};


/**
 */
AVPlay.prototype.suspend = function() {};


/**
 * @param {string=} url
 * @param {number=} resumePosition
 * @param {boolean=} prepare
 */
AVPlay.prototype.restore = function(url, resumePosition, prepare) {};


/**
 * This method gets called async while the buffering starts.
 * void onbufferingstart();
 * Since : 1.0
 * Privilege level: public
 * Privilege: http://developer.samsung.com/privilege/avplay
 * Exceptions:
 *  WebAPIException
 *  with error type TypeMismatchError, if the input parameter is not compatible with the expected type.
 *  with error type NotSupportedError, if this feature is not supported.
 *  with error type InvalidValuesError, if any of the input parameters contain an invalid value.
 *  with error type UnknownError in any other error case.
 */
AVPlay.prototype.onbufferingstart = function() {};


/**
 * This method gets called async while the buffering is in progress.
 * void onbufferingprogress(unsigned long percent);
 * Since : 1.0
 * Privilege level: public
 * Privilege: http://developer.samsung.com/privilege/avplay
 * Parameters:
 * percent: unsigned long
 * Exceptions:
 *  WebAPIException
 *  with error type TypeMismatchError, if the input parameter is not compatible with the expected type.
 *  with error type NotSupportedError, if this feature is not supported.
 *  with error type InvalidValuesError, if any of the input parameters contain an invalid value.
 *  with error type UnknownError in any other error case.
 * @param {number} percent
 */
AVPlay.prototype.onbufferingprogress = function(percent) {};


/**
 * This method gets called async when the buffering gets completed.
 * void onbufferingcomplete();
 * Since : 1.0
 * Privilege level: public
 * Privilege: http://developer.samsung.com/privilege/avplay
 * Exceptions:
 *  WebAPIException
 *  with error type TypeMismatchError, if the input parameter is not compatible with the expected type.
 *  with error type NotSupportedError, if this feature is not supported.
 *  with error type InvalidValuesError, if any of the input parameters contain an invalid value.
 *  with error type UnknownError in any other error case.
 */
AVPlay.prototype.onbufferingcomplete = function() {};


/**
 * This method gets called async to provide the current playback time.
 * void oncurrentplaytime(unsigned long currentTime );
 * Since : 1.0
 * Privilege level: public
 * Privilege: http://developer.samsung.com/privilege/avplay
 * Parameters:
 * currentTime: unsigned long
 * Exceptions:
 *  WebAPIException
 *  with error type TypeMismatchError, if the input parameter is not compatible with the expected type.
 *  with error type NotSupportedError, if this feature is not supported.
 *  with error type InvalidValuesError, if any of the input parameters contain an invalid value.
 *  with error type UnknownError in any other error case.
 * @param {number} currentTime
 */
AVPlay.prototype.oncurrentplaytime = function(currentTime) {};


/**
 * This method gets called async while the playback gets completed.
 * void onstreamcompleted();
 * Since : 1.0
 * Privilege level: public
 * Privilege: http://developer.samsung.com/privilege/avplay
 * Exceptions:
 *  WebAPIException
 *  with error type TypeMismatchError, if the input parameter is not compatible with the expected type.
 *  with error type NotSupportedError, if this feature is not supported.
 *  with error type InvalidValuesError, if any of the input parameters contain an invalid value.
 *  with error type UnknownError in any other error case.
 */
AVPlay.prototype.onstreamcompleted = function() {};


/**
 * This method gets called async when some kind of event (other event) received from the player.
 * void onevent(long eventid, DOMString data );
 * Since : 1.0
 * Privilege level: public
 * Privilege: http://developer.samsung.com/privilege/avplay
 * Parameters:
 * eventid: long
 * data: DOMString
 * Exceptions:
 *  WebAPIException
 *  with error type TypeMismatchError, if the input parameter is not compatible with the expected type.
 *  with error type NotSupportedError, if this feature is not supported.
 *  with error type InvalidValuesError, if any of the input parameters contain an invalid value.
 *  with error type UnknownError in any other error case.
 * @param {number} eventid
 * @param {string} data
 */
AVPlay.prototype.onevent = function(eventid, data) {};


/**
 * This method gets called when error event received from the player.
 * void onerror(long eventid);
 * Since : 1.0
 * Privilege level: public
 * Privilege: http://developer.samsung.com/privilege/avplay
 * Parameters:
 * eventid: long
 * Exceptions:
 *  WebAPIException
 *  with error type TypeMismatchError, if the input parameter is not compatible with the expected type.
 *  with error type NotSupportedError, if this feature is not supported.
 *  with error type InvalidValuesError, if any of the input parameters contain an invalid value.
 *  with error type UnknownError in any other error case.
 * @param {number} eventid
 */
AVPlay.prototype.onerror = function(eventid) {};


/**
 * This method gets aysnc called when the drm information notified from the player.
 * void ondrmevent(AVPlayDrmType type, long eventid);
 * Since : 1.0
 * Privilege level: public
 * Privilege: http://developer.samsung.com/privilege/avplay
 * Parameters:
 * type: AVPlayDrmType
 * eventid: long
 * Exceptions:
 *  WebAPIException
 *  with error type TypeMismatchError, if the input parameter is not compatible with the expected type.
 *  with error type NotSupportedError, if this feature is not supported.
 *  with error type InvalidValuesError, if any of the input parameters contain an invalid value.
 *  with error type UnknownError in any other error case.
 * @param {string} type
 * @see AVPlayDrmType
 * @param {number} eventid
 */
AVPlay.prototype.ondrmevent = function(type, eventid) {};


/**
 * This method gets called async when the subtitle is updated.
 * void onsubtitlechange(unsigned long duration, DOMString subtitles, unsigned long type, unsigned long attriCount,
 *  AVPlaySubtitleAttribute_ptr attributes);
 * Since : 1.0
 * Privilege level: public
 * Privilege: http://developer.samsung.com/privilege/avplay
 * Parameters:
 * duration: unsigned long
 * subtitles: DOMString
 * type: unsigned long
 * attriCount: unsigned long
 * attributes: AVPlaySubtitleAttribute_ptr
 * Exceptions:
 *  WebAPIException
 *  with error type TypeMismatchError, if the input parameter is not compatible with the expected type.
 *  with error type NotSupportedError, if this feature is not supported.
 *  with error type InvalidValuesError, if any of the input parameters contain an invalid value.
 *  with error type UnknownError in any other error case.
 * @param {number} duration
 * @param {string} subtitles
 * @param {number} type
 * @param {number} attriCount
 * @param {AVPlay.AVPlaySubtitleAttribute} attributes
 */
AVPlay.prototype.onsubtitlechange = function(duration, subtitles, type, attriCount, attributes) {};


/**
 * This method gets called aysnc if any exception occurs in sound analysis.
 * BasePlatformException ongetexception();
 * Since : 1.0
 * Privilege level: public
 * Privilege: http://developer.samsung.com/privilege/avplay
 * Return value:
 * BasePlatformException
 * Exceptions:
 *  WebAPIException
 *  with error type TypeMismatchError, if the input parameter is not compatible with the expected type.
 *  with error type NotSupportedError, if this feature is not supported.
 *  with error type InvalidValuesError, if any of the input parameters contain an invalid value.
 *  with error type UnknownError in any other error case.
 * @return {AVPlay.BasePlatformException}
 */
AVPlay.prototype.ongetexception = function() {};


/**
 * This method specifies subscriptions for any notification for sound Analysis.
 * void onsetexception(BasePlatformException err);
 * Since : 1.0
 * Privilege level: public
 * Privilege: http://developer.samsung.com/privilege/avplay
 * Parameters:
 * err: BasePlatformException_ptr
 * Exceptions:
 *  WebAPIException
 *  with error type TypeMismatchError, if the input parameter is not compatible with the expected type.
 *  with error type NotSupportedError, if this feature is not supported.
 *  with error type InvalidValuesError, if any of the input parameters contain an invalid value.
 *  with error type UnknownError in any other error case.
 * @param {AVPlay.BasePlatformException} err
 */
AVPlay.prototype.onsetexception = function(err) {};


/**
 * This method returns the Band Array[32] having sound effect information.
 * long[] ongetbandsarray();
 * Since : 1.0
 * Privilege level: public
 * Privilege: http://developer.samsung.com/privilege/avplay
 * Return value: long
 * Exceptions:
 *  WebAPIException
 *  with error type TypeMismatchError, if the input parameter is not compatible with the expected type.
 *  with error type NotSupportedError, if this feature is not supported.
 *  with error type InvalidValuesError, if any of the input parameters contain an invalid value.
 *  with error type UnknownError in any other error case.
 */
AVPlay.prototype.ongetbandsarray = function() {};


/**
 * @enum {function()}
 */
AVPlay.AVPlaySoundAnalysisCallback = {
	ON_GET_EXCEPTION: AVPlay.prototype.ongetexception,
	ON_SET_EXCEPTION: AVPlay.prototype.onsetexception,
	ON_GET_BANDS_ARRAY: AVPlay.prototype.ongetbandsarray
};


/**
 * @typedef {{
 *     index: number,
 *     type: string,
 *     extra_info: string
 * }}
 * @see AVPlayStreamType
 */
AVPlay.AVPlayStreamInfo;


/**
 * No docs
 * @typedef {*}
 */
AVPlay.BasePlatformException;


/**
 * No docs
 * @typedef {*}
 */
AVPlay.AVPlaySubtitleAttribute;


/**
 * @typedef {{
 *     onbufferingstart: (function()|undefined),
 *     onbufferingprogress: (function()|undefined),
 *     onbufferingcomplete: (function()|undefined),
 *     oncurrentplaytime: (function()|undefined),
 *     onstreamcompleted: (function()|undefined),
 *     onevent: (function()|undefined),
 *     onerror: (function()|undefined),
 *     ondrmevent: (function()|undefined),
 *     onsubtitlechange: (function()|undefined)
 * }}
 */
AVPlay.AVPlayPlaybackCallback;
