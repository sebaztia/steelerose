<?php
/* Template Name: Plain */
include_once theme_get_templates_dir() . '/head.php';
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
include_once theme_get_templates_dir() . '/foot.php';