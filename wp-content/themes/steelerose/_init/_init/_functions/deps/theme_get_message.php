<?php
/**
 *
 */
if(!function_exists('theme_get_message')) {
    function theme_get_message($section, $type, $message, $replacement = array()) {

        if(!isset($GLOBALS['theme_messages']
            [$section]
            [$type]
            [$message])
        ) {
            return "Error";
        }

        array_unshift(
            $replacement,
            $GLOBALS['theme_messages']
            [$section]
            [$type]
            [$message]
        );

        return call_user_func_array(
            'sprintf',
            $replacement
        );

    }
}