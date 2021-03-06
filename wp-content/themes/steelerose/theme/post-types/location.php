<?php
namespace SteeleRose\PostType;

define('ACF_LOCATION_PREFIX', "PostType/location/");

class Location {
    private $type               = 'location';
    private $name               = 'Locations';
    private $slug               = 'locations';
    private $singular_name      = 'Location';

    public function __construct() {
        add_action('init', array($this, 'register'));
    }

    public function register() {

        $labels = array(
            'name'                  => $this->name,
            'singular_name'         => $this->singular_name,
            'add_new'               => 'Add New',
            'add_new_item'          => 'Add New '   . $this->singular_name,
            'edit_item'             => 'Edit '      . $this->singular_name,
            'new_item'              => 'New '       . $this->singular_name,
            'all_items'             => ''       . $this->name,
            'view_item'             => 'View '      . $this->name,
            'search_items'          => 'Search '    . $this->name,
            'not_found'             => 'No '        . strtolower($this->name) . ' found',
            'not_found_in_trash'    => 'No '        . strtolower($this->name) . ' found in Trash',
            'parent_item_colon'     => '',
            'menu_name'             => $this->name
        );

        $args = array(
            'labels'                => $labels,
            'public'                => true,
            'publicly_queryable'    => true,
            'show_ui'               => true,
            'show_in_menu'          => 'options-general.php',
            'query_var'             => true,
            'rewrite'               => array( 'slug' => $this->slug ),
            'capability_type'       => 'post',
            'has_archive'           => true,
            'hierarchical'          => true,
            'menu_position'         => 8,
            'supports'              => array( 'title' ),
            'exclude_from_search'   => true,
            'yarpp_support'         => false,
            'taxonomies'            => array()
        );

        register_post_type( $this->type, $args );
    }
}

new Location();
