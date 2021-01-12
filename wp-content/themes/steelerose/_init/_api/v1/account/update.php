<?php
add_action('rest_api_init', function() {

    // Create
    register_rest_route(
        'theme/v' . $GLOBALS['theme_api_v'],
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
                        return \Theme\Account::update($body);
                    }

                    wp_die(
                        theme_get_message(
                            'Other',
                            'die',
                            'illegal_move'
                        )
                    );

                    return false;
                }
        ));
});