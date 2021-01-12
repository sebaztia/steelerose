<?php
$command_prefix =
    (isset($GLOBALS['theme_settings']
        ['WP-CLI']
        ['command_prefix']) ?
        $GLOBALS['theme_settings']
        ['WP-CLI']
        ['command_prefix'] :
        'custom'
    );

if ( defined( 'WP_CLI' ) && WP_CLI ) {

    class ThemeWPCLI {

        public function theme_install() {
            include_once
                __DIR__ . '/commands/theme_install.php';
        }

        public function block_create_cat($args, $assoc_args) {
            include_once
                __DIR__ . '/commands/block_create_cat.php';
        }

        public function block_remove_cat($args, $assoc_args) {
            include_once
                __DIR__ . '/commands/block_remove_cat.php';
        }

        public function block_create($args, $assoc_args) {
            include_once
                __DIR__ . '/commands/block_create.php';
        }

        public function block_remove($args, $assoc_args) {
            include_once
                __DIR__ . '/commands/block_remove.php';
        }

        public function api_endpoint_create($args, $assoc_args) {
            include_once
                __DIR__ . '/commands/api_endpoint_create.php';
        }
    }

    WP_CLI::add_command($command_prefix, 'ThemeWPCLI' );
}