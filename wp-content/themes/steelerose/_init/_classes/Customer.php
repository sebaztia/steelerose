<?php
namespace Theme;

class Customer {
    public function __construct() {
        $this->create_table();
    }

    static function get($username_or_email, $vendor = false) {
        global $wpdb;
        $table_name = $wpdb->prefix . "customers";

        if(is_int($username_or_email)) {
            $user = get_user_by('ID', $username_or_email);
        } else {
            $user =
                theme_get_user_object_by_username_or_email(
                    $username_or_email
                );
        }

        if(!$user) {
            return false;
        }

        $sql = "SELECT * FROM ".$table_name." WHERE userID='".$user->ID."'";
        if($vendor) {
            $sql .= " AND vendor='" . $vendor . "'";
        }
        $results = $wpdb->get_results($sql);

        if(empty($results)) {
            return false;
        }

        return (count($results)>1 ? $results : $results[0]);
    }

    static function create($username_or_email, $data = array(
        'reference' => '',
        'vendor' => '',
        'data' => array()
    )) {
        global $wpdb;
        $table_name = $wpdb->prefix . "customers";

        $user = self::get($username_or_email);
        if($user) {
            return $user;
        }

        $user =
            theme_get_user_object_by_username_or_email(
                $username_or_email
            );

        if(!$user) {
            return array(
                'errors' =>
                    '[SITE] ' . 'user needs to be created before becoming a customer'
            );
        } else {
            if(is_email($username_or_email)) {
                try {
                    $wpdb->insert(
                        $table_name,
                        array(
                            'userID' => $user->ID,
                            'reference' => ($data['reference'] ? $data['reference'] : ''),
                            'vendor' => ($data['vendor'] ? $data['vendor'] : ''),
                            'data' => ($data['data'] ? maybe_serialize($data['data']) : '')
                        ),
                        array(
                            '%d',
                            '%s',
                            '%s',
                            '%s'
                        )
                    );

                    //if(theme_is_user_in_role($user->ID, 'limbo')) {
                    if(!theme_is_user_in_role($user->ID, 'administrator')) {
                        $user->set_role('customer');
                    } else {
                        $user->add_role('customer');
                    }
                    //}

                    return self::get($username_or_email);

                } catch(\Exception $e) {
                    return array('errors' => '[SITE] ' . $e->getMessage());
                }


            } else {
                return array(
                    'errors' =>
                        '[SITE] ' . 'invalid email for creating user'
                );
            }
        }

    }

    static function update($username_or_email, $data = array(
        'reference' => '',
        'vendor' => '',
        'data' => array()
    )) {
        global $wpdb;

        if(!$username_or_email) {
            return false;
        }

        if(is_int($username_or_email)) {
            $user = get_user_by('ID', $username_or_email);
        } else {
            $user =
                theme_get_user_object_by_username_or_email(
                    $username_or_email
                );
        }

        $table_name = $wpdb->prefix . "customers";

        $wpdb->update($table_name,
            array(
                'reference' => ($data['reference'] ? $data['reference'] : ''),
                'vendor' => ($data['vendor'] ? $data['vendor'] : ''),
                'data' => ($data['data'] ? maybe_serialize($data['data']) : '')
            ),
            array( 'userID' => $user->ID),
            array(
                '%s',	// value1
                '%s'	// value2
            ),
            array( '%d' )
        );
    }

    private function create_table() {
        global $wpdb;

        $table_name = $wpdb->prefix . "customers";

        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE $table_name (
              id mediumint(9) NOT NULL AUTO_INCREMENT,
              userID mediumint(9) NOT NULL,
              reference tinytext NOT NULL,
              vendor tinytext NOT NULL,
              data text NOT NULL,
              PRIMARY KEY  (id)
        ) $charset_collate;";

        require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
        dbDelta( $sql );
    }

    static function get_by_ref($ref) {
        global $wpdb;
        $table_name = $wpdb->prefix . "customers";

        $sql = "SELECT userID FROM ".$table_name." WHERE reference='".$ref."'";
        $user = $wpdb->get_results($sql);

        if(empty($user)) {
            return false;
        }
        return
            get_user_by('ID', $user[0]->userID);
    }
}

new Customer();