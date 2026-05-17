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

if (mb_strlen($naam) < 2     || mb_strlen($naam) > 100)     block('invalid_naam');
if (!filter_var($email, FILTER_VALIDATE_EMAIL))               block('invalid_email_format');
if (mb_strlen($bericht) < 10 || mb_strlen($bericht) > 2000)  block('invalid_bericht');

injectionCheck($naam, $email, $bericht);
spamCheck($naam, $bericht);
if (preg_match('/https?:\/\/|www\./i', $naam)) block('url_in_name');
validateEmailDomain($email);

$sNaam    = sanitize($naam);
$sEmail   = sanitize($email);
$sBericht = nl2br(sanitize($bericht));
$datum    = date('d-m-Y') . ' om ' . date('H:i') . ' uur';

$subject = '=?UTF-8?B?' . base64_encode('Nieuw contactbericht van ' . $naam) . '?=';

$body  = '<!DOCTYPE html><html lang="nl"><head><meta charset="UTF-8"></head>';
$body .= '<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif">';
$body .= '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0"><tr><td align="center">';
$body .= '<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:4px;overflow:hidden;border:1px solid #e0e0e0">';
$body .= '<tr><td style="background:#1a1a1a;padding:24px 32px">';
$body .= '<p style="margin:0;color:#ffffff;font-size:13px;letter-spacing:1px;text-transform:uppercase">Yus Klussenbedrijf</p>';
$body .= '<p style="margin:6px 0 0;color:#ffffff;font-size:18px;font-weight:bold">Nieuw contactbericht</p>';
$body .= '</td></tr>';
$body .= '<tr><td style="padding:28px 32px 20px">';
$body .= '<p style="margin:0 0 20px;font-size:13px;color:#888888">' . $datum . '</p>';
$body .= '<table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px">';
$body .= '<tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#888888;width:130px">Naam</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#1a1a1a;font-weight:bold">' . $sNaam . '</td></tr>';
$body .= '<tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#888888">E-mail</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0"><a href="mailto:' . $sEmail . '" style="color:#1a1a1a">' . $sEmail . '</a></td></tr>';
$body .= '</table>';
$body .= '</td></tr>';
$body .= '<tr><td style="padding:0 32px 32px">';
$body .= '<p style="margin:0 0 10px;font-size:13px;color:#888888;text-transform:uppercase;letter-spacing:0.5px">Bericht</p>';
$body .= '<p style="margin:0;font-size:14px;color:#333333;line-height:1.7;border-left:3px solid #e0e0e0;padding-left:14px">' . $sBericht . '</p>';
$body .= '</td></tr>';
$body .= '<tr><td style="background:#f9f9f9;padding:16px 32px;border-top:1px solid #e8e8e8">';
$body .= '<p style="margin:0;font-size:12px;color:#aaaaaa">Ontvangen via yusklussenbedrijf.nl op ' . $datum . '</p>';
$body .= '</td></tr>';
$body .= '</table></td></tr></table></body></html>';

// ── Mail aan Yus Klussenbedrijf ──────────────────────────────────────────────
$sent = sendMail(TO_EMAIL, $subject, $body, $sEmail);

// ── Bevestigingsmail aan klant ────────────────────────────────────────────────
$klantSubject = '=?UTF-8?B?' . base64_encode('Uw bericht is ontvangen – Yus Klussenbedrijf') . '?=';
$klantBody  = '<!DOCTYPE html><html lang="nl"><head><meta charset="UTF-8"></head>';
$klantBody .= '<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif">';
$klantBody .= '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0">';
$klantBody .= '<tr><td align="center">';
$klantBody .= '<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:4px;overflow:hidden;border:1px solid #e0e0e0">';
$klantBody .= '<tr><td style="background:#1a1a1a;padding:28px 36px">';
$klantBody .= '<p style="margin:0;color:#ffffff;font-size:20px;font-weight:bold;letter-spacing:0.5px">Yus Klussenbedrijf</p>';
$klantBody .= '<p style="margin:4px 0 0;color:#aaaaaa;font-size:12px">yusklussenbedrijf.nl &nbsp;·&nbsp; +31 6 21547256</p>';
$klantBody .= '</td></tr>';
$klantBody .= '<tr><td style="padding:36px 36px 24px">';
$klantBody .= '<p style="margin:0 0 16px;font-size:15px;color:#222222">Beste ' . $sNaam . ',</p>';
$klantBody .= '<p style="margin:0 0 16px;font-size:15px;color:#444444;line-height:1.6">Bedankt voor uw bericht. We hebben uw vraag goed ontvangen en nemen binnen <strong>24 uur</strong> contact met u op.</p>';
$klantBody .= '<p style="margin:0 0 24px;font-size:15px;color:#444444;line-height:1.6">Uw bericht:</p>';
$klantBody .= '<table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8e8e8;border-radius:4px">';
$klantBody .= '<tr style="background:#f9f9f9"><td style="padding:14px 16px;font-size:14px;color:#222222;line-height:1.6">' . $sBericht . '</td></tr>';
$klantBody .= '</table>';
$klantBody .= '</td></tr>';
$klantBody .= '<tr><td style="padding:0 36px 36px">';
$klantBody .= '<p style="margin:0 0 16px;font-size:15px;color:#444444;line-height:1.6">Heeft u in de tussentijd vragen? Neem gerust contact op via <a href="tel:+31621547256" style="color:#1a1a1a;font-weight:bold">+31 6 21547256</a> of reply op dit bericht.</p>';
$klantBody .= '<p style="margin:0;font-size:15px;color:#222222">Met vriendelijke groet,<br><strong>Yus Klussenbedrijf</strong></p>';
$klantBody .= '</td></tr>';
$klantBody .= '<tr><td style="background:#f9f9f9;padding:16px 36px;border-top:1px solid #e8e8e8">';
$klantBody .= '<p style="margin:0;font-size:11px;color:#aaaaaa">Dit is een automatische bevestiging. U ontvangt dit bericht omdat u contact heeft opgenomen via yusklussenbedrijf.nl</p>';
$klantBody .= '</td></tr>';
$klantBody .= '</table></td></tr></table></body></html>';

sendMail($email, $klantSubject, $klantBody);

if ($sent) {
    recordSubmission(clientIp());
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'mail_failed']);
}
