<?php

session_start();
include_once 'functions.php';

$file_name = get('file');
send_file($file_name);