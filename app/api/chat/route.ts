export const runtime = "nodejs";

const N8N_WEBHOOK = "https://n8n.srv1200431.hstgr.cloud/webhook/9575a2cd-a292-4b85-a0d7-a7550a123ed9";

// In-memory IP block list (resets on worker restart — good enough for edge abuse)
const blockedIPs = new Map<string, number>();
const BLOCK_DURATION = 5 * 60 * 1000; // 5 minutes
const MAX_MESSAGES = 20; // max messages before auto-block

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("cf-connecting-ip") || req.headers.get("x-forwarded-for") || "unknown";

    // Check if IP is blocked
    const blockedUntil = blockedIPs.get(ip);
    if (blockedUntil) {
      if (Date.now() < blockedUntil) {
        const remaining = Math.ceil((blockedUntil - Date.now()) / 60000);
        return Response.json({ reply: `تم تعليق المحادثة مؤقتاً. حاول مرة أخرى بعد ${remaining} دقيقة.` });
      } else {
        blockedIPs.delete(ip);
      }
    }

    const body = await req.json();
    const history = body.history ?? [];

    // Block if sending too many messages (messing around)
    if (history.length > MAX_MESSAGES) {
      blockedIPs.set(ip, Date.now() + BLOCK_DURATION);
      return Response.json({ reply: "تم تعليق المحادثة لمدة ٥ دقائق بسبب النشاط غير المعتاد." });
    }

    const res = await fetch(N8N_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const text = await res.text();

    if (!res.ok) {
      return Response.json({ reply: "عذراً، حدث خطأ مؤقت. حاول مرة أخرى." });
    }

    let reply = "...";
    let qualified: boolean | null = null;

    try {
      const data = JSON.parse(text);
      reply = data.reply ?? data.text ?? data.output ?? data.message ?? JSON.stringify(data);
    } catch {
      reply = text;
    }

    // Strip JSON block from reply and detect qualification
    const jsonMatch = reply.match(/```json\s*(\{[\s\S]*?\})\s*```/);
    if (jsonMatch) {
      try {
        const leadData = JSON.parse(jsonMatch[1]);
        qualified = leadData.qualified ?? null;
      } catch { /* ignore */ }
      reply = reply.replace(/```json\s*\{[\s\S]*?\}\s*```/g, "").trim();
    }

    // Also handle raw JSON without code blocks
    const rawJsonMatch = reply.match(/\{"qualified"[\s\S]*?\}/);
    if (rawJsonMatch) {
      try {
        const leadData = JSON.parse(rawJsonMatch[0]);
        qualified = leadData.qualified ?? null;
      } catch { /* ignore */ }
      reply = reply.replace(/\{"qualified"[\s\S]*?\}/g, "").trim();
    }

    return Response.json({ reply, qualified });

  } catch (err) {
    return Response.json({ reply: "عذراً، حدث خطأ. " + String(err) });
  }
}
