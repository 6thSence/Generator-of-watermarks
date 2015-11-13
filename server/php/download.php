<?php

session_start();
include_once 'config.php';
include_once 'functions.php';

if(isPost()) {
    // Get post parameters
    $originX = post('originX');
    $originY = post('originY');
    $transparency = post('transparency');
    $watermarkResize = post('markMin');
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

    // Resize image
    if($watermarkResize > 1) {
        $watermark->resizeImage($watermark->getImageWidth() / $watermarkResize,
                                $watermark->getImageHeight() / $watermarkResize,
                                Imagick::FILTER_LANCZOS, 1);
    }

    // Watermark block
    $isPattern = post('isPattern');
    if(bool($isPattern)) {
        // Get watermark`s offset from original image
        $initialX = (int)str_replace('px', '', post('x'));
        $initialY = (int)str_replace('px', '', post('y'));

        // Get watermark sizes
        $watermarkWidth = $watermark->getImageWidth();
        $watermarkHeight = $watermark->getImageHeight();

        // Get original image sizes
        $imageWidth = $original->getImageWidth();
        $imageHeight = $original->getImageHeight();

        // Merge watermark in tiling mode
        for($x = $initialX; ; $x += ($watermarkWidth + (int)$originY)) {
            for($y = $initialY; ; $y += ($watermarkHeight + (int)$originX)) {
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
    $file_name = make_filename($originalImagePath, 'png');
    $file_dir = get_download_filedir($file_name);
    // Save image
    $original->setImageFormat('png');
    $original->writeImage($file_dir);
    // Send image name to user
    send_filename($file_name);
}




