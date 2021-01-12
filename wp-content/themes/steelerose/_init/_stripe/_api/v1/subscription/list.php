<?php
use \Theme\Stripe\Subscription as Subscription;

add_action('rest_api_init', function() {

    // Read
    register_rest_route(
        'theme/v' . $GLOBALS['theme_api_v'],
        'stripe/subscription/list/',
        array(
            'methods' =>
                'GET',
            'callback' =>
                function($data) {
                    return Subscription::list();
                }
        ));
});


add_action('rest_api_init', function() {

    // Read
    register_rest_route(
        'theme/v' . $GLOBALS['theme_api_v'],
        'stripe/subscription/plans/list/',
        array(
            'methods' =>
                'GET',
            'callback' =>
                function($data) {
                    return Subscription::listPlans();
                }
        ));
});