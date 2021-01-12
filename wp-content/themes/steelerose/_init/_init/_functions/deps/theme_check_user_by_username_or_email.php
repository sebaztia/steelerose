<?php
if(!function_exists('check_user_by_username_or_email')) {
    function check_user_by_username_or_email($username) {
        if(
            !username_exists($username) &&
            !email_exists($username)
        ) {
            return false;
        }

        return true;
    }
}