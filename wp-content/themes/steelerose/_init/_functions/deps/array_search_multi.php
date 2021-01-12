<?php
function array_search_multi(
    $array,
    $key,
    $value,
    $parent = false
) {
    $results = array();

    if (is_array($array)) {
        if (isset($array[$key]) && $array[$key] == $value)
            $results[] = $array;

        foreach ($array as $id => $subarray) {
            $found = array_search_multi(
                $subarray, $key, $value
            );

            if(!empty($found)) {
                if($parent) {
                    $results[$id] =
                        $array[$id];

                } else {
                    $results = $found;
                }
            }
        }
    }

    return $results;
}