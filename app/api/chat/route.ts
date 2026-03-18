export const runtime = "edge";

const N8N_WEBHOOK = "https://n8n.srv1200431.hstgr.cloud/webhook/9575a2cd-a292-4b85-a0d7-a7550a123ed9";

export async function POST(req: Request) {
  const { message, history } = await req.json();

  // Forward to n8n and get response
  const res = await fetch(N8N_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history }),
  });

  if (!res.ok) {
    return Response.json({ reply: "عذراً، حدث خطأ مؤقت. حاول مرة أخرى." });
  }

  const data = await res.json();
  return Response.json({ reply: data.reply ?? data.text ?? data.output ?? data.message ?? "..." });
}
