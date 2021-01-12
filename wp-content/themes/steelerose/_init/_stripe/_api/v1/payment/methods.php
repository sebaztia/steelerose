<?php
use \Theme\Stripe\Payment as Payment;
use \Theme\Customer as Customer;

add_action('rest_api_init', function() {

    // Create
    register_rest_route(
        'theme/v' . $GLOBALS['theme_api_v'],
        'stripe/payment/methods/',
        array(
            'methods' =>
                'GET',
            'callback' =>
                function() {
                    $customer =
                        Customer::get(get_current_user_id());

                    return Payment::getMethods($customer->reference);
                }
        ));
});