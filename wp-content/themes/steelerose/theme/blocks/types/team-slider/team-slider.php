<?php
$acf_prefix =
    "Block/team-slider/";

$args = array(
    'post_type' => 'team',
    'posts_per_page' => -1,
    'post_status' => 'publish',
    'ignore_sticky_posts' => true
);

$query =
    new WP_Query($args);


$slides = array();
$title =
    get_field($acf_prefix . 'title');
$slides['title'] =
    $title;
$slides['contact'] =
    get_field($acf_prefix . 'contact');
$slides['footText'] =
    get_field($acf_prefix . 'footText');
/*$slides['backgroundColour'] =
    get_field($acf_prefix . 'backgroundColour'); */

if ($query->have_posts()) {
    $i = 0;
    while ($query->have_posts()) {
        $query->the_post();

        $avatar =
            get_field(ACF_TEAM_PREFIX . 'avatar', get_the_ID());
        $avatar =
            $avatar['sizes']['thumbnail'];
        $title =
            get_the_title();

        $cats =
            wp_get_post_terms(get_the_ID(), 'team-categories');
        $categories = '';
        if($cats) {
            foreach($cats as $cat) {
                $categories .= $cat->term_id . ',';
            }
            $categories = rtrim($categories, ',');
        }

        $slides['slides'][$i]['ID'] =
            get_the_ID();
        $slides['slides'][$i]['avatar'] =
            $avatar;
        $slides['slides'][$i]['title'] =
            $title;
        $slides['slides'][$i]['categories'] =
            $categories;

        $interests = get_field(ACF_TEAM_PREFIX . 'interests', get_the_ID());
        $activities = get_field(ACF_TEAM_PREFIX . 'activities', get_the_ID());
        $education = get_field(ACF_TEAM_PREFIX . 'education', get_the_ID());
        $achievement = get_field(ACF_TEAM_PREFIX . 'achievement', get_the_ID());
        $largeImage = get_field(ACF_TEAM_PREFIX . 'largeImage', get_the_ID());

        $slides['slides'][$i]['interests'] =
            $interests;
        $slides['slides'][$i]['activities'] =
            $activities;
        $slides['slides'][$i]['education'] =
            $education;
        $slides['slides'][$i]['achievement'] =
            $achievement;
        $slides['slides'][$i]['largeImage'] =
            $largeImage['sizes']['medium'];
        $i++;
    }
}

$teamCategories = get_terms('team-categories', array(
    'hide_empty' => true,
));
$nav = false;
if ($teamCategories) {
    $nav = array();
    $i = 0;
    foreach ($teamCategories as $t) {
        $nav[$i]['ID'] = $t->term_id;
        $nav[$i]['label'] = $t->name;
        $i++;
    }
}

$slides['nav'] = $nav;

if (!empty($slides)) {
    Timber::render(
        theme_get_patterns_dir(
            'team-slider',
            'team-slider.twig'
        ),
        $slides
    );
} else {
    echo '<p>Add some team members</p>';
}