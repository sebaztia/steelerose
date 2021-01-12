<?php
namespace Theme;

class Login {
    private $credentials
        = array();
    private $secure_cookie
        = false;

    public function __construct($credentials, $secure_cookie = false) {
        $this->credentials =
            $credentials;
        $this->secure_cookie =
            $secure_cookie;
    }

    public function do() {
        $res =
            wp_signon(
                $this->credentials,
                $this->secure_cookie
            );

        if(!$res->errors) {
            $res->success = true;

            // If we can use JWT tokens
            if(class_exists('Jwt_Auth')) {

                $client = new \GuzzleHttp\Client(
                    array(
                        'base_uri' => get_site_url(),
                        'timeout'  => 5.0
                    )
                );

                $token =
                    $client->request(
                    'POST',
                    '/wp-json/jwt-auth/v1/token', [
                        'form_params' => [
                            'username' =>
                                $res->user_login,
                            'password' =>
                                $this->credentials['user_password']
                        ]
                    ]);

                $token = json_decode(
                    $token
                        ->getBody()
                        ->getContents()
                );

                $res->data->jwt_token =
                    $token->token;

                setcookie(
                    get_site_url() . '_jwt_token',
                    $token->token,
                    time() + (86400 * 7)
                );
            }

            return $res->data;
        } else {
            foreach($res->errors as $k => $v) {
                $error =
                    theme_get_message(
                        'Login',
                        'error',
                        $k
                    );

                $res->errors[$k] =
                    ($error ? $error : $v);
            }
        }

        return $res;
    }
}