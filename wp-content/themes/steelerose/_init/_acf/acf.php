<?php
// Define path and URL to the ACF plugin.
define( 'ACF_PATH',
    get_template_directory() .
    '/vendor/advanced-custom-fields/advanced-custom-fields-pro/'
);
define( 'ACF_URL',
    get_template_directory_uri() .
    '/vendor/advanced-custom-fields/advanced-custom-fields-pro/'
);

// Include the ACF plugin.
if(file_exists(ACF_PATH . 'acf.php')) {
    include_once(ACF_PATH . 'acf.php');

// Customize the url setting to fix incorrect asset URLs.
    add_filter('acf/settings/url', 'acf_settings_url');
    function acf_settings_url($url) {
        return ACF_URL;
    }

// Hide the ACF admin menu item.
    add_filter('acf/settings/show_admin', 'acf_settings_show_admin');
    function acf_settings_show_admin($show_admin) {
        $allowed_users = $GLOBALS['theme_settings']
        ['ACF']
        ['users_enable_admin_ui'];

        $current_user = get_current_user_id();
        if (in_array($current_user, $allowed_users)) {
            return true;
        }
        return false;
    }

    include_once __DIR__ . '/blocks/register.php';
    include_once __DIR__ . '/blocks/fields.php';
}


foreach (glob(theme_get_theme_dir() . "/acf/*.php") as $a) {
    include_once $a;
}

// If Google Maps
function acf_google_map_api( $api ) {
    $api['key'] = get_field('Settings/map/apikey', 'option');
    return $api;
}

add_filter('acf/fields/google_map/api', 'acf_google_map_api');

// Create a general theme options page
if(function_exists('acf_add_options_sub_page')) {
    acf_add_options_sub_page(array(
        'page_title'  => __('Theme'),
        'menu_title'  => __('Theme'),
        'parent_slug' => 'options-general.php',
    ));
}