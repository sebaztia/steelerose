<?php
if(!function_exists('require_all')) {
    function require_all($dir, $depth) {
        // require all php files
        $scan = glob("$dir/*");
        foreach ($scan as $path) {
            if (preg_match('/\.php$/', $path)) {
                require_once $path;
            }
            elseif (is_dir($path)) {
                require_all($path, $depth+1);
            }
        }
    }
}