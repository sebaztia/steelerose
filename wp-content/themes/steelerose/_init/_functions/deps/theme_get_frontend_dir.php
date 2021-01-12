<?php
if(!function_exists('theme_get_frontend_dir')) {
    function theme_get_frontend_dir() {
        return get_template_directory() . '/' .
            $GLOBALS['theme_settings']
            ['General']
            ['frontend_dir'];
    }
}
