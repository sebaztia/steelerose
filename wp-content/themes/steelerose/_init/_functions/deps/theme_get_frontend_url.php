<?php
if(!function_exists('theme_get_frontend_url')) {
    function theme_get_frontend_url() {
        return get_stylesheet_directory_uri() . '/' .
            $GLOBALS['theme_settings']
            ['General']
            ['frontend_dir'];
    }
}