<?php
add_action('rest_api_init', function() {

    // Create
    register_rest_route(
        'theme/v' . $GLOBALS['theme_api_v'],
        '/get-redirect/(?P<base>[a-zA-Z0-9-]+)/(?P<target>[a-zA-Z0-9-]+)/',
        array(
            'methods' =>
                'GET',
            'callback' =>
                function($data) {
                    $base = $data->get_param('base');
                    $target = $data->get_param('target');
                    $field = 'Settings/' . $base . '/' . $target;

                    $value = get_field(
                         $field, 'option'
                    );

                    if(!$value) {
                        return array(
                            'error' => __('field ' . $field . ' either has no value set or does not exist')
                        );
                    } else {
                        return array(
                            "field" => $field,
                            "value" => $value
                        );
                    }
                }
        ));
});