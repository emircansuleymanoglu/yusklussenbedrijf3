<?php
define('SECRET_KEY', '886424e2881d5cebbf7c64d98e48ddb18fd4a77bcb56e43cc2fda8e26401fa1a');

header('Content-Type: application/json');
header('Cache-Control: no-store, no-cache, must-revalidate');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    exit(json_encode(['error' => 'Method not allowed']));
}

$timestamp = time();
$nonce     = bin2hex(random_bytes(16));
$sig       = hash_hmac('sha256', $timestamp . '|' . $nonce, SECRET_KEY);
$token     = base64_encode($timestamp . '|' . $nonce . '|' . $sig);

echo json_encode(['token' => $token]);
