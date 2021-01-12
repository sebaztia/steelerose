<?php
$acf_prefix =
    "Block/tabs/";

$data = array(
    'backgroundColour' => get_field($acf_prefix . 'backgroundColour')
);
$tabs =
    get_field($acf_prefix . 'tabs');

if($tabs) {
    $i = 0;
    foreach ($tabs as $tab) {
        $c = $tabs[$i];
        $data['tabs'][$i]['title'] =
            $c[$acf_prefix . 'tab/title'];

        $contentType =
            $c[$acf_prefix . 'tab/contentType'];
        $data['tabs'][$i]['contentType']
            = $contentType;


        if($contentType==='accordion') {
            $o = 0;
            foreach($c[$acf_prefix . 'tab/accordion'] as $acc) {
                $data['tabs'][$i]['accordions'][$o]['title']
                    = $acc[$acf_prefix . 'tab/accordion/title'];
                $data['tabs'][$i]['accordions'][$o]['content']
                    = $acc[$acf_prefix . 'tab/accordion/content'];

                $o++;
            }
        } else {
            $data['tabs'][$i]['content'] =
                $c[$acf_prefix . 'tab/content'];
        }

        $i++;
    }
} else {
    echo '<p>Add some tabs</p>';
}

if(!empty($data)) {
    Timber::render(
        theme_get_patterns_dir(
            'tabs',
            'tabs.twig'
        ),
        $data
    );
}