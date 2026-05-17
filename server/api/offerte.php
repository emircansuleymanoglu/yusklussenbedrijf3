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
$datum         = date('j F Y');

// ── Interne notificatie ───────────────────────────────────────────────────────
$subject = '=?UTF-8?B?' . base64_encode('Offerte aanvraag: ' . $dienst . ' – ' . $naam) . '?=';

$adresRij = $sAdres ? '
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #f5f5f5;font-size:12px;color:#888888;text-transform:uppercase;letter-spacing:0.5px;width:100px;vertical-align:top">Adres</td>
        <td style="padding:10px 0;border-bottom:1px solid #f5f5f5;font-size:14px;color:#111111">' . $sAdres . '</td>
      </tr>' : '';

$body = '<!DOCTYPE html>
<html lang="nl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0f2f5;font-family:Arial,Helvetica,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f0f2f5">
<tr><td align="center" style="padding:32px 16px">
<table width="580" cellpadding="0" cellspacing="0" border="0" style="max-width:580px;width:100%">

  <tr><td style="background:#1e2d4f;padding:20px 28px;border-radius:6px 6px 0 0">
    <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
      <td style="font-size:14px;font-weight:700;color:#ffffff;letter-spacing:1px;text-transform:uppercase">YUS Klussenbedrijf</td>
      <td align="right"><a href="https://yusklussenbedrijf.nl" style="font-size:12px;color:#8aabdc;text-decoration:none">yusklussenbedrijf.nl</a></td>
    </tr></table>
  </td></tr>

  <tr><td style="background:#ffffff;padding:32px 28px 0">
    <p style="margin:0 0 4px;font-size:22px;font-weight:700;color:#111111">Nieuwe offerte aanvraag</p>
    <p style="margin:0 0 24px;font-size:13px;color:#888888">YUS Klussenbedrijf &mdash; ' . $datum . '</p>
    <hr style="border:none;border-top:1px solid #eeeeee;margin:0 0 24px">
  </td></tr>

  <tr><td style="background:#ffffff;padding:0 28px">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse">
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #f5f5f5;font-size:12px;color:#888888;text-transform:uppercase;letter-spacing:0.5px;width:100px;vertical-align:top">Naam</td>
        <td style="padding:10px 0;border-bottom:1px solid #f5f5f5;font-size:14px;color:#111111;font-weight:600">' . $sNaam . '</td>
      </tr>
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #f5f5f5;font-size:12px;color:#888888;text-transform:uppercase;letter-spacing:0.5px;vertical-align:top">E-mail</td>
        <td style="padding:10px 0;border-bottom:1px solid #f5f5f5;font-size:14px;color:#111111">' . $sEmail . '</td>
      </tr>
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #f5f5f5;font-size:12px;color:#888888;text-transform:uppercase;letter-spacing:0.5px;vertical-align:top">Telefoon</td>
        <td style="padding:10px 0;border-bottom:1px solid #f5f5f5;font-size:14px;color:#111111">' . $sTelefoon . '</td>
      </tr>
      ' . $adresRij . '
      <tr>
        <td style="padding:10px 0;font-size:12px;color:#888888;text-transform:uppercase;letter-spacing:0.5px;vertical-align:top">Dienst</td>
        <td style="padding:10px 0;font-size:14px;color:#1e2d4f;font-weight:700">' . $sDienst . '</td>
      </tr>
    </table>
  </td></tr>

  <tr><td style="background:#ffffff;padding:24px 28px 0">
    <p style="margin:0 0 10px;font-size:11px;font-weight:700;color:#888888;text-transform:uppercase;letter-spacing:1px">Omschrijving</p>
    <div style="background:#f7f8fa;border-radius:4px;padding:16px 18px;font-size:14px;color:#333333;line-height:1.8">' . $sOmschrijving . '</div>
  </td></tr>

  <tr><td style="background:#ffffff;padding:28px">
    <p style="margin:0;font-size:12px;color:#bbbbbb">' . $datum . '</p>
  </td></tr>

  <tr><td style="background:#f7f8fa;border-top:1px solid #eeeeee;border-radius:0 0 6px 6px;padding:16px 28px">
    <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
      <td style="font-size:11px;color:#aaaaaa">yusklussenbedrijf.nl &nbsp;&middot;&nbsp; +31 6 21547256 &nbsp;&middot;&nbsp; info@yusklussenbedrijf.nl</td>
    </tr></table>
  </td></tr>

</table>
</td></tr></table>
</body></html>';

$sent = sendMail(TO_EMAIL, $subject, $body, $sEmail);

// ── Bevestigingsmail aan klant ────────────────────────────────────────────────
$klantSubject = '=?UTF-8?B?' . base64_encode('Uw offerte-aanvraag is ontvangen') . '?=';

$klantAdresRij = $sAdres ? '
      <tr>
        <td style="padding:9px 14px;border-top:1px solid #eeeeee;font-size:12px;color:#888888;text-transform:uppercase;letter-spacing:0.5px;width:110px;vertical-align:top">Adres</td>
        <td style="padding:9px 14px;border-top:1px solid #eeeeee;font-size:14px;color:#111111">' . $sAdres . '</td>
      </tr>' : '';

$klantBody = '<!DOCTYPE html>
<html lang="nl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0f2f5;font-family:Arial,Helvetica,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f0f2f5">
<tr><td align="center" style="padding:32px 16px">
<table width="580" cellpadding="0" cellspacing="0" border="0" style="max-width:580px;width:100%">

  <!-- Header -->
  <tr><td style="background:#1e2d4f;padding:20px 28px;border-radius:6px 6px 0 0">
    <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
      <td style="font-size:14px;font-weight:700;color:#ffffff;letter-spacing:1px;text-transform:uppercase">YUS Klussenbedrijf</td>
      <td align="right"><a href="https://yusklussenbedrijf.nl" style="font-size:12px;color:#8aabdc;text-decoration:none">yusklussenbedrijf.nl</a></td>
    </tr></table>
  </td></tr>

  <!-- Titel -->
  <tr><td style="background:#ffffff;padding:32px 28px 0">
    <p style="margin:0 0 4px;font-size:22px;font-weight:700;color:#111111">Uw offerte-aanvraag is ontvangen</p>
    <p style="margin:0 0 24px;font-size:13px;color:#888888">YUS Klussenbedrijf &mdash; ' . $datum . '</p>
    <hr style="border:none;border-top:1px solid #eeeeee;margin:0 0 24px">
    <p style="margin:0 0 16px;font-size:15px;color:#222222">Beste ' . $sNaam . ',</p>
    <p style="margin:0 0 24px;font-size:14px;color:#555555;line-height:1.7">Bedankt voor uw offerte-aanvraag. Uw aanvraag is goed ontvangen en wordt zo spoedig mogelijk behandeld door ons team.</p>
  </td></tr>

  <!-- Stappen -->
  <tr><td style="background:#ffffff;padding:0 28px">
    <div style="background:#f7f8fa;border-radius:6px;padding:20px">
      <p style="margin:0 0 16px;font-size:11px;font-weight:700;color:#888888;text-transform:uppercase;letter-spacing:1px">Wat kunt u verwachten</p>

      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:14px">
        <tr>
          <td width="34" valign="top"><div style="width:26px;height:26px;border-radius:50%;background:#1e2d4f;text-align:center;line-height:26px;font-size:12px;font-weight:700;color:#ffffff">1</div></td>
          <td style="padding-left:12px;vertical-align:top">
            <p style="margin:0 0 2px;font-size:14px;font-weight:600;color:#111111">Aanvraag ontvangen</p>
            <p style="margin:0;font-size:13px;color:#777777;line-height:1.5">Uw gegevens zijn veilig en in goede orde ontvangen.</p>
          </td>
        </tr>
      </table>

      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:14px">
        <tr>
          <td width="34" valign="top"><div style="width:26px;height:26px;border-radius:50%;background:#1e2d4f;text-align:center;line-height:26px;font-size:12px;font-weight:700;color:#ffffff">2</div></td>
          <td style="padding-left:12px;vertical-align:top">
            <p style="margin:0 0 2px;font-size:14px;font-weight:600;color:#111111">Beoordeling binnen <span style="color:#1e2d4f">24 uur</span></p>
            <p style="margin:0;font-size:13px;color:#777777;line-height:1.5">Een van onze medewerkers neemt persoonlijk contact met u op.</p>
          </td>
        </tr>
      </table>

      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td width="34" valign="top"><div style="width:26px;height:26px;border-radius:50%;background:#1e2d4f;text-align:center;line-height:26px;font-size:12px;font-weight:700;color:#ffffff">3</div></td>
          <td style="padding-left:12px;vertical-align:top">
            <p style="margin:0 0 2px;font-size:14px;font-weight:600;color:#111111">Offerte op maat</p>
            <p style="margin:0;font-size:13px;color:#777777;line-height:1.5">U ontvangt een concrete offerte, afgestemd op uw wensen en situatie.</p>
          </td>
        </tr>
      </table>
    </div>
  </td></tr>

  <!-- Aanvraag samenvatting -->
  <tr><td style="background:#ffffff;padding:24px 28px 0">
    <p style="margin:0 0 10px;font-size:11px;font-weight:700;color:#888888;text-transform:uppercase;letter-spacing:1px">Uw aanvraag</p>
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;border:1px solid #eeeeee;border-radius:4px">
      <tr style="background:#f7f8fa">
        <td style="padding:9px 14px;font-size:12px;color:#888888;text-transform:uppercase;letter-spacing:0.5px;width:110px;vertical-align:top">Dienst</td>
        <td style="padding:9px 14px;font-size:14px;color:#1e2d4f;font-weight:700">' . $sDienst . '</td>
      </tr>
      ' . $klantAdresRij . '
      <tr>
        <td style="padding:9px 14px;border-top:1px solid #eeeeee;font-size:12px;color:#888888;text-transform:uppercase;letter-spacing:0.5px;vertical-align:top">Omschrijving</td>
        <td style="padding:9px 14px;border-top:1px solid #eeeeee;font-size:14px;color:#333333;line-height:1.7">' . $sOmschrijving . '</td>
      </tr>
    </table>
  </td></tr>

  <!-- Telefoon -->
  <tr><td style="background:#ffffff;padding:24px 28px 0">
    <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#888888;text-transform:uppercase;letter-spacing:1px">Telefonisch bereikbaar</p>
    <p style="margin:0 0 20px;font-size:20px;font-weight:700;color:#1e2d4f">+31 6 21547256</p>
    <p style="margin:0;font-size:14px;color:#555555;line-height:1.7">Met vriendelijke groet,<br><strong style="color:#111111">YUS Klussenbedrijf</strong></p>
  </td></tr>

  <!-- Diensten -->
  <tr><td style="background:#ffffff;padding:20px 28px 0">
    <p style="margin:0 0 10px;font-size:11px;font-weight:700;color:#888888;text-transform:uppercase;letter-spacing:1px">Onze diensten</p>
    <span style="display:inline-block;background:#eef1f8;color:#1e2d4f;font-size:11px;font-weight:600;padding:5px 12px;border-radius:20px;margin:0 6px 6px 0">Stucwerk</span>
    <span style="display:inline-block;background:#eef1f8;color:#1e2d4f;font-size:11px;font-weight:600;padding:5px 12px;border-radius:20px;margin:0 6px 6px 0">Schilderwerk</span>
    <span style="display:inline-block;background:#eef1f8;color:#1e2d4f;font-size:11px;font-weight:600;padding:5px 12px;border-radius:20px;margin:0 6px 6px 0">Badkamer renovatie</span>
    <span style="display:inline-block;background:#eef1f8;color:#1e2d4f;font-size:11px;font-weight:600;padding:5px 12px;border-radius:20px;margin:0 6px 6px 0">Verbouwing</span>
    <span style="display:inline-block;background:#eef1f8;color:#1e2d4f;font-size:11px;font-weight:600;padding:5px 12px;border-radius:20px;margin:0 6px 6px 0">Vloerverwarming</span>
  </td></tr>

  <!-- Footer -->
  <tr><td style="padding-top:24px">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f7f8fa;border:1px solid #eeeeee;border-radius:0 0 6px 6px;padding:0"><tr>
      <td style="padding:16px 28px;font-size:11px;color:#aaaaaa">YUS Klussenbedrijf &nbsp;&middot;&nbsp; +31 6 21547256 &nbsp;&middot;&nbsp; info@yusklussenbedrijf.nl</td>
      <td align="right" style="padding:16px 28px"><a href="https://yusklussenbedrijf.nl" style="font-size:11px;color:#1e2d4f;text-decoration:none;font-weight:600">yusklussenbedrijf.nl &rsaquo;</a></td>
    </tr></table>
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
