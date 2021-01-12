<?php
namespace Theme\API;

add_action('rest_api_init', function() {
    register_rest_route(
        'theme/v1',
        'test/auth',
        array(
            'methods' =>
                'GET', 'POST', 'PUT', 'DELETE',
            'callback' => function() {

                if(is_user_logged_in()) {
                    // Will return authenticated user
                    return get_userdata(
                        get_current_user_id()
                    );
                } else {
                    return array(
                        'errors' => array(
                            "Not authenticated"
                        )
                    );
                }
            })
    );
});