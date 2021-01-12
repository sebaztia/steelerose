<?php
foreach (glob(theme_get_theme_dir() . "/post-types/*.php") as $p)  {
    include_once $p;
}