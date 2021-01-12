<?php
foreach (glob(theme_get_theme_dir() . "/taxonomies/*.php") as $t)  {
    include_once $t;
}