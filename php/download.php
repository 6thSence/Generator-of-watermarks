<?php

session_start();
include_once 'config.php';
include_once 'functions.php';

if(isPost()) {
    $originX = post('originX');
    $originY = post('originY');
    $transparency = post('transparency');
    $originalImagePath = post('originalImage');
    $watermarkImagePath = post('watermarkImage');

    $original = new Imagick($originalImagePath);
    $watermark = new Imagick($watermarkImagePath);

    if($watermark->getImageAlphaChannel()) {
        $watermark->evaluateImage(Imagick::EVALUATE_DIVIDE, 1.0 / $transparency, Imagick::CHANNEL_ALPHA);
    }
    else {
        $watermark->setImageOpacity($transparency);
    }

    $isPattern = post('isPattern');
    if(bool($isPattern)) {
        $initialX = str_replace('px', '', post('x'));
        $initialY = str_replace('px', '', post('y'));

        $watermarkWidth = $watermark->getImageWidth();
        $watermarkHeight = $watermark->getImageHeight();

        $imageWidth = $original->getImageWidth();
        $imageHeight = $original->getImageHeight();


        for($x = $initialX; ; $x += ($watermarkWidth + $originY)) {
            for($y = $initialY; ; $y += ($watermarkHeight + $originX)) {
                $original->compositeImage($watermark, Imagick::COMPOSITE_DEFAULT, $x, $y);
                if ($y > $imageHeight) break;
            }
            if ($x > $imageWidth) break;
        }
    }
    else {
        $original->compositeImage($watermark, Imagick::COMPOSITE_DEFAULT, $originX, $originY);
    }
    $original->flattenImages();

    $file_name = make_filename($originalImagePath, 'jpg');
    $file_dir = get_download_filedir($file_name);
    $original->writeImage($file_dir);
    send_filename($file_name);
}




