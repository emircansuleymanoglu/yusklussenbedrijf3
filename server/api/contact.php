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
$datum    = date('d-m-Y \o\m H:i');

// ── Interne notificatiemail ───────────────────────────────────────────────────
$subject = '=?UTF-8?B?' . base64_encode('Nieuw contactbericht van ' . $naam) . '?=';

$body = '<!DOCTYPE html><html lang="nl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0f0f0;font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f0f0f0;padding:32px 16px">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%">

  <!-- Header -->
  <tr><td style="background:#111111;padding:28px 36px;border-radius:6px 6px 0 0">
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td><span style="color:#ffffff;font-size:17px;font-weight:700;letter-spacing:0.3px">YUS Klussenbedrijf</span></td>
        <td align="right"><span style="color:#888888;font-size:12px">Nieuw bericht</span></td>
      </tr>
    </table>
  </td></tr>

  <!-- Body -->
  <tr><td style="background:#ffffff;padding:32px 36px;border-left:1px solid #e4e4e4;border-right:1px solid #e4e4e4">

    <p style="margin:0 0 24px;font-size:13px;color:#999999">' . $datum . '</p>

    <!-- Gegevens -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin-bottom:28px">
      <tr>
        <td style="padding:11px 0;border-bottom:1px solid #f2f2f2;font-size:13px;color:#999999;width:110px;vertical-align:top">Naam</td>
        <td style="padding:11px 0;border-bottom:1px solid #f2f2f2;font-size:14px;color:#111111;font-weight:600">' . $sNaam . '</td>
      </tr>
      <tr>
        <td style="padding:11px 0;font-size:13px;color:#999999;vertical-align:top">E-mail</td>
        <td style="padding:11px 0;font-size:14px"><a href="mailto:' . $sEmail . '" style="color:#111111;text-decoration:none">' . $sEmail . '</a></td>
      </tr>
    </table>

    <!-- Bericht -->
    <p style="margin:0 0 10px;font-size:12px;color:#999999;text-transform:uppercase;letter-spacing:0.8px">Bericht</p>
    <div style="padding:16px 20px;background:#f8f8f8;border-left:3px solid #cccccc;font-size:14px;color:#333333;line-height:1.75">' . $sBericht . '</div>

  </td></tr>

  <!-- Footer -->
  <tr><td style="background:#f8f8f8;padding:16px 36px;border:1px solid #e4e4e4;border-top:none;border-radius:0 0 6px 6px">
    <p style="margin:0;font-size:11px;color:#bbbbbb">Ontvangen via yusklussenbedrijf.nl &nbsp;&middot;&nbsp; ' . $datum . '</p>
  </td></tr>

</table>
</td></tr></table>
</body></html>';

$sent = sendMail(TO_EMAIL, $subject, $body, $sEmail);

// ── Bevestigingsmail aan klant ────────────────────────────────────────────────
$klantSubject = '=?UTF-8?B?' . base64_encode('Uw bericht is ontvangen – YUS Klussenbedrijf') . '?=';

$klantBody = '<!DOCTYPE html><html lang="nl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0f0f0;font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f0f0f0;padding:32px 16px">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%">

  <!-- Header -->
  <tr><td style="background:#111111;padding:28px 36px;border-radius:6px 6px 0 0">
    <span style="color:#ffffff;font-size:17px;font-weight:700;letter-spacing:0.3px">YUS Klussenbedrijf</span><br>
    <span style="color:#888888;font-size:12px;margin-top:4px;display:inline-block">yusklussenbedrijf.nl &nbsp;&middot;&nbsp; +31 6 21547256</span>
  </td></tr>

  <!-- Body -->
  <tr><td style="background:#ffffff;padding:36px;border-left:1px solid #e4e4e4;border-right:1px solid #e4e4e4">

    <p style="margin:0 0 20px;font-size:15px;color:#111111">Beste ' . $sNaam . ',</p>

    <p style="margin:0 0 16px;font-size:14px;color:#444444;line-height:1.7">
      Bedankt voor uw bericht. We hebben uw vraag goed ontvangen en nemen binnen <strong style="color:#111111">24 uur</strong> contact met u op.
    </p>

    <p style="margin:0 0 14px;font-size:13px;color:#999999;text-transform:uppercase;letter-spacing:0.8px">Uw bericht</p>
    <div style="padding:16px 20px;background:#f8f8f8;border-left:3px solid #cccccc;font-size:14px;color:#333333;line-height:1.75;margin-bottom:28px">' . $sBericht . '</div>

    <p style="margin:0 0 20px;font-size:14px;color:#444444;line-height:1.7">
      Heeft u in de tussentijd vragen? Bel ons op
      <a href="tel:+31621547256" style="color:#111111;font-weight:600;text-decoration:none">+31 6 21547256</a>
      of reply op dit bericht.
    </p>

    <p style="margin:0;font-size:14px;color:#111111;line-height:1.7">Met vriendelijke groet,<br><strong>YUS Klussenbedrijf</strong></p>

  </td></tr>

  <!-- Footer -->
  <tr><td style="background:#f8f8f8;padding:16px 36px;border:1px solid #e4e4e4;border-top:none;border-radius:0 0 6px 6px">
    <p style="margin:0;font-size:11px;color:#bbbbbb">U ontvangt dit bericht omdat u contact heeft opgenomen via <a href="https://yusklussenbedrijf.nl" style="color:#bbbbbb">yusklussenbedrijf.nl</a></p>
  </td></tr>

</table>
</td></tr></table>
</body></html>';

sendMail($email, $klantSubject, $klantBody);

if ($sent) {
    recordSubmission(clientIp());
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'mail_failed']);
}
