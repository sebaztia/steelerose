<?php
/**
 * Global Timber Variables
 */
add_filter('timber/context', function($context) {

    $context['global'] = [];

    /*
     * Menus
     */
    $menu_locations = get_registered_nav_menus();
    if(!empty($menu_locations)) {
        foreach($menu_locations as $k => $v) {
            $locations =
                get_nav_menu_locations();
            if (isset($locations[$k])) {
                $menu =
                    wp_get_nav_menu_object(
                        $locations[$k]
                    );
                $menuitems =
                    wp_get_nav_menu_items(
                        $menu->term_id, array('order' => 'DESC')
                    );

                for ($i = 0; $i < count($menuitems); $i++) {
                    if (is_array($menuitems[$i]->classes)) {
                        $menuitems[$i]->classes =
                            implode(
                                " ", $menuitems[$i]->classes
                            );
                    }

                    $invoke =
                        get_field('Menu/main/invokeFunction', $menuitems[$i]);
                    if ($invoke) {
                        $menuitems[$i]->classes = $menuitems[$i]->classes . ' invoke-' . $invoke;
                    }

                    /*$buttonClass =
                        get_field('Menu/main/buttonClass', $menuitems[$i]);
                    if($buttonClass) {
                        $menuitems[$i]->class = $menuitems[$i]->classes . ' dpl-button ' . $buttonClass;
                    }*/

                    $icon =
                        get_field('Menu/topbar/icon', $menuitems[$i]);
                    if ($icon) {
                        $menuitems[$i]->title = $icon . $menuitems[$i]->title;
                    }

                }

                $menuitems =
                    theme_build_menu_tree_from_flat($menuitems);

                if ($menuitems) {
                    $context['global']['menu_' . $k . '_title'] =
                        get_field('Menu/' . $k . '/title', $menu);
                    $context['global']['menu_' . (is_user_logged_in() ? str_replace('_loggedin', '', $k) : $k)] =
                        $menuitems;
                }

            }
        }
    }

    /**
     * Paths
     */
    $context['global']['frontend_url'] =
        theme_get_frontend_url();

    /**
     * Social
     */
    $context['global']['facebook'] =
        get_field('Settings/company/facebook',
            'option');
    $context['global']['linkedIn'] =
        get_field('Settings/company/linkedin',
            'option');
    $context['global']['instagram'] =
        get_field('Settings/company/instagram',
            'option');
    $context['global']['phone'] =
        get_field('Settings/company/phone',
            'option');
    $context['global']['email'] =
        antispambot(get_field('Settings/company/email',
            'option'));

    /**
     * Address
     */
    $context['global']['companyName'] =
        get_field('Settings/company/name',
            'option');
    $context['global']['companyAdd1'] =
        get_field('Settings/company/add1',
            'option');
    $context['global']['companyAdd2'] =
        get_field('Settings/company/add2',
            'option');
    $context['global']['companyPostcode'] =
        get_field('Settings/company/postcode',
            'option');
    $context['global']['companyTown'] =
        get_field('Settings/company/town',
            'option');
    $context['global']['companyCountry'] =
        get_field('Settings/company/country',
            'option');
    $context['global']['companyMapLink'] =
        get_field('Settings/company/mapLink',
            'option');

    /**
     * Body class
     */
    $context['body_class'] = get_body_class();

    /**
     * Logout Link
     */
    $context['global']['logoutLink'] =
        wp_logout_url(get_site_url());

    return $context;
});