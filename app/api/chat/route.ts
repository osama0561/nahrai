export const runtime = "edge";

const N8N_WEBHOOK = "https://n8n.srv1200431.hstgr.cloud/webhook/9575a2cd-a292-4b85-a0d7-a7550a123ed9";

export async function POST(req: Request) {
  try {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const { messages } = await req.json();

    if (!GEMINI_API_KEY) {
      return Response.json({ text: "عذراً، الخدمة غير متاحة حالياً." }, { status: 200 });
    }

    const systemPrompt = [
      "You are a lead qualification assistant for Nahr AI — a B2B automation agency in Saudi Arabia.",
      "Your job: have a friendly Arabic conversation to qualify the lead and collect all required info.",
      "Collect in order: full name, company name, company website URL, why they reached out, number of employees (10-50 / 50-200 / 200+), biggest operational challenge, readiness to invest (ready / exploring), WhatsApp/phone number.",
      "Ask max 2 questions per message. Keep responses short and conversational like WhatsApp.",
      "Always respond in Arabic. Use English only for technical terms.",
      "Be warm and professional. Never make specific ROI promises.",
      "Qualification criteria: real B2B company, has manual/repetitive processes, 10+ employees, decision is near or ready.",
      "IMPORTANT: After collecting ALL 8 data points, your final message must end with this exact JSON on its own line:",
      '{"qualified":true,"name":"...","company":"...","website":"...","reason":"...","employees":"...","challenge":"...","ready":"...","phone":"..."}',
      "Or if not qualified:",
      '{"qualified":false,"name":"...","reason_not_qualified":"..."}',
      "Write a warm closing message in Arabic first, then the JSON on the last line.",
    ].join(" ");

    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents,
          generationConfig: { temperature: 0.7, maxOutputTokens: 400 },
        }),
      }
    );

    if (!res.ok) {
      return Response.json({ text: "عذراً، حدث خطأ مؤقت. حاول مرة أخرى." }, { status: 200 });
    }

    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "...";

    // Check if response contains lead JSON and send to n8n
    const jsonMatch = text.match(/\{[^}]*"qualified"[^}]*\}/s);
    if (jsonMatch) {
      try {
        const leadData = JSON.parse(jsonMatch[0]);
        // Fire and forget — don't await
        fetch(N8N_WEBHOOK, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...leadData,
            source: "nahrai.com",
            timestamp: new Date().toISOString(),
          }),
        });
      } catch { /* ignore parse errors */ }
    }

    return Response.json({ text });

  } catch (err) {
    return Response.json({ text: "عذراً، حدث خطأ. " + String(err) }, { status: 200 });
  }
}
