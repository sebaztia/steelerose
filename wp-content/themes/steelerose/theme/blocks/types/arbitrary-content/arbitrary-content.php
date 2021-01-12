<?php
$acf_prefix = "Block/arbitrary-content/";
$data = array(
    'title' =>
        get_field($acf_prefix . 'title'),
    'content' =>
        get_field($acf_prefix . 'content'),
    'width' =>
        get_field($acf_prefix . 'width'),
    'align' =>
        get_field($acf_prefix . 'align'),
    'backgroundColour' =>
        get_field($acf_prefix .'backgroundColour')
);

Timber::render(
    theme_get_patterns_dir(
        'arbitrary-content',
        'arbitrary-content.twig'
    ),
    $data
);