<?php
use ScssPhp\ScssPhp\Compiler;

if(theme_is_dev()) {

    add_action('admin_head', function() {
        $scss = new Compiler();
        $scss->setImportPaths(array(
            get_template_directory() . '/frontend/src',
            get_template_directory() . '/frontend/node_modules'
        ));
        $scss->setFormatter('ScssPhp\ScssPhp\Formatter\Compressed');
        $contents = file_get_contents(__DIR__ . '/blocks.scss');
        $output = $scss->compile(
            'div.acf-block-preview { ' . $contents . ' } '
        );

        if (!file_exists(__DIR__ . '/blocks.css')) {
            touch(__DIR__ . '/blocks.css');
        }
        file_put_contents(__DIR__ . '/blocks.css', $output);
        ?>
            <style><?= $output ?></style>
        <?php
    });
}

add_action('admin_head', function() {
    ?>
        <style type="text/css">
            .wp-block {
                max-width:100% !important;
            }</style>
    <?php
});

add_action('wp_head', function() {
    $scss = new Compiler();
    $scss->setImportPaths(array(
        get_template_directory() . '/frontend/src',
        get_template_directory() . '/frontend/node_modules'
    ));
    $scss->setSourceMap(Compiler::SOURCE_MAP_FILE);  // SOURCE_MAP_NONE, SOURCE_MAP_INLINE, or SOURCE_MAP_FILE
    $scss->setSourceMapOptions(array(
        'sourceMapWriteTo'  => __DIR__ . "/main.dev.map",
        'sourceMapURL'      => get_stylesheet_directory_uri() . '/theme/blocks/main.dev.map',
    ));
    $scss->setFormatter('ScssPhp\ScssPhp\Formatter\Compressed');
    $contents = file_get_contents(theme_get_frontend_dir() . '/../src/main.scss');
    $output = $scss->compile($contents);
    if (!file_exists(__DIR__ . '/main.dev.css')) {
        touch(__DIR__ . '/main.dev.css');
    }
    file_put_contents(__DIR__ . '/main.dev.css', $output);
},99,99);