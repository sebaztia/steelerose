<?php
/**
 *
 */
if(!function_exists('theme_env_add')) {
    /**
     * Add environment variable to .env
     * Returns full contents of .env as array
     * @param $key
     * @param $val
     * @return array
     */
    function theme_env_add($key, $val) {
        $env_file =
            get_template_directory() . "/.env";
        $env_key =
            "${key}=";
        $env_line =
            $env_key . $val;

        if(!file_exists($env_file) || !file_get_contents($env_file)) {
            touch($env_file);
            file_put_contents($env_file, $env_line);
        }

        $env_text =
            file_get_contents($env_file);
        $env_array =
            explode(PHP_EOL, $env_text);

        if(!empty($env_array)) {
            for ($i = 0; $i < count($env_array); $i++) {
                if (strpos($env_array[$i], $env_key) !== false) {
                    $env_array[$i] = $env_line;
                } else {
                    array_push($env_array, $env_line);
                }
            }
        }

        $env_array = array_unique($env_array);
        $env_text = implode("\n", $env_array);
        file_put_contents($env_file, $env_text);

        return $env_array;
    }
}
