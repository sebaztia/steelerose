<?php
// Fix excerpt length
add_filter( 'excerpt_length', function($length) {
    return 20;
});

add_action('pre_get_posts','alter_query');
function alter_query($query) {
    global $wp_query;

    if(isset($_GET['page'])) {
        if (!$query->is_main_query())
            return;

        $query->set('paged', $_GET['page']);

        remove_all_actions('__after_loop');
    }
}

function get_excerpt_from_field($field, $post_id, $wordCount = 100) {
    $content =
        strip_tags(get_field($field, $post_id));
    if(is_string($content) && strlen($content) > $wordCount) {
        $content =
            substr(
                $content,
                0,
                strpos($content, ' ', $wordCount)
            ) . '...';
    }

    return $content; 
}

// Scripts


add_action('wp_head', function () {
    $scriptClosingHead =
        get_field('Settings/scripts/closingHead', 'option');
    if($scriptClosingHead) {
        ?>
        <script type="text/javascript">
            <?= $scriptClosingHead ?>
        </script>
    <?php }
}, 10);



add_action('wp_footer', function () {
    $scriptClosingBody =
        get_field('Settings/scripts/closingBody', 'option');
    if($scriptClosingBody) {
        ?>
        <script type="text/javascript">
            <?= $scriptClosingBody ?>
        </script>
    <?php }

    $scriptClosingBodyNoScript =
        get_field('Settings/scripts/closingBodyNoScript', 'option');
    if($scriptClosingBodyNoScript) { ?>
        <noscript>
            <?= $scriptClosingBodyNoScript ?>
        </noscript>
    <?php }
});


