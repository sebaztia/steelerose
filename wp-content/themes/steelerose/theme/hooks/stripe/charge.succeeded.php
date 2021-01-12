<?php
//use Theme\Stripe\Customer as Customer;

add_action('stripe_charge.succeeded', function($data) {

    /*try {
        $customer_email =
            $data->billing_details->email;
        $customer_name =
            $data->billing_details->name;
        $customer_pm =
            $data->payment_method;

        $customer = Customer::create(array(
            'email' =>
                $customer_email,
            'name' =>
                $customer_name,
            'first_name' => $customer_name,
            'payment_method' =>
                $customer_pm
        ));

        wp_mail('hello@white-fire.co.uk' , 'Test', $customer);
    } catch(\Exception $e) {
        wp_mail('hello@white-fire.co.uk' , 'ERROR', $e->getMessage());
    }*/


});