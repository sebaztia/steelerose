<?php
function acf_register_block_categories($categories, $post) {
    $cats_dir =
        theme_get_blocks_dir() . '/categories/';
    $add_cats =
        array();

    foreach (glob($cats_dir . "*.json") as $cat) {
        $json =
            json_decode(
                file_get_contents($cat),
                true
            );
        $add_cats[] = $json;
    }

    $categories = array_merge($categories, $add_cats);

    return $categories;
}
add_filter( 'block_categories', 'acf_register_block_categories', 10, 2);

function acf_register_block_types() {

    $blocks_dir =
        theme_get_blocks_dir() . 'types';

    $blocks_list = preg_grep(
        '/^([^.])/',
        scandir($blocks_dir)
    );

    foreach($blocks_list as $block) {
        $block_data = $blocks_dir . "/" . $block . "/" . $block . '.json';
        if(file_exists($block_data)) {
            $json =
                json_decode(
                    file_get_contents($block_data),
                    true
                );

            $json['render_template'] =
                theme_get_blocks_dir()  .
                'types/' .
                $json['name'] . '/' .
                $json['name'] . '.php';

            acf_register_block_type($json);
        }
    }
}

if( function_exists('acf_register_block_type') ) {
    add_action('acf/init', 'acf_register_block_types');
}