<?php
/**
 * Hooks
 */
include_once __DIR__ . '/theme/hooks/stripe/customer.created.php';
include_once __DIR__ . '/theme/hooks/stripe/charge.succeeded.php';
include_once __DIR__ . '/theme/hooks/wp/wp_login.php';
include_once __DIR__ . '/theme/hooks/wp/wp_head.php';
/**
 * Bootstrap the theme
 */
include_once __DIR__ . '/_init/init.php';

/**
 * General stuff
 */
include_once __DIR__ . '/theme/custom.php';
include_once __DIR__ . '/theme/customizer.php';
include_once __DIR__ . '/theme/media.php';
include_once __DIR__ . '/theme/settings.php';
include_once __DIR__ . '/theme/shortcode.php';
include_once __DIR__ . '/theme/favicon.php';
include_once __DIR__ . '/theme/theme-editor.php';
include_once __DIR__ . '/theme/twig/global-vars.php';

add_theme_support('editor-styles');
add_theme_support('post-thumbnails');
add_theme_support('title-tag');

include_once __DIR__ . '/theme/menus.php';
include_once __DIR__ . '/theme/scripts.php';
// include_once __DIR__ . '/theme/scripts-dev.php';


include_once __DIR__ . '/theme/blocks/blocks.php';
include_once __DIR__ . '/theme/tinymce.php';

include_once __DIR__ . '/theme/sidebars.php';

/**
 * Filters
 */
include_once __DIR__ . '/theme/filters/content-set-password.php';

/**
 * Roles
 */
include_once __DIR__ . '/theme/roles.php';

/**
 * Probate Machine
 */
include_once __DIR__ . '/theme/lib/probate-machine/probate-machine.php';
include_once __DIR__ . '/theme/lib/IHT205/IHT205-write.php';

add_filter('show_admin_bar', '__return_false');

function add_file_types_to_uploads($file_types){

    $new_filetypes =
        array();
    $new_filetypes['svg'] =
        'image/svg';
    $file_types =
        array_merge($file_types, $new_filetypes );

    return $file_types;
}
add_action('upload_mimes', 'add_file_types_to_uploads');

function be_reusable_blocks_admin_menu() {
    add_menu_page( 'Reusable Blocks', 'Reusable Blocks', 'edit_posts', 'edit.php?post_type=wp_block', '', 'dashicons-editor-table', 22 );
}
add_action( 'admin_menu', 'be_reusable_blocks_admin_menu' );

/**
 * Temporary check user is Stripe Customer
 */
if(is_user_logged_in()) {
    $user_id =
        get_current_user_id();
    $user_ob =
        get_user_by('ID', $user_id);
    $customer =
        Theme\Customer::get(
            $user_ob->user_email,
            'stripe'
        );

    if(!$customer) {
        $customer =
            Theme\Customer::create(
                $user_ob->user_email
            );
        $customer =
            Theme\Stripe\Customer::create(array(
                'email' => $user_ob->user_email
            ));
    }
}