<?php
if(!function_exists('theme_get_admin_template')) {
    function theme_get_admin_template($slug, $name, $data = false) {
        if(!is_admin()) {
            return false;
        }

        $tpl =
            theme_get_init_dir() .
            '_admin/templates/' .
            $slug .
            '/' .
            $name .
            '.php';

        if(file_exists($tpl)) {
            include($tpl);
            return true;
        }

        return false;
    }
}