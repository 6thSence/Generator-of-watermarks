<?php

session_start();
include_once 'config.php';
include_once 'functions.php';

if(isPost()) {
    // Get post parameters
    $originX = post('originX');
    $originY = post('originY');
    $transparency = post('transparency');
    $originalImagePath = post('originalImage');
    $watermarkImagePath = post('watermarkImage');

    // Open images
    $original = new Imagick($originalImagePath);
    $watermark = new Imagick($watermarkImagePath);

    // Set opacity for images with alpha channel and without
    if($watermark->getImageAlphaChannel()) {
        $watermark->evaluateImage(Imagick::EVALUATE_DIVIDE, 1.0 / $transparency, Imagick::CHANNEL_ALPHA);
    }
    else {
        $watermark->setImageOpacity($transparency);
    }

    // Watermark block
    $isPattern = post('isPattern');
    if(bool($isPattern)) {
        // Get watermark`s offset from original image
        $initialX = str_replace('px', '', post('x'));
        $initialY = str_replace('px', '', post('y'));

        // Get watermark sizes
        $watermarkWidth = $watermark->getImageWidth();
        $watermarkHeight = $watermark->getImageHeight();

        // Get original image sizes
        $imageWidth = $original->getImageWidth();
        $imageHeight = $original->getImageHeight();

        // Merge watermark in tiling mode
        for($x = $initialX; ; $x += ($watermarkWidth + $originY)) {
            for($y = $initialY; ; $y += ($watermarkHeight + $originX)) {
                $original->compositeImage($watermark, Imagick::COMPOSITE_DEFAULT, $x, $y);
                if ($y > $imageHeight) break;
            }
            if ($x > $imageWidth) break;
        }
    }
    else {
        // Merge watermark in normal mode
        $original->compositeImage($watermark, Imagick::COMPOSITE_DEFAULT, $originX, $originY);
    }
    // Make flat image
    $original->flattenImages();

    // Make filename and filedir
    $file_name = make_filename($originalImagePath, 'jpg');
    $file_dir = get_download_filedir($file_name);
    // Save image
    $original->writeImage($file_dir);
    // Send image name to user
    send_filename($file_name);
}




