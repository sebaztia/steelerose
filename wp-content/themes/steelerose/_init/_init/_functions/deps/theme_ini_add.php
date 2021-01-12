<?php
if(!function_exists('theme_ini_add')) {
    function theme_ini_add($section, $key, $val) {
        $ini_file =
            get_template_directory() . '/theme-settings.ini';
        $ini_contents =
            file_get_contents($ini_file);

        # \[${section}\]
        # Match square bracket with text in $section, then...
        # ([\s\S]*?)
        # get content up until...
        # \[(?!\s*$).+\]
        # the next square bracket containing any text, or...
        # |\Z
        # The end of the fole
        $r = "/\[${section}\]([\s\S]*?)(\[(?!\s*$).+\]|\Z)/";
        preg_match_all(
            $r,
            $ini_contents,
            $matches
        );

        if(isset($matches) && count($matches) > 0) {
            $csection =
                trim($matches[1][0]);
        } else {
            throw
            new Exception('Couldn\'t find configuration block.');
        }

        $modded = false;
        $lines =
            explode("\n", $csection);
        for($i=0; $i<count($lines); $i++) {
            $lines[$i] =
                array_map('trim',
                    explode("=", $lines[$i])
                );

            $ckey = trim(
                str_replace(
                    ';',
                    '',
                    $lines[$i][0]
                )
            );
            $cval = (isset(
                $lines[$i][1]
            ) ?
                trim(
                    str_replace(
                        '"',
                        '',
                        $lines[$i][1]
                    )
                ) :
                false
            );

            if($ckey === $key && $cval === $val) {
                $lines[$i][0] = $ckey;
                $modded = true;
            }
        }

        if(!$modded) {
            array_push($lines, array($key, '"'. $val . '"'));
        }

        $replacement_content = "";
        foreach($lines as $line) {
            if(isset($line[1])) {
                $replacement_content .=
                    $line[0] . ' = ' . $line[1] . "\n";
            } else {
                $replacement_content .=
                    $line[0] . "\n";
            }
        }

        $new_content =
            str_replace(
                $csection,
                trim($replacement_content),
                $ini_contents
        );

        file_put_contents($ini_file, $new_content);
    }
}