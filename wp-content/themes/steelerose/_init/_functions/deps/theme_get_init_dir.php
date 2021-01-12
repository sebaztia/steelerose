<?php
if(!function_exists('theme_get_init_dir')) {
    function theme_get_init_dir() {
        return get_template_directory() . "/" . $GLOBALS['theme_settings']
            ['General']
            ['init_dir'] . "/";
    }
}