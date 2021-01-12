<?php
use \Theme\Stripe\Customer as Customer;

/* add_action('rest_api_init', function() {

    // Create
    register_rest_route(
        'theme/v' . $GLOBALS['theme_api_v'],
        'stripe/customer/update/',
        array(
            'methods' =>
                'POST',
            'callback' =>
                function($data) {
                    $body =
                        json_decode($data->get_body(),
                            true
                        );
                 //   return Customer::update($user_id, $reference, $vendor, (isset($data) ? $data : []));
                }
        ));
}); */