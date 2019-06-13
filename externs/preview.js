/**
 * Provides methods to use the Preview functionalities.
 * @see http://developer.samsung.com/tv/develop/api-references/samsung-product-api-references/preview-api
 */
class PreviewManager {
	/**
	 * Since : 1.0
	 * Exceptions:
	 *  WebAPIException
	 *  with error type UnknownError in any other error case.
	 */
	getVersion() {}

	/**
	 * This method is set preview data.
	 * Only a single Preview is allowed per application.
	 * Each Preview contains a list of one or more Sections.
	 * Each Section contains one or more Tiles.
	 * Since : 1.0
	 * Pre-condition:
	 *  - using <metadata> tag in config.xml (ex.:
	 *    <tizen:metadata key="http://samsung.com/metadata/use.accelerator" value="bg_service"/>)
	 * Exceptions:
	 *  WebAPIException
	 *  with error type InvalidValuesError, if any of the input parameters contain an invalid value.
	 *  with error type UnknownError in any other error case.
	 * Preview properties
	 * - sections [Array][mandatory]
	 *  - title[string][optional] Title to be displayed at the top of the section. E.g., “Popular Now”
	 *  - position[number][optional] Position of the Section within the Accelerator. Sections will be ordered by
	 *    position, ascending.
	 *  - tiles[Array][mandatory] The list of Tiles in this Section
	 *   - title[string][optional] Title to be displayed over a highlighted Tile. Typically this would be the show name.
	 *     E.g. “Seinfeld”.
	 *   - subtitle[string][optional] Subtitle to be displayed below the title.
	 *   - image_url[string][mandatory] Link to the Tile image. Supported Formats: PNG, JPG
	 *   - image_ratio[string][mandatory] The image aspect ratio as one of the following strings: “16by9”, “4by3”,
	 *     “1by1” or “2by3”. Default value is “1by1”.
	 *     Applications not using any of those aspect ratios may specify the display width in pixels instead
	 *     (Height is fixed at 250px). For example, applications using 1.42 aspect ratio can specify “355”.
	 *     Samsung recommends one of the standard aspect ratios for best performance. Minimum width is 167px.
	 *     Maximum width is 444px.
	 *   - action_data[string][mandatory] Data to be passed to the application when it is launched from this tile
	 *   - is_playable[boolean][mandatory] Whether selecting the Tile will start playback of content. When set to true,
	 *     a Play button will be rendered over the image.
	 *   - display_from[Timestamp][optional] If set, Tile will only be presented to the user from the specified time.
	 *   - display_until[Timestamp][optional] If set, Tile will only be presented until the specified time.
	 *   - position[number][optional] Tiles will be ordered by position, ascending.
	 *  @param {string} previewDataJSON
	 *  @param {Function=} successCallback
	 *  @param {Function=} errorCallback
	 */
	setPreviewData(previewDataJSON, successCallback, errorCallback) {}
}
