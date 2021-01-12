<?php
/**
 * Install base theme assets
 * Set ACF key
 */

$cwd = get_template_directory();

// Setup ACF
try {
    $acf_key =
        cli\prompt("Enter ACF Pro key (enter for no key)");
    theme_env_add("ACF_PRO_KEY", $acf_key);

} catch(\Exception $e) {
    WP_CLI
        ::error($e->getMessage());
}

// Install Composer Packages
WP_CLI
    ::log( "### INSTALLING COMPOSER PACKAGES ###" );
try {
    shell_exec("cd ${cwd} && php 'composer.phar' install");
    WP_CLI
        ::success( "Composer packages installed!" );
} catch (Exception $e) {
    WP_CLI::error($e->getMessage());
}

// Install NPM Packages
WP_CLI
    ::log( "### INSTALLING NODE PACKAGES ###" );
try {
    shell_exec("cd ${cwd} && npm install");
    WP_CLI
        ::success( "Node packages installed!" );
} catch (Exception $e) {
    WP_CLI::error($e->getMessage());
}

WP_CLI
    ::success( "Theme installed!" );