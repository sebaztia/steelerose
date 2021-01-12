<?php
if(!function_exists('theme_get_gutenberg_blocks_dir')) {
    function theme_get_gutenberg_blocks_dir() {
        trigger_error(
            "Deprecated function called. Use `theme_get_blocks_dir()`",
            E_USER_NOTICE
        );
        return get_template_directory() . "/" . $GLOBALS['theme_settings']
            ['Gutenberg']
            ['blocks_dir'] . "/";
    }
}

if(!function_exists('theme_get_blocks_dir')) {
    function theme_get_blocks_dir() {
        return get_template_directory() . "/" . $GLOBALS['theme_settings']
            ['Gutenberg']
            ['blocks_dir'] . "/";
    }
}