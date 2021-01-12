<?php
namespace Theme;

class Stripe {
    private $secret_key;
    private $publishable_key;
    private $test_mode;
    private $acf_prefix = 'Settings/stripe/';

    public function __construct() {

        $this->test_mode = \get_field(
            $this->acf_prefix . 'testMode',
            'option'
        );

        $append = '';
        if($this->test_mode) {
            $append = 'Test';
        }

        $this->secret_key =
            \get_field(
                $this->acf_prefix . 'secKey' . $append,
                'option'
            );
        $this->publishable_key =
            \get_field(
                $this->acf_prefix . 'pubKey' . $append,
                'option'
            );

        // Set stripe key
        \Stripe\Stripe::setApiKey($this->secret_key);

        // Output publishable key
        add_action('wp_ajax_stripe_preload_assets', array($this, 'preload_assets'));
        add_action('wp_ajax_nopriv_stripe_preload_assets', array($this, 'preload_assets'));

        // Listen for Stripe responses
        add_action('theme_init_loaded', array($this, 'listener'));

        // Create table
        $this->log_create_table();

        // Add settings area
        $this->add_settings();
    }

    public function preload_assets() {
        global $pubkey;
        $pubkey = $this->publishable_key;
        echo json_encode(array(
            'url' => 'https://js.stripe.com/v3/',
            'key' => $pubkey
        ));
        die();
        /*add_action('wp_head', function() {
            global $pubkey;
            echo '<script src="https://js.stripe.com/v3/"></script>';
            echo '<script type="text/javascript">let stripe = Stripe("' .
                $pubkey
                . '")</script>';
        }); */
    }

    private function add_settings() {
        include_once __DIR__ . '/../fields.php';
    }

    public function listener() {
        if (isset($_GET['webhook']) && $_GET['webhook'] === 'stripe') {
            $input  = @file_get_contents("php://input");
            $json   = json_decode($input);
            $this->
            log_insert(
                $json->type,
                $json->data->object
            );
            do_action('stripe_' . $json->type,  $json->data->object);
            return false;
        }
    }

    private function log_create_table() {
        global $wpdb;

        $table_name = $wpdb->prefix . "stripe_webhook_logs";

        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE $table_name (
              id mediumint(9) NOT NULL AUTO_INCREMENT,
              time datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
              type mediumtext NOT NULL,
              data text NOT NULL,
              PRIMARY KEY  (id)
        ) $charset_collate;";

        require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
        dbDelta( $sql );
    }

    private function log_insert($type, $log = array()) {
        global $wpdb;

        $table_name = $wpdb->prefix . "stripe_webhook_logs";

        $wpdb->insert($table_name, array(
            'time' => date('Y-m-d H:i:s', time()),
            'type' => $type,
            'data' => maybe_serialize($log)
        ), array(
            '%s',
            '%s',
            '%s'
        ));

        return false;
    }
}

new Stripe();