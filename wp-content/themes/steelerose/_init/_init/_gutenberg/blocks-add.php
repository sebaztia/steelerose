<?php
/**
 * Adds blocks to the Gutenberg editor
 */
add_filter( 'allowed_block_types', 'gutenberg_blocks_add' );

function gutenberg_blocks_add( $allowed_blocks ) {
    return $GLOBALS['theme_settings']
        ['Gutenberg']
        ['blocks_allowed'];
}

