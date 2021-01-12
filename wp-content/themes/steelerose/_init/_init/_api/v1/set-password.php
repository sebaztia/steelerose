<?php
namespace Theme\API;

add_action('rest_api_init', function() {
    register_rest_route(
        'theme/v1',
        'set-password/',
        array(
            'methods' =>
                array('POST', 'PUT'),
            'callback' =>
                function($data) {

                    $body =
                        json_decode($data->get_body(),
                            true
                        );
                    $method = $data->get_method();

                    $setpassword =
                        new \Theme\SetPassword($body, $method);
                    $res =
                        $setpassword->do();
                    return $res;
                }
        ));
});