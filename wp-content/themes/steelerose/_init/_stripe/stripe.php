<?php
$stripeEnabled =
    theme_get_ini_setting('Features', 'stripe');
if($stripeEnabled) {
    include_once __DIR__ . '/_classes/Stripe.php';
    include_once __DIR__ . '/_classes/Payment.php';
    include_once __DIR__ . '/_classes/Customer.php';
    include_once __DIR__ . '/_classes/Subscription.php';

    ## Stripe API
    require_all(__DIR__ . '/_api/v' . $GLOBALS['theme_api_v'], 2);
}