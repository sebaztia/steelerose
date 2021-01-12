<?php
/**
 * Returns directory listing
 * with no hidden directories or files
 * @param $dir
 * @return array
 */
function scandir_clean($dir, $full_paths = false) {
    $names = array_values(
        preg_grep(
            '/^([^.])/',
            scandir($dir)
        )
    );

    if($full_paths) {
        for($i=0;$i<count($names);$i++) {
            $names[$i] = $dir . $names[$i];
        }
    }

    return $names;
}