<?php
$acf_prefix =
    "Block/deceased-overview/";

$progress_data =
    pm_get_form_progress_data();

// q101 = Title
// q102 = Surname
// q103 = First Name
// q105 = DoB
// q113 = DoD
$specific_data =
    pm_get_form_specific_data(array(
        'q101', 'q102', 'q103', 'q105', 'q113',
    ));

Timber::render(
    theme_get_patterns_dir(
        'deceased-overview',
        'deceased-overview.twig'
    ),
    array(
        'title' =>
            $specific_data['q101']['value'],
        'surname' =>
            $specific_data['q102']['value'],
        'first_name' =>
            $specific_data['q103']['value'],
        'dob' =>
            $specific_data['q105']['value'],
        'dod' =>
            $specific_data['q113']['value'],
        //'address' => 'some-address',
        'taskTracker' => $progress_data
    )
);