<?php
add_action('stripe_customer.created', function($data) {
    ob_start();
    print_r($data);
    $contents = ob_get_contents();
    ob_end_clean();

    wp_mail(
        'hello@white-fire.co.uk', 'Test Subject', $contents);

});