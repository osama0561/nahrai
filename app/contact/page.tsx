"use client";
import { useEffect, useRef, useState } from "react";
import { Send, Bot, User } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

export default function ContactPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const sessionId = useRef(`session_${Date.now()}_${Math.random().toString(36).slice(2)}`);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const load = async () => {
      const { gsap } = await import("gsap");
      gsap.fromTo(".contact-hero", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out", delay: 0.3 });
    };
    load();
  }, []);


  const sendToN8n = async (userMessage: string, history: Message[]) => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage, history, sessionId: sessionId.current }),
    });
    const data = await res.json();
    return data.reply as string;
  };

  const startChat = async () => {
    setStarted(true);
    setLoading(true);
    try {
      const reply = await sendToN8n("بدء المحادثة", []);
      setMessages([{ role: "assistant", content: reply }]);
    } catch {
      setMessages([{ role: "assistant", content: "مرحباً! أنا مساعد نهر AI. كيف يمكنني مساعدتك؟" }]);
    }
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: "user", content: input.trim() };
    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    setInput("");
    setLoading(true);

    try {
      const reply = await sendToN8n(userMsg.content, updatedHistory);
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "عذراً، حدث خطأ في الاتصال. حاول مرة أخرى." }]);
    }
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <div>
      {/* Hero */}
      <section className="pt-40 pb-12 px-6 text-center relative overflow-hidden" style={{ background: "linear-gradient(180deg, #020B19 0%, #001830 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(ellipse at center, rgba(0,163,255,0.08) 0%, transparent 60%)" }} />
        <p className="contact-hero text-sm mb-4 relative z-10" style={{ color: "#00A3FF", fontFamily: "IBM Plex Mono", opacity: 0 }}>تواصل معنا</p>
        <h1 className="contact-hero text-4xl md:text-5xl font-bold mb-4 relative z-10 leading-tight" style={{ opacity: 0 }}>
          تحدث مع{" "}
          <span style={{ color: "#00A3FF" }} className="text-glow">مساعد نهر AI</span>
        </h1>
        <p className="contact-hero text-base max-w-xl mx-auto relative z-10" style={{ color: "rgba(240,244,255,0.55)", opacity: 0 }}>
          أخبره عن شركتك — وسنتواصل معك مباشرة.
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
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: "rgba(0,163,255,0.12)", border: "1px solid rgba(0,163,255,0.3)", boxShadow: "0 0 30px rgba(0,163,255,0.2)" }}>
                  <Bot size={38} color="#00A3FF" />
                </div>
                <div>
                  <p className="font-bold text-xl mb-2">مساعد نهر AI</p>
                  <p className="text-sm max-w-xs" style={{ color: "rgba(240,244,255,0.5)" }}>
                    سيطرح عليك أسئلة قصيرة لفهم وضع شركتك — ثم نتواصل معك مباشرة.
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
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center mt-1"
                  style={{ background: m.role === "assistant" ? "rgba(0,163,255,0.15)" : "rgba(240,244,255,0.08)" }}
                >
                  {m.role === "assistant" ? <Bot size={18} color="#00A3FF" /> : <User size={18} color="rgba(240,244,255,0.6)" />}
                </div>
                <div
                  className="max-w-[80%] px-4 py-3 text-sm leading-relaxed"
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
                <div className="px-4 py-3 rounded-2xl" style={{ background: "rgba(0,163,255,0.08)", border: "1px solid rgba(0,163,255,0.2)" }}>
                  <div className="flex gap-1 items-center h-5">
                    {[0, 1, 2].map(i => (
                      <div key={i} className="w-2 h-2 rounded-full animate-bounce" style={{ background: "#00A3FF", animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          {started && (
            <form onSubmit={sendMessage} className="flex gap-3">
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="اكتب ردك هنا..."
                disabled={loading}
                className="flex-1 px-5 py-3 rounded-2xl text-sm outline-none"
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
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 text-center">
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
      </section>
    </div>
  );
}
