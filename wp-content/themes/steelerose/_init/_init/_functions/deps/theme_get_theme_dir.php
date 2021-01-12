<?php
if(!function_exists('theme_get_theme_dir')) {
    function theme_get_theme_dir() {
        return get_template_directory() . "/theme/";
    }
}