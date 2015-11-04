<?php

session_start();
include_once 'config.php';
include_once 'functions.php';
require '../vendor/autoload.php';
use WideImage\WideImage;

if($_SERVER['REQUEST_METHOD'] == 'POST') {

    $originX = post('origin-x');
    $originY = post('origin-y');
    $transparency = post('transparency');
    $originalImage = post_image('original-image');
    $watermarkImage = post_image('watermark-image');

    $original = WideImage::load('original-image');
    $watermark = WideImage::load('watermark-image');

    if(check_origin($originX, $original->getWidth()) && check_origin($originY, $original->getHeight())) {
        $result = $original->merge($watermark, $originX, $originY, $transparency);

        $file_name = make_filename($originalImage['name'], 'jpg');
        $file_dir = get_filedir($file_name);
        $result->saveToFile($file_dir);

        send_file($file_name, $file_dir) ? send_success('successTransfer') : send_error('errorDownload');
    }
    else {
        send_error('wrongOrigin');
    }
}




