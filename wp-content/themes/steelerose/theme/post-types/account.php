<?php
namespace SteeleRose\PostType;

define('ACF_ACCOUNT_PREFIX', "PostType/account/");

class Account {
    private $type               = 'account';
    private $slug               = 'account';
    private $name               = 'Account pages';
    private $singular_name      = 'Account page';

    public function __construct() {
        add_action('init', array($this, 'register'));
        add_action('wp', array($this, 'redirect'));
    }

    public function register() {

        $labels = array(
            'name'                  => $this->name,
            'singular_name'         => $this->singular_name,
            'add_new'               => 'Add New',
            'add_new_item'          => 'Add New '   . $this->singular_name,
            'edit_item'             => 'Edit '      . $this->singular_name,
            'new_item'              => 'New '       . $this->singular_name,
            'all_items'             => 'All '       . $this->name,
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
            'show_in_menu'          => true,
            'query_var'             => true,
            'rewrite'               => array( 'slug' => $this->slug ),
            'capability_type'       => 'post',
            'has_archive'           => true,
            'hierarchical'          => true,
            'menu_position'         => 8,
            'supports'              => array( 'title', 'editor', 'thumbnail' ),
            'exclude_from_search'   => true,
            'yarpp_support'         => false,
            'taxonomies'            => array(),
            'show_in_rest'          => true,
            'menu_icon'             => 'dashicons-admin-users'
        );

        register_post_type( $this->type, $args );
    }

    public function redirect() {
        $auth_only =
            get_field(ACF_ACCOUNT_PREFIX . 'authOnly', get_the_ID());
        if($auth_only && !is_user_logged_in()) {
            add_action('template_redirect', function () {
                if (!is_singular($this->type))
                    return;
                wp_redirect(get_site_url());
                exit;
            });
        }
    }
}

new Account();