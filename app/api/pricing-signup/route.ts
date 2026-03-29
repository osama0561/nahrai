export const runtime = "nodejs";

const SHEET_ID = "19hf2WFtgQ3UW-HsIpxIi0DVQatIrqj9SmKuoVcxhdB4";
const SCOPES = "https://www.googleapis.com/auth/spreadsheets";

const SERVICE_ACCOUNT = {
  client_email: "33345503593-compute@developer.gserviceaccount.com",
  private_key: `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDISVdD27ti4EIr
4hl3R/eOy8WL8emogo4V6MujleEJOUdSNudSqbrKZ220xLJ/+n7PN6skx8F/bvew
WbLy3Jlas62mgnyhLgD5uLm12hsbwUUEtJ0rs1iX7Zr/YRthxevkabkVCT17bZ9d
O7Ulw59JxF0FUIad4TzfNkTsJ6eLtlcwMOSoJ0ZBPHwvMB60C2GFfk6vP8E0vxLq
/gntoNMSXpd65k2j3cg11kKZNn580JlPPXO7B1PQbsx4qGvmUEykqyguSbO8HPT0
5VBuvy980aDmwCMoaCtjQ1srtglqaeNrJb1Fjk90OxDVkK7CUperiAG2xkBjHF8h
o/hiZra3AgMBAAECggEAFY+HnF94IaHAnda+JRATP0UCZBlLrP846nTgDyEgU4zd
96S/bC+nUwilT7No/8vogMgeXVw/oUdB1LMjR2+l9pSnGeisH/HC2x8epsvu5SL+
Gg6TaNPqspg6eklq2DClPzZ+XRxciP/5CuFVk9YmPJut49eSVkab9e9ypfVy3OA4
Tw+xzaWTC0X/cTXisWSzKP89DFPPXwXBXpPoMV+P50kXmeyNrbcZZzjtHB61Lh4g
p8Lm8dQKMBbydCZkpFUZXSaWBtBpScL40IgTfd549oKQXFcgiKIgnqthBGZuEJap
WnQ+Wo8174/GEfxd7h/RNc3Ve2OvPT1gDw6fNTzG0QKBgQDyZtK5oARm963iHi/T
WU6xepQBWVaC93xUM9UznQXwF1O15mT7fL7Mbj5PK4AzQmqSnhqT8UJ0AqF07EhF
ragT3a46mL7YwrHO5N0f7A+mWW/kJmLshkNoQsbkh0yvrWdjgisrAx0wZRRXJYNG
aWfUcXsdANi9XWBE4URbwhesaQKBgQDThbGYYukwLNEWs85U4zthIYHVBqFxhJhU
h5P/vmFKSxcdIBfQkIp1lMffgXVd4rg5D7blkUWUy567CrrosI54MlxtXrvycf0S
RK/6Aqs5RcxjM0Pj33rS/cvn08kFTKQVsiDlizY17YY+imhYHAmqmiKLw8h6GUVT
mrzuPT9mHwKBgEgdEOnKUiTz4FYZ1u6QbhnctrVkB5m02NcQCIhvWXng5rWB0l8C
8JxO29ifv2cAhkYSJSQILVXoBnKLbMDV9d/bHl8uW/COk2lSqvo5Nzqs9t2wEdP9
6YXV/+ey3LyS4OQ4sHD+Xyurlo6KiXBkIVCRZiftvY0wf1hekACgUHypAoGAdS2x
TuwspqWNR3hgq6IeeRao6Cx+L3b3NIzPLnR3TUMAEQCAcOhB7BV6DJWZQWOiDupn
thGebGnJC3FMTi/RHUE49tXuZMdFHWOz4VqtJFNIgQQbbheV4WD8Hveyex8UH3jI
xKE0bPei0O64E2ek6z/sN2VEoG9zendUht6jSp0CgYEA1G8/JiRiROVCK8+DeOdt
lqLpp6CxdYDgTjZqoYRjfwzspsPXt4s2LY6cmRXkcIJTLDTnmESJnMUzkmybJh4v
aDDkBvRVE0iwBxC0VPbkkefOMvNx7Tvbcg3dBnPU1zeEV0VyQis3XwCvPFFIq8tb
YuvzP/BafSG+F/pwLuVaS3Q=
-----END PRIVATE KEY-----`,
  token_uri: "https://oauth2.googleapis.com/token",
};

/* ── JWT signing with Web Crypto ── */
function base64url(data: string | Uint8Array): string {
  const str = typeof data === "string" ? btoa(data) : btoa(String.fromCharCode(...data));
  return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function createJWT(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = base64url(
    JSON.stringify({
      iss: SERVICE_ACCOUNT.client_email,
      scope: SCOPES,
      aud: SERVICE_ACCOUNT.token_uri,
      iat: now,
      exp: now + 3600,
    })
  );

  const unsigned = `${header}.${payload}`;
  const encoder = new TextEncoder();

  // Import the private key
  const pemBody = SERVICE_ACCOUNT.private_key
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s/g, "");
  const binaryKey = Uint8Array.from(atob(pemBody), (c) => c.charCodeAt(0));

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    binaryKey,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", cryptoKey, encoder.encode(unsigned));
  return `${unsigned}.${base64url(new Uint8Array(signature))}`;
}

async function getAccessToken(): Promise<string> {
  const jwt = await createJWT();
  const res = await fetch(SERVICE_ACCOUNT.token_uri, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });
  const data = await res.json() as { access_token: string };
  return data.access_token;
}

/* ── Append row to Google Sheet ── */
async function appendToSheet(row: string[]) {
  const token = await getAccessToken();
  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Leads!A:G:append?valueInputOption=USER_ENTERED`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: [row] }),
    }
  );
}

/* ── Tier labels ── */
const tierLabels: Record<string, string> = {
  bronze: "برونز — ٢,٣٠٠ ريال/شهر",
  silver: "فضي — ٥,٥٠٠ ريال/شهر",
  gold: "ذهبي — ٢٤,٠٠٠ ريال/شهر",
  "automation-project": "مشروع أتمتة — ٧,٠٠٠ ريال",
  "agent-project": "مشروع وكيل AI — ١٥,٠٠٠ ريال",
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, company, email, whatsapp, tier, description } = body;

    if (!name || !company || !email || !whatsapp || !tier) {
      return Response.json({ error: "missing fields" }, { status: 400 });
    }

    const timestamp = new Date().toLocaleString("en-SA", { timeZone: "Asia/Riyadh" });
    const tierLabel = tierLabels[tier] || tier;

    await appendToSheet([timestamp, name, company, email, whatsapp, tierLabel, description || ""]);

    return Response.json({ success: true });
  } catch (err) {
    console.error("Pricing signup error:", err);
    return Response.json({ error: "server error" }, { status: 500 });
  }
}
