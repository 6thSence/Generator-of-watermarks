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

function send_filename($file_name) {
    $data = array(
        'status' => 'OK',
        'link' => $file_name
    );
    echo json_encode($data);
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
}

function isBoolean($value) {
    return $value === "true";
}