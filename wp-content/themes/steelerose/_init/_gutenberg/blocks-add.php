<?php
/**
 * Adds blocks to the Gutenberg editor
 */
add_filter( 'allowed_block_types', 'gutenberg_blocks_add', 10, 2 );

function gutenberg_blocks_add( $allowed_blocks, $post ) {
    $blocks = $GLOBALS['theme_settings']
    ['Gutenberg']
    ['blocks_allowed'];

    $allowed_blocks = array();
    foreach($blocks as $block) {
        $block = explode(',', $block);
        $blockName = $block[0];
        array_shift($block);

        foreach($block as $postType) {
            if($post->post_type === trim($postType)) {
                $allowed_blocks[] = $blockName;
            }
        }

    }

    return $allowed_blocks;
}

