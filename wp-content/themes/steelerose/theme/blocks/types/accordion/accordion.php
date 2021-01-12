<?php
$acf_prefix =
    "Block/accordion/";
$accordion =
    get_field($acf_prefix . 'accordion');

$data = array(
    'backgroundColour' =>
        get_field($acf_prefix . 'backgroundColour')
);

if($accordion) {
    $i = 0;
    foreach($accordion as $acc) {
        $c = $accordion[$i];
        $data['accordions'][$i]['title'] =
            $c[$acf_prefix . 'accordion/title'];

        $contentType =
            $c[$acf_prefix . 'accordion/contentType'];
        $data['accordions'][$i]['contentType']
            = $contentType;

        if($contentType==='tabs') {
            $o = 0;
            foreach($c[$acf_prefix . 'accordion/tabs'] as $a) {
                $data['accordions'][$i]['tabs'][$o]['title']
                    = $a[$acf_prefix . 'accordion/tab/title'];
                $data['accordions'][$i]['tabs'][$o]['content']
                    = $a[$acf_prefix . 'accordion/tab/content'];

                $o++;
            }
        } else {
            $data['accordions'][$i]['content'] =
                $c[$acf_prefix . 'accordion/content'];
        }
        $i++;
    }
}

if(!empty($data)) {
    Timber::render(
        theme_get_patterns_dir(
            'accordion',
            'accordion.twig'
        ),
        $data
    );
} else {
    echo '<p>Add some accordions</p>';
}