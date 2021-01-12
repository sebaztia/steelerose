<?php
if(function_exists('acf_add_local_field_group')) {
    $stripeSettings =
        file_get_contents(__DIR__ . '/fields/settings.json');
    $stripeSettings =
        json_decode($stripeSettings, true);
    acf_add_local_field_group($stripeSettings);
}