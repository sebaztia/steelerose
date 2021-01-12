<?php
namespace Theme;

class Account {

    // Field => is_mandatory
    static $default_fields = array(
        'user_login' => true,
        'user_email' => true,
        'first_name' => true,
        'last_name' => false,
        'user_url' => false,
        'description' => false
    );

    public function __construct() {
        add_action(
            'show_user_profile',
            array($this, 'setup_fields'),
            10
        );
        add_action(
            'edit_user_profile',
            array($this, 'setup_fields'),
            10
        );
        add_action(
            'personal_options_update',
            array($this, 'save_fields_handler')
        );
        add_action(
            'edit_user_profile_update',
            array($this, 'save_fields_handler')
        );

    }

    public function setup_fields($user) {

        $custom =
            new \stdClass();
        $custom->enable_public =
                    get_user_meta(
                        $user->ID,
                        'enable_public',
                        true
                    );

        print_r($user->custom);

        theme_get_admin_template(
            'user',
            'display-settings',
            $user
        );
    }

    public function save_fields_handler($user_id) {
        if ( !current_user_can(
            'edit_user',
            $user_id
        )) {
            return false;
        }

        update_user_meta(
            $user_id,
            'enable_public',
            ($_POST['enable_public'] ? $_POST['enable_public'] : false)
        );

        return true;
    }

    public static function create($body = array()) {

        // Set default role
        unset($body['role']);
        // Do not allow set password
        unset($body['user_pass']);

        $res =
            self::validate($body);

        if(!isset($res->errors)) {
            $data =
                self::get_data($res->data);

            $res->success =
                true;
            $user_id =
                wp_insert_user($data[0]);

            foreach($data[1] as $k => $v) {
                update_field($k, $v, 'user_' . $user_id);
            }

            $welcome_twig =
                theme_get_templates_dir(
                    'email',
                    'welcome.twig'
                );

            $user =
                theme_get_user_object_by_username_or_email(
                    $body['user_login']
                );

            $key =
                get_password_reset_key($user);

            if(file_exists($welcome_twig)) {
                $email_template = \Timber::compile(
                    'email/welcome.twig',
                    array(
                        "name" =>
                            $res->first_name,
                        "site_name" => get_bloginfo('name'),
                        "set_password_link" => esc_url_raw(
                            get_site_url() .
                            '?na=true' .
                            '&key=' . $key .
                            '&user=' . rawurlencode($user->user_login)
                        )
                    )
                );

                $email_headers = "Content-type: text/html; charset=".get_bloginfo('charset')."" . "\r\n";
                $email_headers .= 'From: ' .
                    theme_get_ini_setting(
                        'Email',
                        'transactional_from'
                    ) . "\r\n";

                wp_mail(
                    $user->user_email,
                    theme_get_message(
                        'Email',
                        'headers',
                        'subject',
                        array(
                            theme_get_message(
                                'Account',
                                'email',
                                'title_new_account',
                                array(
                                    get_bloginfo('name')
                                )
                            )
                        )
                    ),
                    $email_template,
                    $email_headers
                );
            }
        }

        return $res;
    }

    public static function read($user_id = false) {
        $res =
            get_user_by('ID', $user_id);

        if($res) {
            return $res->data;
        }

        $res->errors['exists_user_id'] =
            theme_get_message(
                'Account',
                'error',
                'exists_user_id'
            );

        return $res;
    }

    public static function update($body = array()) {

        $user =
            wp_get_current_user();

        $body->user_email =
            $user->user_email;
        $body->user_login =
            $user->user_login;

        $res =
            self::validate($body, true);

        if(!isset($res->errors)) {
            $data =
                self::get_data($res->data);
            $data[0]['ID'] =
                $user->ID;

            $res->success =
                true;

            $user_id =
                wp_update_user($data[0]);

            foreach($data[1] as $k => $v) {
                update_field($k, $v, 'user_' . $user_id);
            }
        }

        return $res;

    }

    public static function validate($user, $update = false) {
        $schema =
            theme_get_schema('account');

        $res = array();

        if(empty($user)) {
            $res =
                array(
                    'errors' =>
                        theme_get_message(
                            'Account',
                            'error',
                            'empty_data'
                        ));

            return $res;
        }

        $defaults = self::$default_fields;
        foreach($defaults as $field => $mandatory) {
            if(!isset($user[$field]) && $mandatory) {
                $res['errors'][$field][] =
                    theme_get_message(
                        'Account',
                        'error',
                        'empty_' . $field
                    );
            }

            if(!$update) {
                if (
                    $field === 'user_login' ||
                    $field === 'user_email'
                ) {
                    if (
                        username_exists($user[$field]) ||
                        email_exists($user[$field])) {
                        $res['errors'][$field][] =
                            theme_get_message(
                                'Account',
                                'error',
                                'exists_' . $field,
                                array($user[$field])
                            );
                    }

                    if ($field === 'user_email') {
                        if (!is_email($user[$field])) {
                            $res['errors'][$field][] =
                                theme_get_message(
                                    'Account',
                                    'error',
                                    'invalid_' . $field
                                );
                        }
                    }
                }
            }

            $res['data'][$field] =
                (isset($user[$field]) ? $user[$field] : false);


        }

        if(!$schema->errors) {
            foreach ($user as $field => $val) {
                if (strpos($field, 'account_') === false) {
                    $user['account_' . $field] = $val;
                    unset($user[$field]);
                }
            }

            foreach ($schema as $field => $val) {
                if ($schema->{$field}->data['required']) {
                    if (!isset($user[$field]) || !$user[$field]) {
                        $res['errors'][$field] =
                            theme_get_message(
                                'Account',
                                'error',
                                'empty_' . str_replace(
                                    'account_',
                                    '',
                                    $field
                                )
                            );
                    }
                }

                if (isset($schema->{$field}->data['choices'])) {
                    if (!isset(
                        $schema->
                        {$field}->
                        data['choices']
                        [$user[$field]]
                    )) {
                        $res['errors'][$field] =
                            theme_get_message(
                                'Account',
                                'error',
                                'unknown_choice',
                                array($user[$field])
                            );
                    }
                }

                $res['data'][$field] =
                    (isset($user[$field]) ? $user[$field] : false);
            }
        }

        return (object) $res;
    }

    public static function get_data($data) {
        $primary_user_data =
            array();
        $secondary_user_data =
            array();

        foreach($data as $field => $value) {
            if ($value) {
                if (
                array_key_exists(
                    $field,
                    self::$default_fields
                )
                ) {

                    $primary_user_data[$field] =
                        $value;
                } else {
                    $secondary_user_data[$field] =
                        $value;
                }
            }
        }

        return array(
            $primary_user_data,
            $secondary_user_data
        );
    }
}

new Account();