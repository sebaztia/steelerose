<?php
$acf_prefix = "Block/call-to-action/";

$type =
    get_field($acf_prefix . 'type');
$textColour =
    get_field($acf_prefix . 'textColour');
$backgroundColour =
    get_field($acf_prefix . 'backgroundColour');
$align =
    get_field($acf_prefix . 'align');
$contentType =
    get_field($acf_prefix . 'contentType');
if($contentType==='text') {
    $content =
        get_field($acf_prefix . 'content');
}
$embedSrc = false;
$video = get_field($acf_prefix . 'video', false, false);
if($video) {
    $embedSrc = str_replace("watch?v=", '/embed/', $video);
}
if($contentType==='list') {
    $list =
        get_field($acf_prefix . 'list');
    $listItems = array();
    $i = 0;
    foreach($list as $item) {
        $listItems[$i] = array(
            'heading' => $item[$acf_prefix . 'list/heading'],
            'subHeading' => $item[$acf_prefix . 'list/subHeading']
        );
        $i++;
    }

    if(!empty($listItems)) {
        $content = Timber::compile(
            theme_get_patterns_dir(
                'bullet-list',
                'bullet-list.twig'
            ), array( 'list' => $listItems )
        );
    }
}
$links = false;
$hasNavigation =
    get_field($acf_prefix . 'content/navigation');
if($hasNavigation) {
    $navigationLinks =
        get_field($acf_prefix . 'content/navigationLinks');
    $items = array();
    $i=0;
    foreach($navigationLinks as $link) {
        $items[$i]['title'] = get_the_title($link);
        $items[$i]['url'] = get_the_permalink($link);
        $i++;
    }

    $links = Timber::compile(
        theme_get_patterns_dir(
            'arbitrary-navigation',
            'arbitrary-navigation.twig'
        ), array( 'items' => $items, 'cols' => true )
    );

    $content = $content . $links;
}


$data = array(
    'type' =>
        (is_array($type) ? $type[0] : $type),
    'imgSrc' =>
        get_field($acf_prefix . 'imgSrc'),
    'imgAlt' =>
        get_field($acf_prefix . 'imgAlt'),
    'imgFill' =>
        get_field($acf_prefix . 'imgFill'),
    'imgAlign' =>
        get_field($acf_prefix . 'imgAlign'),
    'embedSrc' =>
        $embedSrc,
    'textColour' =>
        (is_array($textColour) ? $textColour[0] : $textColour),
    'backgroundColour' =>
        (is_array($backgroundColour) ? $backgroundColour[0] : $backgroundColour),
    'align' =>
        (is_array($align) ? $align[0] : $align),
    'title' =>
        get_field($acf_prefix . 'title'),
    'content' =>
        $content,
    'links' =>
        $links,
    'buttonLabel' =>
        get_field($acf_prefix . 'buttonLabel'),
    'buttonHref' =>
        get_field($acf_prefix . 'buttonHref'),
    'footText' =>
        get_field($acf_prefix . 'footText'),
    'inview' => true
);

Timber::render(
    theme_get_patterns_dir(
            'call-to-action',
            'call-to-action.twig'
    ),
    $data
);