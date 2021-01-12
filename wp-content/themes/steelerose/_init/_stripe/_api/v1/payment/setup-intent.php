<?php
use \Theme\Stripe\Payment as Payment;

add_action('rest_api_init', function() {

    // Create
    register_rest_route(
        'theme/v' . $GLOBALS['theme_api_v'],
        'stripe/payment/setup-intent/',
        array(
            'methods' =>
                'POST',
            'callback' =>
                function($data) {
                    $body =
                        json_decode($data->get_body(),
                            true
                        );

                    if(!isset($body['amount'])) {
                        die();
                    }

                    return Payment::setupIntent(
                        $body['amount'],
                        ($body['currency'] ? $body['currency'] : 'gbp'),
                        ($body['payment_method_types'] ? $body['payment_method_types'] : ['card']),
                        ($body['payment_method'] ? $body['payment_method'] : false)
                    );
                }
        ));
});