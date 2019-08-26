/**
 * This interface provides the relative alarm, which occurs at a fixed interval in future.
 * This alarm triggers after a duration mentioned in delay attribute from the moment the alarm is added.
 * If a period is provided, the alarm keeps triggering for the given interval.
 * @constructor
 * @return {AlarmRelative}
 */
function AlarmRelative() {}

/**
 * This interface provides an absolute alarm, which triggers at a specified absolute date.
 * If a period is provided, the alarm keeps triggering for the given interval. If the daysOfTheWeek array
 * is not empty, the alarm triggers every week, for the given days, at the time defined by date attribute.
 * @constructor
 * @return {AlarmAbsolute}
 */
function AlarmAbsolute() {}

/**
 * This interface is an abstract interface for alarm types.
 * @constructor
 * @return {Alarm}
 */
function Alarm() {}

/**
 * This interface provides methods to manage alarms.
 * @constructor
 * @return {AlarmManager}
 */
function AlarmManager() {}

/**
 * An attribute to store the difference in time (in seconds) between when an alarm is added and it is triggered.
 * @type {number}
 */
AlarmRelative.prototype.delay;

/**
 * An attribute to store the duration in seconds between each trigger of an alarm. By default,
 * this attribute is set to, indicating that this alarm does not repeat.
 * @type {number}
 */
AlarmRelative.prototype.period;

/**
 * Returns duration in seconds before the next alarm is triggered.
 * If the alarm has expired, this method returns null.
 * @memberof AlarmRelative
 * @return {number}
 */
AlarmRelative.prototype.getRemainingSeconds = function() {};

/**
 * An attribute to store the absolute date/time when the alarm is initially triggered.
 * This attribute is precise to the second. Milliseconds will be ignored.
 * @type {Date}
 */
AlarmAbsolute.prototype.date;

/**
 * An attribute to store the duration in seconds between each trigger of the alarm.
 * By default, this attribute is set to null, indicating that this alarm does not repeat.
 * The period and daysOfTheWeek attributes are mutually exclusive.
 * @type {number}
 */
AlarmAbsolute.prototype.period;

/**
 * An attribute to store the days of the week associated with the recurrence rule.
 * By default, this attribute is set to an empty array.
 * The period and daysOfTheWeek attributes are mutually exclusive.
 * @type {Array}
 */
AlarmAbsolute.prototype.daysOfTheWeek;

/**
 * Returns the date / time of the next alarm trigger.
 * If the alarm has expired, this method returns null. The returned date is precise to the second.
 * @memberof AlarmAbsolute
 * @return {Date}
 */
AlarmAbsolute.prototype.getNextScheduledDate = function() {};

/**
 * The alarm identifier.
 * @type {string}
 */
Alarm.prototype.id;

/**
 * The period of a minute. It defines the number of seconds per minute.
 * @type {number}
 */
AlarmManager.PERIOD_MINUTE;

/**
 * The period of an hour. It defines the number of seconds per hour.
 * @type {number}
 */
AlarmManager.PERIOD_HOUR;

/**
 * The period of a day. It defines the number of seconds per day.
 * @type {number}
 */
AlarmManager.PERIOD_DAY;

/**
 * The period of a week. It defines the number of seconds in a week.
 * @type {number}
 */
AlarmManager.PERIOD_WEEK;

/**
 * Adds an alarm to the storage.
 * Set an alarm with the application ID to be run. You should definitely provide the application ID to run
 * and the application control information if it is necessary.
 * For more information about the application contorl, see The Application API.
 * @param {Alarm} alarm
 * @param {string} applicationId
 * @param {ApplicationControl} appControl
 * @memberof AlarmManager
 * @return {void}
 */
AlarmManager.prototype.add = function(alarm, applicationId, appControl) {};

/**
 * Removes an alarm from the storage.
 * If an alarm goes off, it will be removed from the storage automatically.
 * @param {string} id
 * @memberof AlarmManager
 * @return {void}
 */
AlarmManager.prototype.remove = function(id) {};

/**
 * Removes all alarms added by an application.
 * Because each application has its own alarm storage, this method removes alarms only added by the calling application.
 * @memberof AlarmManager
 * @return {void}
 */
AlarmManager.prototype.removeAll = function() {};

/**
 * Returns an alarm as per the specified identifier.
 *
 * @param {string} id
 * @memberof AlarmManager
 * @return {Alarm}
 */
AlarmManager.prototype.get = function(id) {};

/**
 * Retrieves all alarms in an application storage.
 * Alarms that have already been triggered are removed automatically from the storage.
 * @memberof AlarmManager
 * @return {Array}
 */
AlarmManager.prototype.getAll = function() {};

/**
 * This interface defines the current application's information and the basic operations (such as exit or hide)
 * for the current application .
 * @constructor
 * @return {Application}
 */
function Application() {}

/**
 * This interface defines the certificate information of an installed application.
 * @constructor
 * @return {ApplicationCertificate}
 */
function ApplicationCertificate() {}

/**
 * This interface specified a success callback that is invoked when system finished searching applications which is
 * matched by specific application control.
 * This callback interface specifies a success method with an array of
 * ApplicationInformation objects and application control as an input parameter.
 * It is used in ApplicationManager.findAppControl().
 * Arguments: informationArray, appControl
 * @typedef {function(Array, ApplicationControl)}
 */
let FindAppControlSuccessCallback;


/**
 * This interface invokes the success callback that is invoked when the installed application list is retrieved.
 * This callback interface specifies a success method with an array of
 * ApplicationInformation objects as an input parameter. It is used in ApplicationManager.getAppsInfo().
 * Arguments: informationArray
 * @typedef {function(Array)}
 */
let ApplicationInformationArraySuccessCallback;


/**
 * This callback interface specifies success callbacks that are invoked as a reply from the requested application
 * control within the application control requester.
 * This callback interface specifies two methods:
 *  onsuccess(data) - Invoked by the callee application calls RequestedApplicationControl.replyResult().
 *  onfailure() - Invoked if the callee application calls RequestedApplicationControl.replyFailure().
 * @typedef {{
 *     onsuccess: function(Array),
 *     onfailure: function()
 * }}
 */
let ApplicationControlDataArrayReplyCallback;

/**
 * This interface defines a key/value pair used to pass data between applications through the interface.
 * @constructor
 * @param {string} key
 * @param {Array<string>} value
 * @return {ApplicationControlData}
 */
function ApplicationControlData(key, value) {}

/**
 * This interface defines the general information available to an installed application.
 * @constructor
 * @return {ApplicationInformation}
 */
function ApplicationInformation() {}

/**
 * This callback interface that specifies the success callback that is invoked when the list of running
 * applications is retrieved.
 * This callback interface specifies a success method with
 * an array of ApplicationContext objects as an input parameter. It is used in ApplicationManager.getAppsContext().
 * Arguments: contexts
 * @typedef {function(Array)}
 */
let ApplicationContextArraySuccessCallback;

/**
 * This interface defines the information available about a running application.
 * @constructor
 * @return {ApplicationContext}
 */
function ApplicationContext() {}

/**
 * This section defines the application manager interface.
 * @constructor
 * @return {ApplicationManager}
 */
function ApplicationManager() {}

/**
 * This interface consists of an operation, URI, MIME type, and data. It describes an action to be performed by other
 * applications and is passed to launch other applications. If the system gets the application control request,
 * it finds the corresponding application to be launched with the delivered application control and launches
 * the selected application.
 * @constructor
 * @param {?string} operation
 * @param {?string} uri
 * @param {?string} mime
 * @param {?string} category
 * @param {?Array<ApplicationControlData>} data
 * @return {ApplicationControl}
 */
function ApplicationControl(operation, uri, mime, category, data) {}

/**
 * The callback interface to specify for subscribing for notification of changes in the list of installed
 * applications on a device.
 * This callback interface specifies methods that will be invoked when
 * an application is installed(info), updated(info), or uninstalled(id).
 * @typedef {{
 *     oninstalled: function(ApplicationInformation),
 *     onupdated: function(ApplicationInformation),
 *     onuninstalled: function(string)
 * }}
 */
let ApplicationInformationEventCallback;

/**
 * This interface defines the meta data of an installed application.
 * @constructor
 * @return {ApplicationMetaData}
 */
function ApplicationMetaData() {}

/**
 * This interface has an application control information requested and passed from other application and is passed
 * to launch other applications. The newly launched application can get the requested application control through
 * method, and send the results to the calling application through the method after performing the required action
 * requested the calling application.
 * @constructor
 * @return {RequestedApplicationControl}
 */
function RequestedApplicationControl() {}

/**
 * An attribute to store the application information for the current application.
 * @type {ApplicationInformation}
 */
Application.prototype.appInfo;

/**
 * An attribute to store the ID of a running application.
 * @type {string}
 */
Application.prototype.contextId;

/**
 * Exits the current application.
 * @memberof Application
 * @return {void}
 */
Application.prototype.exit = function() {};

/**
 * Hides the current application.
 * @memberof Application
 * @return {void}
 */
Application.prototype.hide = function() {};

/**
 * Gets the requested application control passed to the current application.
 * Gets the requested application control that contains the application control
 * passed by the launchAppControl() method from the calling application.
 * The requested application control contains the reason the application
 * was launched and what it has to perform. For example, an application
 * might be launched to display an image on a page by other
 * application's request. In all of these cases, the application is
 * responsible for checking the contents of the application control and responding
 * appropriately when it is launched.
 * @memberof Application
 * @return {RequestedApplicationControl}
 */
Application.prototype.getRequestedAppControl = function() {};

/**
 * An attribute to store the type of the application certificate.
 * @type {string}
 */
ApplicationCertificate.prototype.type;

/**
 * An attribute to store the value of the application certificate.
 * @type {string}
 */
ApplicationCertificate.prototype.value;

/**
 * An attribute to store the name of a key.
 * @type {string}
 */
ApplicationControlData.prototype.key;

/**
 * An attribute to store the value associated with a key.
 * @type {Array<string>}
 */
ApplicationControlData.prototype.value;

/**
 * An attribute to store the identifier of an application for application management.
 * @type {string}
 */
ApplicationInformation.prototype.id;

/**
 * An attribute to store the name of an application.
 * @type {string}
 */
ApplicationInformation.prototype.name;

/**
 * An attribute to store the icon path of an application.
 * @type {string}
 */
ApplicationInformation.prototype.iconPath;

/**
 * An attribute to store the version of an application.
 * @type {string}
 */
ApplicationInformation.prototype.version;

/**
 * An attribute that determines whether the application information should be shown (such as in the menus) or not.
 * @type {boolean}
 */
ApplicationInformation.prototype.show;

/**
 * An array of attributes to store the categories that the app belongs to.
 * @type {Array}
 */
ApplicationInformation.prototype.categories;

/**
 * An attribute to store the application install/update time.
 * @type {Date}
 */
ApplicationInformation.prototype.installDate;

/**
 * An attribute to store the application size (installed space).
 * @type {number}
 */
ApplicationInformation.prototype.size;

/**
 * An attribute to store the package ID of application.
 * @type {string}
 */
ApplicationInformation.prototype.packageId;

/**
 * An attribute to store the ID of a running application.
 * @type {string}
 */
ApplicationContext.prototype.id;

/**
 * An attribute to store the ID of an installed application.
 * @type {string}
 */
ApplicationContext.prototype.appId;

/**
 * Gets the object defining the current application.
 *
 * @memberof ApplicationManager
 * @return {Application}
 */
ApplicationManager.prototype.getCurrentApplication = function() {};

/**
 * Kills an application with the specified application context ID.
 * The ErrorCallback() is launched with these error types:
 * NotFoundError - If the context is not found with specified context ID.
 * InvalidValuesError - If any of the input parameters contain an invalid value
 * or if the specified context ID matches the context ID of the calling application.
 * UnknownError - If any other error occurs.
 * @param {string} contextId
 * @param {SuccessCallback} successCallback
 * @param {ErrorCallback} errorCallback
 * @memberof ApplicationManager
 * @return {void}
 */
ApplicationManager.prototype.kill = function(contextId, successCallback, errorCallback) {};

/**
 * Launches an application with the given application ID.
 * The ErrorCallback() is launched with these error types:
 * NotFoundError - If the application is not found with given ID.
 * InvalidValuesError - If any of the input parameters contain an invalid value.
 * UnknownError - If any other error occurs.
 * @param {string} id
 * @param {SuccessCallback} successCallback
 * @param {ErrorCallback} errorCallback
 * @memberof ApplicationManager
 * @return {void}
 */
ApplicationManager.prototype.launch = function(id, successCallback, errorCallback) {};

/**
 * Launches an application with the specified application control.
 * An application can launch other applications with the application control,
 * and get back the results from the launched applications.
 * The application control consists of an operation, URI, and MIME type, and describes
 * the request to be performed by the newly launched application. The
 * application control is passed to the launchAppControl() method to launch an
 * application. The system tries to find the proper application
 * to perform the requested application control, then launches the selected application.
 * The application control request is passed to the newly launched application
 * and it can be accessed by getRequestedAppControl() method. The passed
 * application control contains the reason the application was launched and
 * information about what the application is doing. The launched application
 * can send a result to the caller application with the replyResult() method of
 * RequestedApplicationControl interface.
 * The ErrorCallback() is launched with these error types:
 * NotFoundError - If system cannot find the application that matches the specified application control.
 * InvalidValuesError - If any of the input parameters contain an invalid value.
 * UnknownError: If any other error occurs.
 * @param {ApplicationControl} appControl
 * @param {string} id
 * @param {SuccessCallback=} successCallback
 * @param {ErrorCallback=} errorCallback
 * @param {ApplicationControlDataArrayReplyCallback=} replyCallback
 * @memberof ApplicationManager
 * @return {void}
 */
ApplicationManager.prototype.launchAppControl = function(
	appControl,
	id,
	successCallback,
	errorCallback,
	replyCallback
) {};

/**
 * Finds application information can be launched with the given application control.
 * An application can get a list of other applications can be launched with the application control.
 * The ErrorCallback() is launched with these error types:
 * InvalidValuesError - If any of the input parameters contain an invalid value.
 * UnknownError - If any other error occurs.
 * @param {ApplicationControl} appControl
 * @param {FindAppControlSuccessCallback} successCallback
 * @param {ErrorCallback} errorCallback
 * @memberof ApplicationManager
 * @return {void}
 */
ApplicationManager.prototype.findAppControl = function(appControl, successCallback, errorCallback) {};

/**
 * Gets a list of application contexts for applications that are currently running on a device. The information
 * contained for each application corresponds to the application state at the time when the list was generated.
 * The errorCallback() is launched with this error type:
 * UnknownError - If an unknown error occurs.
 * @param {ApplicationContextArraySuccessCallback} successCallback
 * @param {ErrorCallback} errorCallback
 * @memberof ApplicationManager
 * @return {void}
 */
ApplicationManager.prototype.getAppsContext = function(successCallback, errorCallback) {};

/**
 * Gets the application context for the specified application context ID. If the ID is set to or is not set at all,
 * the method returns the application context of the current application. The list of running applications and their
 * application IDs is obtained with.
 * @param {string} contextId
 * @memberof ApplicationManager
 * @return {ApplicationContext}
 */
ApplicationManager.prototype.getAppContext = function(contextId) {};

/**
 * Gets the list of installed application's information on a device. The information contained on each application
 * corresponds to the application state at the moment when the list was generated.
 * The errorCallback() is launched with this error type:
 * UnknownError - If an unknown error occurs.
 * @param {ApplicationInformationArraySuccessCallback} successCallback
 * @param {ErrorCallback} errorCallback
 * @memberof ApplicationManager
 * @return {void}
 */
ApplicationManager.prototype.getAppsInfo = function(successCallback, errorCallback) {};

/**
 * Gets application information for a specified application ID.
 * If the ID is set to null or not set at all, it returns application information for the current application.
 * The list of installed applications and their application IDs is obtained with getAppsInfo().
 * @param {string} id
 * @memberof ApplicationManager
 * @return {ApplicationInformation}
 */
ApplicationManager.prototype.getAppInfo = function(id) {};

/**
 * Gets application certificates for a specified application ID.
 * If the ID is set to null or not set at all, it returns application certificates for the current application.
 * The certificate types are listed below
 *  AUTHOR_ROOT - Author Root Certificate
 *  AUTHOR_INTERMEDIATE - Author Intermediate Certificate
 *  AUTHOR_SIGNER - Author Signer Certificate
 *  DISTRIBUTOR_ROOT - Distributor Root Certificate
 *  DISTRIBUTOR_INTERMEDIATE - Distributor Intermediate Certificate
 *  DISTRIBUTOR_SIGNER - Distributor Signer Certificate
 *  DISTRIBUTOR2_ROOT - Distributor2 Root Certificate
 *  DISTRIBUTOR2_INTERMEDIATE - Distributor2 Intermediate Certificate
 *  DISTRIBUTOR2_SIGNER - Distributor2 Signer Certificate
 * @param {string} id
 * @memberof ApplicationManager
 * @return {Array}
 */
ApplicationManager.prototype.getAppCerts = function(id) {};

/**
 * Gets URI of read-only shared directory of application for a specified application ID.
 * The shared directory is used to export data to other applications.
 * If the ID is set to null or not set at all, it returns shared directory URI for the current application.
 * @param {string} id
 * @memberof ApplicationManager
 * @return {string}
 */
ApplicationManager.prototype.getAppSharedURI = function(id) {};

/**
 * Gets application meta data array for a specified application ID.
 * If the ID is set to null or not set at all, it returns application meta data array for the current application.
 * @param {string} id
 * @memberof ApplicationManager
 * @return {Array}
 */
ApplicationManager.prototype.getAppMetaData = function(id) {};

/**
 * Adds a listener for receiving any notification for changes in the list of the installed applications on a device.
 * It install a callback that is triggered every time a change occurs on
 * the list of installed applications on a device. This change may
 * be occurred by a new installation, uninstallation, or update of an application.
 * When executed, the implementation must immediately return a listener
 * ID that identifies the listener. After returning the ID, the change
 * detection operation is started asynchronously.
 * The ApplicationInformationEventCallback must be invoked every time a new
 * application is installed, removed, or updated.
 * The change detection must continue until the removeAppInfoEventListener() method is called
 * with the corresponding listener identifier.
 * @param {ApplicationInformationEventCallback} eventCallback
 * @memberof ApplicationManager
 * @return {number}
 */
ApplicationManager.prototype.addAppInfoEventListener = function(eventCallback) {};

/**
 * Removes the listener to stop receiving notifications for changes on the list of installed applications on a device.
 * @param {number} watchId
 * @memberof ApplicationManager
 * @return {void}
 */
ApplicationManager.prototype.removeAppInfoEventListener = function(watchId) {};

/**
 * An attribute to store the string that defines the action to be performed by an application control.
 * @type {?string}
 */
ApplicationControl.prototype.operation;

/**
 * An attribute to store the URI needed by application control.
 * @type {?string}
 */
ApplicationControl.prototype.uri;

/**
 * An attribute to store the MIME type of a content.
 * @type {?string}
 */
ApplicationControl.prototype.mime;

/**
 * An attribute to store the category of the application to be launched.
 * @type {?string}
 */
ApplicationControl.prototype.category;

/**
 * An array of attributes to store the data needed for an application control.
 * @type {Array<ApplicationControlData>}
 */
ApplicationControl.prototype.data;

/**
 * An attribute to store the key of the application meta data.
 * @type {string}
 */
ApplicationMetaData.prototype.key;

/**
 * An attribute to store the value of the application meta data.
 * @type {string}
 */
ApplicationMetaData.prototype.value;

/**
 * An attribute to store the application control object that describes caller application's request. It contains
 * the information that the calling application passed to.
 * @type {ApplicationControl}
 */
RequestedApplicationControl.prototype.appControl;

/**
 * An attribute to store the caller application's ID
 * @type {string}
 */
RequestedApplicationControl.prototype.callerAppId;

/**
 * Sends the results to the caller application.
 * @param {Array} data
 * @memberof RequestedApplicationControl
 * @return {void}
 */
RequestedApplicationControl.prototype.replyResult = function(data) {};

/**
 * Notifies the calling application that the application failed to perform the requested action.
 * @memberof RequestedApplicationControl
 * @return {void}
 */
RequestedApplicationControl.prototype.replyFailure = function() {};

/**
 * This interface implements the object.
 * @constructor
 * @return {BookmarkFolder}
 */
function BookmarkFolder() {}

/**
 * This interface provides access to the bookmark folder and bookmark item.
 * It provides access to the API functionalities through the tizen.bookmark interface.
 * @constructor
 * @return {BookmarkManager}
 */
function BookmarkManager() {}

/**
 * This interface implements the object.
 * @constructor
 * @return {BookmarkItem}
 */
function BookmarkItem() {}

/**
 * The parent bookmark folder.
 * This attribute is meaningful when this object is successfully added or retrieved.
 * If this BookmarkFolder is not added yet, its value is set to undefined.
 * If the parent bookmark folder indicates the root bookmark folder, the value will be null.
 * @type {BookmarkFolder}
 */
BookmarkFolder.prototype.parent;

/**
 * The title of the bookmark folder.
 * @type {string}
 */
BookmarkFolder.prototype.title;

/**
 * Gets all bookmark items and bookmark folders.
 * If no parentFolder is passed, or the parentFolder contains null, it is considered as the default bookmark folder
 * (The root bookmark folder).
 * In this case, the return will contain bookmarks under the root bookmark folder.
 * @param {BookmarkFolder} parentFolder
 * @param {boolean} recursive
 * @memberof BookmarkManager
 * @return {Array}
 */
BookmarkManager.prototype.get = function(parentFolder, recursive) {};

/**
 * @typedef {BookmarkItem|BookmarkFolder}
 */
let Bookmark;

/**
 * Adds a bookmark item or a bookmark folder.
 * If no parentFolder is passed, or the parentFolder contains null, it is considered as the default bookmark folder
 * (The root bookmark folder).
 * In this case, the bookmark is added under the root bookmark folder.
 * @param {Bookmark} bookmark
 * @param {BookmarkFolder} parentFolder
 * @memberof BookmarkManager
 * @return {void}
 */
BookmarkManager.prototype.add = function(bookmark, parentFolder) {};

/**
 * Removes a bookmark item or a bookmark folder.
 * If the bookmark is a BookmarkFolder type, all the bookmark items and bookmark folders under the specified bookmark
 * folder are going to be removed.If no bookmark is passed, or the bookmark contains null, it is considered
 * as the default bookmark folder(The root bookmark folder).
 * In this case, all the bookmarks will be removed.
 * @param {Bookmark} bookmark
 * @memberof BookmarkManager
 * @return {void}
 */
BookmarkManager.prototype.remove = function(bookmark) {};

/**
 * The parent bookmark folder.
 * This attribute is meaningful when this object is successfully added or retrieved.
 * If this BookmarkItem is not added yet, its value is set to undefined.
 * If the parent bookmark folder indicates the root bookmark folder, the value will be null.
 * @type {BookmarkFolder}
 */
BookmarkItem.prototype.parent;

/**
 * The title of the bookmark.
 * @type {string}
 */
BookmarkItem.prototype.title;

/**
 * The uri of the bookmark.
 * @type {string}
 */
BookmarkItem.prototype.url;

/**
 * The callback function used to return a content to scan has been completed.
 * Arguments: contentURI
 * @typedef {function(string)}
 */
let ContentScanSuccessCallback;

/**
 * This interface provides lyrics for music.
 * @constructor
 * @return {AudioContentLyrics}
 */
function AudioContentLyrics() {}

/**
 * This interface provides access to properties of a content.
 * @constructor
 * @return {Content}
 */
function Content() {}

/**
 * The callback function used to return a list of content objects.
 * Arguments: contents
 * @typedef {function(Array)}
 */
let ContentArraySuccessCallback;

/**
 * This interface extends a basic object with image-specific attributes.
 * @constructor
 * @return {ImageContent}
 */
function ImageContent() {}

/**
 * This interface specifies a set of methods that are invoked every time a content change occurs.
 * Arguments:
 *  oncontentadded: content,
 *  oncontentupdated: content,
 *  oncontentremoved: id
 * @typedef {{
 *     oncontentadded: function(Content),
 *     oncontentupdated: function(Content),
 *     oncontentremoved: function(string)
 * }}
 */
let ContentChangeCallback;

/**
 * This interface extends a basic object with audio-specific attributes.
 * @constructor
 * @return {AudioContent}
 */
function AudioContent() {}

/**
 * This interface extends a basic object with video-specific attributes.
 * @constructor
 * @return {VideoContent}
 */
function VideoContent() {}

/**
 * This interface provides operations to retrieve and manipulate contents.
 * @constructor
 * @return {ContentManager}
 */
function ContentManager() {}

/**
 * The callback function used to return a list of ContentDirectory objects.
 * Arguments: directories
 * @typedef {function(Array)}
 */
let ContentDirectoryArraySuccessCallback;

/**
 * This interface that provides access to properties of a content directory.
 * @constructor
 * @return {ContentDirectory}
 */
function ContentDirectory() {}

/**
 * @enum {string}
 */
let AudioContentLyricsType = {
	SYNCHRONIZED: 'SYNCHRONIZED',
	UNSYNCHRONIZED: 'UNSYNCHRONIZED'
};

/**
 * The type of lyrics, that is, whether they are synchronized with the music or not.
 * @type {AudioContentLyricsType}
 */
AudioContentLyrics.prototype.type;

/**
 * The array of timestamps in milliseconds for lyrics.
 * If the lyrics are not synchronized (if there is no time information for the lyrics) the array is undefined.
 * @type {Array}
 */
AudioContentLyrics.prototype.timestamps;

/**
 * The array of lyric snippets.
 * If the lyrics are not synchronized, the array has only one member with full lyrics.
 * @type {Array}
 */
AudioContentLyrics.prototype.texts;

/**
 * The list of attributes that can be editable to the local backend using update or updateBatch method.
 * @type {Array}
 */
Content.prototype.editableAttributes;

/**
 * The opaque content identifier.
 * @type {string}
 */
Content.prototype.id;

/**
 * The content name. The initial value is the file name of the content.
 * @type {string}
 */
Content.prototype.name;

/**
 * @enum {string}
 */
let ContentType = {
	IMAGE: 'IMAGE',
	VIDEO: 'VIDEO',
	AUDIO: 'AUDIO',
	OTHER: 'OTHER'
};

/**
 * The content type.
 * @type {ContentType}
 */
Content.prototype.type;

/**
 * The content MIME type.
 * @type {string}
 */
Content.prototype.mimeType;

/**
 * The content title.
 * @type {string}
 */
Content.prototype.title;

/**
 * The URI to access the content.
 * @type {string}
 */
Content.prototype.contentURI;

/**
 * The array of content thumbnails URIs.
 * @type {Array}
 */
Content.prototype.thumbnailURIs;

/**
 * The date when a content has been released to the public. If only the release year is known, then the month and
 * date are set to January and 1st respectively.
 * @type {Date}
 */
Content.prototype.releaseDate;

/**
 * The last modified date for a content.
 * @type {Date}
 */
Content.prototype.modifiedDate;

/**
 * The file size of the content in bytes.
 * @type {number}
 */
Content.prototype.size;

/**
 * The content description.
 * @type {string}
 */
Content.prototype.description;

/**
 * The content rating and this value can vary from to.
 * @type {number}
 */
Content.prototype.rating;

/**
 * The geographical location where the image has been made.
 * @type {SimpleCoordinates}
 */
ImageContent.prototype.geolocation;

/**
 * The width of an image in pixels.
 * @type {number}
 */
ImageContent.prototype.width;

/**
 * The height of an image in pixels.
 * @type {number}
 */
ImageContent.prototype.height;

/**
 * @enum {string}
 */
let ImageContentOrientation = {
	'ROTATE_90': 'ROTATE_90',
	'ROTATE_180': 'ROTATE_180',
	'ROTATE_270': 'ROTATE_270',
	NORMAL: 'NORMAL',
	FLIP_HORIZONTAL: 'FLIP_HORIZONTAL',
	FLIP_VERTICAL: 'FLIP_VERTICAL',
	TRANSPOSE: 'TRANSPOSE',
	TRANSVERSE: 'TRANSVERSE'
};

/**
 * The image orientation.
 * @type {ImageContentOrientation}
 */
ImageContent.prototype.orientation;

/**
 * The album name to which the audio belongs.
 * @type {string}
 */
AudioContent.prototype.album;

/**
 * The list of genres to which the audio belongs.
 * @type {Array}
 */
AudioContent.prototype.genres;

/**
 * The list of artists who created the audio.
 * @type {Array}
 */
AudioContent.prototype.artists;

/**
 * The list of composers for the music.
 * @type {Array}
 */
AudioContent.prototype.composers;

/**
 * The lyrics of a song in an audio file.
 * @type {AudioContentLyrics}
 */
AudioContent.prototype.lyrics;

/**
 * The copyright information.
 * @type {string}
 */
AudioContent.prototype.copyright;

/**
 * The audio bitrate in bits per second. By default, this value is 0.
 * @type {number}
 */
AudioContent.prototype.bitrate;

/**
 * The track number if the audio belongs to an album.
 * @type {number}
 */
AudioContent.prototype.tracknumber;

/**
 * The audio duration in milliseconds.
 * @type {number}
 */
AudioContent.prototype.duration;

/**
 * The geographical location where the video was made.
 * @type {SimpleCoordinates}
 */
VideoContent.prototype.geolocation;

/**
 * The album name to which the video belongs.
 * @type {string}
 */
VideoContent.prototype.album;

/**
 * The list of artists who created the video.
 * @type {Array}
 */
VideoContent.prototype.artists;

/**
 * The video duration in milliseconds.
 * @type {number}
 */
VideoContent.prototype.duration;

/**
 * The width of a video in pixels.
 * @type {number}
 */
VideoContent.prototype.width;

/**
 * The height of the video in pixels.
 * @type {number}
 */
VideoContent.prototype.height;

/**
 * Updates attributes of the content in content database synchronously.
 * When an application has changed some attributes of a content, this method allows
 * writing it back to the content database.
 * @param {Content} content
 * @memberof ContentManager
 * @return {void}
 */
ContentManager.prototype.update = function(content) {};

/**
 * Updates a batch of content attributes in the content database asynchronously.
 * When an application has changed any attributes in array of content, this method allows writing them
 * back to the content database.
 * The errorCallback can be launched with any of these error types:
 * InvalidValuesError: If any of the input parameters contain an invalid value.
 * UnknownError: In any other error case.
 * @param {Array} contents
 * @param {SuccessCallback} successCallback
 * @param {ErrorCallback} errorCallback
 * @memberof ContentManager
 * @return {void}
 */
ContentManager.prototype.updateBatch = function(contents, successCallback, errorCallback) {};

/**
 * Gets a list of content directory.
 * This method returns (via callback) a list of content directory objects. To obtain a list of contents
 * in a specific directory, use find() method with the directory ID.
 * The errorCallback is launched with this error type:
 * UnknownError: In any other error case.
 * @param {ContentDirectoryArraySuccessCallback} successCallback
 * @param {ErrorCallback} errorCallback
 * @memberof ContentManager
 * @return {void}
 */
ContentManager.prototype.getDirectories = function(successCallback, errorCallback) {};

/**
 * Finds contents that satisfy the conditions set by a filter.
 * This method allows searching based on a supplied filter. For more detail on AbstractFilter, see
 * Tizen module. The filter allows precise searching such
 * as "return all songs by artist U2, ordered by name".
 * The errorCallback can be launched with these error types:
 * InvalidValuesError: If any of the input parameters contain an invalid value.
 * UnknownError: In any other error case.
 * @param {ContentArraySuccessCallback} successCallback
 * @param {ErrorCallback} errorCallback
 * @param {string} directoryId
 * @param {AbstractFilter} filter
 * @param {SortMode} sortMode
 * @param {number} count
 * @param {number} offset
 * @memberof ContentManager
 * @return {void}
 */
ContentManager.prototype.find = function(
	successCallback,
	errorCallback,
	directoryId,
	filter,
	sortMode,
	count,
	offset
) {};

/**
 * Scan a file to create or update a content in the content database.
 * When an application creates or updates a content, this method allows scan it
 * to insert or update the content in the content database.
 * @param {string} contentURI
 * @param {ContentScanSuccessCallback} successCallback
 * @param {ErrorCallback} errorCallback
 * @memberof ContentManager
 * @return {void}
 */
ContentManager.prototype.scanFile2 = function(contentURI, successCallback, errorCallback) {};

/**
 * Sets a listener to receive notifications about content changes.
 * @param {ContentChangeCallback} changeCallback
 * @memberof ContentManager
 * @return {void}
 */
ContentManager.prototype.setChangeListener = function(changeCallback) {};

/**
 * Unsets the listener to unsubscribes from receiving notification for any content changes.
 * @memberof ContentManager
 * @return {void}
 */
ContentManager.prototype.unsetChangeListener = function() {};

/**
 * The opaque content directory identifier.
 * @type {string}
 */
ContentDirectory.prototype.id;

/**
 * The directory path on the device.
 * @type {string}
 */
ContentDirectory.prototype.directoryURI;

/**
 * The directory name.
 * @type {string}
 */
ContentDirectory.prototype.title;

/**
 * @enum {string}
 */
let ContentDirectoryStorageType = {
	INTERNAL: 'INTERNAL',
	EXTERNAL: 'EXTERNAL'
};

/**
 * The type of a device storage.
 * @type {ContentDirectoryStorageType}
 */
ContentDirectory.prototype.storageType;

/**
 * The last modified date for a directory.
 * @type {Date}
 */
ContentDirectory.prototype.modifiedDate;

/**
 * This interface handles requests for downloading. Each step of download operation will be informed through callbacks.
 * @constructor
 * @return {DownloadManager}
 */
function DownloadManager() {}

/**
 * This interface defines the download request object.
 * @constructor
 * @return {DownloadRequest}
 */
function DownloadRequest() {}

/**
 * This interface defines notification callbacks for the download state change or progress.
 * Arguments:
 *  onprogress: downloadId, receivedSize, totalSize
 *  onpaused: downloadId
 *  oncanceled: downloadId
 *  oncompleted: downloadId, fullPath
 *  onfailed: downloadId, error
 * @typedef {{
 *     onprogress: function(number, number, number),
 *     onpaused: function(number),
 *     oncanceled: function(number),
 *     oncompleted: function(number, string),
 *     onfailed: function(number, WebAPIError)
 * }}
 */
let DownloadCallback;

/**
 * Starts a download operation with the specified URL information.
 * @param {DownloadRequest} downloadRequest
 * @param {DownloadCallback} downloadCallback
 * @memberof DownloadManager
 * @return {number}
 */
DownloadManager.prototype.start = function(downloadRequest, downloadCallback) {};

/**
 * Cancels an ongoing download operation that is specified by the parameter.
 * @param {number} downloadId
 * @memberof DownloadManager
 * @return {void}
 */
DownloadManager.prototype.cancel = function(downloadId) {};

/**
 * Pauses an ongoing download operation that is specified by the parameter. The paused download operation can be
 * resumed later by the method.
 * @param {number} downloadId
 * @memberof DownloadManager
 * @return {void}
 */
DownloadManager.prototype.pause = function(downloadId) {};

/**
 * Resumes a paused download operation that is specified by the parameter.
 * @param {number} downloadId
 * @memberof DownloadManager
 * @return {void}
 */
DownloadManager.prototype.resume = function(downloadId) {};

/**
 * @enum {string}
 */
let DownloadState = {
	QUEUED: 'QUEUED',
	DOWNLOADING: 'DOWNLOADING',
	PAUSED: 'PAUSED',
	CANCELED: 'CANCELED',
	COMPLETED: 'COMPLETED',
	FAILED: 'FAILED'
};

/**
 * Gets the download state of an operation synchronously with the specified ID.
 * @param {number} downloadId
 * @memberof DownloadManager
 * @return {DownloadState}
 */
DownloadManager.prototype.getState = function(downloadId) {};

/**
 * Gets the DownloadRequest object from a given id.
 * @param {number} downloadId
 * @memberof DownloadManager
 * @return {DownloadRequest}
 */
DownloadManager.prototype.getDownloadRequest = function(downloadId) {};

/**
 * Gets the MIME type of the downloaded file.
 * @param {number} downloadId
 * @memberof DownloadManager
 * @return {string}
 */
DownloadManager.prototype.getMIMEType = function(downloadId) {};

/**
 * Sets the download callback to the download operation of given id. It's possible to change or register the listener
 * of download operation using the saved id.
 * @param {number} downloadId
 * @param {DownloadCallback} downloadCallback
 * @memberof DownloadManager
 * @return {void}
 */
DownloadManager.prototype.setListener = function(downloadId, downloadCallback) {};

/**
 * An attribute to store the URL of the object to download.
 * @type {string}
 */
DownloadRequest.prototype.url;

/**
 * An attribute to store the folder path of the destination folder to which a requested file object will be downloaded.
 * If the destination is not specified or an empty string, the file will be downloaded to the default storage:
 * "Downloads".
 * For more information, see Filesystem API.
 * The default value is an empty string.
 * @type {string}
 */
DownloadRequest.prototype.destination;

/**
 * An attribute to store the file name for the specified URL.
 * If the file name is not given or an empty string, the original file name from URL is used.
 * The default value is an empty string.
 * @type {string}
 */
DownloadRequest.prototype.fileName;

/**
 * @enum {string}
 */
let DownloadNetworkType = {
	CELLULAR: 'CELLULAR',
	WIFI: 'WIFI',
	ALL: 'ALL'
};

/**
 * An attribute to store the allowed network type.
 * If the network type is not given, all network type are allowed.
 * The default value is ALL.
 * @type {DownloadNetworkType}
 */
DownloadRequest.prototype.networkType;

/**
 * An attribute to store extra HTTP header fields.
 * For more information about HTTP header fields, see
 *  <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec4.html#sec4.2">RFC-2616</a>
 * The default value is an empty object.
 * @type {Object}
 */
DownloadRequest.prototype.httpHeader;

/**
 * This success callback interface reads the content of a file as a DOMstring.
 * This callback interface specifies a success callback with a DOMstring object as input argument.
 * It is used in asynchronous operations, such as File2.readAsText().
 * Arguments: fileStr
 * @typedef {function(string)}
 */
let FilestringSuccessCallback;


/**
 * This callback interface specifies a success callback with a object as input argument.
 * It is used in asynchronous operations, such as
 * FileSystemManager.getStorage() and FileSystemManager.addStorageStateChangeListener().
 * Arguments: storage
 * @typedef {function(FileSystemStorage)}
 */
let FileSystemStorageSuccessCallback;

/**
 * This interface provides access to the Filesystem API.
 * This manager interface exposes the Filesystem base API, and provides functionalities, such
 * as determining root and default locations, resolving a given location into a file handle, and registering
 * filesystem listeners for filesystem events.
 * @constructor
 * @return {FileSystemManager}
 */
function FileSystemManager() {}

/**
 * This interface represents a handle to a File opened for read and/or write operations. Read and write
 * operations are performed relative to a position attribute, which is a pointer that represents
 * the current position in the file.
 * A series of read/write methods are available that permit both binary and text to be processed.
 * Once a file stream is closed, any operation attempt made on this stream results in a standard JavaScript error.
 * The read/write operations in this interface do not throw any security exceptions as the access rights are expected
 * to be granted through the initial resolve() method or through the openStream() method of the File interface.
 * Therefore, all actions performed on a successfully resolved File and FileStream are expected to succeed.
 * This avoids successive asynchronous calls and may potentially increase application for a user.
 * @constructor
 * @return {FileStream}
 */
function FileStream() {}

/**
 * This interface specific file system success callback with a object as input argument.
 * It is used in asynchronous operations, such as FileSystemManager.resolve() and copying, moving, and deleting files.
 * Arguments: file
 * @typedef {function(File)}
 */
let FileSuccessCallback;

/**
 * This interface represents the file abstraction in use. A file handle represents a file if the property is ,
 * and if the property is , the file handle represents a directory. If a file handle represents a directory,
 * it can address files and directories.
 * The file object permissions for the file object location and tree rooted
 * at that location depends upon the mode defined in the resolve method.
 * When a File object creates a child File object,
 * the new File object inherits its access rights from
 * the parent object without any reference to the security framework, as
 * noted in certain methods of File2.
 * A file handle representing a file can be opened for I/O operations,
 * such as reading and writing.
 * A file handle representing a directory can be used for listing all
 * files and directories rooted as the file handle location.
 * @constructor
 * @return {File}
 */
function File2() {}

/**
 * This interface gives additional information about a storage, such as if the device is mounted,
 * if it's a removable drive or not, or the device's name.
 * To retrieve the mount point, the resolve() method should be used using the label as argument.
 * @constructor
 * @return {FileSystemStorage}
 */
function FileSystemStorage() {}

/**
 * The success callback interface opens a file for raw access.
 * This callback interface specifies a success callback with a FileStream object as input argument.
 * It is used by asynchronous methods, such as File2.openStream().
 * Arguments: filestream
 * @typedef {function(FileStream)}
 */
let FileStreamSuccessCallback;


/**
 * This callback interface specifies a success callback with an array of FileSystemStorage objects as input argument.
 * It is used in asynchronous operations, such as FileSystemManager.listStorages().
 * Arguments: storages
 * @typedef {function(Array)}
 */
let FileSystemStorageArraySuccessCallback;


/**
 * The file system interface specific success callback for listing methods.
 * This callback interface specifies a success callback with a function taking an array of File objects
 * as input argument. It is used in asynchronous methods, such as File2.listFiles().
 * Arguments: files
 * @typedef {function(Array)}
 */
let FileArraySuccessCallback;

/**
 * An attribute to store the maximum path length limit for the current platform.
 * @type {number}
 */
FileSystemManager.prototype.maxPathLength;

/**
 * @enum {string}
 */
let FileMode = {
	R: 'r',
	RW: 'rw',
	W: 'w',
	A: 'a'
};

/**
 * Resolves a location to a file handle after validating it.
 * A location can contain a virtual path like 'documents/some_file.txt'
 * or a file's URI 'file:///my_strange_path/some_file.png'.
 * The list of root locations that must be supported by a compliant implementation are:
 * documents - The default folder in which text documents (such as pdf, doc...) are stored by default in a device.
 *  For example, in some platforms it corresponds to the "My Documents" folder.
 * images - The default folder in which still images, like pictures (in formats including jpg, gif, png, etc.),
 *  are stored in the device by default. For example, in some platforms it corresponds to the "My Images" folder.
 * music - The default folder in which sound clips (in formats including mp3, aac, etc.) are stored in the device
 *  by default. For example, in some platforms it corresponds to the "My Music" folder.
 * videos - The default folder in which video clips (in formats including avi, mp4, etc.) are stored in the device
 *  by default. For example, in some platforms it corresponds to the "My Videos" folder.
 * downloads - The default folder in which downloaded files (from sources including browser, e-mail client, etc.)
 *  are stored by default in the device. For example, in some platforms it corresponds to the "Downloads" folder.
 * ringtones: The default folder in which ringtones (such as mp3, etc) are stored in the device by default.
 * wgt-package - The read-only folder to which the content of a widget file is extracted.
 * wgt-private - The private folder in which a widget stores its information. This folder must be accessible only
 *  to the same widget and other widgets or applications must not be able to access the stored information.
 * wgt-private-tmp - Temporary, the private folder in which a widget can store data that is available during a widget
 *  execution cycle. Content of this folder can be removed from this directory when the widget is closed or
 *  the Web Runtime is restarted. This folder must be accessible only to the same widget and other widgets or
 *  applications must not be able to access it.
 * The mode parameter specifies whether the resulting File object has read-only access ("r" access), read and write
 * access ("rw" access), append access ("a" access), or write access ("w" access) to the root location containing
 * directory tree.
 * Permission for the requested access is obtained from the security framework. Once the resulting File object has
 * access, access is inherited by any other File objects that are derived from this instance without any further
 * reference to the security framework, as noted in descriptions of certain methods of File.
 * The ErrorCallback is launched with these error types:
 *  InvalidValuesError - If any of the input parameters contain an invalid value.
 *   For example, the mode is not valid (that is, it is not "r", "rw", "a", or "w").
 *  NotFoundError - If the location input argument does not correspond to a valid location.
 *  UnknownError - If any other error occurs.
 * @param {string} location
 * @param {FileSuccessCallback} onsuccess
 * @param {ErrorCallback} onerror
 * @param {FileMode} mode
 * @memberof FileSystemManager
 * @return {void}
 */
FileSystemManager.prototype.resolve = function(location, onsuccess, onerror, mode) {};

/**
 * Gets information about a storage based on its label.For example: "MyThumbDrive", "InternalFlash".
 * The onsuccess method receives the data structure as an input argument containing additional
 * information about the drive.
 * The ErrorCallback is launched with these error types:
 *  NotFoundError - If no drive was found with the given label.
 *  InvalidValuesError - If any of the input parameters contain an invalid value.
 *  UnknownError - If any other error occurs.
 * @param {string} label
 * @param {FileSystemStorageSuccessCallback} onsuccess
 * @param {ErrorCallback} onerror
 * @memberof FileSystemManager
 * @return {void}
 */
FileSystemManager.prototype.getStorage = function(label, onsuccess, onerror) {};

/**
 * Lists the available storages (both internal and external) on a device. The onsuccess method receives a list
 * of the data structures as input argument containing additional information about each drive found. It can get
 * storages that would have a label named as 'internal0', virtual roots (images, documents,...), 'removable1',
 * 'removable2'. 'removable1' label is used to resolve sdcard and 'removable2' label is used to resolve USB host,
 * if supported. The vfat filesystem used to sdcard filesystem widely is not case-sensitive. If you want to handle
 * the file on sdcard, you need to consider case-sensitive filenames are regarded as same name.
 * Labels can differ depending on platform implementation.
 * The ErrorCallback is launched with these error types:
 *  InvalidValuesError - If any of the input parameters contain an invalid value.
 *  UnknownError - If any other error occurs.
 * @param {FileSystemStorageArraySuccessCallback} onsuccess
 * @param {ErrorCallback} onerror
 * @memberof FileSystemManager
 * @return {void}
 */
FileSystemManager.prototype.listStorages = function(onsuccess, onerror) {};

/**
 * Adds a listener to subscribe to notifications when a change in storage state occurs.
 * The most common usage for this method is to watch for any additions and removals of external storages.
 * When executed, it returns a subscription identifier that identifies the watch operation. After returning the
 * identifier, the watch operation is started asynchronously. The onsuccess method will be invoked every time
 * a storage state changes. If the attempt fails, the onerror if present will be invoked with the relevant error type.
 * The watch operation must continue until the removeStorageStateChangeListener() method is called with
 * the corresponding subscription identifier.
 * @param {FileSystemStorageSuccessCallback} onsuccess
 * @param {ErrorCallback} onerror
 * @memberof FileSystemManager
 * @return {number}
 */
FileSystemManager.prototype.addStorageStateChangeListener = function(onsuccess, onerror) {};

/**
 * Removes a listener to unsubscribes from a storage watch operation.
 * If the watchId argument is valid and corresponds to a subscription already in place, the watch process will be
 * stopped and no further callbacks will be invoked.
 * @param {number} watchId
 * @memberof FileSystemManager
 * @return {void}
 */
FileSystemManager.prototype.removeStorageStateChangeListener = function(watchId) {};

/**
 * Indicates whether or not the current file pointer is at the end of the file.
 * If set to true, this attribute indicates that the file pointer is at the end of the file.
 * If set to false, this attribute indicates that the file pointer is not at the end of the file and so it
 * is anywhere within the file.
 * @type {boolean}
 */
FileStream.prototype.eof;

/**
 * An attribute to indicate the stream position for reads/writes.
 * The stream position is an offset of bytes from the start of the file stream. When invoking an operation that
 * reads or writes from the stream, the operation will take place from the byte defined by this position attribute.
 * If the read or write operation is successful, the position of the stream is advanced by the number of bytes
 * read or written. If the read/write operation is not successful, the position of the stream is unchanged.
 * @type {number}
 */
FileStream.prototype.position;

/**
 * The number of bytes that are available for reading from the stream.
 * The number of bytes available for reading is the maximum amount of bytes that can be read in the next read operation.
 * It corresponds to the number of bytes available after the file pointer denoted by the position attribute.
 * -1 if EOF is true.
 * @type {number}
 */
FileStream.prototype.bytesAvailable;

/**
 * Closes this FileStream.
 * Flushes any pending buffered writes and closes the File2. Always succeeds.
 * Note that pending writes might not succeed.
 * @memberof FileStream
 * @return {void}
 */
FileStream.prototype.close = function() {};

/**
 * Reads the specified number of characters from the position of the file pointer in a FileStream and returns
 * the characters as a string. The resulting string length might be shorter than if EOF is .
 * @param {number} charCount
 * @memberof FileStream
 * @return {string}
 */
FileStream.prototype.read = function(charCount) {};

/**
 * Reads the specified number of bytes from a FileStream.
 * @param {number} byteCount
 * @memberof FileStream
 * @return {Array}
 */
FileStream.prototype.readBytes = function(byteCount) {};

/**
 * Reads the specified number of bytes from this FileStream, encoding the result in base64.
 * @param {number} byteCount
 * @memberof FileStream
 * @return {string}
 */
FileStream.prototype.readBase64 = function(byteCount) {};

/**
 * Writes the specified DOMstring to a FileStream.
 * @param {string} stringData
 * @memberof FileStream
 * @return {void}
 */
FileStream.prototype.write = function(stringData) {};

/**
 * Writes the specified bytes to this FileStream.
 * @param {Array} byteData
 * @memberof FileStream
 * @return {void}
 */
FileStream.prototype.writeBytes = function(byteData) {};

/**
 * Writes the result to this FileStream after converting the specified base64 DOMstring to bytes.
 * @param {string} base64Data
 * @memberof FileStream
 * @return {void}
 */
FileStream.prototype.writeBase64 = function(base64Data) {};

/**
 * The parent directory handle.
 * This attribute is set tonull if there is no parent directory. This also implies that this directory
 * represents a root location.
 * @type {File2}
 */
File2.prototype.parent;

/**
 * The file/directory access state in the filesystem.
 * This attribute is set to:
 * - if object has read-only access at its location.
 * - if object has write access at its location.
 * This attribute represents the actual state of a file or directory in the filesystem. Its value is not affected
 * by the mode used in FileSystemManager.resolve() that was used to create the File object from which
 * this File object was obtained.
 * @type {boolean}
 */
File2.prototype.readOnly;

/**
 * An attribute to indicate the whether it is file or not.
 * This attribute can have the following values:
 *  if this handle is a file.
 *  if this handle is a directory.
 * @type {boolean}
 */
File2.prototype.isFile2;

/**
 * An attribute to indicate the whether it is a directory or not.
 * This attribute can have the following values:
 *  if this handle is a directory.
 *  if this handle is a file.
 * @type {boolean}
 */
File2.prototype.isDirectory;

/**
 * The timestamp when a file is first created in the filesystem.
 * This timestamp is equivalent to the timestamp when a call to createFile2() succeeds.
 * If the platform does not support this attribute, it will be null.
 * It is unspecified and platform-dependent if the creation timestamp changes when a file is moved.
 * @type {Date}
 */
File2.prototype.created;

/**
 * The timestamp when the most recent modification is made to a file, usually when the last write operation succeeds.
 * Opening a file for reading does not change the modification timestamp.
 * If the platform does not support this attribute, it will be null.
 * It is unspecified and platform-dependent if the modified
 * timestamp changes when a file is moved.
 * @type {Date}
 */
File2.prototype.modified;

/**
 * The path of a file after excluding its file name.
 * It begins with the name of the root containing the file, followed by the path, including the directory
 * containing the file, but excluding the file name.
 * Except in some special cases of the File representing the root itself, the last character is always '/'.
 * For example, if a file is located at music/ramones/volume1/RockawayBeach.mp3, the path is music/ramones/volume1/.
 * For example, if a directory is located at music/ramones/volume1, the path is music/ramones/.
 * For the virtual roots, the path is same as the name of the virtual root.
 * For example, if the root is music, then the path is music. If the root is documents, then the path is documents.
 * @type {string}
 */
File2.prototype.path;

/**
 * The file name after excluding the root name and any path components.
 * This is the name of this file, excluding the root name and any other path components.
 * For example, if a file is located at music/ramones/volume1/RockawayBeach.mp3, the name  is 'RockawayBeach.mp3'.
 * For example, if a directory is located at music/ramones/volume1, the name  is be 'volume1'.
 * For the special case of the root itself, the name  is an empty string.
 * @type {string}
 */
File2.prototype.name;

/**
 * The full path of a file.
 * It begins with the name of the root containing the file, and including the name of the file or directory itself.
 * For instance, if the RockawayBeach.mp3 file is located at music/ramones/volume1/,
 * then the fullPath is music/ramones/volume1/RockawayBeach.mp3.
 * For a directory, if the volume1 directory is located at music/ramones/, then the fullPath is music/ramones/volume1.
 * For the special case of the root itself, if the root is music, then the fullPath is music.
 * The fullPath is always equal to path + name.
 * @type {string}
 */
File2.prototype.fullPath;

/**
 * The size of this file, in bytes.
 * If an attempt to read this attribute for a directory is made, undefined is returned. To retrieve the number
 * of files and directories contained in the directory, use the length attribute.
 * @type {number}
 */
File2.prototype.fileSize;

/**
 * The number of files and directories contained in a file handle.
 * If an attempt to read this attribute for a file is made, undefined is returned. To retrieve the size of a file,
 * use the fileSize attribute.
 * @type {number}
 */
File2.prototype.length;

/**
 * Returns a URI for a file to identify an entry (such as using it as the src attribute on an HTML img element).
 * The URI has no specific expiration, it should be valid at least as long as the file exists.
 * If that URI corresponds to any of the public virtual roots
 * (that is images, videos, music, documents, and downloads) the URI
 * must be globally unique and could be used by any widget.
 * If that URI corresponds to a file located in any a widget's private areas
 * (such as wgt-package, wgt-private, wgt-private-tmp). The generated URI must be unique for that file and for
 * the widget making the request (such as including some derived from the widget ID in the URI).
 * These URIs must not be accessible to other widgets, apart from the one invoking this method.
 * @memberof File
 * @return {string}
 */
File2.prototype.toURI = function() {};

/**
 * @typedef {{
 *     name: string,
 *     startModified: Date,
 *     endModified: Date,
 *     startCreated: Date,
 *     endCreated: Date
 * }}
 */
let FileFilter;

/**
 * Lists all files in a directory.
 * The list of files is passed as a File[] in the onsuccess() and contains directories and files. However,
 * the directories "." and ".." must not be returned. Each File object that is part of the array must inherit
 * all the access rights (that is, one of the values in FileMode) from the File object in which this method is invoked.
 * If the filter is passed and contains valid values, only those directories and files in the directory that match
 * the filter criteria specified in the FileFilter interface must be returned in the onsuccess() method. If no filter
 * is passed, the filter is null or undefined, or the filter contains invalid values, the implementation must return
 * the full list of files in the directory.
 * If the directory does not contain any files or directories, or the filter criteria does not matched with any
 * files or directories, the onsuccess() is invoked with an empty array.
 * The ErrorCallback is launched with these error types:
 *  IOError - If the operation is launched on a file (not a directory).
 *  InvalidValuesError - If any of the input parameters contain an invalid value.
 *  UnknownError - If any other error occurs.
 * @param {FileArraySuccessCallback} onsuccess
 * @param {ErrorCallback} onerror
 * @param {FileFilter} filter
 * @memberof File
 * @return {void}
 */
File2.prototype.listFiles = function(onsuccess, onerror, filter) {};

/**
 * Opens the file in the given mode supporting a specified encoding.
 * This operation is performed asynchronously. If the file is opened successfully, the onsuccess() method is
 * invoked with a FileStream that can be used for reading and writing the file, depending on the mode.
 * The returned FileStream instance includes a file pointer, which represents the current position in the file.
 * The file pointer, by default, is at the start of the file, except in the case of opening a file in append ("a")
 * mode, in which case the file pointer points to the end of the file.
 * The ErrorCallback is launched with these error types:
 *  InvalidValuesError - If any of the input parameters contains an invalid value.
 *  IOError - The operation is launched on a directory (not a file), the file is not valid or it does not exist.
 *  UnknownError - If any other error occurs.
 * @param {FileMode} mode
 * @param {FileStreamSuccessCallback} onsuccess
 * @param {ErrorCallback} onerror
 * @param {string} encoding
 * @memberof File
 * @return {void}
 */
File2.prototype.openStream = function(mode, onsuccess, onerror, encoding) {};

/**
 * Reads the content of a file as a DOMstring.
 * If the operation is successfully executed, the onsuccess() method is invoked and a DOMstring is passed as
 * input parameter that represents the file content in the format determined by the encoding parameter.
 * The ErrorCallback is launched with these error types:
 *  InvalidValuesError - If any of the input parameters contain an invalid value.
 *  IOError - If the operation is launched on a directory (not a file), the file is not valid, or the file
 *  does not exist.
 *  UnknownError - If any other error occurs.
 * @param {FilestringSuccessCallback} onsuccess
 * @param {ErrorCallback} onerror
 * @param {string} encoding
 * @memberof File
 * @return {void}
 */
File2.prototype.readAsText = function(onsuccess, onerror, encoding) {};

/**
 * Copies (and overwrites if possible and specified) a file or a directory from a specified location
 * to another specified location.
 * The copy of the file or directory identified by the originFilePath parameter must be created in the path passed
 * in the destinationFilePath parameter.
 * The file or directory to copy must be under the Directory from which the method is invoked, otherwise
 * the operation must not be performed.
 * If the copy is performed successfully, the onsuccess() method is invoked.
 * The ErrorCallback is launched with these error types:
 *  InvalidValuesError - If any of the input parameters contain an invalid value.
 *  NotFoundError - If the originFilePath does not correspond to a valid file or destinationPath is not a valid path.
 *  IOError - If the file in which the copyTo() method is invoked is a file (and not a directory),
 *  originFilePath corresponds to a file or directory in use by another process, overwrite parameter is false
 *  and destinationFilePath corresponds to an existing file or directory.
 *  UnknownError - If any other error occurs.
 * @param {string} originFilePath
 * @param {string} destinationFilePath
 * @param {boolean} overwrite
 * @param {SuccessCallback} onsuccess
 * @param {ErrorCallback} onerror
 * @memberof File
 * @return {void}
 */
File2.prototype.copyTo = function(originFilePath, destinationFilePath, overwrite, onsuccess, onerror) {};

/**
 * Moves (and overwrites if possible and specified) a file or a directory from a specified location to another.
 * This operation is different from instantiating copyTo() and then deleting the original file, as on certain platforms,
 * this operation does not require extra disk space.
 * The file or directory identified by the originFilePath parameter is moved to the path passed
 * in the destinationFilePath parameter.
 * The file to move must be under the directory from which the method is invoked, else the operation
 * can not be performed.
 * If the file or directory is moved successfully, the onsuccess() method is invoked.
 * The ErrorCallback is launched with these error types:
 *  InvalidValuesError - If any of the input parameters contain an invalid value.
 *  NotFoundError - If originFilePath does not correspond to a valid file or destinationPath is not a valid path.
 *  IOError - If the File in which the moveTo() method is invoked is a file (not a directory),
 *  originFilePath corresponds to a file or directory in use by another process, overwrite parameter is false and
 *  destinationFilePath corresponds to an existing file or directory.
 *  UnknownError - If any other error occurs.
 * @param {string} originFilePath
 * @param {string} destinationFilePath
 * @param {boolean} overwrite
 * @param {SuccessCallback} onsuccess
 * @param {ErrorCallback} onerror
 * @memberof File
 * @return {void}
 */
File2.prototype.moveTo = function(originFilePath, destinationFilePath, overwrite, onsuccess, onerror) {};

/**
 * Creates a new directory.
 * A new directory will be created relative to the current
 * directory that this operation is performed on. The implementation will attempt to
 * create all necessary sub-directories specified in the dirPath, as well. The use of "."
 * or ".." in path components is not supported.
 * This operation can only be performed on file handlers that represent a directory (that is, isDirectory == true).
 * If the directory is successfully created, it will be returned.
 * In case the directory cannot be created, an error must be thrown with the appropriate error type.
 * @param {string} dirPath
 * @memberof File
 * @return {File}
 */
File2.prototype.createDirectory = function(dirPath) {};

/**
 * Creates a empty new file in a specified location that is relative to the directory indicated
 * by current object's attribute.
 * The use of "." or ".." in path components is not supported. This operation can only be performed on file
 * handlers that represent a directory (that is, isDirectory == true).
 * If the file is successfully created, a file handler must be returned by this method.
 * In case the file cannot be created, an error must be thrown with the appropriate error type.
 * @param {string} relativeFilePath
 * @memberof File
 * @return {File}
 */
File2.prototype.createFile2 = function(relativeFilePath) {};

/**
 * Resolves an existing file or directory relative to the current directory this operation is performed on,
 * and returns a file handle for it.
 * The filePath is not allowed to contain the "." or ".." directories.
 * The encoding of file paths is <a href="http://www.ietf.org/rfc/rfc2279.txt">UTF-8</a>.
 * @param {string} filePath
 * @memberof File
 * @return {File}
 */
File2.prototype.resolve = function(filePath) {};

/**
 * Deletes a specified directory and directory tree if specified.
 * This method attempts to asynchronously delete a directory or directory tree under the current directory.
 * If the recursive parameter is set to true, all the directories and files under the specified directory must
 * be deleted. If the recursive parameter is set to false, the directory is only deleted if it is empty, otherwise
 * an IOError error type will be passed in onerror().
 * If the deletion is performed successfully, the onsuccess() is invoked.
 * The ErrorCallback is launched with these error types:
 *  InvalidValuesError - If any of the input parameters contain an invalid value.
 *  NotFoundError -If the passed directory does not correspond to a valid directory.
 *  IOError - If the File in which the delete method is invoked is a file (and not a directory),
 *  the directory is in use by another process or the directory is not empty and recursive argument is false.
 *  This code is also used if a recursive deletion partially fails and any data deleted so far cannot be recovered.
 *  This may occur due to the lack of filesystem permissions or if any directories or files are already opened
 *  by other processes.
 *  UnknownError - If any other error occurs.
 * @param {string} directoryPath
 * @param {boolean} recursive
 * @param {SuccessCallback} onsuccess
 * @param {ErrorCallback} onerror
 * @memberof File
 * @return {void}
 */
File2.prototype.deleteDirectory = function(directoryPath, recursive, onsuccess, onerror) {};

/**
 * Deletes a specified file.This function attempts to asynchronously delete a file under the current directory.
 * If the deletion is performed successfully, the onsuccess() is invoked.
 * The ErrorCallback is launched with these error types:
 * InvalidValuesError - If any of the input parameters contain an invalid value.
 *  NotFoundError - If the file does not correspond to a valid file.
 *  IOError - If the file in which the delete() method is invoked is a file (not a directory),
 *  the file is in use by another process, or there is no permission in the file system.
 *  UnknownError - If any other error occurs.
 * @param {string} filePath
 * @param {SuccessCallback} onsuccess
 * @param {ErrorCallback} onerror
 * @memberof File
 * @return {void}
 */
File2.prototype.deleteFile2 = function(filePath, onsuccess, onerror) {};

/**
 * The storage name.
 * This attribute is used as an input for methods such as getStorage() and also used as location parameter for
 * File2.resolve() and FileSystemManager.resolve().
 * @type {string}
 */
FileSystemStorage.prototype.label;

/**
 * @enum {string}
 */
let FileSystemStorageType = {
	INTERNAL: 'INTERNAL',
	EXTERNAL: 'EXTERNAL'
};

/**
 * The storage type as internal or external.
 * @type {FileSystemStorageType}
 */
FileSystemStorage.prototype.type;

/**
 * @enum {string}
 */
let FileSystemStorageState = {
	MOUNTED: 'MOUNTED',
	REMOVED: 'REMOVED',
	UNMOUNTABLE: 'UNMOUNTABLE'
};

/**
 * The storage state as mounted or not.
 * @type {FileSystemStorageState}
 */
FileSystemStorage.prototype.state;

/**
 * This interface invokes the success callback with an array of objects as an input parameter when
 * the installed package list is retrieved.
 * It is used in tizen.package.getPackagesInfo().
 * Arguments: informationArray
 * @typedef {function(Array)}
 */
let PackageInformationArraySuccessCallback;


/**
 * This callback interface specifies methods that are invoked when a package is
 * installed(info), updated(info), or uninstalled(id).
 * @typedef {{
 *     oninstalled: function(PackageInformation),
 *     onupdated: function(PackageInformation),
 *     onuninstalled: function(string)
 * }}
 */
let PackageInformationEventCallback;

/**
 * This interface defines the general information available to an installed package.
 * @constructor
 * @return {PackageInformation}
 */
function PackageInformation() {}

/**
 * This interface defines the package manager.
 * @constructor
 * @return {PackageManager}
 */
function PackageManager() {}

/**
 * This callback interface specifies subscriptions for any notification on the
 * progress(id, progress) or completion(id) of requests.
 * @typedef {{
 *     onprogress: function(string, number),
 *     oncomplete: function(string)
 * }}
 */
let PackageProgressCallback;

/**
 * An attribute to store the identifier of a package.
 * @type {string}
 */
PackageInformation.prototype.id;

/**
 * An attribute to store the package name.
 * @type {string}
 */
PackageInformation.prototype.name;

/**
 * An attribute to store the icon path of a package.
 * @type {string}
 */
PackageInformation.prototype.iconPath;

/**
 * An attribute to store the package version.
 * @type {string}
 */
PackageInformation.prototype.version;

/**
 * An attribute to store the total installed size(package + data) of a package.
 * @type {number}
 */
PackageInformation.prototype.totalSize;

/**
 * An attribute to store the current data size of a package.
 * @type {number}
 */
PackageInformation.prototype.dataSize;

/**
 * An attribute to store the latest installed or updated time of a package.
 * @type {Date}
 */
PackageInformation.prototype.lastModified;

/**
 * An attribute to store the author of a package.
 * @type {string}
 */
PackageInformation.prototype.author;

/**
 * An attribute to store the package description.
 * @type {string}
 */
PackageInformation.prototype.description;

/**
 * An attribute to store the application ID list of a package.
 * @type {Array}
 */
PackageInformation.prototype.appIds;

/**
 * Installs a package with a specified package path on a device.
 * This API provides a way to notify the progress and completion of an installation request
 * through PackageProgressCallback.
 * The ErrorCallback() is launched with these error types:
 *  NotFoundError - If the package is not found in the specified path.
 *  UnknownError - If it is not allowed to install the package by platform or any other platform error occurs.
 * @param {string} path
 * @param {PackageProgressCallback} progressCallback
 * @param {ErrorCallback} errorCallback
 * @memberof PackageManager
 * @return {void}
 */
PackageManager.prototype.install = function(path, progressCallback, errorCallback) {};

/**
 * Uninstalls the package with a specified package ID.
 * This API provides a way to notify about the progress and completion of an uninstallation request
 * through PackageProgressCallback.
 * The ErrorCallback() is launched with these error types:
 *  NotFoundError - If the package is not found with specified ID.
 *  UnknownError - If it is not allowed to uninstall the package from the platform or any other platform error occurs.
 * @param {string} id
 * @param {PackageProgressCallback} progressCallback
 * @param {ErrorCallback} errorCallback
 * @memberof PackageManager
 * @return {void}
 */
PackageManager.prototype.uninstall = function(id, progressCallback, errorCallback) {};

/**
 * Gets information of the installed packages.
 * The result contains the snapshots of the installed packages information.
 * The errorCallback() is launched with this error type:
 *  UnknownError - If any other platform error occurs.
 * @param {PackageInformationArraySuccessCallback} successCallback
 * @param {ErrorCallback} errorCallback
 * @memberof PackageManager
 * @return {void}
 */
PackageManager.prototype.getPackagesInfo = function(successCallback, errorCallback) {};

/**
 * Gets information of an installed package.
 * If the ID is set to null or not set at all, it returns package information of the current application.
 * The list of installed packages and their package IDs is obtained using getPackagesInfo().
 * @param {string} id
 * @memberof PackageManager
 * @return {PackageInformation}
 */
PackageManager.prototype.getPackageInfo = function(id) {};

/**
 * Sets a listener to receive notifications for any changes made to the list of installed packages.
 * This method sets a PackageInformationEventCallback type callback that is triggered when a package is installed,
 * removed or updated.
 * The callback lasts until unsetPackageInfoEventListener() method is called.
 * @param {PackageInformationEventCallback} eventCallback
 * @memberof PackageManager
 * @return {void}
 */
PackageManager.prototype.setPackageInfoEventListener = function(eventCallback) {};

/**
 * Unsets the listener to stop receiving package notifications.
 * @memberof PackageManager
 * @return {void}
 */
PackageManager.prototype.unsetPackageInfoEventListener = function() {};

/**
 * This property reflects the information of the device orientation in this system.
 * @constructor
 * @return {SystemInfoDeviceOrientation}
 */
function SystemInfoDeviceOrientation() {}

/**
 * This property reflects the locale information of the current device.
 * @constructor
 * @return {SystemInfoLocale}
 */
function SystemInfoLocale() {}

/**
 * This property reflects the video sources the device has.
 * @constructor
 * @return {SystemInfoVideoSource}
 */
function SystemInfoVideoSource() {}

/**
 * This property reflects the information of the current device.
 * @constructor
 * @return {SystemInfoBuild}
 */
function SystemInfoBuild() {}

/**
 * This property reflects the state of the CPUs available to this system.
 * @constructor
 * @return {SystemInfoCpu}
 */
function SystemInfoCpu() {}

/**
 * This property exposes the data storage devices connected to this system.
 * @constructor
 * @return {SystemInfoStorage}
 */
function SystemInfoStorage() {}

/**
 * SystemInfoDeviceCapability object.
 * @constructor
 * @return {SystemInfoDeviceCapability}
 */
function SystemInfoDeviceCapability() {}

/**
 * This property reflects the general state of the system's battery
 * @constructor
 * @return {SystemInfoBattery}
 */
function SystemInfoBattery() {}

/**
 * This property reflects the information of the Wi-Fi network in this system.
 * @constructor
 * @return {SystemInfoWifiNetwork}
 */
function SystemInfoWifiNetwork() {}

/**
 * This property reflects the peripheral information of the current device.
 * @constructor
 * @return {SystemInfoPeripheral}
 */
function SystemInfoPeripheral() {}

/**
 * Systemfinfo specific success callback.
 * This callback interface specifies a success callback with SystemInfoProperty as input argument.
 * It is used in asynchronous operations, such as getPropertyValue() or addPropertyValueChangeListener()
 * Arguments: prop
 * @typedef {function(SystemInfoProperty)}
 */
let SystemInfoPropertySuccessCallback;

/**
 * This property reflects the information of the Display.
 * @constructor
 * @return {SystemInfoDisplay}
 */
function SystemInfoDisplay() {}

/**
 * This entry interface queries the information of a system.
 * This API offers methods for retrieving system information
 * and for subscribing notifications of system information changes.
 * @constructor
 * @return {SystemInfo}
 */
function SystemInfo() {}

/**
 * This property reflects the information of the SIM card information.
 * @constructor
 * @return {SystemInfoSIM}
 */
function SystemInfoSIM() {}

/**
 * This is a common abstract interface used by different types of system information objects.
 * @constructor
 * @return {SystemInfoProperty}
 */
function SystemInfoProperty() {}

/**
 * This property reflects the information of the Cellular network in this system.
 * @constructor
 * @return {SystemInfoCellularNetwork}
 */
function SystemInfoCellularNetwork() {}

/**
 * This property reflects the information of the data network in this system.
 * @constructor
 * @return {SystemInfoNetwork}
 */
function SystemInfoNetwork() {}

/**
 * This property reflects each input source the current device has.
 * If there are 2 HDMI inputs on a device, Two SystemInfoVideoSourceInfo objects must be retreived
 * through SystemInfoVideoSource{type=HDMI, number=1}, {type=HDMI, number=2}
 * @constructor
 * @return {SystemInfoVideoSourceInfo}
 */
function SystemInfoVideoSourceInfo() {}

/**
 * This property exposes a single storage device connected to this system.
 * @constructor
 * @return {SystemInfoStorageUnit}
 */
function SystemInfoStorageUnit() {}

/**
 * @enum {string}
 */
let SystemInfoDeviceOrientationStatus = {
	PORTRAIT_PRIMARY: 'PORTRAIT_PRIMARY',
	PORTRAIT_SECONDARY: 'PORTRAIT_SECONDARY',
	LANDSCAPE_PRIMARY: 'LANDSCAPE_PRIMARY',
	LANDSCAPE_SECONDARY: 'LANDSCAPE_SECONDARY'
};

/**
 * Represents the status of the current device orientation.
 * @type {SystemInfoDeviceOrientationStatus}
 */
SystemInfoDeviceOrientation.prototype.status;

/**
 * Whether the device is in autorotation.
 * @type {boolean}
 */
SystemInfoDeviceOrientation.prototype.isAutoRotation;

/**
 * Indicates the current language setting in the (LANGUAGE)_(REGION) syntax. The language setting is in the ISO 630-2
 * format and the region setting is in the ISO 3166-1 format. The language setting is case-sensitive.
 * @type {string}
 */
SystemInfoLocale.prototype.language;

/**
 * Indicates the current country setting in the (LANGUAGE)_(REGION) syntax. The language setting is in the ISO 630-2
 * format and the region setting is in the ISO 3166-1 format. The country setting is case-sensitive.
 * @type {string}
 */
SystemInfoLocale.prototype.country;

/**
 * Represents a list of video sources that a device is connected with.
 * @type {Array}
 */
SystemInfoVideoSource.prototype.connected;

/**
 * Represents a list of video sources that a device is not connected with.
 * @type {Array}
 */
SystemInfoVideoSource.prototype.disconnected;

/**
 * Represents the model name of the current device.
 * @type {string}
 */
SystemInfoBuild.prototype.model;

/**
 * Represents the manufacturer of the device.
 * @type {string}
 */
SystemInfoBuild.prototype.manufacturer;

/**
 * Represents the build version information of the device.
 * @type {string}
 */
SystemInfoBuild.prototype.buildVersion;

/**
 * An attribute to indicate the current CPU load, as a number between and , representing the minimum and maximum
 * values allowed on this system. Any threshold parameter used in a watch function to monitor this property applies
 * to this attribute.
 * @type {number}
 */
SystemInfoCpu.prototype.load;

/**
 * The array of storage units connected to this device.
 * @type {Array}
 */
SystemInfoStorage.prototype.units;

/**
 * Indicates whether the device supports Bluetooth.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.bluetooth;

/**
 * Indicates whether the device supports NFC.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.nfc;

/**
 * Indicates whether the device supports NFC reserved push.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.nfcReservedPush;

/**
 * The number of point in Multi-point touch.
 * @type {number}
 */
SystemInfoDeviceCapability.prototype.multiTouchCount;

/**
 * Indicates whether the device supports the built-in Keyboard.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.inputKeyboard;

/**
 * Indicates whether the device supports the built-in keyboard layout.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.inputKeyboardLayout;

/**
 * Indicates whether the device supports Wi-Fi.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.wifi;

/**
 * Indicates whether the device supports Wi-Fi direct.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.wifiDirect;

/**
 * Indicates whether the device supports OpenGL-ES.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.opengles;

/**
 * The device 3DC texture format for OpenGL-ES. One example of possible output is as follows:
 * "3dc/atc/etc/ptc/pvrtc/utc"
 * @type {string}
 */
SystemInfoDeviceCapability.prototype.openglestextureFormat;

/**
 * Indicates whether the device supports OpenGL-ES version 1.1.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.openglesVersion1_1;

/**
 * Indicates whether the device supports OpenGL-ES version 2.0.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.openglesVersion2_0;

/**
 * Indicates whether the device supports FM radio.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.fmRadio;

/**
 * The version of the platform in the format. For example, represents a platform version where the major version
 * is and the minor and build versions are .
 * @type {string}
 */
SystemInfoDeviceCapability.prototype.platformVersion;

/**
 * The version of the Web API in the format. For example, represents a web api version where the major version
 * is and the minor version is .
 * @type {string}
 */
SystemInfoDeviceCapability.prototype.webApiVersion;

/**
 * The version of the native API in the format.
 * For example, 1.0 represents a native api version where the major version is 1 and the minor version is 0.
 * @type {string}
 */
SystemInfoDeviceCapability.prototype.nativeApiVersion;

/**
 * The name of the platform.
 * @type {string}
 */
SystemInfoDeviceCapability.prototype.platformName;

/**
 * Indicates whether the device supports camera.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.camera;

/**
 * Indicates whether the device supports front camera.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.cameraFront;

/**
 * Indicates whether the device supports flash on the front camera.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.cameraFrontFlash;

/**
 * Indicates whether the device supports back-side camera.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.cameraBack;

/**
 * Indicates whether the device supports flash on the back-side camera.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.cameraBackFlash;

/**
 * Indicates whether the device supports GPS or not.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.location;

/**
 * Indicates whether the device supports GPS based location feature.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.locationGps;

/**
 * Indicates whether the device supports WPS based location feature.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.locationWps;

/**
 * Indicates whether the device supports microphone.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.microphone;

/**
 * Indicates whether the device supports USB host.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.usbHost;

/**
 * Indicates whether the device supports USB accessory.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.usbAccessory;

/**
 * Indicates whether the device supports RCA output.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.screenOutputRca;

/**
 * Indicates whether the device supports HDMI output.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.screenOutputHdmi;

/**
 * The device CPU architecture. The possible values for this attribute are: armv6, armv7, x86.
 * @type {string}
 */
SystemInfoDeviceCapability.prototype.platformCoreCpuArch;

/**
 * The device FPU architecture. The possible values for this attribute are: vfpv3 / sse2 / sse3 / ssse3.
 * @type {string}
 */
SystemInfoDeviceCapability.prototype.platformCoreFpuArch;

/**
 * Indicates whether the device supports VOIP.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.sipVoip;

/**
 * The device unique ID.
 * @type {string}
 */
SystemInfoDeviceCapability.prototype.duid;

/**
 * Indicates whether the device supports speech recognition.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.speechRecognition;

/**
 * Indicates whether the device supports speech synthesis.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.speechSynthesis;

/**
 * Indicates whether the device supports Accelerometer sensor.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.accelerometer;

/**
 * Indicates whether the device supports Accelerometer sensor wake-up feature.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.accelerometerWakeup;

/**
 * Indicates whether the device supports Barometer sensor.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.barometer;

/**
 * Indicates whether the device supports Barometer sensor wake-up feature.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.barometerWakeup;

/**
 * Indicates whether the device supports Gyroscope sensor.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.gyroscope;

/**
 * Indicates whether the device supports Gyroscope sensor wake-up feature.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.gyroscopeWakeup;

/**
 * Indicates whether the device supports Magnetometer sensor.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.magnetometer;

/**
 * Indicates whether the device supports Magnetometer sensor wake-up feature.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.magnetometerWakeup;

/**
 * Indicates whether the device supports Photometer sensor.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.photometer;

/**
 * Indicates whether the device supports Photometer sensor wake-up feature.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.photometerWakeup;

/**
 * Indicates whether the device supports Proximity sensor.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.proximity;

/**
 * Indicates whether the device supports Proximity sensor wake-up feature.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.proximityWakeup;

/**
 * Indicates whether the device supports Tiltmeter sensor.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.tiltmeter;

/**
 * Indicates whether the device supports Tiltmeter sensor wake-up feature.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.tiltmeterWakeup;

/**
 * Indicates whether the device supports data encryption.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.dataEncryption;

/**
 * Indicates whether the device supports hardware acceleration for 2D/3D graphics.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.graphicsAcceleration;

/**
 * Indicates whether the device supports push service.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.push;

/**
 * Indicates whether the device supports the telephony feature.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.telephony;

/**
 * Indicates whether the device supports the mms feature.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.telephonyMms;

/**
 * Indicates whether the device supports the sms feature.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.telephonySms;

/**
 * Indicates whether the device supports the screen normal size.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.screenSizeNormal;

/**
 * Indicates whether the device supports the 480 * 800 screen size.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.screenSize480_800;

/**
 * Indicates whether the device supports the 720 * 1280 screen size.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.screenSize720_1280;

/**
 * Indicates whether the device supports auto rotation.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.autoRotation;

/**
 * Indicates whether the device supports shell app widget(dynamic box).
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.shellAppWidget;

/**
 * Indicates whether the device supports vision image recognition.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.visionImageRecognition;

/**
 * Indicates whether the device supports vision qrcode generation.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.visionQrcodeGeneration;

/**
 * Indicates whether the device supports vision qrcode recognition.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.visionQrcodeRecognition;

/**
 * Indicates whether the device supports vision face recognition.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.visionFaceRecognition;

/**
 * Indicates whether the device supports secure element.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.secureElement;

/**
 * Indicates whether the device supports native osp API.
 * @type {boolean}
 */
SystemInfoDeviceCapability.prototype.nativeOspCompatible;

/**
 * @enum {string}
 */
let SystemInfoProfile = {
	MOBILE_FULL: 'MOBILE_FULL',
	MOBILE_WEB: 'MOBILE_WEB'
};

/**
 * Represents the profile of the current device.
 * @type {SystemInfoProfile}
 */
SystemInfoDeviceCapability.prototype.profile;

/**
 * An attribute to specify the remaining level of an internal battery, scaled from to:
 * indicates that the battery level is the lowest and the system is about to enter shutdown mode.
 * indicates that the system's charge is maximum.
 * Any threshold parameter used in a watch operation to monitor this property applies to this attribute.
 * @type {number}
 */
SystemInfoBattery.prototype.level;

/**
 * Indicates whether the battery source is currently charging.
 * @type {boolean}
 */
SystemInfoBattery.prototype.isCharging;

/**
 * Represents the status (ON or OFF) of the Wi-Fi interface.
 * @type {string}
 */
SystemInfoWifiNetwork.prototype.status;

/**
 * Represents the SSID of a Wi-Fi network.
 * @type {string}
 */
SystemInfoWifiNetwork.prototype.ssid;

/**
 * Represents the IPv4 address of Wi-Fi network.
 * @type {string}
 */
SystemInfoWifiNetwork.prototype.ipAddress;

/**
 * Represents the IPv6 address of Wi-Fi network.
 * @type {string}
 */
SystemInfoWifiNetwork.prototype.ipv6Address;

/**
 * This connection's signal strength, as a normalized value between 0 (no signal detected)
 * and 1 (the level is at its maximum value).
 * @type {number}
 */
SystemInfoWifiNetwork.prototype.signalStrength;

/**
 * Represents the video out status.
 * @type {boolean}
 */
SystemInfoPeripheral.prototype.isVideoOutputOn;

/**
 * The total number of addressable pixels in the horizontal direction of a rectangular entity
 * (such as Camera, Display, Image, Video, ...) when held in its default orientation.
 * @type {number}
 */
SystemInfoDisplay.prototype.resolutionWidth;

/**
 * The total number of addressable pixels in the vertical direction of a rectangular element
 * (such as Camera, Display, Image, Video, ...) when held in its default orientation.
 * @type {number}
 */
SystemInfoDisplay.prototype.resolutionHeight;

/**
 * Resolution of this device, along its width, in dots per inch.
 * @type {number}
 */
SystemInfoDisplay.prototype.dotsPerInchWidth;

/**
 * Resolution of this device, along its height, in dots per inch.
 * @type {number}
 */
SystemInfoDisplay.prototype.dotsPerInchHeight;

/**
 * The display's physical width in millimeters.
 * @type {number}
 */
SystemInfoDisplay.prototype.physicalWidth;

/**
 * The display's physical height in millimeters.
 * @type {number}
 */
SystemInfoDisplay.prototype.physicalHeight;

/**
 * The current brightness of a display ranging between to .
 * @type {number}
 */
SystemInfoDisplay.prototype.brightness;

/**
 * Gets the capabilities of the device.
 * The function must synchronously acquire the capabilities of the device.
 * @memberof SystemInfo
 * @return {SystemInfoDeviceCapability}
 */
SystemInfo.prototype.getCapabilities = function() {};

/**
 * Gets the specific feature key related device capability.
 * Here are the possible keys.
 * 1. The keys for getting the device capabilities to indicates whether optional APIs are supported or not
 *      "http://tizen.org/feature/bookmark"</a> boolean
 * Indicates whether the device supports Bookmark API.
 *      "http://tizen.org/feature/calendar" boolean
 * Indicates whether the device supports Calendar API.
 *      "http://tizen.org/feature/contact" boolean
 * Indicates whether the device supports Contact API.
 *      "http://tizen.org/feature/content"</a> boolean
 * Indicates whether the device supports Content API.
 *      "http://tizen.org/feature/datasync" boolean
 * Indicates whether the device supports Synchronization API.
 *      "http://tizen.org/feature/download" boolean
 * Indicates whether the device supports Download API.
 *      "http://tizen.org/feature/messaging" boolean
 * Indicates whether the device supports Messaging Email API.
 *      "http://tizen.org/feature/network.bluetooth" boolean
 * Indicates whether the device supports Bluetooth API.
 *      "http://tizen.org/feature/network.bluetooth.health" boolean
 * Indicates whether the device supports Bluetooth Health Profile related API.
 *      "http://tizen.org/feature/network.nfc" boolean
 * Indicates whether the device supports NFC API.
 *      "http://tizen.org/feature/network.push" boolean
 * Indicates whether the device supports Push API.
 *      "http://tizen.org/feature/network.secure_element" boolean
 * Indicates whether the device supports Secure Element API.
 *      "http://tizen.org/feature/network.telephony" boolean
 * Indicates whether the device supports telephony feature.
 * If supported, Messaging SMS, Call History APIs must be supported.
 *      "http://tizen.org/feature/network.telephony.sms.cbs" boolean
 * Indicates whether the device supports the cell broadcast service (CBS) for SMS.
 *      "http://tizen.org/feature/network.telephony.mms" boolean
 * Indicates whether the device supports the MMS feature. If supported, MMS related Messaging API must be supported.
 *      "http://tizen.org/feature/notification" boolean
 * Indicates whether the device supports Notification API.
 *      "http://tizen.org/feature/power" boolean
 * Indicates whether the device supports Power API.
 *      "http://tizen.org/feature/systemsetting" boolean
 * Indicates whether the device supports System Setting API.
 *      "http://tizen.org/feature/tv" boolean
 * Indicates whether the device supports TV API.
 *      "http://tizen.org/feature/tv.audio_control" boolean
 * Indicates whether the device supports Audio Control API.
 *      "http://tizen.org/feature/tv.display_control"</a> boolean
 * Indicates whether the device supports Display Control API.
 *      "http://tizen.org/feature/tv.channel" boolean
 * Indicates whether the device supports TV Channel API.
 *      "http://tizen.org/feature/tv.window" boolean
 * Indicates whether the device supports TV Window API.
 *      "http://tizen.org/feature/websetting" boolean
 * Indicates whether the device supports WebSetting API.
 *      "http://tizen.org/feature/platform.native.api" boolean
 * Indicates whether the device supports Tizen Native API.
 *
 * 2. The keys for getting the sensor related capabilities
 *      "http://tizen.org/feature/sensor.accelerometer" boolean
 * Indicates whether the device supports accelerometer sensor.
 *      "http://tizen.org/feature/sensor.accelerometer.wakeup" boolean
 * Indicates whether the device supports accelerometer sensor wake-up feature.
 *      "http://tizen.org/feature/sensor.barometer" boolean
 * Indicates whether the device supports barometer sensor.
 *      "http://tizen.org/feature/sensor.barometer.wakeup" boolean
 * Indicates whether the device supports barometer sensor wake-up feature.
 *      "http://tizen.org/feature/sensor.gyroscope" boolean
 * Indicates whether the device supports gyroscope sensor.
 *      "http://tizen.org/feature/sensor.gyroscope.wakeup" boolean
 * Indicates whether the device supports gyroscope sensor wake-up feature.
 *      "http://tizen.org/feature/sensor.magnetometer" boolean
 * Indicates whether the device supports magnetometer sensor.
 *      "http://tizen.org/feature/sensor.magnetometer.wakeup" boolean
 * Indicates whether the device supports magnetometer sensor wake-up feature.
 *      "http://tizen.org/feature/sensor.photometer"</a> boolean
 * Indicates whether the device supports photometer sensor.
 *      "http://tizen.org/feature/sensor.photometer.wakeup"</a> boolean
 * Indicates whether the device supports photometer sensor wake-up feature.
 *      "http://tizen.org/feature/sensor.proximity" boolean
 * Indicates whether the device supports proximity sensor.
 *      "http://tizen.org/feature/sensor.proximity.wakeup"</a> boolean
 * Indicates whether the device supports proximity sensor wake-up feature.
 *      "http://tizen.org/feature/sensor.tiltmeter" boolean
 * Indicates whether the device supports tiltmeter sensor.
 *      "http://tizen.org/feature/sensor.tiltmeter.wakeup" boolean
 * Indicates whether the device supports tiltmeter sensor wake-up feature.
 *
 * 3. The keys for getting the screen-size related capabilities
 *      "http://tizen.org/feature/screen.height"</a> unsigned long
 * Indicates the height of the display screen in pixels.
 *      "http://tizen.org/feature/screen.size.large" boolean
 * Indicates whether the device provides the large size (TBD: size info ? ~ ?) of the display screen.
 *      "http://tizen.org/feature/screen.size.normal" boolean
 * Indicates whether the device provides the normal size (TBD: size info ? ~ ?) of the display screen.
 *      "http://tizen.org/feature/screen.size.normal.320.320" boolean
 * Indicates whether the device supports the 320 * 320 display screen size.
 *      "http://tizen.org/feature/screen.size.normal.480.800" boolean
 * Indicates whether the device supports the 480 * 800 display screen size.
 *      "http://tizen.org/feature/screen.size.normal.720.1280" boolean
 * Indicates whether the device supports the 720 * 1280 display screen size.
 *      "http://tizen.org/feature/screen.size.normal.1080.1920" boolean
 * Indicates whether the device supports the 1080 * 1920 display screen size.
 *      "http://tizen.org/feature/screen.size.small" boolean
 * Indicates whether the device provides the small size (TBD: size info ? ~ ?) of the display screen.
 *      "http://tizen.org/feature/screen.width" unsigned long
 * Indicates the width of the display screen in pixels.
 *
 * 4. The keys for getting optional HW feature related device capabilities
 *      "http://tizen.org/feature/camera" boolean
 * Indicates whether the device supports camera.
 *      "http://tizen.org/feature/camera" boolean
 * Indicates whether the device supports camera.
 *      "http://tizen.org/feature/camera.front" boolean
 * Indicates whether the device supports front camera.
 *      "http://tizen.org/feature/camera.front.flash" boolean
 * Indicates whether the device supports flash on the front camera
 *      "http://tizen.org/feature/camera.back" boolean
 * Indicates whether the device supports back camera.
 *      "http://tizen.org/feature/camera.back.flash" boolean
 * Indicates whether the device supports flash on the back camera
 *      "http://tizen.org/feature/fmradio" boolean
 * Indicates whether the device supports FM radio.
 *      "http://tizen.org/feature/graphics.acceleration" boolean
 * Indicates whether the device supports hardware acceleration for 2D/3D graphics.
 *      "http://tizen.org/feature/input.keyboard" boolean
 * Indicates whether the device supports the built-in Keyboard.
 *      "http://tizen.org/feature/input.keyboard.layout" DOMstring
 * Indicates the keyboard layout (such as "qwerty") supported by the built-in keyboard.
 *      "http://tizen.org/feature/location" boolean
 * Indicates whether the device supports location feature.
 *      "http://tizen.org/feature/location.gps" boolean
 * Indicates whether the device supports GPS based location feature.
 *      "http://tizen.org/feature/location.wps" boolean
 * Indicates whether the device supports WPS based location feature.
 *      "http://tizen.org/feature/microphone" boolean
 * Indicates whether the device supports microphone.
 *      "http://tizen.org/feature/multi_point_touch.point_count" unsigned short
 * Indicates the number of point in Multi-point touch. If a device does not support a touch screen, it returns 0.
 *      "http://tizen.org/feature/network.nfc.reserved_push" boolean
 * Indicates whether the device supports NFC reserved push.
 *      "http://tizen.org/feature/network.wifi" boolean
 * Indicates whether the device supports Wi-Fi.
 *      "http://tizen.org/feature/network.wifi.direct" boolean
 * Indicates whether the device supports  Wi-Fi direct.
 *      "http://tizen.org/feature/screen.auto_rotation" boolean
 * Indicates whether the device supports auto rotation.
 *      "http://tizen.org/feature/screen.output.hdmi" boolean
 * Indicates whether the device supports HDMI output.
 *      "http://tizen.org/feature/screen.output.rca" boolean
 * Indicates whether the device supports RCA output.
 *      "http://tizen.org/feature/screen.touch" boolean
 * Indicates whether the device supports a touch screen. If supported, Touch Events API must be supported.
 *      "http://tizen.org/feature/usb.accessory" boolean
 * Indicates whether the device supports USB accessory.
 *      "http://tizen.org/feature/usb.host" boolean
 * Indicates whether the device supports USB host.
 *
 * 5. The keys for getting optional SW feature related device capabilities
 *      "http://tizen.org/feature/database.encryption" boolean
 * Indicates whether the device supports the database encryption.
 *      "http://tizen.org/feature/platform.native.osp_compatible" boolean
 * Indicates whether the device supports the Tizen native osp API.
 *      "http://tizen.org/feature/opengles.texture_format" DOMstring
 * Indicates the texture format for the OpenGL-ES. (e.g. "3dc/atc/etc/ptc")
 *      "http://tizen.org/feature/opengles.texture_format.3dc" boolean
 * Indicates the device supports the 3DC texture format for OpenGL-ES.
 *      "http://tizen.org/feature/opengles.texture_format.atc" boolean
 * Indicates the device supports the ATC texture format for OpenGL-ES.
 *      "http://tizen.org/feature/opengles.texture_format.etc" boolean
 * Indicates the device supports the ETC texture format for OpenGL-ES.
 *      "http://tizen.org/feature/opengles.texture_format.ptc" boolean
 * Indicates the device supports the PTC texture format for OpenGL-ES.
 *      "http://tizen.org/feature/opengles.texture_format.pvrtc" boolean
 * Indicates the device supports the PVRTC texture format for OpenGL-ES.
 *      "http://tizen.org/feature/opengles.texture_format.utc" boolean
 * Indicates the device supports the UTC texture format for OpenGL-ES.
 *      "http://tizen.org/feature/opengles" boolean
 * Indicates whether the device supports the OpenGL-ES.)
 *      "http://tizen.org/feature/opengles.version.1_1" boolean
 * Indicates whether the device supports OpenGL-ES version 1.1.
 *      "http://tizen.org/feature/opengles.version.2_0" boolean
 * Indicates whether the device supports OpenGL-ES version 2.0.
 *      "http://tizen.org/feature/shell.appwidget" boolean
 * Indicates whether the device supports Web dynamic box (shell app widget).
 *      "http://tizen.org/feature/sip.voip" boolean
 * Indicates whether the device supports Voice Over Internet Protocol (VOIP) feature.
 *      "http://tizen.org/feature/speech.recognition" boolean
 * Indicates whether the device supports speech recognition.
 *      "http://tizen.org/feature/speech.synthesis" boolean
 * Indicates whether the device supports speech synthesis.
 *      "http://tizen.org/feature/vision.face_recognition" boolean
 * Indicates whether the device supports vision face recognition.
 *      "http://tizen.org/feature/vision.image_recognition" boolean
 * Indicates whether the device supports vision image recognition.
 *      "http://tizen.org/feature/vision.qrcode_generation" boolean
 * Indicates whether the device supports vision qrcode recognition.
 *      "http://tizen.org/feature/vision.qrcode_recognition" boolean
 * Indicates whether the device supports vision qrcode recognition.
 *
 * 6. The keys for getting system information
 *      "http://tizen.org/feature/platform.core.cpu.arch" DOMstring
 * Indicates the CPU architecture(e.g. "armv7", "x86") of a device.
 *      "http://tizen.org/feature/platform.core.cpu.arch.armv6" boolean
 * Indicates the device supports the ARMv6 CPU architecture.
 *      "http://tizen.org/feature/platform.core.cpu.arch.armv7" boolean
 * Indicates the device supports the ARMv7 CPU architecture.
 *      "http://tizen.org/feature/platform.core.cpu.arch.x86" boolean
 * Indicates the device supports the x86 CPU architecture.
 *      "http://tizen.org/feature/platform.core.fpu.arch" DOMstring
 * Indicates the FPU architecture(e.g. "vfpv3", "ssse3" of a device.)
 *      "http://tizen.org/feature/platform.core.fpu.arch.sse2" boolean
 * Indicates the device supports the SSE2 FPU architecture.
 *      "http://tizen.org/feature/platform.core.fpu.arch.sse3" boolean
 * Indicates the device supports the SSE3 FPU architecture.
 *      "http://tizen.org/feature/platform.core.fpu.arch.ssse3" boolean
 * Indicates the device supports the SSSE3 FPU architecture.
 *      "http://tizen.org/feature/platform.core.fpu.arch.vfpv2" boolean
 * Indicates the device supports the VFPV2 FPU architecture.
 *      "http://tizen.org/feature/platform.core.fpu.arch.vfpv3" boolean
 * Indicates the device supports the VFPv3 FPU architecture.
 *      "http://tizen.org/feature/platform.name" DOMstring
 * Indicates the name of the platform. It returns ("Tizen").
 *      "http://tizen.org/feature/profile" SystemInfoProfile
 * Indicates the profile of the device.
 *      "http://tizen.org/system/duid" DOMstring
 * Indicates the unique identification(ID) of the device.
 * @param {string} key
 * @memberof SystemInfo
 * @return {*}
 */
SystemInfo.prototype.getCapability = function(key) {};

/**
 * Gets the version of the platform.
 * @memberof SystemInfo
 * @return {string}
 */
SystemInfo.prototype.getPlatformVersion = function() {};

/**
 * Gets the version of the Tizen Web API.
 * @memberof SystemInfo
 * @return {string}
 */
SystemInfo.prototype.getWebApiVersion = function() {};

/**
 * Gets the version of the Tizen Native API.
 * @memberof SystemInfo
 * @return {string}
 */
SystemInfo.prototype.getNativeApiVersion = function() {};

/**
 * Gets the current value of a specified system property.
 * The function must asynchronously acquire the current value of the requested property. If it is successful,
 * the successCallback must be invoked with an object containing the information provided by the property.
 * The errorCallback() can be launched with any of these error types:
 *  UnknownError - If any other error occurs.
 * @param {SystemInfoPropertyId} property
 * @param {SystemInfoPropertySuccessCallback} successCallback
 * @param {ErrorCallback} errorCallback
 * @memberof SystemInfo
 * @return {void}
 */
SystemInfo.prototype.getPropertyValue = function(property, successCallback, errorCallback) {};

/**
 * @typedef {{
 *     timeout: number,
 *     highThreshold: number,
 *     lowThreshold: number
 * }}
 */
let SystemInfoOptions;


/**
 * @enum {string}
 */
let SystemInfoPropertyId = {
	BATTERY: 'BATTERY',
	CPU: 'CPU',
	STORAGE: 'STORAGE',
	DISPLAY: 'DISPLAY',
	DEVICE_ORIENTATION: 'DEVICE_ORIENTATION',
	BUILD: 'BUILD',
	LOCALE: 'LOCALE',
	NETWORK: 'NETWORK',
	WIFI_NETWORK: 'WIFI_NETWORK',
	ETHERNET_NETWORK: 'ETHERNET_NETWORK',
	CELLULAR_NETWORK: 'CELLULAR_NETWORK',
	NET_PROXY_NETWORK: 'NET_PROXY_NETWORK',
	SIM: 'SIM',
	PERIPHERAL: 'PERIPHERAL',
	MEMORY: 'MEMORY',
	VIDEOSOURCE: 'VIDEOSOURCE',
	CAMERA_FLASH: 'CAMERA_FLASH',
	ADS: 'ADS'
};

/**
 * Adds a listener to allow tracking of changes in one or more system properties.
 * When called, it immediately returns and then asynchronously starts a watch process defined by the following steps:
 * 1. Register the successCallback to receive system events that the status of the requested properties
 *    may have changed.
 * 2. When a system event is successfully received invoke the associated successCallback with an object
 *    containing the property values.
 * 3. Repeat step 2 until removePropertyValueChangeListener function is called.
 * If property value is 'BUILD', listener would not be registered because 'BUILD' property's value is a fixed value.
 * @param {SystemInfoPropertyId} property
 * @param {SystemInfoPropertySuccessCallback} successCallback
 * @param {SystemInfoOptions} options
 * @memberof SystemInfo
 * @return {number}
 */
SystemInfo.prototype.addPropertyValueChangeListener = function(property, successCallback, options) {};

/**
 * Unsubscribes notifications for property changes set up by addPropertyValueChangeListener.
 * If a valid listenerId argument is passed that corresponds to a subscription
 * already place, then the watch process MUST immediately terminate and no further
 * callback is invoked. If the listenerId argument does not correspond to a valid subscription,
 * the method should return without any further action.
 * @param {number} listenerId
 * @memberof SystemInfo
 * @return {void}
 */
SystemInfo.prototype.removePropertyValueChangeListener = function(listenerId) {};

/**
 * @enum {string}
 */
let SystemInfoSimState = {
	ABSENT: 'ABSENT',
	INITIALIZING: 'INITIALIZING',
	READY: 'READY',
	PIN_REQUIRED: 'PIN_REQUIRED',
	PUK_REQUIRED: 'PUK_REQUIRED',
	NETWORK_LOCKED: 'NETWORK_LOCKED',
	SIM_LOCKED: 'SIM_LOCKED',
	UNKNOWN: 'UNKNOWN'
};

/**
 * Represents the SIM card state.
 * @type {SystemInfoSimState}
 */
SystemInfoSIM.prototype.state;

/**
 * Represents the Operator Name string (ONS) of Common PCN Handset Specification (CPHS) in SIM card.
 * @type {string}
 */
SystemInfoSIM.prototype.operatorName;

/**
 * Represents the SIM card subscriber number.
 * @type {string}
 */
SystemInfoSIM.prototype.msisdn;

/**
 * Represents the Integrated Circuit Card ID.
 * @type {string}
 */
SystemInfoSIM.prototype.iccid;

/**
 * Represents the Mobile Country Code (MCC) of SIM provider.
 * @type {number}
 */
SystemInfoSIM.prototype.mcc;

/**
 * Represents the Mobile Network Code (MNC) of SIM provider.
 * @type {number}
 */
SystemInfoSIM.prototype.mnc;

/**
 * Represents the Mobile Subscription Identification number (MSIN) of SIM provider.
 * @type {string}
 */
SystemInfoSIM.prototype.msin;

/**
 * Represents the Service Provider Name (SPN) of SIM card.
 * @type {string}
 */
SystemInfoSIM.prototype.spn;

/**
 * Represents the status (ON or OFF) of the cellular network.
 * @type {string}
 */
SystemInfoCellularNetwork.prototype.status;

/**
 * Represents an Access Point Name of the cellular network.
 * @type {string}
 */
SystemInfoCellularNetwork.prototype.apn;

/**
 * Represents the IPv4 address of the cellular network.
 * @type {string}
 */
SystemInfoCellularNetwork.prototype.ipAddress;

/**
 * Represents the IPv6 address of the cellular network.
 * @type {string}
 */
SystemInfoCellularNetwork.prototype.ipv6Address;

/**
 * Represents Mobile Country Code (MCC) of the cellular network.
 * @type {number}
 */
SystemInfoCellularNetwork.prototype.mcc;

/**
 * Represents Mobile Network Code (MNC) of the cellular network. MNC is used in combination with MCC
 * (also known as a "MCC / MNC tuple") to uniquely identify a mobile phone operator/carrier using the GSM, CDMA,
 * iDEN, TETRA and UMTS public land mobile networks and some satellite mobile networks.
 * @type {number}
 */
SystemInfoCellularNetwork.prototype.mnc;

/**
 * Represents Cell Id.
 * @type {number}
 */
SystemInfoCellularNetwork.prototype.cellId;

/**
 * Represents Location Area Code.
 * @type {number}
 */
SystemInfoCellularNetwork.prototype.lac;

/**
 * Whether the connection is set up while the device is roaming.
 * @type {boolean}
 */
SystemInfoCellularNetwork.prototype.isRoaming;

/**
 * Indicates whether the device is in flight mode.
 * @type {boolean}
 */
SystemInfoCellularNetwork.prototype.isFlightMode;

/**
 * Represents the International Mobile Equipment Identity (IMEI).
 * @type {string}
 */
SystemInfoCellularNetwork.prototype.imei;

/**
 * @enum {string}
 */
let SystemInfoNetworkType = {
	'2G': '2G',
	'2.5G': '2.5G', // eslint-disable-line interfaced/caps-const
	'3G': '3G',
	'4G': '4G',
	WIFI: 'WIFI',
	ETHERNET: 'ETHERNET',
	NONE: 'NONE',
	UNKNOWN: 'UNKNOWN'
};

/**
 * Represents the network type of the current data network.
 * @type {SystemInfoNetworkType}
 */
SystemInfoNetwork.prototype.networkType;

/**
 * @enum {string}
 */
let SystemInfoVideoSourceType = {
	TV: 'TV',
	AV: 'AV',
	SVIDEO: 'SVIDEO',
	COMP: 'COMP',
	PC: 'PC',
	HDMI: 'HDMI',
	SCART: 'SCART',
	DVI: 'DVI'
};

/**
 * Represents the type of the video input source.
 * @type {SystemInfoVideoSourceType}
 */
SystemInfoVideoSourceInfo.prototype.type;

/**
 * Represents the input number of the input source.
 * If the source is "HDMI 2", the number is 2.
 * @type {number}
 */
SystemInfoVideoSourceInfo.prototype.number;

/**
 * The type of a storage device. The value is one of the constants defined for this type.
 * The supported storage unit types are:
 * UNKNOWN
 * INTERNAL
 * USB_HOST
 * MMC
 * @type {string}
 */
SystemInfoStorageUnit.prototype.type;

/**
 * The amount of data that this device can hold, in bytes.
 * @type {number}
 */
SystemInfoStorageUnit.prototype.capacity;

/**
 * The amount of available data that this device can hold, in bytes.
 * @type {number}
 */
SystemInfoStorageUnit.prototype.availableCapacity;

/**
 * An attribute to indicate whether a device can be removed or not.
 * The following values are supported:
 * - If this storage unit can be removed from the system (such as an sdcard unplugged)
 * - If this storage unit cannot be removed from the system
 * @type {boolean}
 */
SystemInfoStorageUnit.prototype.isRemovable;

/**
 * Returns true if this unit can be removed from the system (such as an sdcard unplugged), false otherwise.
 * @type {boolean}
 */
SystemInfoStorageUnit.prototype.isRemoveable;

/**
 * The TimeUtil class that provides access to the time API.
 * This interface offers methods to manage date / time as well as timezones such as:
 * Get the current date / time using getCurrentDateTime().
 * Get timezones using getLocalTimezone() and getAvailableTimezones().
 * @constructor
 * @return {TimeUtil}
 */
function TimeUtil() {}

/**
 * The TZDate object represents information regarding a given date / time in a predefined timezone.
 * If its date / time is exceed the platform limit, TZDate will be invalid.
 * @constructor
 * @return {TZDate}
 */
function TZDate() {}

/**
 * The TimeDuration object that contains the length and its associated time unit.
 * @constructor
 * @return {TimeDuration}
 */
function TimeDuration() {}

/**
 * Returns the current date / time.
 * @memberof TimeUtil
 * @return {TZDate}
 */
TimeUtil.prototype.getCurrentDateTime = function() {};

/**
 * Returns identifier of the local system timezone.
 * @memberof TimeUtil
 * @return {string}
 */
TimeUtil.prototype.getLocalTimezone = function() {};

/**
 * Returns synchronously the identifiers of the timezones supported by the device.
 * Zero or more slashes separate different components of a timezone identifier,
 * with the most general descriptor first and the most specific one last. For example,
 * 'Europe/Berlin', 'America/Argentina/Buenos_Aires'.
 * @memberof TimeUtil
 * @return {Array}
 */
TimeUtil.prototype.getAvailableTimezones = function() {};

/**
 * Returns the date format according to the system's locale settings.
 * These expressions may be used in the returned string:
 * "d" = day number (1 to 31)
 * "D" = day name
 * "m" = month number (1 to 12)
 * "M" = month name
 * "y" = year
 * Examples of string formats include: "d/m/y", "y-d-m", "D, M d y".
 * @param {boolean} shortformat
 * @memberof TimeUtil
 * @return {string}
 */
TimeUtil.prototype.getDateFormat = function(shortformat) {};

/**
 * Returns the time format according to the system's locale settings.
 * These expressions may be used in the returned string:
 * "h" = hours (0 to 23 or 1 to 12 if AM/PM display)
 * "m" = minutes (0 to 59)
 * "s" = seconds (0 to 59)
 * "ap" = AM/PM display
 * Examples of string formats include: "h:m:s ap", "h:m:s".
 * @memberof TimeUtil
 * @return {string}
 */
TimeUtil.prototype.getTimeFormat = function() {};

/**
 * Returns if the given year is a leap year.
 * @param {number} year
 * @memberof TimeUtil
 * @return {boolean}
 */
TimeUtil.prototype.isLeapYear = function(year) {};

/**
 * Sets a listener for receiving any notification when the time or date was set.
 * @param {SuccessCallback} changeCallback
 * @memberof TimeUtil
 * @return {void}
 */
TimeUtil.prototype.setDateTimeChangeListener = function(changeCallback) {};

/**
 * Unsets the listener to stop receiving notifications when the time or date was set.
 * @memberof TimeUtil
 * @return {void}
 */
TimeUtil.prototype.unsetDateTimeChangeListener = function() {};

/**
 * Sets a listener for receiving any notification for the changes of the time zone on a device.
 * @param {SuccessCallback} changeCallback
 * @memberof TimeUtil
 * @return {void}
 */
TimeUtil.prototype.setTimeZoneChangeListener = function(changeCallback) {};

/**
 * Unsets the listener to stop receiving notifications for the changes of the time zone on a device.
 * @memberof TimeUtil
 * @return {void}
 */
TimeUtil.prototype.unsetTimeZoneChangeListener = function() {};

/**
 * Returns the day of the month (from 1-31).
 * @memberof TZDate
 * @return {number}
 */
TZDate.prototype.getDate = function() {};

/**
 * Sets the day of the month (from 1-31).
 * If it tries to set the day bigger than the last day of the month or smaller than 1,
 * it will be calculated automatically.
 * For example, if TZDate's month is May and parameter is 32, it will be June 1.
 * @param {number} date
 * @memberof TZDate
 * @return {void}
 */
TZDate.prototype.setDate = function(date) {};

/**
 * Returns the day of the week (from 0-6).
 * @memberof TZDate
 * @return {number}
 */
TZDate.prototype.getDay = function() {};

/**
 * Returns the year.
 * Positive values indicate AD(Anno Domini) years. 0 and negative values indicate BC(Before Christ) years.
 * For example, 1 = AD 1, 0 = BC 1, -1 = BC 2.
 * @memberof TZDate
 * @return {number}
 */
TZDate.prototype.getFullYear = function() {};

/**
 * Sets the year.
 * @param {number} year
 * @memberof TZDate
 * @return {void}
 */
TZDate.prototype.setFullYear = function(year) {};

/**
 * Returns the hour (0-23).
 * @memberof TZDate
 * @return {number}
 */
TZDate.prototype.getHours = function() {};

/**
 * Sets the hour (0-23).
 * If it tries to set the hour bigger than 23 or smaller than 0, it will be calculated automatically.
 * For example, if hours is 24, it will set 0 and add to a date.
 * @param {number} hours
 * @memberof TZDate
 * @return {void}
 */
TZDate.prototype.setHours = function(hours) {};

/**
 * Returns the milliseconds (from 0-999).
 * @memberof TZDate
 * @return {number}
 */
TZDate.prototype.getMilliseconds = function() {};

/**
 * Sets the milliseconds (from 0-999).
 * If it tries to set the millisecond bigger than 999 or smaller than 0, it will be calculated automatically.
 * For example, if ms is 1000, it will set 0 and add to a second.
 * @param {number} ms
 * @memberof TZDate
 * @return {void}
 */
TZDate.prototype.setMilliseconds = function(ms) {};

/**
 * Returns the minutes (from 0-59).
 * @memberof TZDate
 * @return {number}
 */
TZDate.prototype.getMinutes = function() {};

/**
 * Sets the minutes.
 * If it tries to set the minute bigger than 59 or smaller than 0, it will be calculated automatically.
 * For example, if minutes is 60, it will set 0 and add to an hour.
 * @param {number} minutes
 * @memberof TZDate
 * @return {void}
 */
TZDate.prototype.setMinutes = function(minutes) {};

/**
 * Returns the month (from 0-11).
 * @memberof TZDate
 * @return {number}
 */
TZDate.prototype.getMonth = function() {};

/**
 * Sets the month (from 0-11).
 * If it tries to set the month bigger than 11 or smaller than 0, it will be calculated automatically.
 * For example, if month is 12, it will set 0 and add to a year.
 * @param {number} month
 * @memberof TZDate
 * @return {void}
 */
TZDate.prototype.setMonth = function(month) {};

/**
 * Returns the seconds (from 0-59).
 * @memberof TZDate
 * @return {number}
 */
TZDate.prototype.getSeconds = function() {};

/**
 * Sets the seconds (from 0-59).
 * If it tries to set the second bigger than 59 or smaller than 0, it will be calculated automatically.
 * For example, if seconds is 60, it will set 0 and add to a minute.
 * @param {number} seconds
 * @memberof TZDate
 * @return {void}
 */
TZDate.prototype.setSeconds = function(seconds) {};

/**
 * Returns the day of the month, according to universal time (from 1-31).
 * @memberof TZDate
 * @return {number}
 */
TZDate.prototype.getUTCDate = function() {};

/**
 * Sets the day of the month, according to universal time (from 1-31).
 * If it tries to set the day bigger than the last day of the month or smaller than 1,
 * it will be calculated automatically.
 * For example, if TZDate's month is May and date is 32, it will be June 1.
 * @param {number} date
 * @memberof TZDate
 * @return {void}
 */
TZDate.prototype.setUTCDate = function(date) {};

/**
 * Returns the day of the week, according to universal time (from 0-6).
 * @memberof TZDate
 * @return {number}
 */
TZDate.prototype.getUTCDay = function() {};

/**
 * Returns the year, according to universal time.
 * Positive values indicate AD(Anno Domini) years. 0 and negative values indicate BC(Before Christ) years.
 * For example, 1 = AD 1, 0 = BC 1, -1 = BC 2.
 * @memberof TZDate
 * @return {number}
 */
TZDate.prototype.getUTCFullYear = function() {};

/**
 * Sets the year, according to universal time.
 * @param {number} year
 * @memberof TZDate
 * @return {void}
 */
TZDate.prototype.setUTCFullYear = function(year) {};

/**
 * Returns the hour, according to universal time (0-23).
 * @memberof TZDate
 * @return {number}
 */
TZDate.prototype.getUTCHours = function() {};

/**
 * Sets the hour, according to universal time (0-23).
 * If it tries to set the hour bigger than 23 or smaller than 0, it will be calculated automatically.
 * For example, if hours is 24, it will set 0 and add to a date.
 * @param {number} hours
 * @memberof TZDate
 * @return {void}
 */
TZDate.prototype.setUTCHours = function(hours) {};

/**
 * Returns the milliseconds, according to universal time (from 0-999).
 * @memberof TZDate
 * @return {number}
 */
TZDate.prototype.getUTCMilliseconds = function() {};

/**
 * Sets the milliseconds, according to universal time (from 0-999).
 * If it tries to set the millisecond bigger than 999 or smaller than 0, it will be calculated automatically.
 * For example, if ms is 1000, it will set 0 and add to a second.
 * @param {number} ms
 * @memberof TZDate
 * @return {void}
 */
TZDate.prototype.setUTCMilliseconds = function(ms) {};

/**
 * Returns the minutes, according to universal time (from 0-59).
 * @memberof TZDate
 * @return {number}
 */
TZDate.prototype.getUTCMinutes = function() {};

/**
 * Sets the minutes, according to universal time (from 0-59).
 * If it tries to set the minute bigger than 59 or smaller than 0, it will be calculated automatically.
 * For example, if minutes is 60, it will set 0 and add to an hour.
 * @param {number} minutes
 * @memberof TZDate
 * @return {void}
 */
TZDate.prototype.setUTCMinutes = function(minutes) {};

/**
 * Returns the month, according to universal time (from 0-11).
 * @memberof TZDate
 * @return {number}
 */
TZDate.prototype.getUTCMonth = function() {};

/**
 * Sets the month, according to universal time (from 0-11).
 * If it tries to set the month bigger than 11 or smaller than 0, it will be calculated automatically.
 * For example, if month is 12, it will set 0 and add to a year.
 * @param {number} month
 * @memberof TZDate
 * @return {void}
 */
TZDate.prototype.setUTCMonth = function(month) {};

/**
 * Returns the seconds, according to universal time (from 0-59).
 * @memberof TZDate
 * @return {number}
 */
TZDate.prototype.getUTCSeconds = function() {};

/**
 * Sets the seconds, according to universal time (from 0-59).
 * If it tries to set the second bigger than 59 or smaller than 0, it will be calculated automatically.
 * For example, if seconds is 60, it will set 0 and add to a minute.
 * @param {number} seconds
 * @memberof TZDate
 * @return {void}
 */
TZDate.prototype.setUTCSeconds = function(seconds) {};

/**
 * Returns timezone identifier.
 * Zero or more slashes separate different components, with the most general
 * descriptor first and the most specific one last. For example,
 * 'Europe/Berlin', 'America/Argentina/Buenos_Aires'.
 * This attribute uniquely identifies the timezone.
 * @memberof TZDate
 * @return {string}
 */
TZDate.prototype.getTimezone = function() {};

/**
 * Returns a copy of the TZDate converted to a given time zone.
 * @param {string} tzid
 * @memberof TZDate
 * @return {TZDate}
 */
TZDate.prototype.toTimezone = function(tzid) {};

/**
 * Returns a copy of the TZDate converted to the local time zone.
 * @memberof TZDate
 * @return {TZDate}
 */
TZDate.prototype.toLocalTimezone = function() {};

/**
 * Returns a copy of the TZDate converted to Coordinated Universal Time (UTC).
 * @memberof TZDate
 * @return {TZDate}
 */
TZDate.prototype.toUTC = function() {};

/**
 * Calculates the difference with another TZDate object.
 * Calculates the difference in time between this and other.
 * This comparison method takes timezones into consideration for the comparison.
 * The TimeDuration that is returned is effectively this - other.
 * The return value is a duration in milliseconds both TZDate objects have a time component, in days, otherwise.
 * The result value will be:
 * Negative, if other is in the future
 * 0 if the two date / times are equal
 * Positive, if other is in the past
 * @param {TZDate} other
 * @memberof TZDate
 * @return {TimeDuration}
 */
TZDate.prototype.difference = function(other) {};

/**
 * Checks if the TZDate is equal to another.
 * This method takes the timezones into consideration and will return trueif the two TZDate objects represent
 * the same instant in different timezones.
 * @param {TZDate} other
 * @memberof TZDate
 * @return {boolean}
 */
TZDate.prototype.equalsTo = function(other) {};

/**
 * Checks if the TZDate is earlier than another.
 * This method takes the timezones into consideration.
 * @param {TZDate} other
 * @memberof TZDate
 * @return {boolean}
 */
TZDate.prototype.earlierThan = function(other) {};

/**
 * Checks if the TZDate is later than another.
 * This method takes the timezones into consideration.
 * @param {TZDate} other
 * @memberof TZDate
 * @return {boolean}
 */
TZDate.prototype.laterThan = function(other) {};

/**
 * Returns a new date by adding a duration to the current TZDate object.
 * If the length of duration is negative, the new date / time will be earlier than it used to.
 * Note that calling this method does not alter the current object.
 * @param {TimeDuration} duration
 * @memberof TZDate
 * @return {TZDate}
 */
TZDate.prototype.addDuration = function(duration) {};

/**
 * Returns the date portion of a TZDate object as a string, using locale conventions.
 * @memberof TZDate
 * @return {string}
 */
TZDate.prototype.toLocaleDatestring = function() {};

/**
 * Returns the time portion of a TZDate object as a string, using locale conventions.
 * @memberof TZDate
 * @return {string}
 */
TZDate.prototype.toLocaleTimestring = function() {};

/**
 * Converts a TZDate object to a string, using locale conventions.
 * @memberof TZDate
 * @return {string}
 */
TZDate.prototype.toLocalestring = function() {};

/**
 * Returns the date portion of a TZDate object as a string.
 * @memberof TZDate
 * @return {string}
 */
TZDate.prototype.toDatestring = function() {};

/**
 * Returns the time portion of a TZDate object as a string.
 * @memberof TZDate
 * @return {string}
 */
TZDate.prototype.toTimestring = function() {};

/**
 * Converts a TZDate object to a string.
 * @memberof TZDate
 * @return {string}
 */
TZDate.prototype.tostring = function() {};

/**
 * Determines the time zone abbreviation to be used at a particular date in the time zone.
 * For example, in Toronto this is currently "EST" during the winter months and "EDT" during the
 * summer months when daylight savings time is in effect.
 * @memberof TZDate
 * @return {string}
 */
TZDate.prototype.getTimezoneAbbreviation = function() {};

/**
 * Gets the number of seconds from Coordinated Universal Time (UTC) offset for the timezone.
 * Returns the offset (in seconds) from UTC of the timezone, accounting for daylight
 * savings if in effect in the timezone. For example, if time zone is GMT+8, it will return -32,400.
 * @memberof TZDate
 * @return {number}
 */
TZDate.prototype.secondsFromUTC = function() {};

/**
 * Indicates if Daylight Saving Time(DST) is active for this TZDate.
 * Indicates if daylight savings are in effect for the time zone and instant
 * identified by the TZDate object.
 * @memberof TZDate
 * @return {boolean}
 */
TZDate.prototype.isDST = function() {};

/**
 * Returns the date of the previous daylight saving time transition for the timezone.
 * @memberof TZDate
 * @return {TZDate}
 */
TZDate.prototype.getPreviousDSTTransition = function() {};

/**
 * Returns the date of the next daylight saving time transition for the timezone.
 * @memberof TZDate
 * @return {TZDate}
 */
TZDate.prototype.getNextDSTTransition = function() {};

/**
 * Duration length.
 * The unit of the duration length (milliseconds, seconds, minutes, hours, or days)
 * is determined by the duration unit attribute.
 * @type {number}
 */
TimeDuration.prototype.length;

/**
 * @enum {string}
 */
let TimeDurationUnit = {
	MSECS: 'MSECS',
	SECS: 'SECS',
	MINS: 'MINS',
	HOURS: 'HOURS',
	DAYS: 'DAYS'
};

/**
 * Duration unit (milliseconds, seconds, minutes, hours, or days).
 * The default value is "MSECS" (milliseconds unit).
 * @type {TimeDurationUnit}
 */
TimeDuration.prototype.unit;

/**
 * Calculates the difference between two TimeDuration objects.
 * Calculates the difference in time between this and other.
 * The TimeDuration that is returned is effectively first - other (that is: positive if the first parameter is larger).
 * The returned TimeDuration is the biggest possible unit without losing the precision.
 * @param {TimeDuration} other
 * @memberof TimeDuration
 * @return {TimeDuration}
 */
TimeDuration.prototype.difference = function(other) {};

/**
 * Checks if the TimeDuration is equal to another.
 * This method takes the units into consideration and will return true
 * if the two TimeDuration objects represent the same duration in different units.
 * @param {TimeDuration} other
 * @memberof TimeDuration
 * @return {boolean}
 */
TimeDuration.prototype.equalsTo = function(other) {};

/**
 * Checks if the TimeDuration is lower than another.
 * This method takes the units into consideration when doing the comparison.
 * @param {TimeDuration} other
 * @memberof TimeDuration
 * @return {boolean}
 */
TimeDuration.prototype.lessThan = function(other) {};

/**
 * Checks if the TimeDuration is greater than another.
 * This method takes the units into consideration when doing the comparison.
 * @param {TimeDuration} other
 * @memberof TimeDuration
 * @return {boolean}
 */
TimeDuration.prototype.greaterThan = function(other) {};

/**
 * Represents a set of filters.
 * The composite filters can be one of the 2 types:
 * The union - used to filter objects that match any of the filters it includes.
 * The intersection - used to filter objects that match all filters it includes.
 * @constructor
 * @return {CompositeFilter}
 */
function CompositeFilter() {}

/**
 * This interface is used in methods that require only an error as input parameter in the error callback.
 * If an invalid function (such as null) is passed to the API that accepts ErrorCallback, it silently fails
 * and there is no further action.
 * Arguments: error
 * @typedef {function(WebAPIError)}
 */
let ErrorCallback;

/**
 * Generic exception interface.
 * This interface will be used by the APIs to throw errors synchronously.
 * The attempt to set an attribute value may or may not raise WebAPIException synchronously with error type
 * TypeMismatchError or InvalidValuesError.
 * @constructor
 * @return {WebAPIException}
 */
function WebAPIException() {}

/**
 * Represents a filter based on an object attribute which has values that are within a particular range.
 * Range filters, where only one boundary is set, are available.
 * @constructor
 * @return {AttributeRangeFilter}
 */
function AttributeRangeFilter() {}

/**
 * Represents a point (latitude and longitude) in map coordinate system.
 * Latitude and longitude are of the WGS84 datum.
 * @constructor
 * @return {SimpleCoordinates}
 */
function SimpleCoordinates() {}

/**
 * This interface represents a set of filter.
 * It represents the query statement for the specified value of the matchValue by the rule of matchFlag.
 * If no matchValue is defined, the filter will match all objects that have the attribute
 * defined (same as the "EXISTS" filter works), otherwise, it will only match objects which have an attribute
 * that matches the specified value.
 * @constructor
 * @return {AttributeFilter}
 */
function AttributeFilter() {}

/**
 * Generic error interface.
 * This interface will be used by the APIs in order to return them in the error callback of asynchronous methods.
 * @constructor
 * @return {WebAPIError}
 */
function WebAPIError() {}

/**
 * This interface is used in methods that do not require any return value in the success callback.
 * In case of successful execution of an asynchronous call, or an API defined callback must be called immediately
 * to notify the user.
 * @typedef {function()}
 */
let SuccessCallback;

/**
 * The root of Tizen Web Device API.
 * This is the Tizen root interface.
 * It is a property of the ECMAScript global object, as specified by the TizenObject interface.
 * @constructor
 * @return {Tizen}
 */
function Tizen() {}

/**
 * This is a common interface used by different types of object filters.
 * Never use this base interface directly, instead use AbstractFilter subtypes,
 * such as AttributeFilter, AttributeRangeFilter, and CompositeFilter.
 * @constructor
 * @return {AbstractFilter}
 */
function AbstractFilter() {}

/**
 * This is a common interface used for sorting of queried data.
 * Note that the sorting result of list type attributes is not determined.
 * @constructor
 * @return {SortMode}
 */
function SortMode() {}

/**
 * @enum {string}
 */
let CompositeFilterType = {
	UNION: 'UNION',
	INTERSECTION: 'INTERSECTION'
};

/**
 * The composite filter type.
 * @type {CompositeFilterType}
 */
CompositeFilter.prototype.type;

/**
 * The list of filters in the composite filter.
 * @type {Array}
 */
CompositeFilter.prototype.filters;

/**
 * The index is not in the allowed range.
 * @type {number}
 */
WebAPIException.INDEX_SIZE_ERR;

/**
 * The specified range of text is too large.
 * @type {number}
 */
WebAPIException.DOMSTRING_SIZE_ERR;

/**
 * The operation would yield an incorrect node tree.
 * @type {number}
 */
WebAPIException.HIERARCHY_REQUEST_ERR;

/**
 * The object is in the wrong document.
 * @type {number}
 */
WebAPIException.WRONG_DOCUMENT_ERR;

/**
 * The string contains invalid characters.
 * @type {number}
 */
WebAPIException.INVALID_CHARACTER_ERR;

/**
 * Data is specified for a node that does not support data.
 * @type {number}
 */
WebAPIException.NO_DATA_ALLOWED_ERR;

/**
 * The object cannot be modified.
 * @type {number}
 */
WebAPIException.NO_MODIFICATION_ALLOWED_ERR;

/**
 * The object cannot be found here.
 * @type {number}
 */
WebAPIException.NOT_FOUND_ERR;

/**
 * The operation is not supported.
 * @type {number}
 */
WebAPIException.NOT_SUPPORTED_ERR;

/**
 * The specified attribute is already in use elsewhere.
 * @type {number}
 */
WebAPIException.INUSE_ATTRIBUTE_ERR;

/**
 * The object is in an invalid state.
 * @type {number}
 */
WebAPIException.INVALID_STATE_ERR;

/**
 * The string did not match the expected pattern.
 * @type {number}
 */
WebAPIException.SYNTAX_ERR;

/**
 * The object cannot be modified in this way.
 * @type {number}
 */
WebAPIException.INVALID_MODIFICATION_ERR;

/**
 * The operation is not allowed by Namespaces in XML.
 * @type {number}
 */
WebAPIException.NAMESPACE_ERR;

/**
 * The object does not support the operation or argument.
 * @type {number}
 */
WebAPIException.INVALID_ACCESS_ERR;

/**
 * The operation would cause the node to fail validation.
 * @type {number}
 */
WebAPIException.VALIDATION_ERR;

/**
 * The type of the object does not match the expected type.
 * @type {number}
 */
WebAPIException.TYPE_MISMATCH_ERR;

/**
 * The operation is insecure.
 * @type {number}
 */
WebAPIException.SECURITY_ERR;

/**
 * A network error occurred.
 * @type {number}
 */
WebAPIException.NETWORK_ERR;

/**
 * The operation was aborted.
 * @type {number}
 */
WebAPIException.ABORT_ERR;

/**
 * The given URL does not match another URL.
 * @type {number}
 */
WebAPIException.URL_MISMATCH_ERR;

/**
 * The quota has been exceeded.
 * @type {number}
 */
WebAPIException.QUOTA_EXCEEDED_ERR;

/**
 * The operation timed out.
 * @type {number}
 */
WebAPIException.TIMEOUT_ERR;

/**
 * The supplied node is incorrect or has an incorrect ancestor for this operation.
 * @type {number}
 */
WebAPIException.INVALID_NODE_TYPE_ERR;

/**
 * The object cannot be cloned.
 * @type {number}
 */
WebAPIException.DATA_CLONE_ERR;

/**
 * 16-bit error code. For the possible values for this attribute, see.
 * @type {number}
 */
WebAPIException.prototype.code;

/**
 * An error type. The name attribute must return the value it was initialized with.
 * This attribute can have one of the following values:
 * UnknownError - An unknown error has occurred.
 * InvalidValuesError - The content of an object does not contain valid values.
 * IOError - An error occurred in communication with the underlying implementation and so the requested method
 * cannot be completed.
 * ServiceNotAvailableError - The requested service is not available.
 * For other possible values for this attribute, see the values defined in
 * <a href="http://www.w3.ohttp://127.0.0.1:56346/help/topic/dom/#error-types">DOM error types</a>
 * @type {string}
 */
WebAPIException.prototype.name;

/**
 * An error message that describes the details of an encountered error. This attribute is mainly intended
 * to be used for developers rather than end users, so it should not be used directly in the user interfaces as it is.
 * @type {string}
 */
WebAPIException.prototype.message;

/**
 * The name of the object attribute used for filtering.
 * The value of this attribute is exactly as it is defined in the object's interface.
 * For attributes of complex type, use fully-qualified names
 * (such as 'geolocation.latitude' to filter on a video or image content's latitude in a geolocation).
 * For attributes of array type, the filter will match if any value in the array matches.
 * @type {string}
 */
AttributeRangeFilter.prototype.attributeName;

/**
 * Objects with an attribute that is greater than or equal to will match.
 * By default, this attribute is set to null.
 * @type {*}
 */
AttributeRangeFilter.prototype.initialValue;

/**
 * Objects with an attribute that is strictly lower than to will match.
 * By default, this attribute is set to null.
 * @type {*}
 */
AttributeRangeFilter.prototype.endValue;

/**
 * Latitude.
 * @type {number}
 */
SimpleCoordinates.prototype.latitude;

/**
 * Longitude.
 * @type {number}
 */
SimpleCoordinates.prototype.longitude;

/**
 * The name of the object attribute used for filtering.
 * This is the name of the object attribute exactly as it is defined in
 * the object's interface. For attributes of complex type, use fully-qualified names
 * (such as 'geolocation.latitude' to filter on a video or image content's latitude in a geolocation).
 * For attributes of an array type, the filter will match if any value in the array matches.
 * @type {string}
 */
AttributeFilter.prototype.attributeName;

/**
 * @enum {string}
 */
let FilterMatchFlag = {
	EXACTLY: 'EXACTLY',
	FULLSTRING: 'FULLSTRING',
	CONTAINS: 'CONTAINS',
	STARTSWITH: 'STARTSWITH',
	ENDSWITH: 'ENDSWITH',
	EXISTS: 'EXISTS'
};

/**
 * The match flag used for attribute-based filtering.
 * By default, this attribute is set to "EXACTLY".
 * @type {FilterMatchFlag}
 */
AttributeFilter.prototype.matchFlag;

/**
 * The value used for matching.
 * The filter will match if the attribute value matches the given matchValue.
 * This value is not used if the matchFlag is set to "EXISTS".
 * By default, this attribute is set to null.
 * @type {*}
 */
AttributeFilter.prototype.matchValue;

/**
 * 16-bit error code. Possible values are defined in.
 * @type {number}
 */
WebAPIError.prototype.code;

/**
 * An error type. The name attribute must return the value it was initialized with.
 * This attribute can have one of the following values:
 * UnknownError - An unknown error has occurred.
 * InvalidValuesError - The content of an object does not contain valid values.
 * IOError - An error occurred in communication with the underlying implementation and
 * so the requested method cannot be completed.
 * ServiceNotAvailableError - The requested service is not available.
 * For other possible values for this attribute, see the values defined in
 * <a href="http://www.w3.ohttp://127.0.0.1:56346/help/topic/dom/#error-types">DOM error types</a>
 * @type {string}
 */
WebAPIError.prototype.name;

/**
 * An error message that describes the details of the error encountered.
 * This attribute is not intended to be used directly in the user interfaces as it is mainly intended to be useful
 * for developers rather than end users.
 * @type {string}
 */
WebAPIError.prototype.message;

/**
 * @enum {string}
 */
let SortModeOrder = {
	ASC: 'ASC',
	DESC: 'DESC'
};

/**
 * The name of the object attribute used for sorting.
 * @type {string}
 */
SortMode.prototype.attributeName;

/**
 * The type of the sorting.
 * By default, this attribute is set to ASC.
 * @type {SortModeOrder}
 */
SortMode.prototype.order;

/**
 * This interface defines a volume change callback for getting notified information about the volume changes.
 * Arguments: volume
 * @typedef {function(number)}
 */
let VolumeChangeCallback;

/**
 * This interface provides access to the API funtionalities through the interface.
 * @constructor
 */
function AudioControlManager() {}

/**
 * Turns on or off the silent mode
 * Note that turning on mute mode does not change volume level but it simply disables any sound. Turning off the mute
 * will enable sound with the volume level. If setVolumeUp or setVolumeDown functions are used, then mute is disabled.
 * @param {boolean} mute
 * @memberof AudioControlManager
 * @return {void}
 */
AudioControlManager.prototype.setMute = function(mute) {};

/**
 * Gets the mute state.
 * @memberof AudioControlManager
 * @return {boolean}
 */
AudioControlManager.prototype.isMute = function() {};

/**
 * Changes the volume level.
 * The value of volume is allowed from 0 to 100. If an invalid value is passed, InvalidValuesError will occur.
 * @param {number} volume
 * @memberof AudioControlManager
 * @return {void}
 */
AudioControlManager.prototype.setVolume = function(volume) {};

/**
 * Increases the volume by 1 level. If it is called when the volume level is 100, it will be ignored because
 * the maximum volume level is 100. If mute is enabled, then execution of this functions will disable it.
 * @memberof AudioControlManager
 * @return {void}
 */
AudioControlManager.prototype.setVolumeUp = function() {};

/**
 * Decreases the volume by 1 level.
 * If it is called when the volume level is 0, it will be ignored because the minimum volume level is 0.
 * If mute is enabled, then execution of this functions will disable it.
 * @memberof AudioControlManager
 * @return {void}
 */
AudioControlManager.prototype.setVolumeDown = function() {};

/**
 * Gets the current volume level.
 * @memberof AudioControlManager
 * @return {number}
 */
AudioControlManager.prototype.getVolume = function() {};

/**
 * Registers a volume change callback for getting notified when TV volume has been changed.
 * Note that this method overwrites the previously registered listener.
 * @param {VolumeChangeCallback} callback
 * @memberof AudioControlManager
 * @return {void}
 */
AudioControlManager.prototype.setVolumeChangeListener = function(callback) {};

/**
 * Unregisters the volume change callback for detecting the volume changes.
 * @memberof AudioControlManager
 * @return {void}
 */
AudioControlManager.prototype.unsetVolumeChangeListener = function() {};

/**
 * Gets the current audio output mode.
 * @memberof AudioControlManager
 * @return {string}
 * @see OutputMode
 */
AudioControlManager.prototype.getOutputMode = function() {};

/**
 * Plays the sound of a specific beep.
 * @param {string} type
 * @see BeepType
 * @memberof AudioControlManager
 * @return {void}
 */
AudioControlManager.prototype.playSound = function(type) {};

/**
 * This interface represents the object for identifying a TV channel.
 * @constructor
 * @return {ChannelInfo}
 */
function ChannelInfo() {}

/**
 * This interface represents information about the television program.
 * @constructor
 * @return {ProgramInfo}
 */
function ProgramInfo() {}

/**
 * This interface invokes the success callback that is invoked when the list of TV program informations
 * is successfully retrieved.
 * Arguments: programInfos
 * @typedef {function(Array)}
 */
let ProgramListSuccessCallback;


/**
 * @enum {string}
 */
let WindowType = {
	MAIN: 'MAIN'
};


/**
 * The interface defines a channel change callback for getting notified information about the channel changes.
 * Arguments: channelInfo, type
 * @typedef {function(ChannelInfo, WindowType)}
 */
let ChannelChangeCallback;


/**
 * This interface invokes the callback that is invoked when the tuning has been completed.
 * This callback interface specifies two methods:
 * onsuccess(channel, type) - Invoked when the tuning operation has been successfully done and there is a TV signal.
 * onnosignal() - Invoked when the tuning operation has been successfully done but there is no signal
 *  on the switched channel.
 * onprograminforeceived(program, type) - Invoked when information about the current program is available after the
 * tune operation.
 * All these callback methods can be invoked by tizen.tvchannel.tune(), tuneUp() or tuneDown().
 * If there is a TV signal, onsuccess() will be invoked first, and then onprograminforeceived() will be invoked
 * if information about TV program exists.
 * But on the other hand, if there is no TV signal, onnosignal() will be invoked.
 * @typedef {{
 *     onsuccess: function(ChannelInfo, WindowType),
 *     onnosignal: function(),
 *     onprograminforeceived: function(ProgramInfo, WindowType)
 * }}
 */
let TuneCallback;


/**
 * The interface defines a program change callback for getting notified information about the program changes.
 * Arguments: programInfo, channelInfo
 * @typedef {function(ProgramInfo, ChannelInfo)}
 */
let ProgramChangeCallback;

/**
 * This interface provides access to the API functionalities through the interface.
 * @constructor
 * @return {ChannelManager}
 */
function ChannelManager() {}

/**
 * The interface invokes the success callback that is invoked when all available channels are searched.
 * Arguments: channelInfos
 * @typedef {function(Array)}
 */
let FindChannelSuccessCallback;

/**
 * The major channel number The first number in a two-part number used to identify a virtual channel.
 * Each virtual channel carries one service, such as a television program.
 * @type {number}
 */
ChannelInfo.prototype.major;

/**
 * The minor channel number The second number in a two-part number used to identify a virtual channel.
 * The minor number changes for each different service that is or will be present in a DTV transport stream.
 * @type {number}
 */
ChannelInfo.prototype.minor;

/**
 * Channel Name to represent the station's indentity
 * @type {string}
 */
ChannelInfo.prototype.channelName;

/**
 * Program number
 * @type {number}
 */
ChannelInfo.prototype.programnumber;

/**
 * PTC(Physical Transmission Channel) number
 * @type {number}
 */
ChannelInfo.prototype.ptc;

/**
 * The logical channel number It is used in DVB(Digital Video Broadcasting) standards for digital television.
 * @type {number}
 */
ChannelInfo.prototype.lcn;

/**
 * Source ID
 * It is a number that uniquely identifies a source of scheduled programming.
 * @type {number}
 */
ChannelInfo.prototype.sourceID;

/**
 * TSID (Transport Stream ID or transmission signal ID)
 * @type {number}
 */
ChannelInfo.prototype.transportStreamID;

/**
 * Original Network ID
 * @type {number}
 */
ChannelInfo.prototype.originalNetworkID;

/**
 * Service Name
 * @type {string}
 */
ChannelInfo.prototype.serviceName;

/**
 * The program title
 * @type {string}
 */
ProgramInfo.prototype.title;

/**
 * The program start time
 * @type {TZDate}
 */
ProgramInfo.prototype.startTime;

/**
 * The duration of the program
 * @type {number}
 */
ProgramInfo.prototype.duration;

/**
 * A detailed description of the program's content.
 * @type {string}
 */
ProgramInfo.prototype.detailedDescription;

/**
 * Language information
 * @type {string}
 */
ProgramInfo.prototype.language;

/**
 * Rating information
 * @type {string}
 */
ProgramInfo.prototype.rating;

/**
 * @typedef {{
 *     ptc: number,
 *     major: number,
 *     minor: number,
 *     sourceID: number,
 *     programNumber: number,
 *     transportStreamID: number,
 *     originalNetworkID: number,
 *     tunecallback: TuneCallback
 * }}
 */
let TuneOption;

/**
 * Tunes the specified channel.
 * If there are more than one channel with the major and minor, the lowest channel
 * in all possible channels will be switched to.
 * The ErrorCallback will be launched in the following situations:
 * NotFoundError - Failed to find a requested channel
 * UnknownError - Failed to set the selected channel
 * UnknownError - onprograminforeceived for other tune
 * @param {TuneOption} tuneOption
 * @param {TuneCallback} successCallback
 * @param {ErrorCallback} errorCallback
 * @param {WindowType} type
 * @memberof ChannelManager
 * @return {void}
 */
ChannelManager.prototype.tune = function(tuneOption, successCallback, errorCallback, type) {};

/**
 * Changes channel up.
 * When you call this api on the highest channel, the lowest channel would be tuned.
 * The ErrorCallback will be launched in the following situations:
 * NotFoundError - Failed to find the next higher channel
 * (e.g. When there is no channels in favorites list, you call tuneUp() with 'FAVORITE' tune mode.
 * UnknownError - Failed to change to the next higher channel
 * UnknownError - onprograminforeceived for other tune
 * @param {TuneCallback} successCallback
 * @param {ErrorCallback} errorCallback
 * @param {number} tuneMode
 * @param {WindowType} type
 * @memberof ChannelManager
 * @return {void}
 */
ChannelManager.prototype.tuneUp = function(successCallback, errorCallback, tuneMode, type) {};

/**
 * Changes channel down.
 * When you call this api on the lowest channel, the highest channel would be tuned.
 * The ErrorCallback will be launched in the following situations:
 * NotFoundError - Failed to find the next lower channel
 * (e.g. When there is no channels in favorites list, you call tuneDown() with 'FAVORITE' tune mode.)
 * UnknownError - Failed to change to the next lower channel
 * UnknownError - onprograminforeceived for other tune
 * @param {TuneCallback} successCallback
 * @param {ErrorCallback} errorCallback
 * @param {number} tuneMode
 * @param {WindowType} type
 * @memberof ChannelManager
 * @return {void}
 */
ChannelManager.prototype.tuneDown = function(successCallback, errorCallback, tuneMode, type) {};

/**
 * Retrieves information about all available channels.
 * The ErrorCallback will be launched in the following situations:
 * NotFoundError - Failed to find the channel (e.g. call findChannel() with invalid major and minor values
 * (e.g. non-existing channel information))
 * @param {number} major
 * @param {number} minor
 * @param {FindChannelSuccessCallback} successCallback
 * @param {ErrorCallback} errorCallback
 * @memberof ChannelManager
 * @return {void}
 */
ChannelManager.prototype.findChannel = function(major, minor, successCallback, errorCallback) {};

/**
 * Gets the TV channel list.
 * If this method is invoked without number parameter, all available channel informations will be retrieved.
 * If you call getChannelList() with 'FAVORITE' tune navigation mode,
 * All favorites channels will be retreived only if you have added favorites using your remote control.
 * Empty array will be returned if there is no favorites channel on a Tizen device.
 * The ErrorCallback will be launched in the following situations:
 * NotFoundError - Failed to find the channels
 * @param {FindChannelSuccessCallback} successCallback
 * @param {ErrorCallback} errorCallback
 * @param {number} mode
 * @param {number} nStart
 * @param {number} number
 * @memberof ChannelManager
 * @return {void}
 */
ChannelManager.prototype.getChannelList = function(successCallback, errorCallback, mode, nStart, number) {};

/**
 * Gets information about the current channel.
 * @param {WindowType} type
 * @memberof ChannelManager
 * @return {ChannelInfo}
 */
ChannelManager.prototype.getCurrentChannel = function(type) {};

/**
 * Gets a list of programs for a specific channel within a specified time duration.
 * If this method is invoked without the parameter, all available program informations are retrieved.
 * The ErrorCallback will be launched in the following situations:
 * NotFoundError - Failed to retrieve any information about the TV program
 * @param {ChannelInfo} channelInfo
 * @param {TZDate} startTime
 * @param {ProgramListSuccessCallback} successCallback
 * @param {ErrorCallback} errorCallback
 * @param {number} duration
 * @memberof ChannelManager
 * @return {void}
 */
ChannelManager.prototype.getProgramList = function(
	channelInfo,
	startTime,
	successCallback,
	errorCallback,
	duration
) {};

/**
 * Gets information about the current television program.
 * If there is no TV program data grabbed from broadcaster, it will return null.
 * @param {WindowType} type
 * @memberof ChannelManager
 * @return {ProgramInfo}
 */
ChannelManager.prototype.getCurrentProgram = function(type) {};

/**
 * Adds a channel change listener for getting notified about the channel changes.
 * @param {ChannelChangeCallback} callback
 * @param {WindowType} type
 * @memberof ChannelManager
 * @return {number}
 */
ChannelManager.prototype.addChannelChangeListener = function(callback, type) {};

/**
 * Removes the listener to stop receiving notifications for the channel changes.
 * @param {number} channelListenerId
 * @memberof ChannelManager
 * @return {void}
 */
ChannelManager.prototype.removeChannelChangeListener = function(channelListenerId) {};

/**
 * Adds a listener for getting notified about the changes of program information.
 * @param {ProgramChangeCallback} callback
 * @param {ChannelInfo} channel
 * @memberof ChannelManager
 * @return {number}
 */
ChannelManager.prototype.addProgramChangeListener = function(callback, channel) {};

/**
 * Removes the listener to stop receiving notifications for the change of TV program information.
 * @param {number} programListenerId
 * @memberof ChannelManager
 * @return {void}
 */
ChannelManager.prototype.removeProgramChangeListener = function(programListenerId) {};

/**
 * Gets the number of available tuners. If there is only one available tuner,
 * one of main video window and PIP window can be set to TV source.
 * @memberof ChannelManager
 * @return {number}
 */
ChannelManager.prototype.getNumOfAvailableTuner = function() {};

/**
 * (Need to check this API usage) Gets the number of available sources e.g. tuners.
 * If you want to use TV source on more than one window - a.k.a pip - you will need to check the number of tuners
 * before create the window. Otherwise, you can get a exception which tells you don't have any available tuner
 * if your tv doesn't support more than 1 tuner.
 * For example, if you have only one tuner, only other source(ex - HDMI)
 * will be available for your PIP window like below left figure.
 * On the other hand, if your TV supports more than 1 tuner, then tv tuner will be
 * automatically assigned to the window you created as right one.
 * @param {?} sourceType
 * @memberof ChannelManager
 * @return {number}
 */
ChannelManager.prototype.getNumOfAvailableSources = function(sourceType) {};

/**
 * This interface provides access to the Display Control API functionalities through the interface.
 * @constructor
 * @return {DisplayControlManager}
 */
function DisplayControlManager() {}

/**
 * This interface defines a callback when a list of supported 3D modes is retrieved successfully.
 * Arguments: mode3DEffects
 * @typedef {function(Array)}
 */
let Mode3DEffectListSupportCallback;


/**
 * @enum {string}
 */
let Display3DEffectMode = {
	OFF: 'OFF',
	TOP_BOTTOM: 'TOP_BOTTOM',
	SIDE_BY_SIDE: 'SIDE_BY_SIDE',
	LINE_BY_LINE: 'LINE_BY_LINE',
	VERTICAL_STRIPE: 'VERTICAL_STRIPE',
	FRAME_SEQUENCE: 'FRAME_SEQUENCE',
	CHECKER_BD: 'CHECKER_BD',
	FROM_2D_TO_3D: 'FROM_2D_TO_3D'
};

/**
 * Gets the current 3D effect mode.
 * @memberof DisplayControlManager
 * @return {Display3DEffectMode}
 */
DisplayControlManager.prototype.get3DEffectMode = function() {};

/**
 * @enum {string}
 */
let Display3DModeState = {
	NOT_CONNECTED: 'NOT_CONNECTED',
	NOT_SUPPORTED: 'NOT_SUPPORTED',
	READY: 'READY'
};

/**
 * Checks whether playing 3D mode is available or not.
 * @memberof DisplayControlManager
 * @return {Display3DModeState}
 */
DisplayControlManager.prototype.is3DModeEnabled = function() {};

/**
 * Gets the supported 3D effects.
 * @param {Mode3DEffectListSupportCallback} successCallback
 * @param {ErrorCallback} errorCallback
 * @memberof DisplayControlManager
 * @return {void}
 */
DisplayControlManager.prototype.getSupported3DEffectModeList = function(successCallback, errorCallback) {};

/**
 * This interface defines a callback that is invoked when a list of available windows is retrieved successfully.
 * Arguments: type
 * @typedef {function(Array)}
 */
let AvailableWindowListCallback;


/**
 * This interface includes the success callback that is invoked when the position and size
 * of TV hole window has been changed or retrieved.
 * Arguments: windowRect, type
 * @typedef {function(Array, WindowType)}
 */
let WindowRectangleSuccessCallback;

/**
 * This interface provides the features to check for availability and register for input device events.
 * @constructor
 * @return {TVInputDeviceManager}
 */
function TVInputDeviceManager() {}

/**
 * The InputDeviceKey interface stores information about the key.
 * @typedef {{
 *     name: string,
 *     code: number
 * }}
 */
let InputDeviceKey;

/**
 * Retrieves the list of keys can be registered with the registerKey() method.
 * @return {Array<InputDeviceKey>}
 */
TVInputDeviceManager.prototype.getSupportedKeys = function() {};

/**
 * Returns information about the key which has the given name.
 * @param {string} keyName
 * @return {?InputDeviceKey}
 */
TVInputDeviceManager.prototype.getKey = function(keyName) {};

/**
 * Registers an input device key to receive DOM keyboard event when it is pressed or released.
 * @param {string} keyName
 */
TVInputDeviceManager.prototype.registerKey = function(keyName) {};

/**
 * Unregisters an input device key.
 * @param {string} keyName
 */
TVInputDeviceManager.prototype.unregisterKey = function(keyName) {};

/**
 * Registers a batch of input device keys to receive DOM keyboard events when any of them is pressed or released.
 * @param {Array<string>} keyNames
 * @param {SuccessCallback=} successCallback
 * @param {ErrorCallback=} errorCallback
 */
TVInputDeviceManager.prototype.registerKeyBatch = function(keyNames, successCallback, errorCallback) {};

/**
 * Unregisters a batch of input device keys.
 * @param {Array<string>} keyNames
 * @param {SuccessCallback=} successCallback
 * @param {ErrorCallback=} errorCallback
 */
TVInputDeviceManager.prototype.unregisterKeyBatch = function(keyNames, successCallback, errorCallback) {};

/**
 * This interface provides access to the API funtionalities through the interface.
 * @constructor
 * @return {TVWindowManager}
 */
function TVWindowManager() {}

/**
 * Gets the list of available windows.
 * @param {AvailableWindowListCallback} successCallback
 * @param {ErrorCallback} errorCallback
 * @memberof TVWindowManager
 * @return {void}
 */
TVWindowManager.prototype.getAvailableWindows = function(successCallback, errorCallback) {};

/**
 * Changes the source of TV hole window.
 * @param {SystemInfoVideoSourceInfo} videoSource
 * @param {SuccessCallback} successCallback
 * @param {ErrorCallback} errorCallback
 * @param {WindowType} type
 * @memberof TVWindowManager
 * @return {void}
 */
TVWindowManager.prototype.setSource = function(videoSource, successCallback, errorCallback, type) {};

/**
 * Gets information about the current source of a specified TV hole window.
 * @param {WindowType} type
 * @memberof TVWindowManager
 * @return {SystemInfoVideoSourceInfo}
 */
TVWindowManager.prototype.getSource = function(type) {};

/**
 * Sets the display area of TV hole window and show it on the display screen.
 * The rectangle parameter requires exactly four elements which are described below:
 * The first element indicates the x coordinate of TV hole window on display screen.
 * The second element indicates the y coordinate of TV hole window on display screen.
 * The third element indicates the width of TV hole window.
 * The fourth element indicates the height of TV hole window.
 * The each element can be described in either absolute value(pixel) using pixel unit "px"
 * or relative value(percentage) using percentage unit "%".
 * If you do not specify any unit after a value then it indicates pixel unit.
 * InvalidValuesError will be thrown if rectangle has any element with invalid format(e.g. "10p")
 * or it does not have 4 elements.
 * NotSupportedError will be thrown if you set rectangle which is not within the boundary of the display area.
 * TypeMismatchError will be thrown if rectangle is not an array.
 * @param {WindowRectangleSuccessCallback} successCallback
 * @param {ErrorCallback} errorCallback
 * @param {Array} rectangle
 * @param {WindowType} type
 * @memberof TVWindowManager
 * @return {void}
 */
TVWindowManager.prototype.show = function(successCallback, errorCallback, rectangle, type) {};

/**
 * Hides the TV hole window on the display screen.
 * @param {SuccessCallback} successCallback
 * @param {ErrorCallback} errorCallback
 * @param {WindowType} type
 * @memberof TVWindowManager
 * @return {void}
 */
TVWindowManager.prototype.hide = function(successCallback, errorCallback, type) {};

/**
 * @enum {string}
 */
let MeasurementUnit = {
	PX: 'px',
	PERCENT: '%'
};

/**
 * Gets the area information of TV hole window on the display screen. According to the specified unit,
 * information about the area will be passed to an array that contains 4 strings through
 * WindowRectangleSuccessCallback as follows:
 * If you set "px" as unit, ["0px", "0px", "1920px", "1080px"]
 * If you set "%" as unit, ["0%", "0%", "100%", "100%"]
 * If you omit unit, the pixel("px") unit will be used as a default unit.
 * @param {WindowRectangleSuccessCallback} successCallback
 * @param {ErrorCallback} errorCallback
 * @param {MeasurementUnit} unit
 * @param {WindowType} type
 * @memberof TVWindowManager
 * @return {void}
 */
TVWindowManager.prototype.getRect = function(successCallback, errorCallback, unit, type) {};

/**
 * This is the top-level interface for the WebSetting API that managed the settings of
 * the Web view in your Web application.
 * @constructor
 * @return {WebSettingManager}
 */
function WebSettingManager() {}

/**
 * Sets the custom user agent string for your Web application.
 * This method allows the user to set the user agent string of the Web view in the Web application.
 * By default, the Web view in your application has the same user agent string as the Tizen browser on the device.
 * The ErrorCallback is launched with these error types:
 * UnknownError - If any error occurs while setting the user agent string.
 * InvalidValuesError - If any of the input parameters contain an invalid value.
 * @param {string} userAgent
 * @param {SuccessCallback} successCallback
 * @param {ErrorCallback} errorCallback
 * @memberof WebSettingManager
 * @return {void}
 */
WebSettingManager.prototype.setUserAgentstring = function(userAgent, successCallback, errorCallback) {};

/**
 * Removes all the cookies saved for the Web view in your Web application.
 * The Web view in your Web application can store cookies like a browser.
 * This method allows the user to remove all the cookies saved for the Web application.
 * The ErrorCallback is launched with these error types:
 * UnknownError - If any error occurs while deleting the cookies.
 * @param {SuccessCallback} successCallback
 * @param {ErrorCallback} errorCallback
 * @memberof WebSettingManager
 * @return {void}
 */
WebSettingManager.prototype.removeAllCookies = function(successCallback, errorCallback) {};

/**
 * This API provides the functionality for scheduling the system alarm. It allows you to run other applications and
 * have them perform operations at the specific time. You can schedule an alarm to go off once or to repeat at
 * specific intervals.
 * Each application has its own individual alarm storage, that is, applications cannot view or edit alarms set by
 * other applications.
 * Once an alarm goes off, it will be removed from the alarm storage automatically.
 * AlarmManager provides methods to manage alarms such as adding and removing.
 * For more information on the Alarm features, see Alarm Guide.
 * @type {AlarmManager}
 */
Tizen.prototype.alarm;

/**
 * This API provides a way to launch other applications and access application management.
 * The ApplicationManager interface also provides methods to launch other applications
 * explicitly and implicitly through the ApplicationControl interface.
 * The ApplicationControl interface consists of an operation, URI, and MIME type
 * and also describes an action to be performed by other
 * applications and can carry the result from the subsequent application.
 * The ApplicationManager interface also provides methods to handle the application
 * lifecycle, to access the installed applications on the device, and to let
 * an application be notified of a change in the application list.
 * The Application interface defines the current application's information and
 * the basic operations for current application such as exit or hide.
 * For more information on the Application features, see Application Guide.
 * @type {ApplicationManager}
 */
Tizen.prototype.application;

/**
 * This API provides interfaces and methods for accessing Bookmark. This API provides functionality to get, add, and
 * remove bookmarks.
 * For more information on the Bookmark features, see Bookmark Guide.
 * @type {BookmarkManager}
 */
Tizen.prototype.bookmark;

/**
 * This API provides methods to asynchronously download the contents of a URL to a storage.
 * For more information on the Download features, see Download Guide.
 * feature http://tizen.org/feature/network.wifi
 * @type {DownloadManager}
 */
Tizen.prototype.download;

/**
 * This API provides functionality to discover contents such as images, videos, music, or other.
 * It is possible to search for specific contents using filters.
 * The API also supports setting attributes of specific contents.
 * For more information on the Content features, see Content Guide.
 * @type {ContentManager}
 */
Tizen.prototype.content;

/**
 * This API provides access to a device's filesystem.
 * The filesystem is represented as an abstract collection of disjointed filesystem virtual
 * root locations, each corresponding to a specific location in the device
 * filesystem. The filesystem API exposes the hierarchies below these root
 * locations as a single virtual filesystem, but provides no access to other
 * parts of the device filesystem.
 * Each virtual root has a string name. Each file or directory within the virtual
 * filesystem is addressed using a fully-qualified path of the form:
 * root name/path where rootname is
 * the name of the virtual root and path is the path to the file or directory relative to that root.
 * The following virtual roots must be supported:
 * - images - the location for images
 * - videos - the location for videos
 * - music - the location for sounds
 * - documents - the location for documents
 * - downloads - the location for downloaded items
 * - ringtones - the location for ringtones (read-only location)
 * - wgt-package - the location for widget package which is read-only
 * - wgt-private - the location for a widget's private storage
 * - wgt-private-tmp - the location for a widget's private volatile storage
 * The file URI path is also supported. To access other paths out of virtual root, for example '/tmp/', 'file:///tmp'
 * can be used as location parameter.
 * To access specific locations apart from those specified above, a file handle must be retrieved using the
 * filesystem.resolve() call.
 * A file handle represents either a file or a directory:
 *  For a file, the attribute is set to.
 *  For a directory, the attribute is set to.
 * A file can be opened for both read and write operations, using a
 * FileStream handle. A list of files and sub-directories can be obtained from a
 * directory and a resolve method exists to resolve files or sub-directories
 * more conveniently than processing directory listings.
 * The implementation must support the use of the following characters in file names:
 * - Letters (a-z, A-Z)
 * - numbers (0-9)
 * - Blank space
 * - Underscore ("_")
 * - Hyphen ("-")
 * - Period (".")
 * The implementation may support additional characters in file names, depending on platform support.
 * The implementation may forbid the use of additional characters in file names, depending on the platform.
 * The use of the path (component) separator "/" should not be allowed in file names.
 * Some other file name and path characteristics are platform-dependent,
 * for example, maximum path length, file name length, case sensitivity, additional
 * character support, etc. Therefore, it is recommended to avoid any dependency
 * on aspects that cannot be supported across multiple platforms.
 * When a path is used to interact with the underlying filesystem, the encoding used for the file path
 * should be the platform default.
 * For more information on the Filesystem features, see File System Guide.
 * @type {FileSystemManager}
 */
Tizen.prototype.filesystem;

/**
 * This API provides functionalities to install or uninstall packages, and retrieve information about
 * installed packages.It also provides a listener method so that an application is able to be notified when
 * there is a change on the installed packages. For more information on the Package features, see.
 * @type {PackageManager}
 */
Tizen.prototype.package;

/**
 * This specification defines interfaces and methods that provide web applications with access to various properties
 * of a system.
 * This API also provides interfaces and methods that can retrieve statuses of hardware devices, get the value
 * of selected properties, and subscribe to asynchronous notifications of changes for selected values.
 * The following provides an overview of the tree data structure:
 * BATTERY
 * CPU
 * STORAGE
 * DISPLAY
 * DEVICE_ORIENTATION
 * BUILD
 * LOCALE
 * NETWORK
 * WIFI_NETWORK
 * CELLULAR_NETWORK
 * SIM
 * PERIPHERAL
 * VIDEOSOURCE (: 2.4)
 * For more information on the SystemInfo features, see System Information Guide.
 * @type {SystemInfo}
 */
Tizen.prototype.systeminfo;

/**
 * The Time API provides information regarding date / time and time zones.
 * The JavaScript Date object does not have full timezone support.
 * Date objects allow only simple representations to denote a particular location's
 * offset from Universal Coordinated Time (UTC). This is typically provided as a +/-
 * offset from UTC-0 (also known as Greenwich Mean Time, or GMT) for example, +05:30 denotes
 * that a location is 5 hours and 30 minutes ahead of UTC +00:00.
 * The issue with this method is not getting the correct
 * local time for a given date. The existing methods are sufficient for this purpose.
 * The issue is correctly converting to and from local time and UTC for all points in
 * time - in any of the past, present, and future - based on an initial time provided.
 * This is important for defining relative dates, where a time in a given location may
 * observe different UTC offsets, according to any Daylight Savings Rules (DST) in effect
 * or any other changes that may occur to a location's time zone over time.
 * Without the communication of the explicit time zone rules governing a given date and
 * time, the ability to effectively calculate the offset of the local time to UTC or to
 * any other time zone at any point in the past or future is lost.
 * This API can be used to get TZDate objects with full time zone support, convert them
 * between timezones, retrieve available timezones.
 * For more information on the Time features, see Time Guide.
 * @type {TimeUtil}
 */
Tizen.prototype.time;

/**
 * Audio represents audio properties of device.
 * A smart TV or home digital media devices support an audio output. The Audio API provides a programming
 * interface, which can be used to control an audio outputs. It supports
 * <a href="http://en.wikipedia.org/wiki/Loudness">loudness</a> control, which can change produced sound from quiet
 * to loud. The API can be used to determine, which audio output is used by a device. An audio output can be completely
 * turn off, what means that it is muted. A video and audio stream can contain many audio tracks.
 * The Audio API supports a selection of an audio track.
 * For more information on the audio features, see Audio for smart TV.
 * feature http://tizen.org/feature/tv.audio
 * @type {AudioControlManager}
 */
Tizen.prototype.tvaudiocontrol;

/**
 * An error handling for all methods and attribute setters is very similar.
 * All methods throw the set of predefined exceptions:
 * TypeMismatchError: If any of the input parameters contain an value, which has incorrect type.
 * SecurityError: If method is not allowed
 * UnknownError: In any other error case.
 * All asynchronous methods accept error callback as optional parameter.
 * If an asynchronous method fails due to any error, a errorCallback is launched with the appropriate error name:
 * InvalidValuesError: If any of the input parameters contain an invalid value
 * UnknownError: In any other error case.
 * The part of methods defines additional synchronous and asynchronous errors.
 * If valid function is not passed as argument for error callback,
 * then asynchronous method, silently fails and no further action
 * is required (that is the developer is not notified of the error).
 * feature http://tizen.org/feature/tv.channel
 * @type {ChannelManager}
 */
Tizen.prototype.tvchannel;

/**
 * An error handling for all methods and attribute setters is very similar.
 * All methods throw the set of predefined exceptions:
 * TypeMismatchError: If any of the input parameters contain an value, which has incorrect type.
 * SecurityError: If method is not allowed
 * UnknownError: In any other error case.
 * All asynchronous methods accept error callback as optional parameter.
 * If an asynchronous method fails due to any error, a errorCallback is launched with the appropriate error name:
 * InvalidValuesError: If any of the input parameters contain an invalid value
 * UnknownError: In any other error case.
 * The part of methods defines additional synchronous and asynchronous errors.
 * If valid function is not passed as argument for error callback,
 * then asynchronous method, silently fails and no further action
 * is required (that is the developer is not notified of the error).
 * feature http://tizen.org/feature/tv.displaycontrol
 * @type {DisplayControlManager}
 */
Tizen.prototype.tvdisplaycontrol;

/**
 * The TV Input Device API provides functions to subscribe key events of the input device.
 * The following remote control keys are mandatory input device keys. They are available to an application on any
 * Tizen TV.
 * ArrowLeft, ArrowUp, ArrowRight, ArrowDown, Enter, Back
 * The Tizen TV may provide additional keys depending on a particular input device.
 * An application can handle device dependent key events after registration.
 * @type {TVInputDeviceManager}
 */
Tizen.prototype.tvinputdevice;

/**
 * A hardware has many limitations
 * so only one main hole can be created. Some TVs can support PIP
 * (Picture in Picture), which means that inside main hole, another source is display as small picture in big picture.
 * An error handling for all methods and attribute setters is very similar.
 * All methods throw the set of predefined exceptions:
 * TypeMismatchError: If any of the input parameters contain an value, which has incorrect type.
 * SecurityError: If method is not allowed
 * UnknownError: In any other error case.
 * All asynchronous methods accept error callback as optional parameter.
 * If an asynchronous method fails due to any error, a error is launched with the appropriate error name:
 * InvalidValuesError: If any of the input parameters contain an invalid value
 * UnknownError: In any other error case.
 * The part of methods defines additional synchronous and asynchronous errors.
 * If valid function is not passed as argument for error callback, then asynchronous method,
 * silently fails and no further action is required (that is the developer is not notified of the error).
 * feature http://tizen.org/feature/tv.window
 * @type {TVWindowManager}
 */
Tizen.prototype.tvwindow;

/**
 * This Web setting API defines a set of APIs that manages the setting states of the Web view in your Web application.
 * A Tizen Web application includes a web view and the properties below of the web view can be managed
 * via the Web setting API:
 * Delete all the cookies saved for the web view in the Web application.
 * Set a custom user agent string of the web view in the Web application.
 * Note that all the settings using the Web setting API is bound to your application; thus,
 * no other applications are affected via the Web setting API calls within your application.
 * @type {WebSettingManager}
 */
Tizen.prototype.websetting;

/**
 * @type {function(new: ApplicationControl, ...*)}
 */
Tizen.prototype.ApplicationControl;

/**
 * @type {function(new: ApplicationControlData, ...*)}
 */
Tizen.prototype.ApplicationControlData;

/**
 * This API provides common Tizen functionality.
 * The API provides the basic definitions that are used in the Tizen Web Device API.
 * These include generic callbacks that are invoked when the operations succeed or fail,
 * WebAPIError and WebAPIException that gives information of the platform's error and
 * filters interfaces that are used to make query for searching.
 * Additionally, this API specifies the location in the ECMAScript hierarchy in which
 * the Tizen Web Device API is instantiated (window.tizen).
 * For more information on the Tizen features, see Tizen Guide.
 * @type {Tizen}
 */
Window.prototype.tizen;
