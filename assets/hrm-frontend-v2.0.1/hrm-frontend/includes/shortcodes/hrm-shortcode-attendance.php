<?php
/**
 */
class HRM_Shortcode_Attendance {

	/**
	 * Get the shortcode content.
	 *
	 * @param array $atts
	 * @return string
	 */
	public static function get( $atts ) {
		return HRM_Shortcodes::shortcode_wrapper( array( __CLASS__, 'output' ), $atts );
	}

	/**
	 * Output the shortcode.
	 *
	 * @param array $atts
	 */
	public static function output( $atts = array() ) {
		hrm_get_template('attendance/attendance.php');
		
		Hrm_Scripts::footer_tag();
	}

}