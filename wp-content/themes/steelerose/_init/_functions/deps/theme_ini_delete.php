<?php
if(!function_exists('theme_ini_delete')) {
    function theme_ini_delete($section, $key, $val) {

        if(!isset($val)) {
            throw
            new Exception('Need to set value.');
        }

        $ini_file =
            get_template_directory() . '/theme-settings.ini';
        $ini_contents =
            file_get_contents($ini_file);

        if(file_exists($ini_file)) {
            $lines =
                explode("\n", $ini_contents);

            for($i=0; $i<count($lines); $i++) {
                $cleanup = str_replace(
                    array(' ', ';', "\""),
                    '',
                    $lines[$i]
                );

                if($cleanup===$key.'='.$val) {
                    unset($lines[$i]);
                }
            }

            $new_content =
                implode("\n", $lines);

            file_put_contents($ini_file, $new_content);
        }

        return false;
    }
}