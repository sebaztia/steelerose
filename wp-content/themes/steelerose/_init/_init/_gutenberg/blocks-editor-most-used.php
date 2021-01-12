<?php
/**
 * Enables or Disables the "Most Used" Gutenberg blocks
 * in the Editor
 */

function gutenberg_editor_disable_most_used() { ?>
    <style>
        .components-popover__content .editor-inserter__results .components-panel__body:first-child {
            display: none;
        }
    </style>
<?php }

if(!$GLOBALS['theme_settings']
    ['Gutenberg']
    ['blocks_editor_most_used']
) {
    add_action('admin_head', 'gutenberg_editor_disable_most_used');
}