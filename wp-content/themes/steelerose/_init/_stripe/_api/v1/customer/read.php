<?php
use \Theme\Stripe\Customer as Customer;

add_action('rest_api_init', function() {

    // Read
    register_rest_route(
        'theme/v' . $GLOBALS['theme_api_v'],
        'stripe/customer/(?P<id>.+)/',
        array(
            'methods' =>
                'GET',
            'callback' =>
                function($data) {
                    $id = $data->get_param('id');

                    return Customer::read($id);
                }
        ));
});