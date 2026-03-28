"use client";
import { useEffect, useState, useRef } from "react";
import { CheckCircle, Star, Zap, Crown, TrendingUp, Clock, Users, X, Send, Wrench, Bot } from "lucide-react";

/* ─── Monthly Retainer Tiers ─── */
const monthlyTiers = [
  {
    icon: Zap,
    name: "Bronze",
    nameAr: "برونز",
    price: "٢,٣٠٠",
    period: "ريال/شهر",
    setup: "رسوم تأسيس: ١,٠٠٠ ريال (مرة واحدة)",
    tag: "للشركات اللي تبدأ أول خطوة",
    tagStyle: { background: "#CD7F32", color: "#020B19" },
    highlight: false,
    features: [
      { text: "أتمتة واحدة جديدة شهرياً", sub: "نبني لك workflow جديد كل شهر حسب أولوياتك" },
      { text: "ربط حتى ٥ أدوات وأنظمة", sub: "مثل: واتساب، CRM، إيميل، جداول، أو نظام محاسبة" },
      { text: "دعم عبر الإيميل", sub: "نرد على استفساراتك ومشاكلك خلال يومين عمل" },
    ],
    cta: "ابدأ بالبرونز",
    ctaStyle: "border border-[rgba(205,127,50,0.5)] hover:border-[rgba(205,127,50,0.8)]",
    tierKey: "bronze",
  },
  {
    icon: Star,
    name: "Silver",
    nameAr: "فضي",
    price: "٥,٥٠٠",
    period: "ريال/شهر",
    setup: "رسوم تأسيس: ٢,٥٠٠ ريال (مرة واحدة)",
    tag: "الأكثر طلباً",
    tagStyle: { background: "#00A3FF", color: "#020B19" },
    highlight: true,
    features: [
      { text: "٣ أتمتات جديدة شهرياً", sub: "نبني ونطور workflows جديدة كل شهر" },
      { text: "وكيل AI واحد مخصص", sub: "يشتغل ٢٤/٧ على مهمة محددة — مبيعات، دعم، أو عمليات" },
      { text: "ربط حتى ١٠ أدوات وأنظمة", sub: "نوصل كل أنظمتك ببعض بدون شغل يدوي" },
      { text: "جلسة استراتيجية شهرية", sub: "٣٠ دقيقة نراجع فيها الأداء ونخطط للخطوة الجاية" },
      { text: "دعم عبر الإيميل + واتساب", sub: "نرد خلال ١٢ ساعة في أيام العمل" },
    ],
    cta: "ابدأ بالفضي",
    ctaStyle: "",
    tierKey: "silver",
  },
  {
    icon: Crown,
    name: "Gold",
    nameAr: "ذهبي",
    price: "٢٤,٠٠٠",
    period: "ريال/شهر",
    setup: "رسوم تأسيس: ١٠,٠٠٠ ريال (مرة واحدة)",
    tag: "تحوّل كامل للعمليات",
    tagStyle: { background: "#FFD700", color: "#020B19" },
    highlight: false,
    features: [
      { text: "٦ أتمتات جديدة شهرياً", sub: "تغطية شاملة لكل أقسام الشركة" },
      { text: "٣ وكلاء AI مخصصين", sub: "مبيعات، عمليات، توظيف — أو أي مهام تحتاجها" },
      { text: "ربط غير محدود للأدوات والأنظمة", sub: "كل شيء متصل ببعضه بدون حدود" },
      { text: "تطبيق داخلي مخصص", sub: "داشبورد أو نظام تتبع يسرّع عمليات فريقك" },
      { text: "جلستان استراتيجيتان شهرياً", sub: "٤٥ دقيقة لكل جلسة — نخطط وننفذ معك" },
      { text: "دعم أولوية عبر واتساب", sub: "نرد خلال ٤ ساعات — فريقك ما يوقف" },
    ],
    cta: "ابدأ بالذهبي",
    ctaStyle: "border border-[rgba(255,215,0,0.4)] hover:border-[rgba(255,215,0,0.7)]",
    tierKey: "gold",
  },
];

/* ─── One-Time Projects ─── */
const projects = [
  {
    icon: Wrench,
    name: "أتمتة مخصصة",
    price: "٧,٠٠٠",
    unit: "ريال",
    features: [
      "تحليل العملية الحالية + تصميم الحل",
      "بناء وتشغيل واختبار كامل",
      "ربط مع أنظمتك الحالية",
      "تدريب فريقك على استخدامها",
      "دعم مجاني ٣٠ يوم بعد التسليم",
    ],
    timeline: "٢-٣ أسابيع",
    tierKey: "automation-project",
  },
  {
    icon: Bot,
    name: "وكيل AI مخصص",
    price: "١٥,٠٠٠",
    unit: "ريال",
    features: [
      "تحليل المهمة وتصميم الوكيل",
      "بناء وتدريب واختبار الوكيل",
      "ربط مع أدواتك وأنظمتك",
      "تدريب فريقك على إدارته",
      "دعم مجاني ٣٠ يوم بعد التسليم",
    ],
    timeline: "٣-٤ أسابيع",
    tierKey: "agent-project",
  },
];

export default function PricingPage() {
  const [tab, setTab] = useState<"monthly" | "project">("monthly");
  const [formOpen, setFormOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState("");
  const [formData, setFormData] = useState({ name: "", company: "", email: "", whatsapp: "", description: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(".pricing-hero", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out", delay: 0.3 });
    };
    load();
  }, []);

  /* Re-animate cards on tab switch */
  useEffect(() => {
    const animate = async () => {
      const { gsap } = await import("gsap");
      gsap.fromTo(".tier-card", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: "power3.out" });
    };
    animate();
  }, [tab]);

  const openForm = (tierKey: string) => {
    setSelectedTier(tierKey);
    setFormData({ name: "", company: "", email: "", whatsapp: "", description: "" });
    setSubmitted(false);
    setFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      await fetch("/api/pricing-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, tier: selectedTier }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    }
    setSubmitting(false);
  };

  const tierLabel = (key: string) => {
    const map: Record<string, string> = {
      bronze: "برونز — ٢,٣٠٠ ريال/شهر",
      silver: "فضي — ٥,٥٠٠ ريال/شهر",
      gold: "ذهبي — ٢٤,٠٠٠ ريال/شهر",
      "automation-project": "مشروع أتمتة — ٧,٠٠٠ ريال",
      "agent-project": "مشروع وكيل AI — ١٥,٠٠٠ ريال",
    };
    return map[key] || key;
  };

  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-40 pb-20 px-6 text-center relative overflow-hidden" style={{ background: "linear-gradient(180deg, #020B19 0%, #001830 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(ellipse at center, rgba(0,163,255,0.08) 0%, transparent 60%)" }} />
        <p className="pricing-hero text-sm mb-4 relative z-10" style={{ color: "#00A3FF", fontFamily: "IBM Plex Mono", opacity: 0 }}>أتمتة وذكاء اصطناعي لشركتك</p>
        <h1 className="pricing-hero text-4xl md:text-6xl font-bold mb-6 relative z-10 leading-tight" style={{ opacity: 0 }}>
          وقت فريقك أغلى{" "}
          <br className="hidden md:block" />
          <span style={{ color: "#00A3FF" }} className="text-glow">من إنه يضيع على مهام متكررة</span>
        </h1>
        <p className="pricing-hero text-base md:text-lg max-w-2xl mx-auto relative z-10 leading-relaxed" style={{ color: "rgba(240,244,255,0.6)", opacity: 0 }}>
          نبني وكلاء AI وأتمتات مخصصة لعمليات شركتك الفعلية — من المبيعات للتوظيف للعمليات. ابدأ بمشروع واحد أو باقة شهرية.
        </p>

        {/* Stats */}
        <div className="pricing-hero mt-12 flex flex-col md:flex-row items-center justify-center gap-6 relative z-10" style={{ opacity: 0 }}>
          {[
            { icon: Clock, stat: "٢-٤ أسابيع", label: "لأول نتيجة حقيقية" },
            { icon: TrendingUp, stat: "٤×", label: "عملاء Nawat بعد الأتمتة" },
            { icon: Users, stat: "شهر → ساعة", label: "وقت عمل Shortcut" },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-center gap-3 px-6 py-4 rounded-2xl" style={{ background: "rgba(0,163,255,0.07)", border: "1px solid rgba(0,163,255,0.15)" }}>
                <Icon size={18} color="#00A3FF" />
                <div className="text-right">
                  <p className="font-bold text-lg leading-none">{item.stat}</p>
                  <p className="text-xs mt-1" style={{ color: "rgba(240,244,255,0.5)" }}>{item.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Toggle ── */}
      <section className="py-6 px-6" style={{ background: "#020B19" }}>
        <div className="flex items-center justify-center gap-1 p-1.5 rounded-2xl mx-auto" style={{ background: "#0A1628", border: "1px solid rgba(0,163,255,0.15)", width: "fit-content" }}>
          <button
            onClick={() => setTab("monthly")}
            className="px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300"
            style={{
              background: tab === "monthly" ? "#00A3FF" : "transparent",
              color: tab === "monthly" ? "#020B19" : "rgba(240,244,255,0.5)",
              boxShadow: tab === "monthly" ? "0 0 20px rgba(0,163,255,0.3)" : "none",
            }}
          >
            اشتراك شهري
          </button>
          <button
            onClick={() => setTab("project")}
            className="px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300"
            style={{
              background: tab === "project" ? "#00A3FF" : "transparent",
              color: tab === "project" ? "#020B19" : "rgba(240,244,255,0.5)",
              boxShadow: tab === "project" ? "0 0 20px rgba(0,163,255,0.3)" : "none",
            }}
          >
            مشروع واحد
          </button>
        </div>
      </section>

      {/* ── Monthly Tiers ── */}
      {tab === "monthly" && (
        <section className="py-14 px-6" style={{ background: "#020B19" }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-sm mb-3" style={{ color: "#00A3FF", fontFamily: "IBM Plex Mono" }}>الباقات الشهرية</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">اختر باقتك</h2>
              <p className="text-base max-w-lg mx-auto" style={{ color: "rgba(240,244,255,0.5)" }}>
                كل باقة تُبنى من الصفر لشركتك — لا شيء جاهز، لا حلول مشتركة.
              </p>
            </div>
            <div className="tiers-grid grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {monthlyTiers.map((tier, i) => {
                const Icon = tier.icon;
                return (
                  <div
                    key={i}
                    className="tier-card relative rounded-[2rem] p-8 flex flex-col gap-6"
                    style={{
                      opacity: 0,
                      background: tier.highlight ? "linear-gradient(135deg, #0A1628 0%, #001830 100%)" : "#0A1628",
                      border: tier.highlight ? "2px solid rgba(0,163,255,0.4)" : "1px solid rgba(0,163,255,0.12)",
                      boxShadow: tier.highlight ? "0 0 40px rgba(0,163,255,0.12)" : "none",
                    }}
                  >
                    {/* Tag */}
                    {tier.tag && (
                      <div className="absolute -top-3.5 right-8 px-4 py-1 rounded-full text-xs font-bold" style={tier.tagStyle}>
                        {tier.tag}
                      </div>
                    )}

                    {/* Header */}
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: tier.highlight ? "rgba(0,163,255,0.15)" : "rgba(255,255,255,0.05)",
                          border: tier.highlight ? "1px solid rgba(0,163,255,0.3)" : "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        <Icon size={22} color={tier.highlight ? "#00A3FF" : "rgba(240,244,255,0.6)"} />
                      </div>
                      <div>
                        <p className="text-xs font-mono mb-0.5" style={{ color: "rgba(240,244,255,0.4)", fontFamily: "IBM Plex Mono" }}>{tier.name}</p>
                        <h3 className="text-xl font-bold">{tier.nameAr}</h3>
                      </div>
                    </div>

                    {/* Price */}
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold" style={{ color: tier.highlight ? "#00A3FF" : "#F0F4FF" }}>{tier.price}</span>
                        <span className="text-sm" style={{ color: "rgba(240,244,255,0.45)" }}>{tier.period}</span>
                      </div>
                      <p className="text-xs mt-2" style={{ color: "rgba(240,244,255,0.35)" }}>{tier.setup}</p>
                    </div>

                    {/* Divider */}
                    <div style={{ height: "1px", background: "rgba(0,163,255,0.1)" }} />

                    {/* Features */}
                    <ul className="flex flex-col gap-4">
                      {tier.features.map((f, j) => (
                        <li key={j} className="flex gap-3">
                          <CheckCircle size={17} color={tier.highlight ? "#00A3FF" : "rgba(0,163,255,0.5)"} className="flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium leading-snug">{f.text}</p>
                            <p className="text-xs mt-0.5" style={{ color: "rgba(240,244,255,0.4)" }}>{f.sub}</p>
                          </div>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <button
                      onClick={() => openForm(tier.tierKey)}
                      className={`mt-auto inline-flex items-center justify-center rounded-2xl py-3.5 text-sm font-bold transition-all duration-200 cursor-pointer ${tier.highlight ? "btn-primary" : `text-[rgba(240,244,255,0.8)] ${tier.ctaStyle}`}`}
                      style={tier.highlight ? {} : { background: "rgba(255,255,255,0.04)" }}
                    >
                      <span>{tier.cta}</span>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Support explanation */}
            <div className="mt-10 text-center">
              <p className="text-xs max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(240,244,255,0.3)" }}>
                ماذا يعني وقت الرد؟ إذا واجهت مشكلة أو احتجت تعديل، نرد عليك خلال الوقت المحدد في أيام العمل. كل ما كانت باقتك أعلى، كل ما كان ردنا أسرع وقنوات التواصل أكثر.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── One-Time Projects ── */}
      {tab === "project" && (
        <section className="py-14 px-6" style={{ background: "#020B19" }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-sm mb-3" style={{ color: "#00A3FF", fontFamily: "IBM Plex Mono" }}>مشاريع لمرة واحدة</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">عندك مشكلة محددة؟</h2>
              <p className="text-base max-w-lg mx-auto" style={{ color: "rgba(240,244,255,0.5)" }}>
                نبني لك الحل من الصفر، نسلّمه جاهز، وندرّب فريقك عليه — بدون التزام شهري.
              </p>
            </div>
            <div className="tiers-grid grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {projects.map((proj, i) => {
                const Icon = proj.icon;
                return (
                  <div
                    key={i}
                    className="tier-card relative rounded-[2rem] p-8 flex flex-col gap-6"
                    style={{ opacity: 0, background: "#0A1628", border: "1px solid rgba(0,163,255,0.12)" }}
                  >
                    {/* Header */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,163,255,0.1)", border: "1px solid rgba(0,163,255,0.25)" }}>
                        <Icon size={22} color="#00A3FF" />
                      </div>
                      <h3 className="text-xl font-bold">{proj.name}</h3>
                    </div>

                    {/* Price */}
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold" style={{ color: "#F0F4FF" }}>{proj.price}</span>
                        <span className="text-sm" style={{ color: "rgba(240,244,255,0.45)" }}>{proj.unit}</span>
                      </div>
                      <p className="text-xs mt-2" style={{ color: "rgba(240,244,255,0.35)" }}>مدة التنفيذ: {proj.timeline}</p>
                    </div>

                    {/* Divider */}
                    <div style={{ height: "1px", background: "rgba(0,163,255,0.1)" }} />

                    {/* Features */}
                    <ul className="flex flex-col gap-3">
                      {proj.features.map((f, j) => (
                        <li key={j} className="flex gap-3">
                          <CheckCircle size={17} color="rgba(0,163,255,0.5)" className="flex-shrink-0 mt-0.5" />
                          <p className="text-sm leading-snug">{f}</p>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <button
                      onClick={() => openForm(proj.tierKey)}
                      className="mt-auto inline-flex items-center justify-center rounded-2xl py-3.5 text-sm font-bold transition-all duration-200 cursor-pointer text-[rgba(240,244,255,0.8)] border border-[rgba(0,163,255,0.3)] hover:border-[rgba(0,163,255,0.6)]"
                      style={{ background: "rgba(255,255,255,0.04)" }}
                    >
                      <span>احجز هذا المشروع</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Bottom CTA ── */}
      <section className="py-16 px-6" style={{ background: "#0A1628" }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-8 rounded-[2rem]" style={{ background: "#020B19", border: "1px solid rgba(0,163,255,0.15)" }}>
            <CheckCircle size={32} color="#00A3FF" className="mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3">مش متأكد من وين تبدأ؟</h3>
            <p className="text-sm mb-6 leading-relaxed" style={{ color: "rgba(240,244,255,0.6)" }}>
              تحدث مع مساعدنا — نفهم وضع شركتك ونقترح الخيار اللي يناسبك بالضبط.
            </p>
            <a href="/contact" className="btn-primary inline-flex px-8 py-3">
              <span>ابدأ المحادثة</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Sign-up Modal ── */}
      {formOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: "rgba(2,11,25,0.85)", backdropFilter: "blur(8px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setFormOpen(false); }}
        >
          <div
            ref={formRef}
            className="w-full max-w-lg rounded-[2rem] p-8 relative"
            style={{ background: "#0A1628", border: "1px solid rgba(0,163,255,0.25)", boxShadow: "0 0 60px rgba(0,163,255,0.1)" }}
          >
            {/* Close */}
            <button onClick={() => setFormOpen(false)} className="absolute top-5 left-5 p-1 rounded-lg transition-colors hover:bg-[rgba(255,255,255,0.05)] cursor-pointer" style={{ color: "rgba(240,244,255,0.4)" }}>
              <X size={20} />
            </button>

            {!submitted ? (
              <>
                {/* Header */}
                <div className="mb-6">
                  <p className="text-xs mb-2" style={{ color: "#00A3FF", fontFamily: "IBM Plex Mono" }}>تسجيل اهتمام</p>
                  <h3 className="text-xl font-bold mb-1">ابدأ مع {tierLabel(selectedTier).split("—")[0].trim()}</h3>
                  <p className="text-sm" style={{ color: "rgba(240,244,255,0.45)" }}>{tierLabel(selectedTier)}</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs font-medium mb-1.5 block" style={{ color: "rgba(240,244,255,0.6)" }}>الاسم</label>
                    <input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors"
                      style={{ background: "#020B19", border: "1px solid rgba(0,163,255,0.15)", color: "#F0F4FF" }}
                      placeholder="اسمك الكامل"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1.5 block" style={{ color: "rgba(240,244,255,0.6)" }}>اسم الشركة</label>
                    <input
                      required
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors"
                      style={{ background: "#020B19", border: "1px solid rgba(0,163,255,0.15)", color: "#F0F4FF" }}
                      placeholder="اسم شركتك"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1.5 block" style={{ color: "rgba(240,244,255,0.6)" }}>الإيميل</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors"
                      style={{ background: "#020B19", border: "1px solid rgba(0,163,255,0.15)", color: "#F0F4FF" }}
                      dir="ltr"
                      placeholder="email@company.com"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1.5 block" style={{ color: "rgba(240,244,255,0.6)" }}>رقم الواتساب</label>
                    <input
                      required
                      type="tel"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors"
                      style={{ background: "#020B19", border: "1px solid rgba(0,163,255,0.15)", color: "#F0F4FF" }}
                      dir="ltr"
                      placeholder="+966 5XX XXX XXXX"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1.5 block" style={{ color: "rgba(240,244,255,0.6)" }}>وصف مختصر لمشكلتك <span style={{ color: "rgba(240,244,255,0.25)" }}>(اختياري)</span></label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors resize-none"
                      style={{ background: "#020B19", border: "1px solid rgba(0,163,255,0.15)", color: "#F0F4FF" }}
                      placeholder="مثال: نبي نأتمت متابعة العملاء المحتملين..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
                    style={{ opacity: submitting ? 0.6 : 1 }}
                  >
                    <Send size={16} style={{ transform: "rotate(180deg)" }} />
                    <span>{submitting ? "جاري الإرسال..." : "أرسل الطلب"}</span>
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(0,163,255,0.12)", border: "1px solid rgba(0,163,255,0.3)" }}>
                  <CheckCircle size={32} color="#00A3FF" />
                </div>
                <h3 className="text-xl font-bold mb-2">تم استلام طلبك</h3>
                <p className="text-sm mb-6" style={{ color: "rgba(240,244,255,0.55)" }}>نتواصل معك خلال ٢٤ ساعة عبر واتساب.</p>
                <button onClick={() => setFormOpen(false)} className="btn-primary inline-flex px-8 py-3 cursor-pointer">
                  <span>تمام</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
