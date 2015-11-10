<?php

$file = $_POST['url'];
header('Content-Disposition: attachment; filename=Gener.jpg');
readfile($file);
exit;