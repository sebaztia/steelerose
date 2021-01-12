<?php
if(!function_exists('theme_get_attachment_image_src')) {
    function theme_get_attachment_image_src($size = false) {
        global $_wp_additional_image_sizes;
        if(isset($_wp_additional_image_sizes[$size])) {
            $w =
                $_wp_additional_image_sizes[$size]['width'];
            $h =
                $_wp_additional_image_sizes[$size]['height'];
        }

        $src = wp_get_attachment_image_src(
            get_post_thumbnail_id(get_the_ID()
            ), $size
        );

        return ($src ?
            $src[0] :
            false
        );
    }
}