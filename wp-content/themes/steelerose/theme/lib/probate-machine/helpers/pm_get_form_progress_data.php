<?php
use \SteeleRose\ProbateMachine\Factory as ProbateMachine;

function pm_get_form_progress_data() {
    $probateMachine =
        new ProbateMachine(get_current_user_id());

    return $probateMachine->getProgress();
}