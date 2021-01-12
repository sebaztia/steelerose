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
    if(have_posts()) {
        while(have_posts()) {
            the_post();

            the_content();
        }
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