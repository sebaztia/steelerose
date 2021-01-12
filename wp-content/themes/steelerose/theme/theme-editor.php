<?php
function filter_wp_theme_editor_filetypes( $default_types, $theme ) {
    $default_types = array('twig', 'scss', 'css');
    return $default_types;
};

// add the filter
add_filter( 'wp_theme_editor_filetypes', 'filter_wp_theme_editor_filetypes', 10, 2 );