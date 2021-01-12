<?php
namespace SteeleRose\ProbateMachine;

class Model {
    private $wpdb;
    static $table_name =
        'probate_machine_entries';

    public function __construct() {
        global $wpdb;
        $this->wpdb = $wpdb;
    }

    function get() {
        $table_name =
            $this->wpdb->prefix.self::$table_name;

        $row =
            $this->wpdb->get_row(
            "SELECT * from $table_name WHERE user_id={$this->user_id}"
        );

        if($row) {
            $row->form =
                unserialize($row->form);
        }

        return $row;
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
                        'form' =>
                            maybe_serialize($this->stages),
                        'created' =>
                            current_time('mysql', 1),
                        'updated' =>
                            current_time('mysql', 1)
                    ),
                    array(
                        '%d',
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
                        'form' =>
                            maybe_serialize($this->stages),
                        'updated' =>
                            current_time('mysql', 1)
                    ),
                    array(
                        'user_id' =>
                            $this->user_id
                    ),
                    array(
                        '%s',
                        '%s'
                    ),
                    array(
                        '%d',
                    )
                );
            }

            return $this->stages;

        } catch(\Exception $e) {
            return array($e->getMessage());
        }
    }

    public function updateKV($id, $status = false, $value = false) {
        $origin = (array) $this->get()->form;
        foreach($origin as $k => $v) {
            if($k==$id) {
                if($status) {
                    $origin[$k]['status'] = $status;
                }
                if($value) {
                    $origin[$k]['value'] = $value;
                }
            }
        }

        $this->stages = $origin;
        $this->update();

        return $this->stages;
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
                  form MEDIUMTEXT NOT NULL,
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