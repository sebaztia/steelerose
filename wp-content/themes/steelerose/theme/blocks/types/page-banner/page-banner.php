<?php
$acf_prefix =
    "Block/page-banner/";

$backgroundColour =
    get_field($acf_prefix . 'backgroundColour');
$title =
    get_field($acf_prefix . 'title');
$subText =
    get_field($acf_prefix . 'subText');
$textColour =
    get_field($acf_prefix . 'textColour');
$breadcrumbs =
    get_field($acf_prefix . 'breadcrumbs');

if($breadcrumbs) {
    ob_start();
    include_once theme_get_templates_dir() . '/breadcrumbs.php';
    $bc = ob_get_contents();
    ob_end_clean();

     $breadcrumbs = $bc;
}

Timber::render(
    theme_get_patterns_dir(
        'page-banner',
        'page-banner.twig'
    ),
    array_merge(
        Timber::context(),
        array(
            'title' =>
                $title,
            'subText' =>
                $subText,
            'backgroundColour' =>
                $backgroundColour,
            'textColour' =>
                $textColour,
            'breadcrumbs' =>
                $breadcrumbs
        )
    )
);