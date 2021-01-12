<?php
# Load Composer packages
$v_autoload = get_template_directory() . '/vendor/autoload.php';
if(file_exists($v_autoload)) {
    require $v_autoload;
}

// Load Dotenv
if(class_exists('\Dotenv\Dotenv')) {
    $dotenv =
        new \Dotenv\Dotenv(
            get_template_directory()
        );
    $dotenv->load();
}

# Load theme-settings.ini
$s_autoload = get_template_directory() . '/theme-settings.ini';
if(file_exists($s_autoload)) {
    $GLOBALS['theme_settings'] =
        parse_ini_file(
            $s_autoload,
            true
        );
}

# Load theme-messages.ini
$m_autoload = get_template_directory() . '/theme-messages.ini';
if(file_exists($m_autoload)) {
    $GLOBALS['theme_messages'] =
        parse_ini_file(
            $m_autoload,
            true
        );
}

# Load functions
foreach (glob(__DIR__ . "/_functions/deps/*.php") as $f)  {
    include_once $f;
}
foreach (glob(__DIR__ . "/_functions/*.php") as $f)  {
    include_once $f;
}

include_once __DIR__ . '/_timber/timber.php';

# Load classes
foreach (glob(__DIR__ . "/_classes/*.php") as $c)  {
    include_once $c;
}

# Get API version
$apiV = $GLOBALS['theme_settings']['API']['version'];

# Load common API
require_all(__DIR__ . "/_api/v".$apiV, 2);

# Load custom API
require_all(get_template_directory() . "/theme/api/v".$apiV, 2);

# Load custom Lib
require_all(get_template_directory() . "/theme/lib", 2);

# Load custom wp-cli commands
include_once __DIR__ . '/_wp-cli/cli.php';

# ACF
include_once __DIR__ . '/_acf/acf.php';

# Gutenberg
include_once __DIR__ . '/_gutenberg/gutenberg.php';

# Post Type
include_once __DIR__ . '/_post-type/post-type.php';