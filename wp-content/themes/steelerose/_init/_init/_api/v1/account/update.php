<?php
add_action('rest_api_init', function() {

    // Create
    register_rest_route(
        'theme/v1',
        'account/update',
        array(
            'methods' =>
                'POST',
            'callback' =>
                function($data) {
                    $body =
                        json_decode($data->get_body(),
                            true
                        );

                    if(!is_user_logged_in()) {
                        wp_die(
                            theme_get_message(
                                'Other',
                                'die',
                                'illegal_move'
                            )
                        );
                    }

                    return \Theme\Account::update($body);
                }
        ));
});