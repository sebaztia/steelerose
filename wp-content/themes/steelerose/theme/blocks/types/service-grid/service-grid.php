<?php
$acf_prefix =
    "Block/service-grid/";
$cols =
    get_field($acf_prefix . 'cols');
$title =
    get_field($acf_prefix . 'title');
$data['title'] = $title;
$data['inview'] = true;
$data['backgroundColour'] = get_field($acf_prefix . 'backgroundColour');

$i = 0;
foreach($cols as $col) {
    $data['cols'][$i]['image'] =
        $col[$acf_prefix . 'col/image']['sizes']['thumbnail'];
    $data['cols'][$i]['title'] =
        $col[$acf_prefix . 'col/title'];
    $data['cols'][$i]['text'] =
        $col[$acf_prefix . 'col/text'];
    $data['cols'][$i]['label'] =
        $col[$acf_prefix . 'col/buttonLabel'];
    $data['cols'][$i]['link'] =
        (is_array($col[$acf_prefix . 'col/buttonHref']) ?
            $col[$acf_prefix . 'col/buttonHref']['url'] :
            $col[$acf_prefix . 'col/buttonHref']
        );
    $i++;
}


if($data) {
    Timber::render(
        theme_get_patterns_dir(
            'service-grid',
            'service-grid.twig'
        ),
        $data
    );
} else {
    echo '<p>Add some services!</p>';
}