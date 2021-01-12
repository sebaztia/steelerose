<?php

add_action('widgets_init',
    // Single Posts Sidebar
    function () {
        register_sidebar(array(
            'name' => __('Single Post', 'steelerose'),
            'id' => 'single-post-sidebar',
            'description' => __('Single Post', 'steelerose'),
            'before_widget' => '<div id="%1$s" class="widget %2$s">',
            'after_widget' => "</div>",
            'before_title' => '<h4>',
            'after_title' => '</h4>',
        ));
    }
);