const N8N_WEBHOOK = "https://n8n.srv1200431.hstgr.cloud/webhook/9f7a00c2-b254-4de4-98a2-fa9fc5642648";

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

    await fetch(N8N_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        company,
        email,
        whatsapp,
        tier: tierLabel,
        description: description || "",
        timestamp: new Date().toISOString(),
      }),
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
