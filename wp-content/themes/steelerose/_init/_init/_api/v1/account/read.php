<?php
add_action('rest_api_init', function() {

    // Read
    register_rest_route(
        'theme/v1',
        'account/(?P<id>\d+)/',
        array(
            'methods' =>
                'GET',
            'callback' =>
                function($data) {
                    $id = $data->get_param('id');

                    return \Theme\Account::read($id);
                }
        ));
});