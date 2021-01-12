<?php
if(!function_exists('theme_is_post_type_enabled')) {
    function theme_is_post_type_enabled($post_type) {
        return get_field(
            'Settings/post-type/' . $post_type,
            'option'
        );
    }
}