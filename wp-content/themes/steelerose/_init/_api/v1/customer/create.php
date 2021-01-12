<?php
add_action('rest_api_init', function() {

    // Create
    register_rest_route(
        'theme/v' . $GLOBALS['theme_api_v'],
        '/customer/create',
        array(
            'methods' =>
                'PUT',
            'callback' =>
                function($data) {
                    $body =
                        json_decode($data->get_body(),
                            true
                        );

                    $username_or_email =
                        $body['username_or_email'];
                    $data = (isset($body['data']) ? $body['data'] : array());

                    return \Theme\Customer::create($username_or_email, $data);
                }
        ));
});