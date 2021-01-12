<?php
function render_favicon($path) {
    $url = get_stylesheet_directory_uri() . '/favicon/'.$_SERVER['HTTP_HOST'].'/';
    ?>
    <link rel="icon" type="image/png" href="<?= $url ?>favicon-196x196.png" sizes="196x196" />
    <link rel="icon" type="image/png" href="<?= $url ?>favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/png" href="<?= $url ?>favicon-32x32.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="<?= $url ?>favicon-16x16.png" sizes="16x16" />
    <link rel="icon" type="image/png" href="<?= $url ?>favicon-128.png" sizes="128x128" />
    <meta name="application-name" content="&nbsp;"/>
    <meta name="msapplication-TileColor" content="#FFFFFF" />
    <meta name="msapplication-TileImage" content="<?= $url ?>mstile-144x144.png" />
    <meta name="msapplication-square70x70logo" content="<?= $url ?>mstile-70x70.png" />
    <meta name="msapplication-square150x150logo" content="<?= $url ?>mstile-150x150.png" />
    <meta name="msapplication-wide310x150logo" content="<?= $url ?>mstile-310x150.png" />
    <meta name="msapplication-square310x310logo" content="m<?= $url ?>stile-310x310.png" />
<?php }
add_action('wp_head', 'render_favicon');

