"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle, X, ChevronDown, ChevronUp } from "lucide-react";

const packages = [
  {
    name: "باقة الأساس",
    price: "٨,٠٠٠",
    monthly: "٩,٦٠٠",
    period: "ريال/شهر",
    contract: "عقد سنوي",
    featured: false,
    color: "rgba(240,244,255,0.7)",
    features: {
      "وكلاء الذكاء الاصطناعي": "٢",
      "سير عمل الأتمتة": "٣",
      "التطبيقات الداخلية": "١",
      "صفحات الهبوط": "١",
      "موقع كامل": false,
      "نظام بريد بارد آلي": false,
      "منشورات LinkedIn": false,
      "مدير حساب مخصص": false,
      "واتساب مباشر": false,
      "جلسات الاستشارة": "١ شهرياً",
    },
    cta: "ابدأ بالأساس",
  },
  {
    name: "باقة التوسع",
    price: "١٨,٠٠٠",
    monthly: "٢١,٦٠٠",
    period: "ريال/شهر",
    contract: "عقد سنوي",
    featured: true,
    color: "#00A3FF",
    features: {
      "وكلاء الذكاء الاصطناعي": "٤",
      "سير عمل الأتمتة": "٦",
      "التطبيقات الداخلية": "٢",
      "صفحات الهبوط": "متعددة",
      "موقع كامل": false,
      "نظام بريد بارد آلي": true,
      "منشورات LinkedIn": "٨ شهرياً",
      "مدير حساب مخصص": false,
      "واتساب مباشر": false,
      "جلسات الاستشارة": "٢ شهرياً",
    },
    cta: "ابدأ بالتوسع",
  },
  {
    name: "باقة الهيمنة",
    price: "٣٨,٠٠٠",
    monthly: "٤٥,٦٠٠",
    period: "ريال/شهر",
    contract: "عقد سنوي",
    featured: false,
    color: "rgba(240,244,255,0.7)",
    features: {
      "وكلاء الذكاء الاصطناعي": "٦",
      "سير عمل الأتمتة": "١٠",
      "التطبيقات الداخلية": "٣",
      "صفحات الهبوط": "متعددة",
      "موقع كامل": true,
      "نظام بريد بارد آلي": true,
      "منشورات LinkedIn": "١٦ شهرياً",
      "مدير حساب مخصص": true,
      "واتساب مباشر": true,
      "جلسات الاستشارة": "٤ شهرياً",
    },
    cta: "ابدأ بالهيمنة",
  },
];

const featureRows = [
  "وكلاء الذكاء الاصطناعي",
  "سير عمل الأتمتة",
  "التطبيقات الداخلية",
  "صفحات الهبوط",
  "موقع كامل",
  "نظام بريد بارد آلي",
  "منشورات LinkedIn",
  "مدير حساب مخصص",
  "واتساب مباشر",
  "جلسات الاستشارة",
];

const faqs = [
  {
    q: "هل يمكن الدفع شهرياً؟",
    a: "نعم، العقود الشهرية متاحة لجميع الباقات بزيادة ٣٠٪ على السعر الشهري. العقد السنوي يوفر عليك هذه الزيادة ويضمن استمرارية العمل.",
  },
  {
    q: "ما مدة العقد وكيف يعمل الدفع؟",
    a: "العقد سنوي كامل. الدفع: ٥٠٪ مقدماً عند توقيع العقد، و٥٠٪ بعد ٦ أشهر. هذا يضمن التزامنا الكامل ببناء منظومة تشغيلية حقيقية لشركتك.",
  },
  {
    q: "ما أنواع الشركات التي تخدمونها؟",
    a: "نخدم أي شركة B2B في المملكة العربية السعودية لديها عمليات معقدة وفريق جاهز للتطوير. اللوجستيات، العقارات، التوزيع، الخدمات المهنية — المشترك بينهم هو وجود عمليات يدوية تحتاج أتمتة.",
  },
  {
    q: "ما الفرق الحقيقي بين الباقات؟",
    a: "الفرق ليس فقط في الأعداد — بل في مستوى التغطية. الأساس يحل أبرز ٣-٥ مشاكل تشغيلية. التوسع يبني منظومة نمو كاملة. الهيمنة تُحوّل شركتك إلى بنية تحتية رقمية لا يمكن للمنافسين تكرارها.",
  },
  {
    q: "ماذا يحدث بعد انتهاء العقد؟",
    a: "كل الأنظمة التي بنيناها تبقى ملكك بالكامل. نقدم خيارات تجديد بشروط تفضيلية أو عقد صيانة منفصل لضمان استمرار عمل الأنظمة.",
  },
  {
    q: "كم يستغرق وقت البناء والنشر؟",
    a: "أول نظام جاهز خلال ٢-٣ أسابيع من بدء العقد. الأنظمة الكاملة تُنشر تدريجياً خلال ٦٠-٩٠ يوماً بحسب التعقيد والأولويات.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-[1.25rem] overflow-hidden transition-all duration-300"
      style={{ background: "#0A1628", border: "1px solid rgba(0,163,255,0.12)" }}
    >
      <button
        className="w-full flex items-center justify-between p-6 text-right gap-4"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-base">{q}</span>
        <span className="flex-shrink-0" style={{ color: "#00A3FF" }}>
          {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>
      {open && (
        <div className="px-6 pb-6 text-sm leading-relaxed" style={{ color: "rgba(240,244,255,0.65)" }}>
          {a}
        </div>
      )}
    </div>
  );
}

function FeatureCell({ val }: { val: string | boolean }) {
  if (val === true) return <CheckCircle size={18} color="#00A3FF" className="mx-auto" />;
  if (val === false) return <X size={16} color="rgba(240,244,255,0.2)" className="mx-auto" />;
  return <span className="text-sm font-medium" style={{ color: "#F0F4FF" }}>{val as string}</span>;
}

export default function PricingPage() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const load = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(".pkg-card-p", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out", delay: 0.3 });
    };
    load();
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-20 px-6 text-center relative overflow-hidden" style={{ background: "linear-gradient(180deg, #020B19 0%, #001830 100%)" }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(ellipse at center, #00A3FF 0%, transparent 60%)" }} />
        <p className="text-sm mb-4 relative z-10" style={{ color: "#00A3FF", fontFamily: "IBM Plex Mono" }}>الباقات والأسعار</p>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight relative z-10">
          استثمار في بنية تحتية —{" "}
          <span style={{ color: "#00A3FF" }} className="text-glow">لا في مشاريع تنتهي</span>
        </h1>
        <p className="text-base md:text-lg max-w-2xl mx-auto relative z-10" style={{ color: "rgba(240,244,255,0.6)" }}>
          عقود سنوية، نتائج قابلة للقياس، وأنظمة تبقى وتنمو مع شركتك.
        </p>
      </section>

      {/* Package cards */}
      <section ref={ref} className="py-20 px-6" style={{ background: "#020B19" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {packages.map((pkg, i) => (
              <div
                key={i}
                className="pkg-card-p card-hover p-8 rounded-[2rem] flex flex-col relative"
                style={{
                  background: pkg.featured ? "linear-gradient(135deg, #0A1628, #001840)" : "#0A1628",
                  border: pkg.featured ? "2px solid #00A3FF" : "1px solid rgba(0,163,255,0.15)",
                  boxShadow: pkg.featured ? "0 0 50px rgba(0,163,255,0.2)" : "none",
                  opacity: 0,
                }}
              >
                {pkg.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold" style={{ background: "#00A3FF", color: "#020B19" }}>
                    الأكثر شيوعاً
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3" style={{ color: pkg.featured ? "#00A3FF" : "#F0F4FF" }}>{pkg.name}</h3>
                  <div className="text-4xl font-bold mb-1" style={{ color: "#F0F4FF", fontFamily: "IBM Plex Mono" }}>{pkg.price}</div>
                  <p className="text-sm mb-1" style={{ color: "rgba(240,244,255,0.45)" }}>{pkg.period} | {pkg.contract}</p>
                  <p className="text-xs" style={{ color: "rgba(240,244,255,0.3)", fontFamily: "IBM Plex Mono" }}>أو {pkg.monthly} شهرياً (بدون عقد)</p>
                </div>
                <ul className="flex-1 space-y-3 mb-8">
                  {Object.entries(pkg.features).map(([k, v]) => {
                    if (v === false) return null;
                    return (
                      <li key={k} className="flex items-start gap-3">
                        <CheckCircle size={16} color="#00A3FF" className="flex-shrink-0 mt-0.5" />
                        <span className="text-sm" style={{ color: "rgba(240,244,255,0.75)" }}>
                          {typeof v === "string" ? `${k}: ${v}` : k}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <Link href="/contact" className={`${pkg.featured ? "btn-primary" : "btn-outline"} justify-center`}>
                  <span>{pkg.cta}</span>
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-sm" style={{ color: "rgba(240,244,255,0.35)", fontFamily: "IBM Plex Mono" }}>
            * العقود الشهرية متاحة بزيادة ٣٠٪ | ٥٠٪ مقدماً عند التوقيع
          </p>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-20 px-6" style={{ background: "#0A1628" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">مقارنة تفصيلية</h2>
            <p className="text-base" style={{ color: "rgba(240,244,255,0.55)" }}>كل ما تحتاج معرفته قبل اتخاذ قرارك</p>
          </div>
          <div className="rounded-[2rem] overflow-hidden" style={{ border: "1px solid rgba(0,163,255,0.15)" }}>
            {/* Header */}
            <div className="grid grid-cols-4 p-4 gap-2" style={{ background: "#020B19", borderBottom: "1px solid rgba(0,163,255,0.15)" }}>
              <div className="text-sm font-semibold" style={{ color: "rgba(240,244,255,0.4)" }}>الميزة</div>
              {packages.map((pkg, i) => (
                <div key={i} className="text-center">
                  <p className="text-sm font-bold" style={{ color: pkg.featured ? "#00A3FF" : "#F0F4FF" }}>{pkg.name}</p>
                  <p className="text-xs" style={{ color: "rgba(240,244,255,0.4)", fontFamily: "IBM Plex Mono" }}>{pkg.price} ر.س</p>
                </div>
              ))}
            </div>
            {featureRows.map((feat, ri) => (
              <div key={feat} className="grid grid-cols-4 p-4 gap-2 items-center" style={{ background: ri % 2 === 0 ? "rgba(2,11,25,0.5)" : "transparent", borderBottom: ri < featureRows.length - 1 ? "1px solid rgba(0,163,255,0.06)" : "none" }}>
                <div className="text-sm" style={{ color: "rgba(240,244,255,0.65)" }}>{feat}</div>
                {packages.map((pkg, pi) => (
                  <div key={pi} className="text-center">
                    <FeatureCell val={(pkg.features as Record<string, string | boolean>)[feat]} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6" style={{ background: "#020B19" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">أسئلة شائعة</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center" style={{ background: "#0A1628" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">غير متأكد من أي باقة؟</h2>
          <p className="text-base mb-10" style={{ color: "rgba(240,244,255,0.55)" }}>
            احجز استشارة مجانية ونساعدك تختار الباقة المناسبة بناءً على حجم شركتك وأولوياتك.
          </p>
          <Link href="/contact" className="btn-primary text-lg py-4 px-10 electric-glow-strong">
            <span>احجز استشارة مجانية</span>
          </Link>
        </div>
      </section>
    </>
  );
}
