<?php
if(!function_exists('theme_get_ini_setting')) {
    function theme_get_ini_setting($section, $setting, $key = false) {
        $output = $GLOBALS['theme_settings']
        [$section]
        [$setting];

        if($key) {
            return $output[$key];
        }

        return $output;
    }
}