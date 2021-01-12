<?php
namespace SteeleRose\Taxonomy;

class TeamCategories {

    private $post_types = array(
        'team'
    );

    public function __construct() {
        add_action('init', array($this, 'register'));
    }

    public function register() {
        $labels = array(
            'name'              => _x( 'Team Categories', 'taxonomy general name' ),
            'singular_name'     => _x( 'Team Category', 'taxonomy singular name' ),
            'search_items'      => __( 'Search Categories' ),
            'all_items'         => __( 'All Categories' ),
            'parent_item'       => __( 'Parent Category' ),
            'parent_item_colon' => __( 'Parent Category:' ),
            'edit_item'         => __( 'Edit Category' ),
            'update_item'       => __( 'Update Category' ),
            'add_new_item'      => __( 'Add New Category' ),
            'new_item_name'     => __( 'New Category' ),
            'menu_name'         => __( 'Categories' ),
        );

        register_taxonomy(
            'team-categories',
            $this->post_types,
            array(
                'labels'        => $labels,
                'rewrite'       => array( 'slug' => 'team-category' ),
                'hierarchical'  => true,
            )
        );
    }

}

new TeamCategories();

