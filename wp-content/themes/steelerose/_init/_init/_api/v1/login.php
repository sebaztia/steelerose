<?php
namespace Theme\API;

add_action('rest_api_init', function() {
    register_rest_route(
        'theme/v1',
        'login/',
        array(
            'methods' =>
                'POST',
            'callback' =>
                function($data) {
                    $credentials =
                        $data->get_param('credentials');
                    $secure_cookie =
                        $data->get_param('secure_cookie');

                    $login = new \Theme\Login($credentials, $secure_cookie);
                    $res = $login->do();
                    return $res;
                }
    ));
});