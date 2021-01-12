<?php
namespace Theme\Stripe;

class Customer {

    static function read($customer_id) {
        try {
            return \Stripe\Customer::retrieve(
                $customer_id
            );
        } catch(\Exception $e) {
            return array(
                'error' => '[STRIPE] ' . $e->getMessage()
            );
        }
    }

    static function create($body) {

        $errors = array();
        if(!isset($body['email'])) {
            $errors['email'] = 'Email required';
        }

        if(count($errors)>0) {
            return array('errors' => $errors);
        }

        $user =
            \Theme\Customer::get($body['email'], 'stripe');

        if($user) {
            $customer =
                Customer::read($user->reference);

            if(!$customer['error']) {
                return $customer;
            }  else {
                return $customer['error'];
            }

        } else {

            $user =
                theme_get_user_object_by_username_or_email($body['email']);

            try {
                $args['email'] = $body['email'];
                if(isset($body['name'])) {
                    $args['name'] = $body['name'];
                }
                if(isset($body['payment_method'])) {
                    $args['payment_method'] = $body['payment_method'];
                    $args['invoice_settings'] = [
                        'default_payment_method' => $body['payment_method']
                    ];
                }

                $customer = \Stripe\Customer::create($args);

                \Theme\Customer::update($user->ID, array(
                    'reference' => $customer->id,
                    'vendor' => 'stripe',
                    'data' => $customer
                ));

                return $customer;

            } catch(\Exception $e) {
                return array('errors' => $e->getMessage());
            }
        }
    }
}