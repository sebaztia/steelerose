<?php
/**
 * Creates new Gutenberg Block
 * - Writes block files to /theme/gutenberg/blocks
 * - Inserts enabled block line to theme-settings.ini
 * - Creates new ACF group for Block
 * - Writes ACF fields to /fields
 * - Creates new Block Category if desired
 */

// Select Category
try {
    $cats_dir =
        theme_get_blocks_dir() . 'categories/';
    $cats_opt =
        array();

    foreach (glob($cats_dir . "*.json") as $cat) {
        $json =
            json_decode(
                file_get_contents($cat),
                true
            );
        $add_cats[] = $json;
    }

    if(isset($add_cats)) {
        $cats_opt['new'] = "Create New";
        foreach ($add_cats as $cat) {
            $cats_opt[$cat['slug']] =
                $cat['title'];
        }
        $block = array();

        $block['category'] =
            cli\menu
            ($cats_opt, 'new', 'Select block category');
    } else {
        $block['category'] = 'new';
    }

    if($block['category']==='new') {
        $cat_slug =
            cli\prompt
            ("Enter block category slug (lowercase, no spaces)");
        $cat_slug = strtolower(
            str_replace(
                ' ', '-', $cat_slug
            )
        );
        $cat_title =
            cli\prompt
            ("Enter block category title");

        try {
            theme_create_block_cat($cat_title, $cat_slug);
        } catch(Exception $e) {
            WP_CLI
                ::error($e->getMessage());
        }

        $block['category'] = $cat_slug;
    }

    if($block['category']!=='new') {
        $block['type'] =
            cli\menu
            (array(
                'plain' => 'Plain',
                'js' => 'JS',
                'preact' => 'Preact'
            ), 'plain', 'Select block type');
        $block['name'] =
            cli\prompt
            ("Enter block name (lowercase, no spaces)");
        $block['name'] =
            strtolower(
                str_replace(
                    ' ', '-', $block['name']
                )
            );
        $block['title'] =
            cli\prompt
            ("Enter block title");
        $block['description'] =
            cli\prompt
            ("Enter block description");
        $block['icon'] =
            cli\prompt
            ("Enter block icon (i.e. format-image)");
        if(file_exists(theme_get_patterns_dir())) {
            $block['use-pattern-dir'] =
                cli\confirm("Use the frontend/src/patterns directory");
        }

        /**
         * TODO: allow Supports
         */
        $block['supports'] = array(
            'align' => false
        );

        try {
            theme_create_block(
                $block['name'],
                strtolower($block['type']),
                $block,
                $block['use-pattern-dir']
            );

            // Run builds
            // shell_exec("cd " . get_template_directory() . " && npm run-script build");

        } catch(Exception $e) {
            WP_CLI
                ::error($e->getMessage());
        }
    }

} catch(\Exception $e) {
    WP_CLI
        ::error($e->getMessage());
}

WP_CLI
    ::success( "Successfully created block `${block['name']}`" );