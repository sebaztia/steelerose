<?php
/* Template Name: Plain */
include_once theme_get_templates_dir() . '/head.php';

global $wp_query;
$total_results = $wp_query->found_posts;
$_GET = filter_input_array(INPUT_GET, FILTER_SANITIZE_STRING);
$search_term = $_GET['s'];
if (isset($_GET['post_type'])){
    $post_type_term = $_GET['post_type'];
} else {
    $post_type_term = '';
}

$args = array(
    'public'   => true,
    '_builtin' => false
);

$output = 'objects'; // names or objects, note names is the default
$operator = 'and'; // 'and' or 'or'

$post_types = get_post_types( $args, $output, $operator );

$exclude_from_dropdown = array('accreditation', 'testimonial');

// Render the Header
Timber::render(
    theme_get_patterns_dir(
        'header',
        'header.twig'
    ),
    Timber::context()
);
?>
    <main id="main">

        <?php
        ob_start();
        include_once theme_get_templates_dir() . '/breadcrumbs.php';
        $bc = ob_get_contents();
        ob_end_clean();

        $breadcrumbs = $bc;

        if ($search_term != ""){
            $title = 'Search Results: "' . $search_term  . '"';
        } else {
            $title = 'Your Search Results';
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
                    'backgroundColour' =>
                        'brand1',
                    'textColour' => 'light',
                    'breadcrumbs' =>
                        $breadcrumbs
                )
            )
        );
        ?>

        <div class="container">
            <div class="section-row">
                <div class="row">
                    <div class="eight columns">
                        <div class="inpage_searchform">
                            <form role="search" method="get" id="searchform" action="<?php echo home_url( '/' ); ?>">
                                <h5>Search Term:</h5>
                                <input type="text" name="s" id="s" value="<?php echo $search_term ?>" class="custom-input" placeholder="Please enter search term" />
                                <br />
                                <br />
                                <!-- <h5>Content Type:</h5>
                            <select name="post_type" >
                                <option value="">All Categories</option>
                                <?php foreach ( $post_types  as $post_type ) { ?>
                                    <?php if (!in_array($post_type->name, $exclude_from_dropdown)){ ?>
                                        <option value="<?php echo $post_type->name; ?>"<?php if ($post_type_term == $post_type->name){echo " selected";} ?>><?php echo $post_type->label; ?></option>
                                    <?php } ?>
                                <?php } ?>
                                <option value="post"<?php if ($post_type_term == "post"){echo " selected";} ?>>News posts</option>
                                <option value="page"<?php if ($post_type_term == "page"){echo " selected";} ?>>Pages</option>
                            </select><br /><br />
                            <input type="submit" id="searchsubmit" value="Search" class="button clear-button" /> -->
                            </form>
                        </div>
                        <p class="results-count"><strong>Results:</strong> <?php echo $total_results; ?></p>

                        <?php

                        if ($total_results  == 0) {
                            $no_search_results_message =
                                theme_get_message('Search', 'response', 'noresults'
                                );
                            echo '<p>' . $no_search_results_message . '</p>';
                        }
                        ?>

                        <?php if (have_posts()) { ?>
                        <div class="search-results">
                            <?php while (have_posts()) {
                                the_post(); ?>
                                <div class="result-item">
                                    <?php $post_info = get_post();
                                    $post_type = $post_info->post_type;
                                    $post_type = str_replace("-", " ", $post_type);
                                    $post_type = ucwords($post_type);

                                    if ($post_type == "Attachment"){
                                        $post_type = $post_info->post_mime_type;

                                        $search_link = $post_info->guid;
                                        $search_target = " target='_blank'";
                                    } else{
                                        $search_link = get_permalink();
                                        $search_target = "";
                                    }
                                    ?>
                                    <h4><a href="<?php echo $search_link; ?> "><?php the_title(); ?></a></h4>

                                    <div class="result-intro-copy">
                                        <?php $post_info = get_post();
                                        $post_type = $post_info->post_type;
                                        $post_type = str_replace("-", " ", $post_type);
                                        $post_type = ucwords($post_type);

                                        if ($post_type == "Attachment"){
                                            $post_type = $post_info->post_mime_type;
                                        }

                                        ?>
                                        <div class="content-type">Content type: <?php echo $post_type; ?></div>
                                    </div>
                                    <?= get_the_excerpt() ?>
                                    <br /><br />
                                </div>

                            <?php }
                            include_once theme_get_templates_dir() . 'pagination.php';
                            }
                            ?>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                </div>
            </div>
        </div>
    </main>
<?php
Timber::render(
    theme_get_patterns_dir(
        'footer',
        'footer.twig'
    ),
    Timber::context()
);
include_once theme_get_templates_dir() . '/foot.php';