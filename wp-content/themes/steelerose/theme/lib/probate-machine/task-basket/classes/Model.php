<?php
namespace SteeleRose\TaskBasket;

class Model {
    private $wpdb;
    static $table_name =
        'probate_machine_task_basket';

    public function __construct() {
        global $wpdb;
        $this->wpdb = $wpdb;
    }

    function get($status = false) {
        $table_name =
            $this->wpdb->prefix.self::$table_name;

        if(isset($this->task) && $this->task) {
            $result =
                $this->wpdb->get_row(
                    "SELECT * from $table_name WHERE user_id={$this->user_id} and task='{$this->task}'",
                    OBJECT
                );
        } else if($status) {
            $result =
                $this->wpdb->get_results(
                    "SELECT * from $table_name WHERE user_id={$this->user_id} and status='{$status}'",
                    OBJECT
                );
        } else {
            $result =
                $this->wpdb->get_results(
                    "SELECT * from $table_name WHERE user_id={$this->user_id}",
                    OBJECT
                );
        }

        if($result) {
            return $result;
        }
    }

    function update() {

        $table_name =
            $this->wpdb->prefix.self::$table_name;

        try {
            $record =
                $this->get();

            if(!$record) {
                $response =
                    $this->wpdb->insert(
                        $table_name,
                        array(
                            'user_id' =>
                                $this->user_id,
                            'task' =>
                                $this->task,
                            'status' =>
                                $this->status,
                            'price' =>
                                $this->price,
                            'created' =>
                                current_time('mysql', 1),
                            'updated' =>
                                current_time('mysql', 1)
                        ),
                        array(
                            '%d',
                            '%s',
                            '%s',
                            '%s',
                            '%s',
                            '%s'
                        )
                    );
            } else {
                $response =
                    $this->wpdb->update(
                        $table_name,
                        array(
                            'status' =>
                                $this->status,
                            'updated' =>
                                current_time('mysql', 1)
                        ),
                        array(
                            'task' =>
                                $this->task,
                            'user_id' =>
                                $this->user_id
                        ),
                        array(
                            '%s',
                            '%s'
                        ),
                        array(
                            '%s',
                            '%d',
                        )
                    );
            }

            return array(
                'task' => $this->task,
                'status' => $this->status
            );

        } catch(\Exception $e) {
            return array($e->getMessage());
        }

    }

    static function db() {
        require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );

        global $wpdb;
        $table_name =
            $wpdb->prefix . self::$table_name;

        $sql =
            "CREATE TABLE IF NOT EXISTS $table_name (
                  id MEDIUMINT(9) NOT NULL AUTO_INCREMENT,
                  user_id MEDIUMINT(9) NOT NULL,
                  task MEDIUMTEXT NOT NULL,
                  status TINYTEXT NOT NULL,
                  price MEDIUMINT(9) NOT NULL,
                  created DATETIME DEFAULT '0000-00-00 00:00:00' NOT NULL,
                  updated DATETIME DEFAULT '0000-00-00 00:00:00' NOT NULL,
                  PRIMARY KEY  (id)
          )";

        maybe_create_table(
            $table_name,
            $sql
        );
    }
}