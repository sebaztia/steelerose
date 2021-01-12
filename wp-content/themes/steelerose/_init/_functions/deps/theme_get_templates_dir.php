<?php
if(!function_exists('theme_get_templates_dir')) {
    function theme_get_templates_dir($path = false, $filename = false) {
        return get_template_directory() . '/' .
            $GLOBALS['theme_settings']
            ['General']
            ['templates_dir'] .
            ($path ? "/" . $path : '') . '/' .
            ($filename ? "/" . $filename : '');
    }
}