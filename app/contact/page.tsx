"use client";
import { useEffect, useRef, useState } from "react";
import { CheckCircle, Phone, MessageSquare, ArrowLeft, Truck, Package, BarChart3, Globe } from "lucide-react";

type Step = "gate" | "form" | "success";

const sectors = [
  { value: "logistics", label: "لوجستيات وشحن", icon: Truck },
  { value: "transport", label: "نقل وتوزيع", icon: Package },
  { value: "supply-chain", label: "سلسلة توريد", icon: BarChart3 },
  { value: "other", label: "قطاع آخر", icon: Globe },
];

const employeeRanges = ["١٠ - ٥٠ موظف", "٥٠ - ٢٠٠ موظف", "+٢٠٠ موظف"];

const qualifyQuestions = [
  { q: "هل لديك عمليات يدوية متكررة تريد أتمتتها؟", key: "q1" },
  { q: "هل تستخدم أكثر من ٣ أدوات تقنية غير مترابطة؟", key: "q2" },
  { q: "هل قرارك للاستثمار في الذكاء الاصطناعي جاهز؟", key: "q3" },
];

export default function ContactPage() {
  const [step, setStep] = useState<Step>("gate");
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({ q1: null, q2: null, q3: null });
  const [selectedSector, setSelectedSector] = useState("");
  const [form, setForm] = useState({ name: "", company: "", sector: "", employees: "", challenge: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      const { gsap } = await import("gsap");
      gsap.fromTo(".contact-hero", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out", delay: 0.3 });
    };
    load();
  }, []);

  const allAnswered = Object.values(answers).every(v => v !== null);
  const qualified = allAnswered && Object.values(answers).filter(v => v === true).length >= 2;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setSubmitting(false);
    setStep("success");
  };

  return (
    <div ref={ref}>
      {/* Hero */}
      <section className="pt-40 pb-16 px-6 text-center relative overflow-hidden" style={{ background: "linear-gradient(180deg, #020B19 0%, #001830 100%)" }}>
        <div className="absolute inset-0 opacity-8 pointer-events-none" style={{ backgroundImage: "radial-gradient(ellipse at center, #00A3FF 0%, transparent 60%)" }} />
        <p className="contact-hero text-sm mb-4 relative z-10" style={{ color: "#00A3FF", fontFamily: "IBM Plex Mono", opacity: 0 }}>تواصل معنا</p>
        <h1 className="contact-hero text-4xl md:text-5xl font-bold mb-6 relative z-10 leading-tight" style={{ opacity: 0 }}>
          ابدأ بنية تحتية{" "}
          <span style={{ color: "#00A3FF" }} className="text-glow">حقيقية</span>
        </h1>
        <p className="contact-hero text-base md:text-lg max-w-2xl mx-auto relative z-10" style={{ color: "rgba(240,244,255,0.6)", opacity: 0 }}>
          استشارة مجانية — ٣٠ دقيقة نفهم فيها عملياتك ونريك ما يمكن بناؤه
        </p>
      </section>

      {/* Main content */}
      <section className="py-16 px-6 min-h-[60vh]" style={{ background: "#020B19" }}>
        <div className="max-w-2xl mx-auto">

          {/* ── GATE STEP ── */}
          {step === "gate" && (
            <div>
              <div className="text-center mb-10">
                <p className="text-sm mb-2" style={{ color: "#00A3FF", fontFamily: "IBM Plex Mono" }}>قبل أن نبدأ</p>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">٣ أسئلة سريعة</h2>
                <p className="text-sm" style={{ color: "rgba(240,244,255,0.5)" }}>نريد نتأكد أننا الخيار الصح لشركتك</p>
              </div>

              <div className="space-y-5 mb-10">
                {qualifyQuestions.map((item) => (
                  <div key={item.key} className="p-6 rounded-[1.5rem]" style={{ background: "#0A1628", border: "1px solid rgba(0,163,255,0.15)" }}>
                    <p className="font-medium mb-4 text-base">{item.q}</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setAnswers(prev => ({ ...prev, [item.key]: true }))}
                        className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all duration-200"
                        style={{
                          background: answers[item.key] === true ? "#00A3FF" : "rgba(0,163,255,0.06)",
                          color: answers[item.key] === true ? "#020B19" : "rgba(240,244,255,0.7)",
                          border: answers[item.key] === true ? "none" : "1px solid rgba(0,163,255,0.15)",
                        }}
                      >
                        نعم
                      </button>
                      <button
                        onClick={() => setAnswers(prev => ({ ...prev, [item.key]: false }))}
                        className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all duration-200"
                        style={{
                          background: answers[item.key] === false ? "rgba(240,244,255,0.1)" : "rgba(0,163,255,0.06)",
                          color: answers[item.key] === false ? "#F0F4FF" : "rgba(240,244,255,0.5)",
                          border: "1px solid rgba(0,163,255,0.1)",
                        }}
                      >
                        لا
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {allAnswered && (
                <div className="text-center">
                  {qualified ? (
                    <div>
                      <div className="p-6 rounded-2xl mb-6 text-center" style={{ background: "rgba(0,163,255,0.08)", border: "1px solid rgba(0,163,255,0.3)" }}>
                        <CheckCircle size={32} color="#00A3FF" className="mx-auto mb-3" />
                        <p className="font-bold text-lg mb-2" style={{ color: "#00A3FF" }}>شركتك مؤهلة تماماً</p>
                        <p className="text-sm" style={{ color: "rgba(240,244,255,0.6)" }}>نستطيع بناء منظومة أتمتة ستحدث فرقاً حقيقياً</p>
                      </div>
                      <button onClick={() => setStep("form")} className="btn-primary text-base py-4 px-10 electric-glow-strong">
                        <span>أكمل طلب الاستشارة</span>
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="p-6 rounded-2xl mb-6" style={{ background: "rgba(240,244,255,0.04)", border: "1px solid rgba(240,244,255,0.1)" }}>
                        <p className="font-medium mb-2">قد لا نكون الحل الأمثل الآن</p>
                        <p className="text-sm" style={{ color: "rgba(240,244,255,0.5)" }}>
                          لكن يمكننا التحدث ورؤية إن كان هناك ما يمكن تقديمه لشركتك.
                        </p>
                      </div>
                      <button onClick={() => setStep("form")} className="btn-outline text-base py-4 px-10">
                        <span>أريد التحدث على أي حال</span>
                        <ArrowLeft size={16} />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Sector selector (for visual CTA) */}
              {!allAnswered && (
                <div className="mt-12">
                  <p className="text-center text-sm mb-6" style={{ color: "rgba(240,244,255,0.45)" }}>— أو اختر قطاعك وابدأ مباشرة —</p>
                  <div className="grid grid-cols-2 gap-3">
                    {sectors.map((s) => (
                      <button
                        key={s.value}
                        onClick={() => { setSelectedSector(s.value); setStep("form"); setForm(f => ({ ...f, sector: s.label })); }}
                        className="card-hover p-5 rounded-[1.25rem] flex flex-col items-center gap-3"
                        style={{ background: "#0A1628", border: "1px solid rgba(0,163,255,0.12)" }}
                      >
                        <s.icon size={24} color="#00A3FF" />
                        <span className="text-sm font-medium">{s.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── FORM STEP ── */}
          {step === "form" && (
            <div>
              <div className="flex items-center gap-4 mb-10">
                <button onClick={() => setStep("gate")} className="p-2 rounded-xl transition-colors" style={{ background: "rgba(0,163,255,0.08)", border: "1px solid rgba(0,163,255,0.15)" }}>
                  <ArrowLeft size={18} color="#00A3FF" style={{ transform: "rotate(180deg)" }} />
                </button>
                <div>
                  <h2 className="text-2xl font-bold">نموذج الاستشارة المجانية</h2>
                  <p className="text-sm" style={{ color: "rgba(240,244,255,0.5)" }}>نتواصل معك خلال ٢٤ ساعة</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "rgba(240,244,255,0.7)" }}>الاسم الكامل *</label>
                    <input
                      className="form-input"
                      placeholder="اسمك الكامل"
                      required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "rgba(240,244,255,0.7)" }}>اسم الشركة *</label>
                    <input
                      className="form-input"
                      placeholder="اسم شركتك"
                      required
                      value={form.company}
                      onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "rgba(240,244,255,0.7)" }}>القطاع</label>
                    <select
                      className="form-input"
                      value={form.sector}
                      onChange={e => setForm(f => ({ ...f, sector: e.target.value }))}
                    >
                      <option value="">اختر القطاع</option>
                      <option>لوجستيات وشحن</option>
                      <option>نقل وتوزيع</option>
                      <option>سلسلة توريد</option>
                      <option>أخرى (B2B)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "rgba(240,244,255,0.7)" }}>عدد الموظفين</label>
                    <select
                      className="form-input"
                      value={form.employees}
                      onChange={e => setForm(f => ({ ...f, employees: e.target.value }))}
                    >
                      <option value="">اختر النطاق</option>
                      {employeeRanges.map(r => <option key={r}>{r}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "rgba(240,244,255,0.7)" }}>أكبر تحدي تشغيلي الآن</label>
                  <textarea
                    className="form-input resize-none"
                    rows={4}
                    placeholder="صف أهم مشكلة تشغيلية تواجهها شركتك..."
                    value={form.challenge}
                    onChange={e => setForm(f => ({ ...f, challenge: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "rgba(240,244,255,0.7)" }}>رقم الجوال / واتساب *</label>
                  <div className="relative">
                    <input
                      className="form-input"
                      placeholder="05xxxxxxxx"
                      required
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    />
                    <Phone size={16} color="rgba(240,244,255,0.3)" className="absolute top-1/2 -translate-y-1/2 left-4" />
                  </div>
                </div>

                {/* Trust note */}
                <div className="p-4 rounded-xl flex gap-3" style={{ background: "rgba(0,163,255,0.05)", border: "1px solid rgba(0,163,255,0.12)" }}>
                  <MessageSquare size={18} color="#00A3FF" className="flex-shrink-0 mt-0.5" />
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(240,244,255,0.5)" }}>
                    نتواصل معك عبر واتساب خلال ٢٤ ساعة لتحديد موعد الاستشارة. لا رسائل تسويقية، لا مبيعات ضاغطة — فقط محادثة صادقة.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full justify-center py-4 text-base"
                  style={{ opacity: submitting ? 0.7 : 1 }}
                >
                  <span>{submitting ? "جاري الإرسال..." : "أرسل طلب الاستشارة"}</span>
                </button>
              </form>
            </div>
          )}

          {/* ── SUCCESS STEP ── */}
          {step === "success" && (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 electric-glow-strong" style={{ background: "rgba(0,163,255,0.15)", border: "2px solid #00A3FF" }}>
                <CheckCircle size={40} color="#00A3FF" />
              </div>
              <h2 className="text-3xl font-bold mb-4">تم استلام طلبك!</h2>
              <p className="text-base mb-8 max-w-md mx-auto" style={{ color: "rgba(240,244,255,0.65)" }}>
                سنتواصل معك عبر واتساب خلال ٢٤ ساعة لتأكيد موعد الاستشارة المجانية.
              </p>
              <div className="p-6 rounded-2xl inline-block mb-8" style={{ background: "#0A1628", border: "1px solid rgba(0,163,255,0.2)" }}>
                <p className="text-sm" style={{ color: "rgba(240,244,255,0.5)", fontFamily: "IBM Plex Mono" }}>
                  في انتظارك — فريق نهر AI
                </p>
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href="/" className="btn-primary py-3 px-8">
                  <span>العودة للرئيسية</span>
                </a>
                <a href="/services" className="btn-outline py-3 px-8">
                  <span>استكشف خدماتنا</span>
                  <ArrowLeft size={16} />
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Bottom trust signals */}
      {step !== "success" && (
        <section className="py-16 px-6" style={{ background: "#0A1628" }}>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
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
      )}
    </div>
  );
}
