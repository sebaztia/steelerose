<?php
if(!function_exists('theme_remove_block_cat')) {
    function theme_remove_block_cat($name) {
        $cats_dir =
            theme_get_blocks_dir() . 'categories/';

        $cat_filename = $cats_dir . $name . ".json";
        if(file_exists($cat_filename)) {
            unlink($cat_filename);
        }  else {
            throw new Exception(
                "Category `${name}` does not exist."
            );
        }

        return false;
    }
}