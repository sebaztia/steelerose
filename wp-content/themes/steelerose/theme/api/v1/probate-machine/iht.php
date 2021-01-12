<?php
use SteeleRose\IHT205 as IHT205;

add_action('rest_api_init', function() {

    // Update
    register_rest_route(
        'theme/v' . $GLOBALS['theme_api_v'],
        '/pmachine/iht/',
        array(
            'methods' =>
                'GET',
            'callback' =>
                function() {
                    try {
                        $user_id =
                            get_current_user_id();

                        return IHT205\pm_generate_iht($user_id);

                    } catch(\Exception $e) {
                        return $e->getMessage();
                    }
                },
            'permission_callback' => function($request){
                return is_user_logged_in();
            }
        ));
});