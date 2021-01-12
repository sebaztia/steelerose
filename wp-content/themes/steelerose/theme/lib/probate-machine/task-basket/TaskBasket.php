<?php
namespace SteeleRose\TaskBasket;

include_once __DIR__ . '/classes/Model.php';

class Factory extends Model {
    protected $user_id;
    public function __construct($user_id) {
        $this->user_id = $user_id;
        parent::__construct();
    }

    public function set($task = false, $status = 'waiting', $price=false) {
        $this->task =
            $task;
        $this->status =
            $status;
        $this->price =
            $price;
    }
}

Factory::db();