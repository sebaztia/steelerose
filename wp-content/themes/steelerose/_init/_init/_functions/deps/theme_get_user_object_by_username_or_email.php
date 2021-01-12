<?php
if(!function_exists('theme_get_user_object_by_username_or_email')) {
    function theme_get_user_object_by_username_or_email($username) {
        $user = false;

        if(username_exists($username)) {
            $user =
                get_user_by('login', $username);
        }
        if(email_exists($username)) {
            $user =
                get_user_by('email', $username);
        }

        return $user;
    }
}