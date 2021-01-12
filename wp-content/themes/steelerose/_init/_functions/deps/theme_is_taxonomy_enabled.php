<?php
if(!function_exists('theme_is_taxonomy_enabled')) {
    function theme_is_taxonomy_enabled($tax) {
        return get_field(
            'Settings/taxonomy/' . $tax,
            'option'
        );
    }
}