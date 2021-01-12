<?php
try {
    $cats_dir =
        theme_get_blocks_dir() . 'categories/';
    $cats_opt =
        array();
    $cats_list =
        array();

    foreach (glob($cats_dir . "*.json") as $cat) {
        $json =
            json_decode(
                file_get_contents($cat),
                true
            );
        $cats_list[] = $json;
    }

    if(!empty($cats_list)) {
        foreach ($cats_list as $cat) {
            $cats_opt[$cat['slug']] =
                $cat['title'];
        }
    }

    if(!empty($cats_opt)) {
        $selected_cat =
            cli\menu
            ( $cats_opt, false, 'Select block category to remove' );

        if($selected_cat) {
            WP_CLI
                ::confirm("Are you sure you want to remove `${selected_cat}`? (this is irreversible)");

            WP_CLI
                ::log("Removing Category...");

            try {
                theme_remove_block_cat($selected_cat);
                WP_CLI
                    ::success("Successfully removed block `${selected_cat}`");

            } catch (Exception $e) {
                WP_CLI::
                error($e->getMessage());
            }
        }
    } else {
        WP_CLI
            ::log("No block categories available");
    }

} catch (Exception $e) {
    WP_CLI::
        error($e->getMessage());
}