<?php
namespace SteeleRose\Shortcodes;

$acf_prefix = 'Settings/company/';

global $shortcodes;
$shortcodes = array(
    'company-name' => $acf_prefix . 'name',
    'address-line-1' => $acf_prefix . 'add1',
    'address-line-2' => $acf_prefix . 'add2',
    'postcode' => $acf_prefix . 'postcode',
    'country' => $acf_prefix . 'country',
    'facebook' => $acf_prefix . 'facebook',
    'linkedin' => $acf_prefix . 'linkedin',
    'phone' => $acf_prefix . 'phone'
);

foreach($shortcodes as $k => $v) {
    add_shortcode($k, function() use ( $v ) {
        return get_field($v, 'option');
    });
}