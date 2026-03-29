const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwK5lzqYUNFbk4w0IiE04qTIo1PaeuOgkOmfQGK_PSu_6FH4YeI3OjBWCHqhAaPUtZW/exec";

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
      return new Response(JSON.stringify({ error: "missing fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const tierLabel = tierLabels[tier] || tier;

    const payload = JSON.stringify({
      name,
      company,
      email,
      whatsapp,
      tier: tierLabel,
      description: description || "",
    });

    // Google Apps Script redirects on POST — follow manually
    const res = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: payload,
      redirect: "follow",
    });

    // Even if redirected, if we got here it worked
    // Google Apps Script returns 200 on success after redirect
    // Or 302 which fetch auto-follows
    const text = await res.text();

    // Check if the response contains our success JSON or is an error page
    if (text.includes('"success"') || res.ok) {
      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    throw new Error(`Google Script returned: ${res.status}`);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Pricing signup error:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
