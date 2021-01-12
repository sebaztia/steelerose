<?php
if(!function_exists('theme_get_init_url')) {
    function theme_get_init_url() {
        return get_stylesheet_directory_uri() . "/" . $GLOBALS['theme_settings']
            ['General']
            ['init_dir'] . "/";
    }
}