<?php
if(!function_exists('theme_remove_block')) {
    function theme_remove_block($name) {
        $blocks_dir =
            theme_get_blocks_dir() . 'types/';
        $fields_dir =
            theme_get_fields_dir();

        $dir = "${blocks_dir}${name}";

        if (file_exists($dir)) {
            array_map(
                'unlink',
                glob("${dir}/*.*"
                )
            );
            rmdir($dir);
        }

        foreach (glob($fields_dir . "*.json") as $file) {
            $json =
                json_decode(
                    file_get_contents($file)
                );

            if ($json->title === "Block/${name}") {
                unlink($file);
            }
        }

        try {
            theme_ini_delete(
                "Gutenberg",
                "blocks_allowed[]",
                "acf/${name}"
            );

        } catch (Exception $e) {
            return $e->getMessage();
        }
    }
}