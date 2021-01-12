<?php
if(!function_exists('theme_is_dev')) {
    function theme_is_dev() {
        return theme_get_ini_setting(
            'General', 'dev'
        );
    }
}