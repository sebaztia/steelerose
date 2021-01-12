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
        <div class="container">
            <div class="row">
                <div class="eight columns">
                    <?php
                    if(have_posts()) {
                        while(have_posts()) {
                            the_post();

                            $data = array();
                            if(has_post_thumbnail()) {
                                $data['thumbnail']['href'] =
                                    get_the_post_thumbnail_url();
                                $data['thumbnail']['alt'] =
                                    get_the_title();
                            }
                            $data['author']['name'] =
                                get_the_author();
                            //$data['author']['url'] =
                             //   get_author_posts_url(get_the_author_meta('ID'));
                            $data['avatar']['img'] =
                                get_avatar_url(get_the_author_meta('ID'));
                            $data['date'] = date('d/m/Y', strtotime(get_the_date()));

                            $subtitle = get_field(
                                    ACF_CATEGORIES_PREFIX . 'charities/subtitle',
                                    get_the_ID()
                            );
                            $data['title'] =
                                get_the_title();
                            $data['subtitle'] =
                                $subtitle;

                            Timber::render(
                            theme_get_patterns_dir(
                                'single-entry-meta',
                                'single-entry-meta.twig'
                            ), $data);


                            $content =
                                get_field(ACF_POST_PREFIX . 'content');
                            echo '<div class="single-content">'.apply_filters('the_content', $content).'</div>';
                        }


                        $pTitle = false;
                        $pHref = false;
                        $nTitle = false;
                        $nHref = false;
                        $titleWrapper = '<span class="%s icon icon-chevron-%s"></span>%s<span class="pag-title">%s</span>' ;

                        if (get_previous_post()) {
                            $previous = get_previous_post();
                            $pTitle = sprintf($titleWrapper,  'prev','left', "PREV", get_the_title($previous));
                            $pHref = get_the_permalink($previous);
                        }
                        if (get_next_post()) {
                            $next = get_next_post();
                            $nTitle = sprintf($titleWrapper, 'next', 'right', "NEXT", get_the_title($next));
                            $nHref = get_the_permalink($next);
                        }
                        Timber::render(
                            theme_get_patterns_dir(
                                'single-prev-next',
                                'single-prev-next.twig'
                            ),
                            array(
                                'pTitle' => $pTitle,
                                'pHref' => $pHref,
                                'nTitle' => $nTitle,
                                'nHref' => $nHref
                            )
                        );
                    }
                    ?>
                </div>
                <div class="four columns">
                    <?php dynamic_sidebar('single-post-sidebar'); ?>
                </div>
            </div>
        </div>

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