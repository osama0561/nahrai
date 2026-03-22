"use client";
import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle, Star, Zap, Crown } from "lucide-react";

const tiers = [
  {
    icon: Zap,
    name: "Bronze",
    nameAr: "برونز",
    price: "٢,٣٠٠",
    period: "/شهر",
    tag: "أول ١٠ شركات فقط",
    tagStyle: { background: "#CD7F32", color: "#020B19" },
    highlight: false,
    features: [
      { text: "AI Agent مخصص واحد", sub: "مثال: تسويق، مبيعات، أو تأهيل عملاء" },
      { text: "أتمتة واحدة مخصصة", sub: "مثال: متابعة تلقائية، جدولة، أو تقارير" },
      { text: "جلسة استشارة شهرية", sub: "٤٥ دقيقة مع المؤسس مباشرة" },
      { text: "٥٪ من العقود المغلقة عبر الوكيل", sub: "بحد أقصى ٨,٠٠٠ ريال/شهر" },
    ],
    cta: "ابدأ بالبرونز",
    ctaStyle: "border border-[rgba(205,127,50,0.5)] hover:border-[rgba(205,127,50,0.8)]",
    note: "مقاعد محدودة — أول ١٠ شركات فقط",
  },
  {
    icon: Star,
    name: "Silver",
    nameAr: "فضي",
    price: "٥,٥٠٠",
    period: "/شهر",
    tag: "الأكثر طلباً",
    tagStyle: { background: "#00A3FF", color: "#020B19" },
    highlight: true,
    features: [
      { text: "AI Agent تسويقي مخصص", sub: "مثال: تسويق، مبيعات، أو تأهيل عملاء" },
      { text: "AI Agent داخلي مخصص", sub: "مثال: تقارير، عمليات، أو متابعة فريق" },
      { text: "٣ أتمتات مخصصة", sub: "تُبنى حسب عمليات شركتك الفعلية" },
      { text: "جلستا استشارة شهرياً", sub: "٤٥ دقيقة لكل جلسة مع المؤسس" },
      { text: "بدون نسبة على العقود", sub: "سعر ثابت بدون متغيرات" },
    ],
    cta: "ابدأ بالفضي",
    ctaStyle: "",
    note: null,
  },
  {
    icon: Crown,
    name: "Gold",
    nameAr: "ذهبي",
    price: "١٢,٠٠٠",
    period: "/شهر",
    tag: "الحزمة الكاملة",
    tagStyle: { background: "#FFD700", color: "#020B19" },
    highlight: false,
    features: [
      { text: "٣ وكلاء AI مخصصين", sub: "تسويق، مبيعات، وعمليات داخلية" },
      { text: "٧ أتمتات مخصصة", sub: "كل شيء من المتابعة للتقارير للجدولة" },
      { text: "تطبيق داخلي مخصص", sub: "داشبورد، بوابة عملاء، أو نظام تتبع" },
      { text: "صفحات هبوط + موقع", sub: "مبني لتحويل الزوار لعملاء" },
      { text: "٤ جلسات + واتساب مباشر", sub: "وصول مباشر للمؤسس طوال الشهر" },
      { text: "مدير حساب مخصص", sub: "نقطة تواصل واحدة لكل شيء" },
      { text: "بدون نسبة على العقود", sub: "سعر ثابت بدون متغيرات" },
    ],
    cta: "ابدأ بالذهبي",
    ctaStyle: "border border-[rgba(255,215,0,0.4)] hover:border-[rgba(255,215,0,0.7)]",
    note: null,
  },
];

export default function PricingPage() {
  useEffect(() => {
    const load = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(".pricing-hero", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out", delay: 0.3 });
      gsap.fromTo(".tier-card", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: ".tiers-grid", start: "top 80%" } });
    };
    load();
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-16 px-6 text-center relative overflow-hidden" style={{ background: "linear-gradient(180deg, #020B19 0%, #001830 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(ellipse at center, rgba(0,163,255,0.08) 0%, transparent 60%)" }} />
        <p className="pricing-hero text-sm mb-4 relative z-10" style={{ color: "#00A3FF", fontFamily: "IBM Plex Mono", opacity: 0 }}>الباقات</p>
        <h1 className="pricing-hero text-4xl md:text-5xl font-bold mb-4 relative z-10 leading-tight" style={{ opacity: 0 }}>
          اختر{" "}
          <span style={{ color: "#00A3FF" }} className="text-glow">باقتك</span>
        </h1>
        <p className="pricing-hero text-base max-w-xl mx-auto relative z-10" style={{ color: "rgba(240,244,255,0.55)", opacity: 0 }}>
          كل شيء مبني خصيصاً لشركتك — لا قوالب جاهزة، لا حلول مشتركة.
        </p>
      </section>

      {/* Tiers */}
      <section className="py-20 px-6" style={{ background: "#020B19" }}>
        <div className="max-w-6xl mx-auto">
          <div className="tiers-grid grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {tiers.map((tier, i) => {
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
                    <div
                      className="absolute -top-3.5 right-8 px-4 py-1 rounded-full text-xs font-bold"
                      style={tier.tagStyle}
                    >
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
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold" style={{ color: tier.highlight ? "#00A3FF" : "#F0F4FF" }}>{tier.price}</span>
                      <span className="text-sm" style={{ color: "rgba(240,244,255,0.45)" }}>{tier.period}</span>
                    </div>
                    {tier.note && (
                      <p className="text-xs mt-1.5" style={{ color: "rgba(205,127,50,0.8)" }}>{tier.note}</p>
                    )}
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
                  <Link
                    href="/contact"
                    className={`mt-auto inline-flex items-center justify-center rounded-2xl py-3.5 text-sm font-bold transition-all duration-200 ${tier.highlight ? "btn-primary" : `text-[rgba(240,244,255,0.8)] ${tier.ctaStyle}`}`}
                    style={tier.highlight ? {} : { background: "rgba(255,255,255,0.04)" }}
                  >
                    <span>{tier.cta}</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom FAQ note */}
      <section className="py-16 px-6" style={{ background: "#0A1628" }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-8 rounded-[2rem]" style={{ background: "#020B19", border: "1px solid rgba(0,163,255,0.15)" }}>
            <CheckCircle size={32} color="#00A3FF" className="mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3">مش متأكد أي باقة؟</h3>
            <p className="text-sm mb-6 leading-relaxed" style={{ color: "rgba(240,244,255,0.6)" }}>
              تحدث مع مساعدنا — نفهم وضع شركتك ونقترح الباقة التي تناسبك بالضبط.
            </p>
            <Link href="/contact" className="btn-primary inline-flex px-8 py-3">
              <span>ابدأ المحادثة</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
