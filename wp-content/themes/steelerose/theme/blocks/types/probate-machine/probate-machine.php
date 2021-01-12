<?php
$acf_prefix =
    "Block/probate-machine/";

$currentStageOnly =
    get_field($acf_prefix . 'currentStage');

if(is_user_logged_in()) { ?>
<div class="dpl-probate-machine <?= ($currentStageOnly) ? 'bg-medium' : '' ?> ">
  <div class="section-row">
    <div <?= ($currentStageOnly) ? 'data-currentStageOnly=true' : 'data-currentStageOnly=false' ?> class="probate-machine" id="block-probate-machine-5e4575fc217f0">
        <div class="container">
            <?php if(is_admin()) { ?>
                <h5 class="text-center">Probate Machine Here</h5>
                <?php if($currentStageOnly) { ?>
                    <p class="text-center">(showing current stage only)</p>
                <?php } ?>
            <?php } else { ?>
                <div class="spinner center"></div>
            <?php } ?>
        </div>
    </div>
  </div>
</div>
<?php } ?>