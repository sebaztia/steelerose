<?php
$acf_prefix = "Block/card-grid/";

$colCount = (int)
    get_field($acf_prefix . 'columns');
$title =
    get_field($acf_prefix . 'title');
$items =
    get_field($acf_prefix . 'items');
$backgroundColour =
    get_field($acf_prefix . 'backgroundColour');

$data = array(
    'backgroundColour' => $backgroundColour
);

if($colCount===2) {
    $data['colCount'] = "six";
}
if($colCount===3) {
    $data['colCount'] = "four";
}
if($colCount===4) {
    $data['colCount'] = "three";
}

$data['title'] = $title;

$i=0;
foreach($items as $col) {
    $data['cols'][$i]['heading'] =
        $col[$acf_prefix . 'card/heading'];
    $data['cols'][$i]['image'] =
        $col[$acf_prefix . 'card/image'];
    $data['cols'][$i]['content'] =
        $col[$acf_prefix . 'card/content'];
    $i++;
}


if($data) {
    Timber::render(
        theme_get_patterns_dir(
            'card-grid',
            'card-grid.twig'
        ),
        $data
    );
} else {
    echo '<p>Add some cols!</p>';
}