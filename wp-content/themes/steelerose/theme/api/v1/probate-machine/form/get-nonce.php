<?php
add_action('rest_api_init', function() {

    // Read
    register_rest_route(
        'theme/v' . $GLOBALS['theme_api_v'],
        '/pmachine/form/get-nonce/',
        array(
            'methods' =>
                'GET',
            'callback' =>
                function() {
                    return
                        wp_create_nonce('wp_rest');
                }
        ));
});