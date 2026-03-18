export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const { messages } = await req.json();
    if (!GEMINI_API_KEY) {
      return Response.json({ text: "عذراً، الخدمة غير متاحة حالياً." }, { status: 200 });
    }

    const systemPrompt = [
      "You are a helpful assistant for Nahr AI, a B2B automation agency in Saudi Arabia.",
      "Your job: have a friendly conversation to qualify the lead and collect: name, company name, company website, why they are here, number of employees, biggest operational challenge, readiness to invest, and phone/WhatsApp number.",
      "Ask only 1-2 questions per message. Keep responses short.",
      "Always respond in Arabic.",
      "Qualification criteria: real B2B company, has repetitive manual processes, 10+ employees, decision is near.",
      "After collecting all info, end with QUALIFIED: or NOT_QUALIFIED: followed by a brief Arabic summary.",
    ].join(" ");

    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const body = {
      system_instruction: { parts: [{ text: systemPrompt }] },
      contents,
      generationConfig: { temperature: 0.7, maxOutputTokens: 350 },
    };

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      return Response.json({ text: "service_error: " + errText.slice(0, 200) }, { status: 200 });
    }

    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "...";
    return Response.json({ text });

  } catch (err) {
    return Response.json({ text: "catch_error: " + String(err) }, { status: 200 });
  }
}
