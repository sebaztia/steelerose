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

