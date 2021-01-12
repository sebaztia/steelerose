<?php
$acf_prefix =
    "Block/stat-grid/";
$cols =
    get_field($acf_prefix . 'cols');
$title =
    get_field($acf_prefix . 'title');

$data = array();
$data['title'] = $title;
$data['backgroundColour'] =
    get_field($acf_prefix . 'backgroundColour');

$i = 0;
foreach($cols as $col) {
    $data['cols'][$i]['text'] =
        $col[$acf_prefix . 'col/text'];
    $data['cols'][$i]['value'] =
        $col[$acf_prefix . 'col/value'];
    $i++;
}

if($data) {
    Timber::render(
        theme_get_patterns_dir(
            'stat-grid',
            'stat-grid.twig'
        ),
        $data
    );
}