<?php
if(!function_exists('theme_has_setting')) {
    function theme_has_setting($setting, $key = false) {
        return get_field(
            'Settings/' . $setting . ($key ? '/' . $key : ''),
            'option'
        );
    }
}