<?php

include_once 'config.php';

// Get session variable
function get_session($field_name) {
    return $_SESSION[$field_name];
}

// Set session variable
function set_session($filed_name, $value) {
    $_SESSION[$filed_name] = $value;
}

// Get post parameter
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

// Get get parameter
function get($field_name) {
    return $_GET[$field_name];
}

// Check request method
function isPost() {
    return $_SERVER['REQUEST_METHOD'] == 'POST';
}


// Make filename
function make_filename($name, $ext) {
    return sha1($name).'.'.$ext;
}

// Get file path for download it
function get_download_filedir($name) {
    global $download_dir;
    return ''.$download_dir.$name;
}

// Get file path for upload it
function get_upload_filedir($name) {
    global $upload_dir;
    return ''.$upload_dir.$name;
}

// Send file name
function send_filename($file_name) {
    echo json_encode(array(
        'status' => 'OK',
        'link' => $file_name
    ));
    exit;
}

// Initiate file download
function send_file($file_name) {
    $file_dir = get_download_filedir($file_name);
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

// Convert value to bool
function bool($value) {
    return $value === "true";
}