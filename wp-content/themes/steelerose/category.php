<?php
// Render the Head
include_once theme_get_templates_dir() . '/head.php';

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
        $page = (get_query_var('paged') ? get_query_var('paged') : 1);
        $category = get_queried_object();

        ob_start();
        include_once theme_get_templates_dir() . '/breadcrumbs.php';
        $bc = ob_get_contents();
        ob_end_clean();

        $breadcrumbs = $bc;

        Timber::render(
            theme_get_patterns_dir(
                'page-banner',
                'page-banner.twig'
            ),
            array_merge(
                Timber::context(),
                array(
                    'title' =>
                        'Latest news<span class="caps">' .
                        ($category->slug!=='news' ? ' : '.$category->cat_name : '').
                        ($page>1 ? ' <small>(' . $page . ')</small>' : '') .
                        '</span>',
                    'backgroundColour' =>
                        'grey',
                    'textColour' =>
                        'light',
                    'breadcrumbs' =>
                        $breadcrumbs
                )
            )
        );

        ?>
        <div class="section-row nomargin--bottom"><div class="container">
                <h3 class="text-center"><?php _e( 'Select Category', 'steelerose' ); ?></h3>
                <form id="category-select" class="category-select" action="<?php echo esc_url( home_url( '/' ) ); ?>" method="get">
                    <?php
                    $args = array(
                        'show_count'    => 1,
                        'orderby'       => 'name',
                        'echo'          => false,
                        'hide_if_empty' => true
                    );
                    ?>

                    <?php $select  = wp_dropdown_categories( $args ); ?>
                    <?php $replace = "<select$1 onchange='return this.form.submit()'>"; ?>
                    <?php $select  = preg_replace( '#<select([^>]*)>#', $replace, $select ); ?>

                    <?php echo $select; ?>

                    <noscript>
                        <input type="submit" value="View" />
                    </noscript>
                </form>
        </div></div>

        <?php
        if(have_posts()) {
            $i = 0;
            while (have_posts()) {
                the_post();

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


            if ($data) {
                $data['foottext'] =
                    single_cat_title(false, false);
                Timber::render(
                    theme_get_patterns_dir(
                        'post-grid',
                        'post-grid.twig'
                    ),
                    $data
                );
            }

            echo '<div class="container"><div class="row"><div class="columns twelve">';
            include_once theme_get_templates_dir() . 'pagination.php';
            echo '</div></div></div>';
        }
        ?>
    </main>

<?php
// Render the Footer
Timber::render(
    theme_get_patterns_dir(
        'footer',
        'footer.twig'
    ),
    Timber::context()
);

// Render the Foot
include_once theme_get_templates_dir() . '/foot.php'; ?>