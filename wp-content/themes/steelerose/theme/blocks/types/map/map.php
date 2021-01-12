<?php
$acf_prefix =
    "Block/map/";

$query = new WP_Query(array(
    'post_status' => 'publish',
    'posts_per_page' => -1,
    'post_type' => 'location'
));

$locations = array();
if($query->have_posts()) {
    $i=0;
    while($query->have_posts()) {
        $query->the_post();

        $address = get_field(
            ACF_LOCATION_PREFIX . 'location',
            get_the_ID()
        );
        $telephone = get_field(
            ACF_LOCATION_PREFIX . 'telephone',
            get_the_ID()
        );

        $locations[$i]['lat'] = $address['lat'];
        $locations[$i]['lng'] = $address['lng'];
        $locations[$i]['address'] = $address['address'];
        $locations[$i]['telephone'] = $telephone;
        $locations[$i]['title'] = get_the_title();

        $i++;
    }

    //echo '<pre>';
    //print_r($locations);
    //echo '</pre>';

    Timber::render(
        theme_get_patterns_dir(
            'map',
            'map.twig'
        ),
        array(
            'locations' => $locations
        )
    );
}  else {
    echo '<p>Add location</p>';
}

