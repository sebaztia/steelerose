<?php
namespace Theme\Stripe;
use Theme\Customer as Customer;
use FranceMedia\Mandrill as Mandrill;
use FranceMedia\Mailchimp as Mailchimp;

const ACF_SUBSCRIPTION_SETTINGS_PREFIX =
    'Settings/subscription/';

class Subscription {

    static function create($body = array()) {
        try {

            $user =
                Customer::get_by_ref($body['customer']);

            $current_plan =
                get_user_meta(
                    $user->ID,
                    '_subscription_plan',
                    true
                );

            if($current_plan===$body['price']) {
                return array('errors' => theme_get_message(
                    'Subscription',
                    'error',
                    'already_subscribed'
                ));
            } else {
                $sub = \Stripe\Subscription::create([
                    'customer' => $body['customer'],
                    'items' => [['price' => $body['price']]]
                ]);
                if($sub->status==='incomplete') {
                    return array('errors' => 'There was a problem processing your card');
                }
                
                update_user_meta($user->ID, '_subscription_plan', $body['price']);
                wp_set_auth_cookie( $user->ID);
                $user->set_role('subscriber');

                try {
                    $request =
                        wp_remote_request(get_site_url() . '/' . API_PREFIX . 'set-password', array(
                            'method' => 'POST',
                            'body' => json_encode(array(
                                'type' => 'reset',
                                'username' => $user->user_login
                            )),
                            'headers' => array(
                                'Content-Type' => 'application/json'
                            )
                        ));

                    $response =
                        json_decode(wp_remote_retrieve_body($request));

                    $mail =
                        new Mandrill\Factory();

                    $mail->send(
                        get_field(
                            ACF_SUBSCRIPTION_SETTINGS_PREFIX . 'success/template',
                            'option'
                        ),
                        array(
                            'FNAME' => ($user->first_name ? $user->first_name : 'valued customer'),
                            'SITE' => get_bloginfo('name'),
                            'CLINK' => $response->data->reset_link
                        ),
                        array(
                            'email' => $response->data->email,
                            'name' => $user->first_name
                        ),
                        get_field(
                            ACF_SUBSCRIPTION_SETTINGS_PREFIX . 'success/fromEmail',
                            'option'
                        )
                    );
                } catch (\Exception $e) {
                    return array('errors' => $e->getMessage());
                }

                return $sub;
            }
        } catch(\Exception $e) {
            return
                array('errors' => $e->getMessage());
        }
    }

    static function listPlans() {
        return \Stripe\Plan::all();
    }
}