<?php
require_once __DIR__ . '/_common.php';

header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); exit(json_encode(['success'=>false])); }

$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) block('invalid_json');

commonChecks($data);

$naam    = trim($data['naam']    ?? '');
$email   = trim($data['email']   ?? '');
$bericht = trim($data['bericht'] ?? '');

if (mb_strlen($naam) < 2    || mb_strlen($naam) > 100)   block('invalid_naam');
if (!filter_var($email, FILTER_VALIDATE_EMAIL))            block('invalid_email_format');
if (mb_strlen($bericht) < 10 || mb_strlen($bericht) > 2000) block('invalid_bericht');

injectionCheck($naam, $email, $bericht);
spamCheck($naam, $bericht);
if (preg_match('/https?:\/\/|www\./i', $naam)) block('url_in_name');
validateEmailDomain($email);

$sNaam    = sanitize($naam);
$sEmail   = sanitize($email);
$sBericht = sanitize($bericht);

$subject = '=?UTF-8?B?' . base64_encode('Nieuw contactbericht van ' . $naam) . '?=';

$body = <<<HTML
<!DOCTYPE html>
<html lang="nl">
<head><meta charset="UTF-8"></head>
<body style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;padding:20px;color:#333;background:#f1f5f9">
  <div style="background:#0ea5e9;padding:24px 28px;border-radius:10px 10px 0 0">
    <h1 style="color:#fff;margin:0;font-size:20px">✉️ Nieuw Contactbericht</h1>
    <p style="color:#e0f2fe;margin:6px 0 0;font-size:13px">Yus Klussenbedrijf — {$sNaam}</p>
  </div>
  <div style="background:#fff;padding:24px 28px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 10px 10px">
    <table style="width:100%;border-collapse:collapse">
      <tr style="border-bottom:1px solid #f1f5f9">
        <td style="padding:10px 8px;width:120px;color:#64748b;font-size:14px;vertical-align:top"><strong>Naam:</strong></td>
        <td style="padding:10px 8px;font-size:14px">{$sNaam}</td>
      </tr>
      <tr style="border-bottom:1px solid #f1f5f9">
        <td style="padding:10px 8px;color:#64748b;font-size:14px;vertical-align:top"><strong>E-mail:</strong></td>
        <td style="padding:10px 8px;font-size:14px"><a href="mailto:{$sEmail}" style="color:#0ea5e9">{$sEmail}</a></td>
      </tr>
      <tr>
        <td colspan="2" style="padding:10px 8px">
          <strong style="color:#64748b;font-size:14px">Bericht:</strong>
          <div style="margin-top:8px;padding:14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;font-size:14px;line-height:1.7">{$sBericht}</div>
        </td>
      </tr>
    </table>
    <div style="margin-top:20px;padding:12px 16px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;font-size:12px;color:#166534">
      ✅ Ontvangen op HTML;

$body .= date('d-m-Y') . ' om ' . date('H:i') . ' uur</div></div></body></html>';

$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-Type: text/html; charset=UTF-8' . "\r\n";
$headers .= 'From: Yus Klussenbedrijf <' . FROM_EMAIL . '>' . "\r\n";
$headers .= 'Reply-To: ' . $sEmail . "\r\n";
$headers .= 'X-Mailer: YusKlussenbedrijf/1.0' . "\r\n";

$sent = mail(TO_EMAIL, $subject, $body, $headers);

if ($sent) {
    recordSubmission(clientIp());
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'mail_failed']);
}
