<?php
if(!function_exists('theme_create_block_cat')) {
    function theme_create_block_cat($title, $slug) {
        $cat_dir = theme_get_blocks_dir() . '/categories/';
        $cat_file = $cat_dir . $slug . '.json';
        $cat_data = json_encode(
            array(
                "slug" => $slug,
                "title" => $title
            ), JSON_PRETTY_PRINT
        );

        if(file_exists($cat_file)) {
            throw new Exception("Block category ${title} already exists!");
        }

        touch($cat_file);
        file_put_contents($cat_file, $cat_data);

        return true;
    }
}