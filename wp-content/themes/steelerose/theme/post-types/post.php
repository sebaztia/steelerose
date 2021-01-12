<?php
namespace SteeleRose\Post;

define('ACF_POST_PREFIX', "PostType/post/");

function edit() {
    remove_post_type_support( 'post', 'editor' );
}
add_action( 'init', __NAMESPACE__ . '\edit' );