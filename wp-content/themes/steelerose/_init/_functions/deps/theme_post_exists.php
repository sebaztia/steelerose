<?php
if(!function_exists('theme_post_exists')) {
    function theme_post_exists($post_id, $post_type) {
        if(!$post_id) {
             return false;
        }

        if(
            get_post_status($post_id) &&
            get_post_type($post_id) === $post_type &&
            get_post_status($post_id) === 'publish'
        ) {
            return true;
        }

        return false;
    }
}