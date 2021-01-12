<?php
use SteeleRose\TaskBasket as TaskBasket;

add_action('rest_api_init', function () {

    // Read
    register_rest_route(
        'theme/v' . $GLOBALS['theme_api_v'],
        '/pmachine/task-basket/update/',
        array(
            'methods' =>
                'POST',
            'callback' =>
                function ($data) {
                    try {
                        $body =
                            json_decode($data->get_body(),
                                true
                            );
                        $user_id =
                            get_current_user_id();
                        $tb =
                            new TaskBasket\Factory($user_id);
                        $tb->set($body['task'],
                            (isset($body['status']) ? $body['status'] : 'waiting'),
                            (isset($body['price']) ? $body['price'] : false)
                        );
                        return $tb->update();
                    } catch(\Exception $e) {
                        return $e->getMessage();
                    }
                },
            'permission_callback' => function ($request) {
               return is_user_logged_in();
            }
        ));
});