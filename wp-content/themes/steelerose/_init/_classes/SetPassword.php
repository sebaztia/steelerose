<?php
namespace Theme;

class SetPassword {
    private $type;
    private $username;
    private $key;
    private $password;
    private $cpassword;
    private $method;

    public function __construct($body = array(), $method = false) {
        if (isset($body['type'])) {
            $this->type = $body['type'];
        }
        if (isset($body['username'])) {
            $this->username = $body['username'];
        }
        if (isset($body['key'])) {
            $this->key = $body['key'];
        }
        if (isset($body['password'])) {
            $this->password = $body['password'];
        }
        if (isset($body['cpassword'])) {
            $this->cpassword = $body['cpassword'];
        }

        $this->method = $method;
    }

    public function do() {
        $res =
            (object) array();

        // If type not passed correctly
        if(!method_exists($this, $this->type)) {
            $res->errors['invalid_type'] =
                theme_get_message(
                    'SetPassword',
                    'error',
                    'invalid_type'
                );
        }

        $res = call_user_func(
            array(
                $this, $this->type
            ));

        return $res;
    }

    private function reset() {

        if($this->method && $this->method!=='POST') {
            wp_die(
                theme_get_message(
                    'General',
                    'die',
                    'illegal_move'
                )
            );
        }

        $res =
            $this->check_username();

        if(!$res->errors) {
            $user =
                theme_get_user_object_by_username_or_email(
                    $this->username
                );
            $key =
                get_password_reset_key($user);
            $res->success =
                true;
            $res->message =
                theme_get_message(
                    'SetPassword',
                    'success',
                    'reset',
                    array(
                        $user->user_email
                    )
                );

            /*$res->data['key'] =
                $key;*/ // Do not send key in response
            $res->data['username'] =
                $user->user_login;
            $res->data['email'] =
                $user->user_email;
            $res->data['first_name'] =
                $user->first_name;
            $res->data['site'] =
                get_bloginfo('name');
            $res->data['reset_link'] =
                esc_url_raw(
                    get_site_url() .
                    '?rp=true' .
                    '&key=' . $key .
                    '&user=' . rawurlencode($user->user_login)
            );

            /* $set_password_twig =
                theme_get_templates_dir(
                    'email',
                    'reset-password.twig'
                );

            if(file_exists($set_password_twig)) {
                $email_template = \Timber::compile(
                    'email/reset-password.twig',
                    array(
                        "name" =>
                            $user->first_name,
                        "reset_link" => esc_url_raw(
                            get_site_url() .
                            '?rp=true' .
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
                                'SetPassword',
                                'email',
                                'title_reset_password'
                            )
                        )
                    ),
                    $email_template,
                    $email_headers
                );
            } */
        }

        return $res;
    }

    private function set() {
        if($this->method && $this->method!=='PUT') {
            wp_die(
                theme_get_message(
                    'General',
                    'die',
                    'illegal_move'
                )
            );
        }

        $res =
            $this->check_username();

        $user =
            theme_get_user_object_by_username_or_email($this->username);

        if(!$res->errors) {
            $key =
                check_password_reset_key(
                    trim($this->key),
                    trim($this->username)
                );

            if($key->errors) {
                $res->errors['invalid_key'] =
                    theme_get_message(
                        'SetPassword',
                        'error',
                        'invalid_key'
                    );
            }

            if($this->password !== $this->cpassword) {
                $res->errors['nomatch_password'] =
                    theme_get_message(
                        'SetPassword',
                        'error',
                        'nomatch_password'
                    );
            }

            if(!$res->errors) {
                wp_set_password(
                    $this->password,
                    $user->ID
                );
                $res->success = true;
                $res->message =
                    theme_get_message(
                        'SetPassword',
                        'success',
                        'set'
                    );
            }
        }

        return $res;
    }

    private function check_username() {
        $res =
            (object) array(
                'errors' => false
            );

        if(!check_user_by_username_or_email($this->username)) {
            $res->errors['invalid_username'] =
                theme_get_message(
                    'SetPassword',
                    'error',
                    'invalid_username'
                );
        }

        return $res;
    }
}