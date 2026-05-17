<?php
define('SECRET_KEY',    '886424e2881d5cebbf7c64d98e48ddb18fd4a77bcb56e43cc2fda8e26401fa1a');
define('TO_EMAIL',      'info@yusklussenbedrijf.nl');
define('FROM_EMAIL',    'noreply@yusklussenbedrijf.nl');
define('SITE_DOMAIN',   'yusklussenbedrijf.nl');
define('RATE_DIR',      __DIR__ . '/../../tmp/rate_limits/');
define('NONCE_DIR',     __DIR__ . '/../../tmp/nonces/');
define('LOG_FILE',      __DIR__ . '/../../logs/blocked.log');

// ── Spam keywords ────────────────────────────────────────────────────────────
define('SPAM_KEYWORDS', [
    'casino','viagra','cialis','porn','sex','enlarge','bitcoin','crypto',
    'forex','loan','winner','free money','click here','http://','https://',
    '.ru/','.cn/','.xyz/','.tk/','bit.ly','tinyurl','spam','hack',
    'phishing','invoice','refund','paypal verify','urgent action',
]);

// ── Allowed origins ──────────────────────────────────────────────────────────
define('ALLOWED_ORIGINS', [
    SITE_DOMAIN,
    'www.' . SITE_DOMAIN,
    'yusklussenbedrijf3.vercel.app',
    'localhost',
    '127.0.0.1',
]);

// ─────────────────────────────────────────────────────────────────────────────

function block(string $reason): never {
    $ip  = clientIp();
    $log = date('Y-m-d H:i:s') . ' | ' . $ip . ' | BLOCKED | ' . $reason . "\n";
    $dir = dirname(LOG_FILE);
    if (!is_dir($dir)) mkdir($dir, 0755, true);
    file_put_contents(LOG_FILE, $log, FILE_APPEND | LOCK_EX);

    http_response_code(400);
    exit(json_encode(['success' => false, 'error' => 'Verzoek geblokkeerd']));
}

function clientIp(): string {
    $ip = $_SERVER['HTTP_CF_CONNECTING_IP']
       ?? $_SERVER['HTTP_X_FORWARDED_FOR']
       ?? $_SERVER['REMOTE_ADDR']
       ?? 'unknown';
    return trim(explode(',', $ip)[0]);
}

function validateOrigin(): void {
    $ref    = $_SERVER['HTTP_REFERER'] ?? '';
    $origin = $_SERVER['HTTP_ORIGIN']  ?? '';
    foreach (ALLOWED_ORIGINS as $allowed) {
        if (str_contains($ref, $allowed) || str_contains($origin, $allowed)) return;
    }
    // Geen referer is ok voor directe requests (maar lege origin + lege ref = verdacht)
    if (!empty($ref) || !empty($origin)) block('invalid_origin');
}

function validateToken(string $token): void {
    if (empty($token)) block('no_token');

    $decoded = base64_decode($token, true);
    if ($decoded === false) block('invalid_token_format');

    $parts = explode('|', $decoded);
    if (count($parts) !== 3) block('invalid_token_parts');

    [$timestamp, $nonce, $sig] = $parts;

    // Signature
    $expected = hash_hmac('sha256', $timestamp . '|' . $nonce, SECRET_KEY);
    if (!hash_equals($expected, $sig)) block('invalid_token_signature');

    // Token leeftijd: minimaal 3 seconden (bot test), maximaal 2 uur
    $age = time() - (int)$timestamp;
    if ($age < 3)    block('token_too_fresh_bot');
    if ($age > 7200) block('token_expired');

    // Nonce eenmalig gebruik
    if (!is_dir(NONCE_DIR)) mkdir(NONCE_DIR, 0755, true);
    $nonceFile = NONCE_DIR . md5($nonce) . '.used';
    if (file_exists($nonceFile)) block('nonce_reused');
    file_put_contents($nonceFile, (string)time(), LOCK_EX);

    // Oude nonces opruimen (>3u)
    foreach (glob(NONCE_DIR . '*.used') ?: [] as $f) {
        if ((int)file_get_contents($f) < time() - 10800) @unlink($f);
    }
}

function checkRateLimit(string $ip): void {
    if (!is_dir(RATE_DIR)) mkdir(RATE_DIR, 0755, true);
    $hash    = md5($ip);
    $now     = time();

    // Per uur: max 3
    $hFile   = RATE_DIR . $hash . '_h.json';
    $hData   = file_exists($hFile) ? (json_decode(file_get_contents($hFile), true) ?: []) : [];
    $hData   = array_values(array_filter($hData, fn($t) => $t > $now - 3600));
    if (count($hData) >= 3) block('rate_limit_hour');

    // Per dag: max 8
    $dFile   = RATE_DIR . $hash . '_d.json';
    $dData   = file_exists($dFile) ? (json_decode(file_get_contents($dFile), true) ?: []) : [];
    $dData   = array_values(array_filter($dData, fn($t) => $t > $now - 86400));
    if (count($dData) >= 8) block('rate_limit_day');
}

function recordSubmission(string $ip): void {
    $hash  = md5($ip);
    $now   = time();

    $hFile = RATE_DIR . $hash . '_h.json';
    $hData = file_exists($hFile) ? (json_decode(file_get_contents($hFile), true) ?: []) : [];
    $hData = array_values(array_filter($hData, fn($t) => $t > $now - 3600));
    $hData[] = $now;
    file_put_contents($hFile, json_encode($hData), LOCK_EX);

    $dFile = RATE_DIR . $hash . '_d.json';
    $dData = file_exists($dFile) ? (json_decode(file_get_contents($dFile), true) ?: []) : [];
    $dData = array_values(array_filter($dData, fn($t) => $t > $now - 86400));
    $dData[] = $now;
    file_put_contents($dFile, json_encode($dData), LOCK_EX);
}

function spamCheck(string ...$texts): void {
    $combined = strtolower(implode(' ', $texts));
    foreach (SPAM_KEYWORDS as $kw) {
        if (str_contains($combined, $kw)) block('spam_keyword:' . $kw);
    }
}

function injectionCheck(string ...$texts): void {
    foreach ($texts as $t) {
        if (preg_match('/<[^>]+>|javascript:|data:|vbscript:/i', $t)) block('injection_attempt');
    }
}

function validateEmailDomain(string $email): void {
    $domain = substr($email, strrpos($email, '@') + 1);
    if (!checkdnsrr($domain, 'MX') && !checkdnsrr($domain, 'A')) block('invalid_email_domain');
}

function sanitize(string $v): string {
    return htmlspecialchars(strip_tags(trim($v)), ENT_QUOTES, 'UTF-8');
}

function commonChecks(array $data): void {
    // Content-Type
    if (!str_contains($_SERVER['CONTENT_TYPE'] ?? '', 'application/json')) block('invalid_content_type');
    // Origin
    validateOrigin();
    // Honeypot
    if (!empty($data['honeypot'])) block('honeypot');
    // Token
    validateToken($data['_token'] ?? '');
    // Rate limit
    checkRateLimit(clientIp());
}
