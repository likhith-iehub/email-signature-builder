import type { SignatureConfig } from "./signature-types";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Icons8 paths expect lowercase hex without `#`. */
function iconHex(color: string): string {
  return color.replace(/^#/, "").toLowerCase();
}

/** Table-only, inline-style HTML suitable for Gmail / Outlook pasting. */
export function buildSignatureHtmlFragment(c: SignatureConfig): string {
  const teal = esc(c.brandTeal);
  const barTeal = esc(c.accentBar.teal);
  const barOrange = esc(c.accentBar.orange);
  const barLime = esc(c.accentBar.lime);
  const barBrown = esc(c.accentBar.brown);

  return `<table cellpadding="0" cellspacing="0" border="0" width="100%" style="font-family:Arial,Helvetica,sans-serif;max-width:640px;background:#fdfcf9;border-collapse:collapse;margin:0;">
  <tr>
    <td style="padding:0;font-size:0;line-height:0;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;"><tr>
        <td height="4" width="50%" style="background:${barTeal};font-size:0;line-height:0;height:4px;">&nbsp;</td>
        <td height="4" width="17%" style="background:${barOrange};font-size:0;line-height:0;height:4px;">&nbsp;</td>
        <td height="4" width="16%" style="background:${barLime};font-size:0;line-height:0;height:4px;">&nbsp;</td>
        <td height="4" width="17%" style="background:${barBrown};font-size:0;line-height:0;height:4px;">&nbsp;</td>
      </tr></table>
    </td>
  </tr>
  <tr>
    <td style="padding:26px 28px 24px 28px;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;"><tr>
        <td width="84" style="vertical-align:middle;padding-right:14px;">
          <img src="${esc(c.photoUrl)}" alt="${esc(c.photoAlt)}" width="70" height="70" style="display:block;border-radius:50%;border:2px solid ${esc(c.accentBar.orange)};width:70px;height:70px;" />
        </td>
        <td style="vertical-align:middle;padding-right:16px;">
          <div style="font-size:9px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:${teal};margin-bottom:5px;font-family:Arial,sans-serif;white-space:nowrap;">&mdash; ${esc(c.closingLine)}</div>
          <div style="font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:500;line-height:1.1;color:#1d1d1f;letter-spacing:-0.4px;">${esc(c.fullName)}</div>
          <div style="margin-top:5px;font-size:12px;color:#666666;font-family:Arial,sans-serif;"><strong style="color:#1d1d1f;font-weight:600;">${esc(c.jobTitle)}</strong></div>
        </td>
        <td width="1" style="background:#d8d3cc;font-size:0;line-height:0;padding:0;" bgcolor="#d8d3cc">&nbsp;</td>
        <td style="vertical-align:middle;padding-left:16px;">
          <img src="${esc(c.companyLogoUrl)}" alt="${esc(c.companyLogoAlt)}" width="160" style="display:block;max-width:160px;height:auto;border:0;margin-bottom:10px;" />
          <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
            <tr>
              <td style="padding:2px 7px 2px 0;vertical-align:middle;font-size:0;line-height:0;">
                <img src="https://img.icons8.com/fluency-systems-filled/48/${esc(iconHex(c.brandTeal))}/domain.png" alt="" width="13" height="13" style="display:inline-block;vertical-align:middle;border:0;" />
              </td>
              <td style="padding:2px 0;font-size:12px;color:#3d3d3f;font-family:Arial,sans-serif;vertical-align:middle;">
                <a href="${esc(c.websiteUrl)}" style="color:#3d3d3f;text-decoration:none;">${esc(c.websiteLabel)}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:2px 7px 2px 0;vertical-align:middle;font-size:0;line-height:0;">
                <img src="https://img.icons8.com/ios-filled/50/${esc(iconHex(c.brandTeal))}/linkedin.png" alt="" width="13" height="13" style="display:inline-block;vertical-align:middle;border:0;" />
              </td>
              <td style="padding:2px 0;font-size:12px;color:#3d3d3f;font-family:Arial,sans-serif;vertical-align:middle;">
                <a href="${esc(c.linkedinUrl)}" style="color:#3d3d3f;text-decoration:none;">${esc(c.linkedinLabel)}</a>
              </td>
            </tr>
          </table>
        </td>
      </tr></table>
    </td>
  </tr>
  <tr>
    <td style="padding:14px 28px 14px 28px;background:#f6f2ea;border-top:1px solid #e8e3dc;font-size:10.5px;color:#7a7471;line-height:1.65;font-family:Arial,sans-serif;">
      <strong style="color:#3d3d3f;font-weight:600;">${esc(c.legalCompanyName)}</strong> &middot; ${esc(c.legalRegistrationLine)}<br>
      ${esc(c.legalAddressLine)}
    </td>
  </tr>
  <tr>
    <td style="padding:12px 28px 16px 28px;border-top:1px solid #f0ece4;font-size:9.5px;color:#a8a29c;line-height:1.6;font-family:Arial,sans-serif;">
      <div style="font-size:8px;letter-spacing:2px;text-transform:uppercase;color:#c0b8ae;margin-bottom:4px;font-weight:600;">${esc(c.confidentialityTitle)}</div>
      ${esc(c.confidentialityBody)}
    </td>
  </tr>
</table>`;
}
