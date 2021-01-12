<?php
add_theme_support( 'menus' );

function theme_register_menus() {
    register_nav_menu('topbar',__( 'Top Bar (Logged Out)' ));
    register_nav_menu('topbar_loggedin',__( 'Top Bar (Logged In)' ));
    register_nav_menu('main',__( 'Main Menu (Logged Out)' ));
    register_nav_menu('main_loggedin',__( 'Main Menu (Logged In)' ));
    register_nav_menu('footer_1',__( 'Footer 1' ));
    register_nav_menu('footer_2',__( 'Footer 2' ));

}
add_action( 'init', 'theme_register_menus' );

// Add CSS classes to wp_get_nav_menu_items
function prefix_nav_menu_classes($items, $menu, $args) {
    _wp_menu_item_classes_by_context($items);
    return $items;
}
add_filter( 'wp_get_nav_menu_items', 'prefix_nav_menu_classes', 10, 3 );