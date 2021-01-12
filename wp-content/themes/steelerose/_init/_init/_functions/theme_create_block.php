<?php
if(!function_exists('theme_create_block')) {
    function theme_create_block(
        $name,
        $type='plain',
        $args = array(),
        $use_pattern_dir = false
    ) {

        $pattern_path =
            theme_get_patterns_dir() . '/' . $name;
        if(!file_exists($pattern_path)) {
            mkdir($pattern_path);
        }

        $name = strtolower($name);
        $id = uniqid();

        // Set up the block directory
        $block_template =
            $name . '.php';
        $block_path =
            theme_get_blocks_dir() .
            'types/'.
            $name;
        $block_json['render_template'] =
            $block_template;
        $block_json['name'] = $name;
        $block_json =
            array_merge($block_json, $args);
        $block_json =
            json_encode($block_json, JSON_PRETTY_PRINT);

        $block_files =
            array(
                $block_path . '/index.php' =>
                    theme_get_code_boilerplate('index', 'php'),
                $block_path . '/' . $name . '.json' =>
                    $block_json
            );

        if($type==='plain') {
            $block_files[$block_path . '/' . $name . '.php'] =
                theme_get_code_boilerplate('block-plain', 'php', array(
                    $name,
                    'block-' . $name . '-' . $id,
                    'block_' . $name,
                ));
        }

        if($type==='js') {
            $block_files[$block_path . '/' . $name . '.php'] =
                theme_get_code_boilerplate('block-js', 'php', array(
                    $name,
                    'block-' . $name . '-' . $id,
                    'block_' . $name,
                ));
            $block_files[($use_pattern_dir ? $pattern_path : $block_path)  . '/' . $name . '.js'] =
                theme_get_code_boilerplate('block-js', 'js', array(
                    $name
                ));
        }

        if($type==='preact') {
            $block_files[$block_path . '/' . $name . '.php'] =
                theme_get_code_boilerplate('block-preact', 'php', array(
                    $name,
                    'block-' . $name . '-' . $id,
                    'block_' . $name,
                ));
            $block_files[($use_pattern_dir ? $pattern_path : $block_path)  . '/' . $name . '.jsx'] =
                theme_get_code_boilerplate('block-preact', 'jsx', array(
                    $name,
                    'block-' . $name . '-' . $id,
                    'block_' . $name,
                ));
        }


        if(file_exists($block_path)) {
            throw new Exception(
                "Block ${name} already exists!"
            );
        }

        // Create block directory
        mkdir($block_path);

        // Put all relevant files and content in directory
        foreach($block_files as $filename => $content) {
            touch($filename);
            file_put_contents($filename, $content);
        }

        // Set up ACF group for block
        $group_key = "group_" . uniqid();
        $group_title = "Block/" . $name;
        $group_location = "acf/" . $name;
        $group_data = array(
            "key" => $group_key,
            "title" => $group_title,
            "fields" => array(),
            "location" => array(array(
                array(
                    "param" => "block",
                    "operator" => "==",
                    "value" => $group_location
                ))
            ),
            "menu_order" => 0,
            "position" => "normal",
            "style" => "default",
            "label_placement" => "top",
            "instruction_placement" => "label",
            "hide_on_screen" => "",
            "active" => 1,
            "description" => "",
            "modified" => time()
        );

        $path = theme_get_fields_dir();
        if(!file_exists($path)) {
            mkdir($path);
        }

        touch($path.$group_key . '.json');
        file_put_contents(
            $path.$group_key . '.json',
            json_encode($group_data, JSON_PRETTY_PRINT)
        );

        try {
            theme_ini_add(
                'Gutenberg',
                'blocks_allowed[]',
                $group_location
            );
        } catch(Exception $e) {
            return $e->getMessage();
        }
    }
}