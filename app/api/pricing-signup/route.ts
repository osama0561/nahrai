// TODO: Replace this URL with your Google Apps Script deployment URL
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

    const res = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        company,
        email,
        whatsapp,
        tier: tierLabel,
        description: description || "",
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Google Script error (${res.status}): ${text}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Pricing signup error:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
