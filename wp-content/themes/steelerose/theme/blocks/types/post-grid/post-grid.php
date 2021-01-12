<?php
$acf_prefix =
    "Block/post-grid/";

$title =
    get_field($acf_prefix . 'title');
/* $category =
    get_field($acf_prefix . 'category'); */
$charity =
    get_field($acf_prefix .'charity');
$category =
    get_field($acf_prefix . 'category');
$footText =
    get_field($acf_prefix . 'footText');
$backgroundColour =
    get_field($acf_prefix . 'backgroundColour');


$data['title'] = $title;
$data['footText'] = $footText;
$data['backgroundColour'] = $backgroundColour;

$i = 0;
if($charity) {
    $charityArgs = array(
        'post_type' => 'post',
        'posts_per_page' => 1,
        'post_status' => 'publish',
        'category_name' => 'charities'
    );

    $query = new WP_Query($charityArgs);

    if($query->have_posts()) {
        while($query->have_posts()) {
            $query->the_post();

            $data['cols'][$i] = array(
                'title' => get_the_title(),
                'date' => 'FEATURED CHARITY',
                'excerpt' => get_excerpt_from_field(ACF_POST_PREFIX . 'content', get_the_ID()),
                'href' => get_the_permalink(),
                'inview' => true,
                'class' => 'secondary'
            );

            $i++;
        }
    }

    wp_reset_query();

}

$queryArgs =
    array(
        'post_type' => 'post',
        'posts_per_page' => ($charity ? 2 : 3),
        'post_status' => 'publish',
        'category__in' => ($category ? $category : false)
    );
$query =
    new WP_Query($queryArgs);

if($query->have_posts()) {
    while($query->have_posts()) {
        $query->the_post();

        $categories = get_the_category();
        $class = false;
        foreach($categories as $cat) {
            $class = get_field(
                'Taxonomy/category/backgroundColour',
                'category_' . $cat->term_id
            );
        }

        $data['cols'][$i] = array(
            'title' => get_the_title(),
            'date' => date('d/m/Y', strtotime(get_the_date())),
            'excerpt' => get_excerpt_from_field(ACF_POST_PREFIX . 'content', get_the_ID()),
            'href' => get_the_permalink(),
            'inview' => true,
            'class' => ($class ? $class : '')
        );

        $i++;
    }
}


if($data) {
    $data['foottext'] = "LATEST NEWS";
    Timber::render(
        theme_get_patterns_dir(
            'post-grid',
            'post-grid.twig'
        ),
        $data
    );
}