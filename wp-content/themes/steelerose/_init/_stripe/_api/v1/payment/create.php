<?php
use \Theme\Stripe\Payment as Payment;

add_action('rest_api_init', function() {

    // Create
    register_rest_route(
        'theme/v' . $GLOBALS['theme_api_v'],
        'stripe/payment/create/',
        array(
            'methods' =>
                'PUT',
            'callback' =>
                function($data) {
                    $body =
                        json_decode($data->get_body(),
                            true
                        );

                    if(!isset($body['types'])) {
                        $body['types'] = false;
                    }

                    if(!isset($body['currency'])) {
                        $body['currency'] = false;
                    }

                    /*$intent = Payment::createIntent(
                        $body['amount'],
                        $body['types'],
                        $body['currency']
                    );*/
                }
        ));
});