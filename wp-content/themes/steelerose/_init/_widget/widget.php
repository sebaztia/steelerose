<?php
foreach (glob(theme_get_theme_dir() . "/widgets/*.php") as $w)  {
    include_once $w;
}