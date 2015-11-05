<?php

require_once 'config.php';

$query = get_query($vk_url_authorize, array(
    'client_id'     => $client_id,
    'redirect_uri'  => $redirect_uri,
    'display'       => 'popup',
    'response_type' => 'code'
));

if (isset($_GET['code'])) {
    $token = json_decode(
        file_get_contents(
            get_query(
                $vk_url_access,
                array(
                    'client_id'     => $client_id,
                    'client_secret' => $client_secret,
                    'code'          => $_GET['code'],
                    'redirect_uri'  => $redirect_uri
                )
            )
        ),
        true
    );

    if (isset($token['access_token'])) {
        $params = array(
            'uids'         => $token['user_id'],
            'fields'       => 'uid,first_name,last_name,screen_name,sex,bdate,photo_big',
            'access_token' => $token['access_token']
        );
    }
}