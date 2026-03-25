"use client";
import { useEffect, useRef, useState } from "react";
import { Send, Bot, User, Phone, X, MessageCircle } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState<"qualified" | "not_qualified" | null>(null);
  const sessionId = useRef(`session_${Date.now()}_${Math.random().toString(36).slice(2)}`);
  const inputRef = useRef<HTMLInputElement>(null);

  // Listen for open-chat event from CTA buttons
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-chat", handler);
    return () => window.removeEventListener("open-chat", handler);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open && started) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open, started]);

  const sendToN8n = async (userMessage: string, history: Message[]) => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage, history, sessionId: sessionId.current }),
    });
    return await res.json() as { reply: string; qualified?: boolean | null };
  };

  const startChat = async () => {
    setStarted(true);
    setLoading(true);
    try {
      const data = await sendToN8n("start", []);
      setMessages([{ role: "assistant", content: data.reply }]);
    } catch {
      setMessages([{ role: "assistant", content: "مرحباً! أنا مساعد نهر AI. كيف يمكنني مساعدتك؟" }]);
    }
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading || done) return;

    const userMsg: Message = { role: "user", content: input.trim() };
    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    setInput("");
    setLoading(true);

    try {
      const data = await sendToN8n(userMsg.content, updatedHistory);
      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
      if (data.qualified === true) setDone("qualified");
      else if (data.qualified === false) setDone("not_qualified");
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "عذراً، حدث خطأ في الاتصال. حاول مرة أخرى." }]);
    }
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <>
      {/* Panel */}
      {open && (
        <div
          className="fixed z-50 flex flex-col"
          style={{
            bottom: "88px",
            left: "24px",
            width: "min(420px, calc(100vw - 48px))",
            height: "min(580px, calc(100vh - 120px))",
            background: "#0A1628",
            border: "1px solid rgba(0,163,255,0.25)",
            borderRadius: "1.75rem",
            boxShadow: "0 24px 64px rgba(0,0,0,0.6), 0 0 40px rgba(0,163,255,0.08)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-4 flex-shrink-0"
            style={{ borderBottom: "1px solid rgba(0,163,255,0.12)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(0,163,255,0.15)", border: "1px solid rgba(0,163,255,0.3)" }}
              >
                <Bot size={18} color="#00A3FF" />
              </div>
              <div>
                <p className="text-sm font-bold leading-none">مساعد نهر AI</p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(240,244,255,0.4)" }}>استشارة مجانية</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
              style={{ background: "rgba(240,244,255,0.06)" }}
            >
              <X size={16} color="rgba(240,244,255,0.6)" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {/* Start screen */}
            {!started && (
              <div className="flex flex-col items-center justify-center h-full text-center gap-5">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: "rgba(0,163,255,0.12)", border: "1px solid rgba(0,163,255,0.3)", boxShadow: "0 0 30px rgba(0,163,255,0.2)" }}
                >
                  <Bot size={30} color="#00A3FF" />
                </div>
                <div>
                  <p className="font-bold text-base mb-1">ابدأ استشارتك المجانية</p>
                  <p className="text-xs max-w-[220px]" style={{ color: "rgba(240,244,255,0.5)" }}>
                    سيطرح عليك أسئلة قصيرة لفهم وضع شركتك — ثم نتواصل معك مباشرة.
                  </p>
                </div>
                <button onClick={startChat} className="btn-primary px-6 py-2.5 text-sm">
                  <span>ابدأ المحادثة</span>
                </button>
              </div>
            )}

            {/* Messages */}
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2.5 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center mt-0.5"
                  style={{ background: m.role === "assistant" ? "rgba(0,163,255,0.15)" : "rgba(240,244,255,0.08)" }}
                >
                  {m.role === "assistant" ? <Bot size={15} color="#00A3FF" /> : <User size={15} color="rgba(240,244,255,0.6)" />}
                </div>
                <div
                  className="max-w-[78%] px-3.5 py-2.5 text-sm leading-relaxed"
                  style={{
                    background: m.role === "assistant" ? "rgba(0,163,255,0.08)" : "rgba(240,244,255,0.07)",
                    border: m.role === "assistant" ? "1px solid rgba(0,163,255,0.2)" : "1px solid rgba(240,244,255,0.08)",
                    color: "rgba(240,244,255,0.85)",
                    borderRadius: m.role === "user" ? "1.1rem 0.35rem 1.1rem 1.1rem" : "0.35rem 1.1rem 1.1rem 1.1rem",
                  }}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && started && (
              <div className="flex gap-2.5">
                <div className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(0,163,255,0.15)" }}>
                  <Bot size={15} color="#00A3FF" />
                </div>
                <div className="px-3.5 py-2.5 rounded-2xl" style={{ background: "rgba(0,163,255,0.08)", border: "1px solid rgba(0,163,255,0.2)" }}>
                  <div className="flex gap-1 items-center h-4">
                    {[0, 1, 2].map(i => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "#00A3FF", animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Qualified CTA */}
            {done === "qualified" && (
              <div className="p-4 rounded-2xl text-center" style={{ background: "rgba(0,163,255,0.1)", border: "2px solid rgba(0,163,255,0.4)" }}>
                <p className="font-bold text-sm mb-1" style={{ color: "#00A3FF" }}>🎯 شركتك مؤهلة</p>
                <p className="text-xs mb-3" style={{ color: "rgba(240,244,255,0.65)" }}>سنتواصل معك عبر واتساب خلال ٢٤ ساعة.</p>
                <a href="https://wa.me/966540428191" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2 px-5 py-2 text-sm">
                  <Phone size={14} />
                  <span>تواصل الآن</span>
                </a>
              </div>
            )}

            {done === "not_qualified" && (
              <div className="p-4 rounded-2xl text-center" style={{ background: "rgba(240,244,255,0.04)", border: "1px solid rgba(240,244,255,0.12)" }}>
                <p className="font-bold text-sm mb-1">شكراً لوقتك</p>
                <p className="text-xs" style={{ color: "rgba(240,244,255,0.5)" }}>إذا تغير الوضع، نحن هنا.</p>
              </div>
            )}
          </div>

          {/* Input */}
          {started && !done && (
            <form
              onSubmit={sendMessage}
              className="flex gap-2 p-3 flex-shrink-0"
              style={{ borderTop: "1px solid rgba(0,163,255,0.1)" }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="اكتب ردك هنا..."
                disabled={loading}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
                style={{
                  background: "#020B19",
                  border: "1px solid rgba(0,163,255,0.2)",
                  color: "#F0F4FF",
                  direction: "rtl",
                }}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
                style={{
                  background: input.trim() && !loading ? "#00A3FF" : "rgba(0,163,255,0.15)",
                  boxShadow: input.trim() && !loading ? "0 0 16px rgba(0,163,255,0.4)" : "none",
                }}
              >
                <Send size={15} color={input.trim() && !loading ? "#020B19" : "rgba(240,244,255,0.3)"} style={{ transform: "rotate(180deg)" }} />
              </button>
            </form>
          )}
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className="fixed z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl transition-all duration-200"
        style={{
          bottom: "24px",
          left: "24px",
          background: open ? "#0A1628" : "#00A3FF",
          border: open ? "1px solid rgba(0,163,255,0.3)" : "none",
          boxShadow: open ? "none" : "0 0 28px rgba(0,163,255,0.5)",
          color: open ? "rgba(240,244,255,0.7)" : "#020B19",
        }}
      >
        {open ? <X size={18} /> : <MessageCircle size={18} />}
        <span className="text-sm font-bold">{open ? "إغلاق" : "استشارة مجانية"}</span>
      </button>
    </>
  );
}
