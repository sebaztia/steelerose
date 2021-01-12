<?php
$cat_slug =
    cli\prompt
    ("Enter block category slug (lowercase, no spaces)");
$cat_slug = strtolower(
    str_replace(
        ' ', '-', $cat_slug
    )
);
$cat_title =
    cli\prompt
    ("Enter block category title");

try {
    theme_create_block_cat($cat_title, $cat_slug);

    WP_CLI
        ::success( "Successfully created block category `${cat_title}`" );

} catch(Exception $e) {
    WP_CLI
        ::error($e->getMessage());
}
