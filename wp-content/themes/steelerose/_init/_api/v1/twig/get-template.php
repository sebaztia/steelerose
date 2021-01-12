<?php
add_action('rest_api_init', function() {

    // Create
    register_rest_route(
        'theme/v' . $GLOBALS['theme_api_v'],
        '/twig/get-template',
        array(
            'methods' =>
                'POST',
            'callback' =>
                function($data) {

                    $allowed = array(
                        'payment-form.twig',
                        'payment-overview.twig',
                        'payment-methods.twig',
                        'payment-methods-confirm.twig',
                        'payment-charges.twig'
                    );

                    $body =
                        json_decode($data->get_body(),
                            true
                        );

                    if(!isset($body['path'])) {
                        return array('errors' => '[SITE] No path specified.');
                    }
                    if(!isset($body['filename'])) {
                        return array('error' => '[SITE] No filename specified');
                    }

                    if(!in_array($body['filename'], $allowed)) {
                        return array('errors' => '[SITE] template not allowed');
                    }

                    try {
                        $compiled = Timber::compile(
                            theme_get_patterns_dir(
                                $body['path'],
                                $body['filename']
                        ), array_merge($body['data'], Timber::context())
                        );

                        return $compiled;

                    } catch (\Exception $e) {
                        return array('errors' => $e->getMessage());
                    }
                }
        ));
});