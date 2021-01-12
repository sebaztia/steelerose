<?php
namespace Theme\API;

add_action('rest_api_init', function() {
    register_rest_route(
        'theme/v1',
        'test/noauth',
        array(
            'methods' =>
                'GET', 'POST', 'PUT', 'DELETE',
            'callback' => function() {

                if(is_user_logged_in()) {
                    return array(
                        'errors' => "Cannot use when logged in"
                    );
                } else {
                    return array(
                        'success' => "Yay! Endpoint reached!"
                    );
                }
            })
    );
});