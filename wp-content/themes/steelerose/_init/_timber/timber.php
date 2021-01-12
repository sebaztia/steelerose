<?php
# Init Timber
if(class_exists('Timber\Timber')) {
    $timber =
        new Timber\Timber;
    $twig_locations =
        scandir_clean(
            theme_get_templates_dir(),
            true
        );
    $twig_locations[] =
        theme_get_patterns_dir();
    $twig_locations[] =
        theme_get_templates_dir();

    Timber::$locations =
        $twig_locations;

    add_filter('timber/loader/loader', function($loader){
        $loader->addPath(theme_get_patterns_dir(), "patterns");
        return $loader;
    });

}