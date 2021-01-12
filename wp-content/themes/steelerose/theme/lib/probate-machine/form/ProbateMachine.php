<?php
namespace SteeleRose\ProbateMachine;

use ParagonIE\Sodium\Core\Curve25519\Ge\P1p1;

include_once __DIR__ . '/classes/Model.php';
include_once __DIR__ . '/classes/View.php';

class Factory extends Model {

    protected $defaultSourceDir;
    protected $user_id;
    protected $stages;

    public function __construct($user_id) {
        $this->defaultSourceDir =
            theme_get_patterns_dir() . '/probate-machine/schema/';

        $this->user_id = $user_id;
        parent::__construct();
    }

    public function set($data) {
        $this->stages = $data;
    }

    public function parseDefault() {
        $stages = array();
        $files = preg_grep(
            '/^([^.])/',
            scandir($this->defaultSourceDir)
        );

        foreach($files as $file) {
            $stages[] = json_decode(file_get_contents(
                $this->defaultSourceDir.$file
            ));
        }

        return $stages;
    }

    public function getData($specifics = array()) {
        $output =
            array();
        if(!empty($specifics)) {
            $form =
                $this->get();

            if($form) {
                $form = $form->form;

                foreach($form as $key => $values) {
                    if(in_array($key, $specifics)) {
                        $output[$key] = $values;
                    }
                }

                return $output;
            }
        }

        return false;
    }

    public function getProgress() {
        $stages =
            $this->parseDefault();

        if(!$this->get()) {
            return array(
                'total' => 0,
                'completed' =>0,
                'percent' => 0
            );
        }

        $form =
            $this->get()->form;

        $totalCount = 0;
        $completedCount = 0;

        foreach($stages as $stage) {
            if(isset($stage->sections)) {
                foreach ($stage->sections as $section) {
                    if(isset($section->tasks)) {
                        foreach ($section->tasks as $task) {
                            if (isset($task->id) &&
                                isset($form[$task->id])
                                && isset($form[$task->id]['status'])
                                && $form[$task->id]['status'] === 'complete') {
                                $completedCount++;
                            }
                            $totalCount++;
                        }
                    }
                }
            }
        }

        return array(
            'total' => $totalCount,
            'completed' => $completedCount,
            'percent' => round($completedCount / $totalCount * 100)
        );
    }
}

Factory::db();
