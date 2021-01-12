<?php
if(!function_exists('theme_get_avatar_url')) {
    function theme_get_avatar_url($user_id, $size = false) {

        $url = get_avatar_url($user_id, array(
            'size' => $size
        ));


        return $url;
    }
}