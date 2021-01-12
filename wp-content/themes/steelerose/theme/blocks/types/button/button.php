<?php
$acf_prefix = "Block/button/";
$data = array(
    'element' => 'a',
    'label' =>
        get_field($acf_prefix . 'label'),
    'colour' =>
        get_field($acf_prefix . 'colour'),
    'labelColour' =>
        get_field($acf_prefix . 'labelColour'),
    'href' =>
        get_field($acf_prefix . 'link'),
    'wrap' => 'div',
    'wrapClass' => 'text-center margin__bottom'
);

Timber::render(
    theme_get_patterns_dir(
            'button',
            'button.twig'
    ),
    $data
);