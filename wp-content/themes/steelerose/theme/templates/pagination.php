<?php
global $wp_query;
global $wp;
$data = array();

$current_page = (get_query_var('paged') ? get_query_var('paged') : 1);

if(is_tax() || is_category()) {
    $term = get_queried_object();
    $data = array(
        'nbPages' =>
            $wp_query->max_num_pages,
        'currentPage' =>
            $current_page,
        'url' =>
            get_term_link($term->term_id) . '/page/'
    );
}

if(is_search()) {
    $data = array(
        'nbPages' =>
            $wp_query->max_num_pages,
        'currentPage' =>
            $current_page,
        'url' =>
            get_site_url() . '?' . str_replace('&page='.$current_page ,'', $_SERVER['QUERY_STRING']) . '&page='
    );
}

if(is_post_type_archive()) {
    $data = array(
        'nbPages' =>
            $wp_query->max_num_pages,
        'currentPage' =>
            (get_query_var('paged') ? get_query_var('paged') : 1),
        'url' =>
            get_post_type_archive_link($wp_query->query['post_type']) . '/page/'
    );
}

Timber::render(
    theme_get_patterns_dir(
        'pagination',
        'pagination.twig'
    ),
    $data
);