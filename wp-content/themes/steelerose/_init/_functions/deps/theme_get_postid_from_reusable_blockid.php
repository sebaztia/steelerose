<?php
if(!function_exists('theme_get_postid_from_reusable_blockid')) {
    function theme_get_postid_from_reusable_blockid($block_id) {
        global $wpdb;

        $result = $wpdb->get_row(
            $wpdb->prepare(
            "SELECT ID from 
                ".$wpdb->posts." WHERE 
                    post_status = '%s'
                    AND post_type = '%s'
                    AND post_content LIKE '%s'"
                ,
            'publish', 'wp_block', '%'.$block_id.'%'
            )
        );

        if($result) {
            return $result->ID;
        }
    }
}