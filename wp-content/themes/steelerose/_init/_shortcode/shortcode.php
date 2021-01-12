<?php
foreach (glob(theme_get_theme_dir() . "/shortcodes/*.php") as $s)  {
    include_once $s;
}