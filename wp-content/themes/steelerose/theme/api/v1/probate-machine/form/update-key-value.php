<?php
use SteeleRose\ProbateMachine as ProbateMachine;

add_action('rest_api_init', function() {

    // Update
    register_rest_route(
        'theme/v' . $GLOBALS['theme_api_v'],
        '/pmachine/form/update-key-value/',
        array(
            'methods' =>
                'POST',
            'callback' =>
                function($data) {
                    try {
                        $results =
                            json_decode($data->get_body(),
                                true
                            );

                        $user_id =
                            get_current_user_id();
                        $pb =
                            new ProbateMachine\Factory($user_id);

                        $output = [];
                        foreach($results as $result) {
                            $output[] = $pb->updateKV(
                                $result['id'],
                                (isset($result['status']) ? $result['status'] : false),
                                (isset($result['value']) ? $result['value'] : false)
                            );
                        }

                        return $output;

                    } catch(\Exception $e) {
                        return $e->getMessage();
                    }
                },
            'permission_callback' => function($request){
                return is_user_logged_in();
            }
        )
    );
});