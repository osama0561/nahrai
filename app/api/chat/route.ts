export const runtime = "edge";

const N8N_WEBHOOK = "https://n8n.srv1200431.hstgr.cloud/webhook/9575a2cd-a292-4b85-a0d7-a7550a123ed9";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(N8N_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const text = await res.text();

    if (!res.ok) {
      return Response.json({ reply: "n8n_error_" + res.status + ": " + text.slice(0, 300) }, { status: 200 });
    }

    let reply = "...";
    try {
      const data = JSON.parse(text);
      reply = data.reply ?? data.text ?? data.output ?? data.message ?? JSON.stringify(data);
    } catch {
      reply = text;
    }

    return Response.json({ reply });

  } catch (err) {
    return Response.json({ reply: "worker_error: " + String(err) }, { status: 200 });
  }
}
