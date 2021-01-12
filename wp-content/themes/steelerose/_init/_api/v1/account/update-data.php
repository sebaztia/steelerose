<?php
add_action('rest_api_init', function() {

    // Read
    register_rest_route(
        'theme/v' . $GLOBALS['theme_api_v'],
        '/account/update-data/',
        array(
            'methods' =>
                'POST',
            'callback' =>
                function($data) {

                    $id =
                       get_current_user_id();
                    $body =
                        json_decode($data->get_body(),
                            true
                        );

                    return \Theme\Account::updateOne($id, $body);
                },
            'permission_callback' => function($request){
                return is_user_logged_in();
            }
        ));
});