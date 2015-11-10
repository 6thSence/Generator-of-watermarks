<?php

include_once 'config.php';

// Access functions
function get_session($field_name) {
    return $_SESSION[$field_name];
}

function set_session($filed_name, $value) {
    $_SESSION[$filed_name] = $value;
}

function post($field_name) {
    $data = $_POST[$field_name];

    if(!isset($data)) {
        echo json_encode(array(
            'status' => 'Error',
            'text' => 'Set '.$field_name
        ));
        exit;
    }

    return $_POST[$field_name];
}

function get($field_name) {
    return $_GET[$field_name];
}

function isPost() {
    return $_SERVER['REQUEST_METHOD'] == 'POST';
}


// File functions
function make_filename($name, $ext) {
    return sha1($name).'.'.$ext;
}

function get_filedir($name) {
    global $upload_dir;
    return ''.$upload_dir.$name;
}


// Send functions
function send_filename($file_name) {
    echo json_encode(array(
        'status' => 'OK',
        'link' => $file_name
    ));
    exit;
}

function send_file($file_name) {
    $file_dir = get_filedir($file_name);
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename='.$file_name);
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: '.filesize($file_dir));
    readfile($file_dir);
    exit;
}

// Utils
function bool($value) {
    return $value === "true";
}