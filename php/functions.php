<?php

include_once 'lang.php';
include_once 'config.php';

function get_language($lang_param) {
    global $lang, $default_language;

    if($lang_param) {
        $_SESSION['lang'] = $lang_param;
    }

    $current_language = $_SESSION['lang'];
    if(!$current_language || !$lang[$current_language]) {
        $_SESSION['lang'] = $default_language;
        $current_language = $default_language;
    }

    return $lang[$current_language];
}

function get_language_from_session() {
    global $lang, $default_language;
    $current_language = $_SESSION['lang'];
    if(!$current_language || !$lang[$current_language]) {
        $_SESSION['lang'] = $default_language;
        $current_language = $default_language;
    }
    return $lang[$current_language];
}

function post($field_name) {
    $data = $_POST[$field_name];
    if(!isset($data) || $data == '') {
        send_error('notInput', $field_name);
    }
    return $data;
}

function post_image($field_name) {
    global $max_size, $file_types;

    $image = $_FILES[$field_name];
    if(empty($image['tmp_name'])) {
        send_error('notImage', $field_name);
    }
    else {
        if($image['size'] > $max_size) {
            send_error('bigFile');
        }
        else if(!in_array(pathinfo($image['name'], PATHINFO_EXTENSION), $file_types)) {
            send_error('wrongExtension');
        }
        else return $image;
    }
}

function check_origin($origin, $size) {
    return !(($origin > $size) || ((int)$origin < 0));
}

function make_filename($name, $ext) {
    return sha1($name).'.'.$ext;
}

function get_filedir($name) {
    global $upload_dir;
    return ''.$upload_dir.$name;
}

function send_file($file_name, $file_dir) {
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename='.$file_name);
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: '.filesize($file_dir));
    return readfile($file_dir) ? true : false;
}

function get_translated($data) {
    $lang_array = get_language_from_session();
    return $lang_array[$data];
}

function send_error($error_message, $fieldName='') {
    $message = get_translated($error_message);

    if($fieldName != '') {
        $fieldName = strtolower(get_translated($fieldName));
        $message = $message.$fieldName;
    }

    $error = array(
        'status' => false,
        'message' => $message
    );
    header('Content-type: application/json');
    echo json_encode($error);
    exit;
}

function send_success($message) {
    $success = array(
        'status' => true,
        'message' => get_translated($message)
    );
    header('Content-type: application/json');
    echo json_encode($success);
}