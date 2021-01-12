<?php

add_filter( 'acf/fields/wysiwyg/toolbars' , 'tinymce_toolbars'  );
function tinymce_toolbars( $toolbars ) {

    //echo '<pre>';
    //print_r($toolbars);
    //echo '</pre>';
    //die();

    $toolbars['Basic' ] = array();
    $toolbars['Basic' ][1] = array('bold', 'link', 'bullist');
    $toolbars['Basic'][2] = array('styleselect');
    $toolbars['Full'][2] = array('styleselect');


    return $toolbars;
}

function tinymce_before_init_insert_formats( $init_array ) {
    $style_formats = array(
        array(
            'title' => 'Button',
            'selector' => 'a',
            'classes' => 'dpl-button'
        ),
        array(
            'title' => 'Large text',
            'selector' => 'p',
            'classes' => 'h3'
        ),
        array(
            'title' => '1 col Check list',
            'selector' => 'ul',
            'classes' => 'dpl-checklist'
        ),
        array(
            'title' => '2 col Check list',
            'selector' => 'ul',
            'classes' => 'dpl-checklist two-col'
        )
    );
    $init_array['style_formats'] = json_encode( $style_formats );

    return $init_array;

}
add_filter( 'tiny_mce_before_init', 'tinymce_before_init_insert_formats' );