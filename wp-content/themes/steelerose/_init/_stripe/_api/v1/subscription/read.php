<?php
use \Theme\Stripe\Subscription as Subscription;

add_action('rest_api_init', function() {

    // Read
    register_rest_route(
        'theme/v' . $GLOBALS['theme_api_v'],
        'stripe/subscription/(?P<id>.+)/',
        array(
            'methods' =>
                'GET',
            'callback' =>
                function($data) {
                    $id = $data->get_param('id');

                    return Subscription::read($id);
                }
        ));
});