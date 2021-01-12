<?php
if(!function_exists('theme_get_fields_dir')) {
    function theme_get_fields_dir() {
        return get_template_directory() . '/' .
            $GLOBALS['theme_settings']
            ['ACF']
            ['fields_dir'] . '/';
    }
}