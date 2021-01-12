<?php
/**
 * Add logo field to Customizer
 */
function customizer_add_logo() {
    add_theme_support('custom-logo');
}
add_action('after_setup_theme', 'customizer_add_logo');

function customizer_add_invLogo( $wp_customize ) {
    $wp_customize->add_setting( 'site-logo-inv' ); // Add setting for logo uploader
    $wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'site-logo-inv', array(
        'label' => __( 'Inverted site logo', 'site-logo-inv' ),
        'section' => 'title_tagline',
        'settings' => 'site-logo-inv'
    )));
}
add_action('customize_register', 'customizer_add_invLogo');
// Set constant to Twig
add_filter('timber/context', function($context) {
    $logoId =
        get_theme_mod( 'custom_logo' );
    $logoSrc =
        wp_get_attachment_image_src($logoId,'full');
    $logoInvSrc =
        get_theme_mod('site-logo-inv' );

    $context['siteLogoSrc'] =
        $logoSrc[0];
    $context['siteLogoInvSrc'] =
        $logoInvSrc;
    if(is_front_page()) {
        $context['siteLogoLink'] =
            false;
    } else {
        $context['siteLogoLink'] =
            get_site_url();
    }

    $context['siteLogoAlt'] =
        get_bloginfo('name');

    return $context;
});