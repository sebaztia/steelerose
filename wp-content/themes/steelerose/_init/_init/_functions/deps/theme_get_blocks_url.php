<?php
if(!function_exists('theme_get_gutenberg_blocks_url')) {
    function theme_get_gutenberg_blocks_url() {
        trigger_error(
            "Deprecated function called. Use `theme_get_blocks_url()`",
            E_USER_NOTICE
        );
        return get_stylesheet_directory_uri() . "/" . $GLOBALS['theme_settings']
            ['Gutenberg']
            ['blocks_dir'] . "/";
    }
}

if(!function_exists('theme_get_blocks_url')) {
    function theme_get_blocks_url() {
        return get_stylesheet_directory_uri() . "/" . $GLOBALS['theme_settings']
            ['Gutenberg']
            ['blocks_dir'] . "/";
    }
}