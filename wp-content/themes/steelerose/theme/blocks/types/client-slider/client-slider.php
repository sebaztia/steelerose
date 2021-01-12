<?php
$acf_prefix =
    "Block/client-slider/";

$title =
    get_field($acf_prefix . 'title');
$backgroundColour =
    get_field($acf_prefix . 'backgroundColour');


$queryArgs =
    array(
        'post_type' => 'post',
        'ignore_sticky_posts' => true,
        'post_status' => 'publish',
        'category_name' => 'charities',
        'posts_per_page' => -1
    );
$query =
    new WP_Query($queryArgs);

$data = false;
if($query->have_posts()) {
    echo '<div class="bg-' . $backgroundColour . '">';
    echo '<section class="section-row">';
    if($title) {
        echo '<h2 class="text-center">' . $title . '</h2>';
    }
    $even = true;
    while($query->have_posts()) {
        $query->the_post();

        $title = get_the_title();
        $thumb = get_the_post_thumbnail_url(get_the_ID(),'thumbnail');

        $subtitle =
            get_field(
                    ACF_CATEGORIES_PREFIX . 'charities/subtitle',
                get_the_ID()
            );

        $description = get_the_excerpt();
        $buttonHref = get_the_permalink();

        $thumbAlign = 'right';
        if($even) {
            $thumbAlign = 'left';
        }

        Timber::render(
            theme_get_patterns_dir(
                'profile-slide',
                'profile-slide.twig'
            ),
            array(
                    'thumbAlign' => $thumbAlign,
                    'thumb' => $thumb,
                    'title' => $title,
                    'subtitle' => $subtitle,
                    'description' => $description,
                    'buttonHref' => $buttonHref,
                    'buttonLabel' => "Find out more",
                    'inview' => true
            )
        );

        $even = !$even;
    }
    echo '</section>';
    echo '</div>';
}