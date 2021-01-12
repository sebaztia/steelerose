<?php
// SVG icons
add_action('wp_head', function() {
    include_once
        theme_get_frontend_dir() . '/../src/sass-common/icomoon/symbol-defs.svg';
});