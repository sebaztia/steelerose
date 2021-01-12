<?php
use SteeleRose\ProbateMachine as ProbateMachine;

add_action('rest_api_init', function() {

    // Update
    register_rest_route(
        'theme/v' . $GLOBALS['theme_api_v'],
        '/pmachine/form/update/',
        array(
            'methods' =>
                'POST',
            'callback' =>
                function($data) {

                    try {
                        $body =
                            json_decode($data->get_body(),
                                true
                            );

                        $user_id =
                            get_current_user_id();
                        $pb =
                            new ProbateMachine\Factory($user_id);
                        $pb->set($body);
                        return $pb->update();
                    } catch(\Exception $e) {
                        return $e->getMessage();
                    }
                },
            'permission_callback' => function($request){
                return is_user_logged_in();
            }
        ));
});