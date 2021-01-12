<?php
use \SteeleRose\ProbateMachine\Factory as ProbateMachine;

function pm_get_form_specific_data($specifics = array(), $user_id = false) {
    if(!$user_id) {
        $user_id = get_current_user_id();
    }

    $probateMachine =
        new ProbateMachine($user_id);

    return $probateMachine->getData($specifics);
}