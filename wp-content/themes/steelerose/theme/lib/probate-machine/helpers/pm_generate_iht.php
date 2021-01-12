<?php
namespace SteeleRose\IHT205;
use \SteeleRose\IHT205\Write as IHT;

function text($i, $k, $pages, $item) {
    $formD =
        pm_get_form_specific_data(array(
            'id' =>
                $item->id
        ));
    if(
    isset($formD[$item->id]['value'])) {
        $pages[$i]->{$k}->value =
            $formD[$item->id]['value'];
    }

    return $pages;
}

function ab($i, $k, $pages, $item) {

    if(is_array($item->id)) {
        foreach($item->id as $id) {
            $formD = pm_get_form_specific_data(array(
                'id' =>
                    $id
            ));
            if(
                isset($formD[$id]) &&
                $formD[$id]['status']==='complete'
            ) {
                $item->id = $id;
                break;
            }
        }
    }

    $formD = pm_get_form_specific_data(array(
        'id' =>
            $item->id
    ));

    if(
    isset($formD[$item->id]['value'])) {
        $pages[$i]->{$k}->value =
            [1,0];
        if($formD[$item->id]['value']==='Yes') {
            $pages[$i]->{$k}->value =
                [0,1];
        }

    }

    return $pages;
}

function checkbox($i, $k, $pages, $item) {
    $formD =
        pm_get_form_specific_data(array(
            'id' =>
                $item->id
        ));
    if(
    isset($formD[$item->id]['value'])) {
        $pages[$i]->{$k}->value =
            [$formD[$item->id]['value']];
    }

    return $pages;
}

function textsep($i, $k, $pages, $item) {
    $formD =
        pm_get_form_specific_data(array(
            'id' =>
                $item->id
        ));
    if(
    isset($formD[$item->id]['value'])) {
        $pages[$i]->{$k}->value =
            $formD[$item->id]['value'];
    }

    return $pages;
}

function pm_generate_iht($user_id = false) {
    if(!$user_id) {
        $user_id = get_current_user_id();
    }
    $iht =
        new IHT($user_id);

    $pages =
        $iht->getData();

    $i = 0;
    foreach($pages as $page) {
        foreach($page as $k => $item) {
            if(isset($item->id)) {
                if($item->type==='text') {
                    $pages = text($i, $k, $pages, $item);
                }
                if($item->type==='ab') {
                    $pages = ab($i, $k, $pages, $item);
                }
                if($item->type==='checkbox') {
                    $pages = checkbox($i, $k, $pages, $item);
                }
                if($item->type==='textsep') {
                    $pages = textsep($i, $k, $pages, $item);
                }
            }
        }
        $i++;
    }

    $iht->setData($pages);
    $iht->createPdf();

    return $iht->HttpUrl();
}