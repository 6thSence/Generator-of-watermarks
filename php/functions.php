<?php

include_once 'config.php';

function post($field_name) {
    return $_POST[$field_name];
}

function isPost() {
    return $_SERVER['REQUEST_METHOD'] == 'POST';
}

function make_filename($name, $ext) {
    return sha1($name).'.'.$ext;
}

function get_filedir($name) {
    global $upload_dir;
    return ''.$upload_dir.$name;
}

function get_file_link($name) {
    global $images;
    return ''.$images.$name;
}

function send_file($file_name) {
    $data = array(
        'status' => 'OK',
        'link' => get_file_link($file_name)
    );

    echo json_encode($data);
}

function isBoolean($value) {
    return $value === "true";
}