<?php

session_start();
include_once 'functions.php';

// Get image link and initiate download
$file_name = get('file');
send_file($file_name);