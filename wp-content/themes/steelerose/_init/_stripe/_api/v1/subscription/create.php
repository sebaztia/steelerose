<?php
use \Theme\Stripe\Subscription as Subscription;

add_action('rest_api_init', function() {

    // Create
    register_rest_route(
        'theme/v' . $GLOBALS['theme_api_v'],
        'stripe/subscription/create/',
        array(
            'methods' =>
                'PUT',
            'callback' =>
                function($data) {
                    $body =
                        json_decode($data->get_body(),
                            true
                        );
                    return Subscription::create($body);
                }
        ));
});