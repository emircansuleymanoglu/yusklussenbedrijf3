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

// ── Gemeenschappelijke beveiligingscontroles ─────────────────────────────────
commonChecks($data);

// ── Velden ophalen ───────────────────────────────────────────────────────────
$naam        = trim($data['naam']        ?? '');
$email       = trim($data['email']       ?? '');
$telefoon    = trim($data['telefoon']    ?? '');
$adres       = trim($data['adres']       ?? '');
$dienst      = trim($data['dienst']      ?? '');
$omschrijving = trim($data['omschrijving'] ?? '');

// ── Veldvalidatie ────────────────────────────────────────────────────────────
if (mb_strlen($naam) < 2        || mb_strlen($naam) > 100)        block('invalid_naam');
if (!filter_var($email, FILTER_VALIDATE_EMAIL))                    block('invalid_email_format');
if (mb_strlen($email) > 200)                                       block('email_too_long');
if (!preg_match('/^[\+\d\s\-\(\)\.]{7,20}$/', $telefoon))        block('invalid_telefoon');
if (mb_strlen($dienst) < 2      || mb_strlen($dienst) > 100)     block('invalid_dienst');
if (mb_strlen($omschrijving) < 10 || mb_strlen($omschrijving) > 2000) block('invalid_omschrijving');

// ── Injectie & spam ──────────────────────────────────────────────────────────
injectionCheck($naam, $email, $telefoon, $adres, $dienst, $omschrijving);
spamCheck($naam, $omschrijving, $adres);

// URLs in naam of telefoon = bot
if (preg_match('/https?:\/\/|www\./i', $naam . $telefoon)) block('url_in_name_or_phone');

// ── E-maildomein MX-check ────────────────────────────────────────────────────
validateEmailDomain($email);

// ── E-mail verzenden ─────────────────────────────────────────────────────────
$sNaam        = sanitize($naam);
$sEmail       = sanitize($email);
$sTelefoon    = sanitize($telefoon);
$sAdres       = sanitize($adres);
$sDienst      = sanitize($dienst);
$sOmschrijving = sanitize($omschrijving);

$subject = '=?UTF-8?B?' . base64_encode('Nieuwe offerte aanvraag: ' . $dienst) . '?=';

$adresRow = $sAdres
    ? '<tr><td style="padding:10px 8px;width:140px;color:#64748b;font-size:14px;vertical-align:top"><strong>Adres:</strong></td>
       <td style="padding:10px 8px;font-size:14px">' . $sAdres . '</td></tr>'
    : '';

$body = <<<HTML
<!DOCTYPE html>
<html lang="nl">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;padding:20px;color:#333;background:#f1f5f9">
  <div style="background:#0ea5e9;padding:24px 28px;border-radius:10px 10px 0 0">
    <h1 style="color:#fff;margin:0;font-size:20px">📋 Nieuwe Offerte Aanvraag</h1>
    <p style="color:#e0f2fe;margin:6px 0 0;font-size:13px">Yus Klussenbedrijf — {$sNaam}</p>
  </div>
  <div style="background:#fff;padding:24px 28px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 10px 10px">
    <table style="width:100%;border-collapse:collapse">
      <tr style="border-bottom:1px solid #f1f5f9">
        <td style="padding:10px 8px;width:140px;color:#64748b;font-size:14px;vertical-align:top"><strong>Naam:</strong></td>
        <td style="padding:10px 8px;font-size:14px">{$sNaam}</td>
      </tr>
      <tr style="border-bottom:1px solid #f1f5f9">
        <td style="padding:10px 8px;color:#64748b;font-size:14px;vertical-align:top"><strong>E-mail:</strong></td>
        <td style="padding:10px 8px;font-size:14px"><a href="mailto:{$sEmail}" style="color:#0ea5e9">{$sEmail}</a></td>
      </tr>
      <tr style="border-bottom:1px solid #f1f5f9">
        <td style="padding:10px 8px;color:#64748b;font-size:14px;vertical-align:top"><strong>Telefoon:</strong></td>
        <td style="padding:10px 8px;font-size:14px"><a href="tel:{$sTelefoon}" style="color:#0ea5e9">{$sTelefoon}</a></td>
      </tr>
      {$adresRow}
      <tr style="border-bottom:1px solid #f1f5f9">
        <td style="padding:10px 8px;color:#64748b;font-size:14px;vertical-align:top"><strong>Dienst:</strong></td>
        <td style="padding:10px 8px;font-size:14px">
          <span style="background:#dbeafe;color:#1d4ed8;padding:3px 10px;border-radius:12px;font-size:12px;font-weight:bold">{$sDienst}</span>
        </td>
      </tr>
      <tr>
        <td colspan="2" style="padding:10px 8px">
          <strong style="color:#64748b;font-size:14px">Omschrijving:</strong>
          <div style="margin-top:8px;padding:14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;font-size:14px;line-height:1.7">{$sOmschrijving}</div>
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
