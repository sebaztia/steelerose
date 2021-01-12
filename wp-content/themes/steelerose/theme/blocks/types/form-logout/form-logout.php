<?php
Timber::render(
    theme_get_patterns_dir(
        'form-logout',
        'form-logout.twig'
    ),
    Timber::context()
);
