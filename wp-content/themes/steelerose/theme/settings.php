<?php
const ACF_ACCOUNT_SETTING_PREFIX = 'Settings/account/';

add_action('init', 'acf_op_init');
function acf_op_init() {

    // Check function exists.
    if (function_exists('acf_add_options_sub_page')) {

        // Add map settings
        acf_add_options_sub_page(array(
            'page_title' => __('Map'),
            'menu_title' => __('Map'),
            'parent_slug' => 'options-general.php'
        ));

        // Add company settings
        acf_add_options_sub_page(array(
            'page_title' => __('Company Details'),
            'menu_title' => __('Company Details'),
            'parent_slug' => 'options-general.php'
        ));

        // Add company settings
        acf_add_options_sub_page(array(
            'page_title' => __('Account Settings'),
            'menu_title' => __('Account Settings'),
            'parent_slug' => 'options-general.php'
        ));

        // Scripts
        acf_add_options_sub_page(array(
            'page_title' => __('Scripts'),
            'menu_title' => __('Scripts'),
            'parent_slug' => 'options-general.php'
        ));
    }
}
