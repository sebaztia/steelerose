<?php
add_filter('pre_option_default_role', function($default_role){
    return 'customer';
});

add_action('init', function() {
    if (get_option('custom_roles_version') < 2) {
        add_role('customer', 'Customer',
            array(
                'read' => true,
                'level_0' => true
            )
        );
    }
});
