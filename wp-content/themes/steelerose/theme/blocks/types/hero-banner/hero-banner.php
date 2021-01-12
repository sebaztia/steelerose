<?php
$acf_prefix = "Block/hero-banner/";
$imgPos =
    get_field($acf_prefix .'imgPos');
$imgAlign =
    get_field($acf_prefix . 'imgAlign');
$imgSrc =
    get_field($acf_prefix . 'imgSrc');
$imgCnt =
    get_field($acf_prefix . 'imgContain');
$title =
    get_field($acf_prefix . 'title');
$h1 =
    get_field($acf_prefix . 'titleH1');
$content =
    get_field($acf_prefix . 'content');
$twoThirdsContent =
    get_field($acf_prefix . 'twoThirdsContent');
$textColour =
    get_field($acf_prefix . 'textColour');
$backgroundColour =
    get_field($acf_prefix . 'backgroundColour');
$footText =
    get_field($acf_prefix . 'footText');
$breadcrumbs =
    get_field($acf_prefix . 'breadcrumbs');
$navigation =
    get_field($acf_prefix . 'navigation');

if($navigation) {
    $pages = new WP_Query(array(
        'post_type' => 'page',
        'post_status' => 'publish',
        'posts_per_page' => -1,
        'post_parent' => (int) $navigation,
        'orderby' => 'menu_order',
        'order' => 'ASC'
    ));

    if($pages->have_posts()) {
        $items = array();
        $i=0;
        while($pages->have_posts()) {
            $pages->the_post();
            $items[$i]['title'] = get_the_title();
            $items[$i]['url'] = get_the_permalink();
            $i++;
        }

        $links = Timber::compile(
            theme_get_patterns_dir(
                'arbitrary-navigation',
                'arbitrary-navigation.twig'
            ), array( 'items' => $items, 'cols' => true )
        );
        $content = $content.$links;
    }
}

$data = array(
    'imgPos' =>
        $imgPos,
    'imgSrc' =>
        $imgSrc,
    'imgAlign' =>
        $imgAlign,
    'imgCnt' =>
        $imgCnt,
    'title' =>
        $title,
    'h1' =>
        $h1,
    'content' =>
        $content,
    'twoThirdsContent' =>
        $twoThirdsContent,
    'textColour' =>
        (is_array($textColour) ? $textColour[0] : $textColour),
    'backgroundColour' =>
        (is_array($backgroundColour) ? $backgroundColour[0] : $backgroundColour),
    'footText' =>
        $footText
);

if($breadcrumbs) {
    ob_start();
    include_once theme_get_templates_dir() . '/breadcrumbs.php';
    $bc = ob_get_contents();
    ob_end_clean();

    $data['breadcrumbs'] = $bc;
}

Timber::render(
    theme_get_patterns_dir(
            'hero-banner',
            'hero-banner.twig'
    ),
    $data
);
