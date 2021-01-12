<?php
namespace Theme\Stripe;

class Payment
{

    static function setupIntent(
        $amount,
        $currency = 'gbp',
        $payment_method_types = ['card'],
        $payment_method = false
    )
    {
        try {
            $user =
                get_user_by('ID', get_current_user_id());
            $customer =
                \Theme\Customer::get($user->user_email);
            $args = array(
                'customer' => $customer->reference,
                'amount' => $amount,
                'currency' => $currency
            );

            if($payment_method) {
                $args['payment_method'] =
                    $payment_method;
            } else {
                $args['payment_method_types'] =
                    $payment_method_types;
                $args['setup_future_usage'] =
                    'off_session';
            }

            $intent =
                \Stripe\PaymentIntent::create($args);

            return array(
                'args' => $args,
                'client_secret' =>
                $intent->client_secret);
        } catch (\Exception $e) {
            return array('error' => $e->getMessage());
        }

    }

    static function getMethods($customer) {
        try {
            return array(
                'cards' =>
                    \Stripe\PaymentMethod::all(
                        array(
                            'customer' => $customer,
                            'type' => 'card'
                        )
                    )->data,
                'customer' => $customer
            );

        } catch(\Exception $e) {
            return array('[STRIPE]' => $e->getMessage());
        }
    }

    static function getInvoices($customer, $limit = 10) {
        try {
            return \Stripe\Invoice::all(array(
                'customer' => $customer,
                'limit' => $limit
            ));

        } catch(\Exception $e) {
            return array('[STRIPE]' => $e->getMessage());
        }
    }

    static function getCharges($customer, $limit = 10) {
        try {
            return \Stripe\Charge::all(array(
                'customer' => $customer,
                'limit' => $limit
            ))->data;

        } catch(\Exception $e) {
            return array('[STRIPE]' => $e->getMessage());
        }
    }
}