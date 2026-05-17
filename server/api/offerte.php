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

$naam         = trim($data['naam']         ?? '');
$email        = trim($data['email']        ?? '');
$telefoon     = trim($data['telefoon']     ?? '');
$adres        = trim($data['adres']        ?? '');
$dienst       = trim($data['dienst']       ?? '');
$omschrijving = trim($data['omschrijving'] ?? '');

if (mb_strlen($naam) < 2          || mb_strlen($naam) > 100)          block('invalid_naam');
if (!filter_var($email, FILTER_VALIDATE_EMAIL))                         block('invalid_email_format');
if (mb_strlen($email) > 200)                                            block('email_too_long');
if (!preg_match('/^[\+\d\s\-\(\)\.]{7,20}$/', $telefoon))             block('invalid_telefoon');
if (mb_strlen($dienst) < 2        || mb_strlen($dienst) > 100)        block('invalid_dienst');
if (mb_strlen($omschrijving) < 10 || mb_strlen($omschrijving) > 2000) block('invalid_omschrijving');

injectionCheck($naam, $email, $telefoon, $adres, $dienst, $omschrijving);
spamCheck($naam, $omschrijving, $adres);
if (preg_match('/https?:\/\/|www\./i', $naam . $telefoon)) block('url_in_name_or_phone');
validateEmailDomain($email);

$sNaam         = sanitize($naam);
$sEmail        = sanitize($email);
$sTelefoon     = sanitize($telefoon);
$sAdres        = sanitize($adres);
$sDienst       = sanitize($dienst);
$sOmschrijving = nl2br(sanitize($omschrijving));
$datum         = date('d-m-Y') . ' om ' . date('H:i') . ' uur';

$subject = '=?UTF-8?B?' . base64_encode('Nieuwe offerte aanvraag: ' . $dienst) . '?=';

$adresRij = $sAdres
    ? '<tr style="border-bottom:1px solid #f1f5f9"><td style="padding:10px 8px;width:140px;color:#64748b;font-size:14px;vertical-align:top"><strong>Adres:</strong></td><td style="padding:10px 8px;font-size:14px">' . $sAdres . '</td></tr>'
    : '';

$body  = '<!DOCTYPE html><html lang="nl"><head><meta charset="UTF-8"></head>';
$body .= '<body style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;padding:20px;color:#333;background:#f1f5f9">';
$body .= '<div style="background:#0ea5e9;padding:24px 28px;border-radius:10px 10px 0 0">';
$body .= '<h1 style="color:#fff;margin:0;font-size:20px">&#x1F4CB; Nieuwe Offerte Aanvraag</h1>';
$body .= '<p style="color:#e0f2fe;margin:6px 0 0;font-size:13px">Yus Klussenbedrijf &mdash; ' . $sNaam . '</p>';
$body .= '</div>';
$body .= '<div style="background:#fff;padding:24px 28px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 10px 10px">';
$body .= '<table style="width:100%;border-collapse:collapse">';
$body .= '<tr style="border-bottom:1px solid #f1f5f9"><td style="padding:10px 8px;width:140px;color:#64748b;font-size:14px;vertical-align:top"><strong>Naam:</strong></td><td style="padding:10px 8px;font-size:14px">' . $sNaam . '</td></tr>';
$body .= '<tr style="border-bottom:1px solid #f1f5f9"><td style="padding:10px 8px;color:#64748b;font-size:14px;vertical-align:top"><strong>E-mail:</strong></td><td style="padding:10px 8px;font-size:14px"><a href="mailto:' . $sEmail . '" style="color:#0ea5e9">' . $sEmail . '</a></td></tr>';
$body .= '<tr style="border-bottom:1px solid #f1f5f9"><td style="padding:10px 8px;color:#64748b;font-size:14px;vertical-align:top"><strong>Telefoon:</strong></td><td style="padding:10px 8px;font-size:14px"><a href="tel:' . $sTelefoon . '" style="color:#0ea5e9">' . $sTelefoon . '</a></td></tr>';
$body .= $adresRij;
$body .= '<tr style="border-bottom:1px solid #f1f5f9"><td style="padding:10px 8px;color:#64748b;font-size:14px;vertical-align:top"><strong>Dienst:</strong></td><td style="padding:10px 8px;font-size:14px"><span style="background:#dbeafe;color:#1d4ed8;padding:3px 10px;border-radius:12px;font-size:12px;font-weight:bold">' . $sDienst . '</span></td></tr>';
$body .= '<tr><td colspan="2" style="padding:10px 8px"><strong style="color:#64748b;font-size:14px">Omschrijving:</strong>';
$body .= '<div style="margin-top:8px;padding:14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;font-size:14px;line-height:1.7">' . $sOmschrijving . '</div></td></tr>';
$body .= '</table>';
$body .= '<div style="margin-top:20px;padding:12px 16px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;font-size:12px;color:#166534">';
$body .= '&#x2705; Ontvangen op ' . $datum . '</div>';
$body .= '</div></body></html>';

$sent = sendMail(TO_EMAIL, $subject, $body, $sEmail);

if ($sent) {
    recordSubmission(clientIp());
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'mail_failed']);
}
