<?php
if(
    !is_user_logged_in() &&
    isset($_GET['na']) &&
    isset($_GET['user'])
    && username_exists($_GET['user'])
) {

    wp_logout();

    $user = check_password_reset_key(
        $_GET['key'],
        $_GET['user']);

    if(!$user->errors) {

        add_filter('the_content', function($content) {
            if (is_main_query()) {
                $content = Timber::compile(
                    theme_get_patterns_dir(
                        'form-set-password',
                        'form-set-password.twig'
                    )
                );
            }
            return $content;
        }, 10, 10);
    }

}