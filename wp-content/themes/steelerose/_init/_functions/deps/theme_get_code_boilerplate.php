<?php
if(!function_exists('theme_get_code_boilerplate')) {
    /**
     * @param $type
     * @param $ext
     * @param array $rep
     * $rep = array($slug, $id, $function_name)
     * @return false|string|WP_Error
     */
    function theme_get_code_boilerplate($type, $ext, $rep = array()) {

        if(count($rep) < 3) {
            for($i=0; $i<3; $i++) {
                if(!isset($rep[$i])) {
                    $rep[$i] =
                        uniqid();
                }
            }
        }

        $rep[2] =
            str_replace(
                '-',
                '_',
                $rep[2]
            );

        $file = get_template_directory() . '/' .
            $GLOBALS['theme_settings']
            ['General']
            ['init_dir'] .
            '/_boilerplate/' . $ext . '/' .
            $type . '.' . $ext . '.txt';


        if(file_exists($file)) {
            $contents =
                file_get_contents($file);

            if(!empty($rep)) {
                $contents =
                    vsprintf($contents, $rep);
            }

            return $contents;
        }

        return new WP_Error(
            'init/_boilerplate',
            $file . ' does not exist'
        );
    }
}