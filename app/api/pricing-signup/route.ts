export const runtime = "nodejs";

const N8N_WEBHOOK = "https://n8n.srv1200431.hstgr.cloud/webhook/pricing-signup";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, company, email, whatsapp, tier, description } = body;

    if (!name || !company || !email || !whatsapp || !tier) {
      return Response.json({ error: "missing fields" }, { status: 400 });
    }

    await fetch(N8N_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        company,
        email,
        whatsapp,
        tier,
        description: description || "",
        timestamp: new Date().toISOString(),
      }),
    });

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "server error" }, { status: 500 });
  }
}
