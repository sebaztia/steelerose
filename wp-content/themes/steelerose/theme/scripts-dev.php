<?php
add_action('wp_enqueue_scripts', function() {

    $current_user = wp_get_current_user();

    /** MAINSCRIPTS */
    wp_enqueue_script(
        'main',

        theme_get_frontend_url() .
        '/main.71b2921ddb6c7058efad.js',

        array('jquery'),

        filemtime(
            theme_get_frontend_dir() .
            '/main.71b2921ddb6c7058efad.js'
        ),

        true
    );
    wp_localize_script(
        'main',
        'Globals',
        array(
            'ajax_url' =>  admin_url( 'admin-ajax.php' ),
            'frontend_url' => theme_get_frontend_url(),
            'api_url' => get_site_url() . '/wp-json/theme/v1/',
            'rest_nonce' => wp_create_nonce('wp_rest'),
            'user_logged_in_email' =>
                (string) $current_user->user_email,
            'privacy_policy_link' =>
                get_field('Settings/account/page/privacyPolicy', 'option'),
            'terms_and_conditions_link' =>
                get_field('Settings/account/page/termsAndConditions', 'option')
        )
    );

    /** MAINSTYLE */
    wp_enqueue_style(
        'main',

        theme_get_frontend_url() .
        '/../../theme/blocks/main.71b2921ddb6c7058efad.css',

        array(),

        filemtime(
            theme_get_frontend_dir() .
            '/../../theme/blocks/main.71b2921ddb6c7058efad.css'
        )
    );

});


add_action( 'enqueue_block_editor_assets', function() {

    wp_enqueue_script(
        'main',

        theme_get_frontend_url() .
        '/main.71b2921ddb6c7058efad.js',

        array('jquery'),

        filemtime(
            theme_get_frontend_dir() .
            '/main.71b2921ddb6c7058efad.js'
        ),

        true
    );
    wp_localize_script(
        'main',
        'Globals',
        array(
            'frontend_url' => theme_get_frontend_url(),
            'api_url' => get_site_url() . '/wp-json/theme/v1/'
        )
    );

    /**
     * Load script
     */
    wp_enqueue_script(
        'block-custom',

        get_stylesheet_directory_uri() .
        '/block.js',

        array('jquery'),

        filemtime(
            get_template_directory() .
            '/block.js'
        ),

        true
    );

    /**
     * Load style
     */
    wp_enqueue_style(
        'fonts',
        'https://fonts.googleapis.com/css?family=Open+Sans:700|Red+Hat+Display&display=swap',
        array(),
        false
    );

    /** MAINSTYLE */
    /*wp_enqueue_style(
        'blocks',

        get_stylesheet_directory_uri() .
        '/theme/blocks/blocks.css',

        array(),

        filemtime(
            get_template_directory() .
            '/theme/blocks/blocks.css'
        )
    );*/
    /*wp_enqueue_style(
        'main',

        theme_get_frontend_url() .
        '/main.71b2921ddb6c7058efad.css',

        array(),

        filemtime(
            theme_get_frontend_dir() .
            '/main.71b2921ddb6c7058efad.css'
        )
    );*/
});

/**
 * Update jQuery
 */
function wp_jquery_manager_plugin_front_end_scripts() {
    $wp_admin = is_admin();
    $wp_customizer = is_customize_preview();

    // jQuery
    if ( $wp_admin || $wp_customizer ) {
        // echo 'We are in the WP Admin or in the WP Customizer';
        return;
    }
    else {
        // Deregister WP core jQuery, see https://github.com/Remzi1993/wp-jquery-manager/issues/2 and https://github.com/WordPress/WordPress/blob/91da29d9afaa664eb84e1261ebb916b18a362aa9/wp-includes/script-loader.php#L226
        wp_deregister_script( 'jquery' ); // the jquery handle is just an alias to load jquery-core with jquery-migrate
        // Deregister WP jQuery
        wp_deregister_script( 'jquery-core' );
        // Deregister WP jQuery Migrate
        wp_deregister_script( 'jquery-migrate' );

        // Register jQuery in the head
        wp_register_script( 'jquery-core', 'https://code.jquery.com/jquery-3.4.1.min.js', array(), null, false );

        /**
         * Register jquery using jquery-core as a dependency, so other scripts could use the jquery handle
         * see https://wordpress.stackexchange.com/questions/283828/wp-register-script-multiple-identifiers
         * We first register the script and afther that we enqueue it, see why:
         * https://wordpress.stackexchange.com/questions/82490/when-should-i-use-wp-register-script-with-wp-enqueue-script-vs-just-wp-enque
         * https://stackoverflow.com/questions/39653993/what-is-diffrence-between-wp-enqueue-script-and-wp-register-script
         */
        wp_register_script( 'jquery', false, array( 'jquery-core' ), null, false );
        wp_enqueue_script( 'jquery' );
    }
}
add_action( 'wp_enqueue_scripts', 'wp_jquery_manager_plugin_front_end_scripts' );

function add_jquery_attributes( $tag, $handle ){
    if ('jquery-core' === $handle) {
        return str_replace("type='text/javascript'", "type='text/javascript' integrity=\"sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=\" crossorigin=\"anonymous\"", $tag);
    }
}

add_filter( 'block_editor_settings' , 'remove_guten_wrapper_styles' );
function remove_guten_wrapper_styles( $settings ) {
    unset($settings['styles']);
    return $settings;
}

// Gmap lib
function gmap_scripts() {
    $gmap_key =
        get_field('Settings/map/apikey', 'option');
    if($gmap_key) {
        wp_register_script(
            'google-maps',
            "https://maps.googleapis.com/maps/api/js?key=" . $gmap_key,
            false,
            false,
            false
        );

        wp_enqueue_script('google-maps');
    }
}
add_action("wp_enqueue_scripts", function() {
    gmap_scripts();
});
add_action("admin_enqueue_scripts", function() {
    gmap_scripts();
});