<?php
use SteeleRose\TaskBasket as TaskBasket;

add_action('rest_api_init', function () {

    // Read
    register_rest_route(
        'theme/v' . $GLOBALS['theme_api_v'],
        '/pmachine/task-basket/get/(?P<status>[a-zA-Z0-9-]+)/',
        array(
            'methods' =>
                'GET',
            'callback' =>
                function ($data) {

                    $status = $data->get_param('status');

                    $user_id =
                       get_current_user_id();
                    $tb =
                        new TaskBasket\Factory($user_id);

                    $result = $tb->get(
                        (isset($status) ? $status : false)
                    );

                    return $result;
                },
            'permission_callback' => function ($request) {
                return is_user_logged_in();
            }
        ));
});