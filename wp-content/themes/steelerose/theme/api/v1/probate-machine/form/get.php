<?php
use SteeleRose\ProbateMachine as ProbateMachine;

add_action('rest_api_init', function() {

    // Read
    register_rest_route(
        'theme/v' . $GLOBALS['theme_api_v'],
        '/pmachine/form/get/',
        array(
            'methods' =>
                'GET',
            'callback' =>
                function() {
                    $user_id =
                        get_current_user_id();
                    $pb =
                        new ProbateMachine\Factory($user_id);

                    $result = $pb->get();
                    if($result) {
                        $result->result = true;
                    } else {
                        $result->result = false;
                    }

                    return $result;
                },
            'permission_callback' => function($request){
                return is_user_logged_in();
            }
        ));
});