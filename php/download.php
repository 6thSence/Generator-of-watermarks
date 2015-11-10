<?php

session_start();
include_once 'config.php';
include_once 'functions.php';
require '../vendor/autoload.php';
use WideImage\WideImage;

if(isPost()) {
    $originX = post('originX');
    $originY = post('originY');
    $transparency = post('transparency') * 100;
    $originalImagePath = post('originalImage');
    $watermarkImagePath = post('watermarkImage');

    $original = WideImage::load($originalImagePath);
    $watermark = WideImage::load($watermarkImagePath);

    $isPattern = post('isPattern');
    if(isBoolean($isPattern)) {
        $initialX = str_replace('px', '', post('x'));
        $initialY = str_replace('px', '', post('y'));

        $watermarkWidth = $watermark->getWidth();
        $watermarkHeight = $watermark->getHeight();

        $imageWidth = $original->getWidth();
        $imageHeight = $original->getHeight();

        $result = $original;
        for($x = $initialX; ; $x += ($watermarkWidth + $originX)) {
            for($y = $initialY; ; $y += ($watermarkHeight + $originY)) {
                $result = $result->merge($watermark, $x, $y, $transparency);
                if ($y > $imageHeight) break;
            }
            if ($x > $imageWidth) break;
        }
    }
    else {
        $result = $original->merge($watermark, $originX, $originY, $transparency);
    }

    $file_name = make_filename($originalImagePath, 'jpg');
    $file_dir = get_filedir($file_name);
    $result->saveToFile($file_dir);
    send_filename($file_name);
    exit();
}




