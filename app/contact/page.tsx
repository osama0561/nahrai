"use client";
import { useEffect, useRef, useState } from "react";
import { Send, Bot, User, Phone } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

function parseQualification(text: string): "qualified" | "not_qualified" | null {
  const match = text.match(/\{[^}]*"qualified"[^}]*\}/s);
  if (!match) return null;
  try {
    const data = JSON.parse(match[0]);
    return data.qualified ? "qualified" : "not_qualified";
  } catch { return null; }
}

function cleanText(text: string) {
  return text.replace(/\{[^}]*"qualified"[^}]*\}/s, "").trim();
}

// Extract phone number from conversation
function extractPhone(messages: Message[]): string {
  const all = messages.map(m => m.content).join(" ");
  const match = all.match(/(\+?9665\d{8}|05\d{8})/);
  return match ? match[0] : "";
}

export default function ContactPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [qualification, setQualification] = useState<"qualified" | "not_qualified" | null>(null);
  const [started, setStarted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const load = async () => {
      const { gsap } = await import("gsap");
      gsap.fromTo(".contact-hero", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out", delay: 0.3 });
    };
    load();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const startChat = async () => {
    setStarted(true);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: "مرحبا، أريد معرفة المزيد عن خدمات نهر AI" }] }),
      });
      const data = await res.json();
      const text = data.text ?? "مرحباً! أنا مساعد نهر AI. ما اسمك الكريم؟";
      setMessages([
        { role: "assistant", content: text },
      ]);
    } catch {
      setMessages([{ role: "assistant", content: "مرحباً! أنا مساعد نهر AI. كيف يمكنني مساعدتك؟ ما اسمك الكريم؟" }]);
    }
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      const rawText = data.text ?? "عذراً، حدث خطأ. حاول مرة أخرى.";

      const qual = parseQualification(rawText);
      if (qual) setQualification(qual);

      const cleanedText = cleanText(rawText);
      setMessages(prev => [...prev, { role: "assistant", content: cleanedText }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "عذراً، حدث خطأ في الاتصال. حاول مرة أخرى." }]);
    }
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const phone = extractPhone(messages);
  const waLink = `https://wa.me/966540428191?text=${encodeURIComponent(
    `مرحبا، أنا عميل محتمل من موقع نهر AI.\n\n${messages.filter(m => m.role === "user").map(m => m.content).join(" | ")}`
  )}`;

  return (
    <div>
      {/* Hero */}
      <section className="pt-40 pb-12 px-6 text-center relative overflow-hidden" style={{ background: "linear-gradient(180deg, #020B19 0%, #001830 100%)" }}>
        <div className="absolute inset-0 opacity-8 pointer-events-none" style={{ backgroundImage: "radial-gradient(ellipse at center, #00A3FF 0%, transparent 60%)" }} />
        <p className="contact-hero text-sm mb-4 relative z-10" style={{ color: "#00A3FF", fontFamily: "IBM Plex Mono", opacity: 0 }}>تواصل معنا</p>
        <h1 className="contact-hero text-4xl md:text-5xl font-bold mb-4 relative z-10 leading-tight" style={{ opacity: 0 }}>
          تحدث مع{" "}
          <span style={{ color: "#00A3FF" }} className="text-glow">مساعد نهر AI</span>
        </h1>
        <p className="contact-hero text-base max-w-xl mx-auto relative z-10" style={{ color: "rgba(240,244,255,0.55)", opacity: 0 }}>
          أخبره عن شركتك وسيساعدك تعرف إذا كنا الخيار الصح لك — ثم نتواصل معك مباشرة.
        </p>
      </section>

      {/* Chat */}
      <section className="py-10 px-4" style={{ background: "#020B19", minHeight: "65vh" }}>
        <div className="max-w-2xl mx-auto flex flex-col" style={{ height: "65vh" }}>

          {/* Chat window */}
          <div
            className="flex-1 overflow-y-auto rounded-[1.5rem] p-5 mb-4 space-y-4"
            style={{ background: "#0A1628", border: "1px solid rgba(0,163,255,0.15)" }}
          >
            {/* Start screen */}
            {!started && (
              <div className="flex flex-col items-center justify-center h-full text-center gap-6">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center electric-glow" style={{ background: "rgba(0,163,255,0.12)", border: "1px solid rgba(0,163,255,0.3)" }}>
                  <Bot size={38} color="#00A3FF" />
                </div>
                <div>
                  <p className="font-bold text-xl mb-2">مساعد نهر AI</p>
                  <p className="text-sm max-w-xs" style={{ color: "rgba(240,244,255,0.5)" }}>
                    سيطرح عليك أسئلة قصيرة لفهم وضع شركتك — ثم نقرر معاً إذا كنا الخيار المناسب.
                  </p>
                </div>
                <button onClick={startChat} className="btn-primary px-8 py-3 text-base electric-glow-strong">
                  <span>ابدأ المحادثة</span>
                </button>
              </div>
            )}

            {/* Messages */}
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                {/* Avatar */}
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center mt-1"
                  style={{ background: m.role === "assistant" ? "rgba(0,163,255,0.15)" : "rgba(240,244,255,0.08)" }}
                >
                  {m.role === "assistant"
                    ? <Bot size={18} color="#00A3FF" />
                    : <User size={18} color="rgba(240,244,255,0.6)" />
                  }
                </div>
                {/* Bubble */}
                <div
                  className="max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed"
                  style={{
                    background: m.role === "assistant" ? "rgba(0,163,255,0.08)" : "rgba(240,244,255,0.07)",
                    border: m.role === "assistant" ? "1px solid rgba(0,163,255,0.2)" : "1px solid rgba(240,244,255,0.08)",
                    color: "rgba(240,244,255,0.85)",
                    borderRadius: m.role === "user" ? "1.25rem 0.4rem 1.25rem 1.25rem" : "0.4rem 1.25rem 1.25rem 1.25rem",
                  }}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && started && (
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(0,163,255,0.15)" }}>
                  <Bot size={18} color="#00A3FF" />
                </div>
                <div className="px-4 py-3 rounded-2xl" style={{ background: "rgba(0,163,255,0.08)", border: "1px solid rgba(0,163,255,0.2)", borderRadius: "0.4rem 1.25rem 1.25rem 1.25rem" }}>
                  <div className="flex gap-1 items-center h-5">
                    {[0, 1, 2].map(i => (
                      <div key={i} className="w-2 h-2 rounded-full animate-bounce" style={{ background: "#00A3FF", animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Qualified CTA */}
            {qualification === "qualified" && (
              <div className="mt-4 p-5 rounded-2xl text-center" style={{ background: "rgba(0,163,255,0.1)", border: "2px solid rgba(0,163,255,0.4)" }}>
                <p className="font-bold text-base mb-2" style={{ color: "#00A3FF" }}>🎯 شركتك مؤهلة — نبدأ؟</p>
                <p className="text-sm mb-4" style={{ color: "rgba(240,244,255,0.65)" }}>
                  سنتواصل معك عبر واتساب لترتيب استشارة مجانية خلال ٢٤ ساعة.
                </p>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2 px-8 py-3"
                >
                  <Phone size={17} />
                  <span>تواصل معنا عبر واتساب</span>
                </a>
              </div>
            )}

            {qualification === "not_qualified" && (
              <div className="mt-4 p-5 rounded-2xl text-center" style={{ background: "rgba(240,244,255,0.04)", border: "1px solid rgba(240,244,255,0.12)" }}>
                <p className="font-bold text-base mb-2">شكراً لوقتك</p>
                <p className="text-sm mb-4" style={{ color: "rgba(240,244,255,0.55)" }}>
                  يبدو أننا لسنا الخيار المناسب الآن — لكن إذا تغير الوضع، نحن هنا.
                </p>
                <a href="/" className="btn-outline inline-flex px-8 py-3">
                  <span>العودة للرئيسية</span>
                </a>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          {started && !qualification && (
            <form onSubmit={sendMessage} className="flex gap-3">
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="اكتب ردك هنا..."
                disabled={loading}
                className="flex-1 px-5 py-3 rounded-2xl text-sm outline-none transition-all"
                style={{
                  background: "#0A1628",
                  border: "1px solid rgba(0,163,255,0.2)",
                  color: "#F0F4FF",
                  direction: "rtl",
                }}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all"
                style={{
                  background: input.trim() && !loading ? "#00A3FF" : "rgba(0,163,255,0.15)",
                  boxShadow: input.trim() && !loading ? "0 0 20px rgba(0,163,255,0.4)" : "none",
                }}
              >
                <Send size={18} color={input.trim() && !loading ? "#020B19" : "rgba(240,244,255,0.3)"} style={{ transform: "rotate(180deg)" }} />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Trust signals */}
      <section className="py-14 px-6" style={{ background: "#0A1628" }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-center">
            {[
              { icon: "⚡", title: "رد خلال ٢٤ ساعة", desc: "نتواصل معك عبر واتساب بسرعة" },
              { icon: "🎯", title: "استشارة مخصصة", desc: "نحلل عمليات شركتك تحديداً" },
              { icon: "🔒", title: "بدون التزام", desc: "الاستشارة الأولى مجانية تماماً" },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-[1.5rem]" style={{ background: "#020B19", border: "1px solid rgba(0,163,255,0.1)" }}>
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm" style={{ color: "rgba(240,244,255,0.5)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
