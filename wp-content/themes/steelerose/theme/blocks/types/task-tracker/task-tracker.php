<?php
$progress_data =
    pm_get_form_progress_data();

Timber::render(
    theme_get_patterns_dir(
        'task-tracker',
        'task-tracker.twig'
    ),
    $progress_data
);