<?php
if(!function_exists('theme_strip_domain')) {
    function theme_strip_domain($string) {
        $parts = parse_url($string);
        return $parts['path'];
    }
}