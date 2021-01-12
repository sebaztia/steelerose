<?php
try {
    $blocks_dir =
        theme_get_blocks_dir() . 'types/';
    $fields_dir =
        theme_get_fields_dir();
    $blocks_list =
        scandir_clean($blocks_dir);

    if($blocks_list) {
        $block = cli\menu
        ($blocks_list, $blocks_list[0], 'Select block to remove');

        WP_CLI
            ::confirm("Are you sure you want to remove `${blocks_list[$block]}`? (this is irreversible)");

        WP_CLI
            ::log("Removing Block Files...");

        try {
            theme_remove_block($blocks_list[$block]);
            WP_CLI
                ::success("Successfully removed block `${blocks_list[$block]}`");
        } catch(Exception $e) {
            WP_CLI::
                error($e->getMessage());
        }
    } else {
        WP_CLI
            ::log("No blocks available");
    }

} catch(\Exception $e) {
    WP_CLI
        ::error($e->getMessage());
}