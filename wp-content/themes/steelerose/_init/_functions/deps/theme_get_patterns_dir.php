<?php
if(!function_exists('theme_get_patterns_dir')) {
    function theme_get_patterns_dir($path = false, $filename = false) {
        return get_template_directory() . '/' .
            $GLOBALS['theme_settings']
            ['General']
            ['patterns_dir'] .
            ($path ? "/" . $path : '') .
            ($filename ? "/" . $filename : '');
    }
}