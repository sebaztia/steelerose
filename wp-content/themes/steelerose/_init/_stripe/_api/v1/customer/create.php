<?php
use \Theme\Stripe\Customer as Customer;

/*add_action('rest_api_init', function() {

    // Create
    register_rest_route(
        'theme/v' . $GLOBALS['theme_api_v'],
        'stripe/customer/create/',
        array(
            'methods' =>
                'PUT',
            'callback' =>
                function($data) {
                    $body =
                        json_decode($data->get_body(),
                            true
                        );

                    if(!$body) {
                        return false;
                    }

                    return Customer::create($body);
                }
        ));
}); */