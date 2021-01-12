<?php
$acf_prefix =
    "Block/form-login-registration/";

$tabOrder =
    get_field($acf_prefix . 'tabOrder');

if(!is_user_logged_in() || is_admin()) {

    ?>
    <div <?= ($tabOrder) ? 'data-tabOrder="'.$tabOrder.'"' : '' ?> class="form-login-registration" id="block-form-login-registration-5e6215a313325">
        <?php if(is_admin()) { ?>
            <h5 class="text-center">Login / Register Form here</h5>
            <?php if($tabOrder) { ?>
                <p>Order: <?= $tabOrder ?></p>
            <?php } ?>
        <?php } else { ?>
        <div class="section-row">
            <div class="spinner center"></div>
        </div>
        <?php } ?>
    </div>
<?php } else { ?>
    <p>Logged In</p>
<?php } ?>