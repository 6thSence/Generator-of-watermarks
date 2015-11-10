<?php

session_start();
include_once 'functions.php';

$file_name = $_GET['file'];
send_file($file_name);
exit;