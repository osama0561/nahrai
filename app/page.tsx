"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Zap, Link2, Brain, Globe,
  Truck, Building2, ShoppingCart, Briefcase, BarChart3, Users,
  ArrowLeft, Bot, Workflow, AppWindow, TrendingUp, Lightbulb,
  CheckCircle, Lock
} from "lucide-react";

// ─── HERO ────────────────────────────────────────────────────────────────────
function HeroSection() {
  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap");
      const tl = gsap.timeline({ delay: 0.3 });
      tl.fromTo(".hero-line1", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
        .fromTo(".hero-line2", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.4")
        .fromTo(".hero-sub", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
        .fromTo(".hero-cta", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 }, "-=0.4");
    };
    loadGSAP();
  }, []);

  return (
    <section
      className="relative min-h-[100dvh] flex items-end justify-end overflow-hidden"
      style={{ paddingBottom: "10vh", paddingRight: "5vw", paddingLeft: "5vw" }}
    >
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&auto=format&fit=crop&q=80"
          alt="server room"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.2) saturate(1.8)" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #020B19 40%, rgba(2,11,25,0.7) 70%, rgba(2,11,25,0.15) 100%), linear-gradient(to right, #020B19 0%, transparent 70%)" }} />
      </div>

      {/* Animated waves */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-10 pointer-events-none" style={{ height: "180px" }}>
        <div className="wave-animate flex" style={{ width: "200%" }}>
          {[0, 1].map(k => (
            <svg key={k} viewBox="0 0 1440 180" xmlns="http://www.w3.org/2000/svg" style={{ width: "50%", flexShrink: 0 }} preserveAspectRatio="none">
              <path d="M0,100 C200,30 400,160 600,80 C800,0 1000,140 1200,70 C1350,20 1420,90 1440,80 L1440,180 L0,180Z" fill="rgba(0,163,255,0.07)" />
            </svg>
          ))}
        </div>
        <div className="wave-animate flex" style={{ width: "200%", animationDuration: "22s", marginTop: "-60px" }}>
          {[0, 1].map(k => (
            <svg key={k} viewBox="0 0 1440 180" xmlns="http://www.w3.org/2000/svg" style={{ width: "50%", flexShrink: 0 }} preserveAspectRatio="none">
              <path d="M0,120 C300,60 600,160 900,90 C1100,40 1300,130 1440,100 L1440,180 L0,180Z" fill="rgba(0,119,212,0.06)" />
            </svg>
          ))}
        </div>
      </div>

      <div className="relative z-20 max-w-3xl text-right">
        <p className="hero-line1 text-lg font-medium mb-3" style={{ color: "rgba(240,244,255,0.65)", opacity: 0 }}>
          معظم الشركات تشتري أدوات —
        </p>
        <h1
          className="hero-line2 leading-none mb-6 font-serif"
          style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)", fontFamily: "'Noto Naskh Arabic', serif", color: "#F0F4FF", fontStyle: "italic", opacity: 0, lineHeight: 1.1 }}
        >
          نهر تبني{" "}
          <span style={{ color: "#00A3FF" }} className="text-glow">الأنظمة.</span>
        </h1>
        <p className="hero-sub text-base md:text-lg mb-8 leading-relaxed" style={{ color: "rgba(240,244,255,0.6)", opacity: 0, maxWidth: "540px" }}>
          وكالة أتمتة تبني البنية التشغيلية الرقمية لشركات B2B في المملكة العربية السعودية — نولّد العملاء ونؤتمت العمليات بالذكاء الاصطناعي.
        </p>
        <div className="flex flex-wrap gap-4 justify-end">
          <Link href="/services" className="hero-cta btn-outline" style={{ opacity: 0 }}>
            <span>اكتشف كيف نعمل</span>
            <ArrowLeft size={16} />
          </Link>
          <button onClick={() => window.dispatchEvent(new CustomEvent("open-chat"))} className="hero-cta btn-primary" style={{ opacity: 0 }}>
            <span>احجز استشارة مجانية</span>
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── PROBLEM ─────────────────────────────────────────────────────────────────
const painPoints = [
  { icon: Zap, title: "عمليات يدوية تستنزف الفريق", desc: "ساعات يومية تُهدر على مهام يمكن أتمتتها بالكامل — وقت يمكن استثماره في النمو." },
  { icon: Link2, title: "أدوات منفصلة لا تتحدث مع بعضها", desc: "ERP هنا، CRM هناك، تقارير يدوية في Excel — فوضى تقنية تعيق القرارات السريعة." },
  { icon: Brain, title: "صفر تبني في الذكاء الاصطناعي", desc: "منافسوك يبنون بسرعة. كل يوم تأخير هو تكلفة حقيقية — ليست فرصة فائتة فحسب." },
  { icon: Globe, title: "حضور رقمي ضعيف يخسر العملاء", desc: "موقعك ووجودك الرقمي لا يعكسان حجم شركتك الحقيقي — وهذا يكلفك صفقات يومياً." },
];

function ProblemSection() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const load = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(ref.current?.querySelectorAll(".pain-card") || [], { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 75%" } });
    };
    load();
  }, []);

  return (
    <section ref={ref} className="py-24 px-6" style={{ background: "#0A1628" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm mb-3" style={{ color: "#00A3FF", fontFamily: "IBM Plex Mono" }}>المشكلة</p>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            شركتك تخسر كل يوم —{" "}
            <span style={{ color: "#00A3FF" }}>وأنت تعرف ذلك</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {painPoints.map((p, i) => (
            <div key={i} className="pain-card card-hover p-8 rounded-[1.5rem] flex gap-5" style={{ background: "rgba(2,11,25,0.7)", border: "1px solid rgba(0,163,255,0.12)", opacity: 0 }}>
              <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(0,163,255,0.1)", border: "1px solid rgba(0,163,255,0.2)" }}>
                <p.icon size={22} color="#00A3FF" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{p.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(240,244,255,0.6)" }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── WHAT WE BUILD ────────────────────────────────────────────────────────────
const services = [
  { icon: Bot, title: "وكلاء الذكاء الاصطناعي", subtitle: "يعملون باستقلالية داخل شركتك", desc: "وكلاء ذكاء اصطناعي متخصصون يعملون على مدار الساعة: متابعة العملاء عبر واتساب، تحليل السوق والمنافسين تلقائياً، إدارة الحملات التسويقية، وتوليد تقارير الأداء.", examples: ["وكيل واتساب يرد ويتابع تلقائياً", "تحليل تنافسي أسبوعي آلي", "وكيل حملات بريد إلكتروني ذكي", "مساعد داخلي للفريق"] },
  { icon: Workflow, title: "أنظمة الأتمتة", subtitle: "تلغي العمل اليدوي المتكرر", desc: "نربط أنظمتك معاً ونبني سير عمل آلية تحرر فريقك من المهام المتكررة: من توليد العروض إلى تحصيل المدفوعات.", examples: ["توليد عروض الأسعار تلقائياً", "نظام تأهيل وتوصيل العملاء", "تحصيل المدفوعات وإرسال الفواتير", "تقارير أسبوعية آلية"] },
  { icon: AppWindow, title: "التطبيقات الداخلية", subtitle: "مبنية حول طريقة عمل شركتك", desc: "نبني تطبيقات ويب مخصصة تعكس عملياتك الفعلية — لا حلول جاهزة، بل أنظمة مصممة لك تحديداً.", examples: ["بوابات العملاء الذكية", "لوحات تتبع السائقين", "أنظمة إدارة الطلبات", "داشبورد عمليات مركزي"] },
  { icon: TrendingUp, title: "بنية النمو", subtitle: "يحول حضورك الرقمي لآلة توليد عملاء", desc: "نبني الجهاز الرقمي الكامل الذي يجلب لك عملاء جدد باستمرار — مواقع، صفحات هبوط، بريد بارد آلي، ومحتوى LinkedIn.", examples: ["مواقع عالية التحويل", "صفحات هبوط مُحسّنة", "نظام بريد بارد آلي", "١٦ منشور LinkedIn شهرياً"] },
  { icon: Lightbulb, title: "الاستشارة الاستراتيجية", subtitle: "قرارات صح في الذكاء الاصطناعي", desc: "نجلس معك شهرياً لمراجعة الأداء، تحديد الفرص الجديدة، ورسم خارطة الطريق للربع القادم.", examples: ["جلسات استراتيجية شهرية", "مراجعة الأداء والمؤشرات", "خارطة طريق الذكاء الاصطناعي", "توصيات تقنية مخصصة"] },
];

function WhatWeBuildSection() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const load = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(ref.current!, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 80%" } });
    };
    load();
  }, []);

  const ActiveIcon = services[active].icon;

  return (
    <section ref={ref} className="py-24 px-6" style={{ background: "#020B19" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm mb-3" style={{ color: "#00A3FF", fontFamily: "IBM Plex Mono" }}>ما الذي نبنيه</p>
          <h2 className="text-3xl md:text-5xl font-bold">ما الذي نبنيه داخل شركتك</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2 flex flex-col gap-2">
            {services.map((s, i) => (
              <button key={i} onClick={() => setActive(i)} className="text-right p-5 rounded-[1.25rem] transition-all duration-300 flex items-center gap-4" style={{ background: active === i ? "rgba(0,163,255,0.12)" : "rgba(10,22,40,0.5)", border: active === i ? "1px solid rgba(0,163,255,0.4)" : "1px solid rgba(0,163,255,0.08)", boxShadow: active === i ? "0 0 20px rgba(0,163,255,0.15)" : "none" }}>
                <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: active === i ? "rgba(0,163,255,0.2)" : "rgba(0,163,255,0.06)" }}>
                  <s.icon size={18} color={active === i ? "#00A3FF" : "rgba(240,244,255,0.4)"} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm" style={{ color: active === i ? "#F0F4FF" : "rgba(240,244,255,0.6)" }}>{s.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: active === i ? "#00A3FF" : "rgba(240,244,255,0.35)" }}>{s.subtitle}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="lg:col-span-3 p-8 lg:p-10 rounded-[1.5rem]" style={{ background: "#0A1628", border: "1px solid rgba(0,163,255,0.15)" }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center electric-glow" style={{ background: "rgba(0,163,255,0.12)" }}>
                <ActiveIcon size={26} color="#00A3FF" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{services[active].title}</h3>
                <p className="text-sm" style={{ color: "#00A3FF" }}>{services[active].subtitle}</p>
              </div>
            </div>
            <p className="leading-relaxed mb-8 text-base" style={{ color: "rgba(240,244,255,0.7)" }}>{services[active].desc}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {services[active].examples.map((ex, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(0,163,255,0.06)", border: "1px solid rgba(0,163,255,0.1)" }}>
                  <CheckCircle size={15} color="#00A3FF" className="flex-shrink-0" />
                  <span className="text-sm" style={{ color: "rgba(240,244,255,0.75)" }}>{ex}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PHILOSOPHY ───────────────────────────────────────────────────────────────
function PhilosophySection() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const load = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(ref.current?.querySelectorAll(".phil-word") || [], { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out", scrollTrigger: { trigger: ref.current, start: "top 70%" } });
    };
    load();
  }, []);

  const words = [
    { text: "نهر", blue: false }, { text: "يبني:", blue: false },
    { text: "أنظمة", blue: true }, { text: "لا", blue: true },
    { text: "تستطيع", blue: true }, { text: "العمل", blue: true },
    { text: "بدونها.", blue: true },
  ];

  return (
    <section ref={ref} className="py-28 px-6 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #020B19 0%, #001830 50%, #020B19 100%)" }}>
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #00A3FF 0%, transparent 60%), radial-gradient(circle at 70% 50%, #0050A0 0%, transparent 60%)" }} />
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <p className="text-base mb-10" style={{ color: "rgba(240,244,255,0.45)" }}>معظم الوكالات تبيع: مشاريع تنتهي.</p>
        <div className="font-serif leading-tight" style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)", fontFamily: "'Noto Naskh Arabic', serif", fontStyle: "italic" }}>
          {words.map((w, i) => (
            <span key={i} className="phil-word inline-block mx-1" style={{ opacity: 0, color: w.blue ? "#00A3FF" : "#F0F4FF", textShadow: w.text === "أنظمة" ? "0 0 30px rgba(0,163,255,0.5)" : "none" }}>
              {w.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}


// ─── PACKAGES ─────────────────────────────────────────────────────────────────

// ─── WHY STAY ─────────────────────────────────────────────────────────────────
function WhyStaySection() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const load = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(ref.current!, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 80%" } });
    };
    load();
  }, []);

  return (
    <section ref={ref} className="py-24 px-6" style={{ background: "linear-gradient(135deg, #003070 0%, #0050A0 50%, #002850 100%)" }}>
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-sm mb-3" style={{ color: "rgba(240,244,255,0.6)", fontFamily: "IBM Plex Mono" }}>ما يحدث بعد ٩٠ يوماً</p>
        <h2 className="text-3xl md:text-5xl font-bold mb-4">شركتك تتحرك بسرعة مختلفة</h2>
        <p className="text-base mb-12 max-w-2xl mx-auto" style={{ color: "rgba(240,244,255,0.6)" }}>
          خلال ٩٠ يوماً من بدء العمل، ترى فريقك يركز على ما يهم — لا على المهام المتكررة.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Zap, title: "فريق أسرع وأكثر تركيزاً", text: "المهام اليدوية المتكررة تختفي — فريقك يركز على القرارات والنمو." },
            { icon: Users, title: "عملاء جدد بشكل منتظم", text: "منظومة توليد عملاء تعمل تلقائياً — استفسارات مؤهلة تصلك باستمرار." },
            { icon: BarChart3, title: "رؤية كاملة على الأداء", text: "تقارير وداشبوردات تلقائية تعطيك وضوحاً تاماً لاتخاذ قرارات أسرع." },
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-[1.5rem] flex flex-col items-center gap-4 text-center" style={{ background: "rgba(2,11,25,0.4)", border: "1px solid rgba(240,244,255,0.1)" }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "rgba(0,163,255,0.15)" }}>
                <item.icon size={26} color="#00A3FF" />
              </div>
              <p className="text-lg font-bold">{item.title}</p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(240,244,255,0.65)" }}>{item.text}</p>
            </div>
          ))}
        </div>
        <div className="p-6 rounded-2xl inline-block" style={{ background: "rgba(2,11,25,0.5)", border: "1px solid rgba(240,244,255,0.15)" }}>
          <p className="text-base mb-2" style={{ color: "rgba(240,244,255,0.8)" }}>الأنظمة التي نبنيها تنمو مع شركتك — وتزيد قيمتها مع الوقت.</p>
          <p className="text-sm flex items-center justify-center gap-2" style={{ color: "#00A3FF", fontFamily: "IBM Plex Mono" }}>
            <Lock size={13} /> استثمار يتضاعف — لا مصروف يتكرر.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── WHO WE SERVE ─────────────────────────────────────────────────────────────
const sectors = [
  { icon: Truck, label: "اللوجستيات والنقل", desc: "أساطيل، شحن، سلاسل توريد" },
  { icon: Building2, label: "العقارات والتطوير", desc: "مطورون، وسطاء، إدارة أصول" },
  { icon: ShoppingCart, label: "التوزيع والتجارة", desc: "موزعون، مستوردون، تجار جملة" },
  { icon: Briefcase, label: "الخدمات المهنية", desc: "استشارات، محاسبة، قانون، هندسة" },
];

function WhoWeServeSection() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const load = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(ref.current?.querySelectorAll(".sector-card") || [], { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.4)", scrollTrigger: { trigger: ref.current, start: "top 80%" } });
    };
    load();
  }, []);

  return (
    <section ref={ref} className="py-24 px-6" style={{ background: "#0A1628" }}>
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-sm mb-3" style={{ color: "#00A3FF", fontFamily: "IBM Plex Mono" }}>من نخدم</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">شركات B2B ذات العمليات المعقدة</h2>
        <p className="text-base mb-12 max-w-2xl mx-auto" style={{ color: "rgba(240,244,255,0.6)" }}>
          عميلنا المثالي: شركة تملك فريقاً متمرساً وعمليات ضخمة — وتعرف أن الأتمتة ستغير مستوى أدائها.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sectors.map((s, i) => (
            <div key={i} className="sector-card card-hover p-6 rounded-[1.5rem] flex flex-col items-center gap-3" style={{ background: "#020B19", border: "1px solid rgba(0,163,255,0.12)", opacity: 0 }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "rgba(0,163,255,0.1)" }}>
                <s.icon size={26} color="#00A3FF" />
              </div>
              <p className="font-semibold text-sm">{s.label}</p>
              <p className="text-xs" style={{ color: "rgba(240,244,255,0.45)" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CASE STUDIES ─────────────────────────────────────────────────────────────
function CaseStudiesSection() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const load = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(ref.current?.querySelectorAll(".case-card") || [], { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.2, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 75%" } });
    };
    load();
  }, []);

  return (
    <section ref={ref} className="py-24 px-6" style={{ background: "#0A1628" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm mb-3" style={{ color: "#00A3FF", fontFamily: "IBM Plex Mono" }}>نتائج حقيقية</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">عملاء بنوا معنا</h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "rgba(240,244,255,0.55)" }}>
            لا وعود — نتائج موثقة من شركات عملت معنا فعلاً.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Shortcut */}
          <div className="case-card p-8 rounded-[2rem] flex flex-col gap-6" style={{ background: "#020B19", border: "1px solid rgba(0,163,255,0.2)", opacity: 0 }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold">Shortcut</p>
                <p className="text-sm" style={{ color: "#00A3FF" }}>وكالة تسويق بالمؤثرين</p>
              </div>
              <div className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: "rgba(0,163,255,0.12)", color: "#00A3FF", border: "1px solid rgba(0,163,255,0.3)" }}>
                مكتمل ✓
              </div>
            </div>

            <p className="text-sm leading-relaxed" style={{ color: "rgba(240,244,255,0.65)" }}>
              كانوا يديرون حملات المؤثرين يدوياً — فتح الحملة، تتبع كل مؤثر، قياس النتائج — كل شيء في ملفات متفرقة. بنينا لهم نظاماً داخلياً يدير دورة الحملة كاملة من البداية للنهاية.
            </p>

            <div className="grid grid-cols-3 gap-3">
              {[
                { num: "٤x", label: "زيادة في استيعاب العملاء" },
                { num: "٢٠٠", label: "مؤثر تتبعهم الشركة" },
                { num: "١ ساعة", label: "بدل شهر لإدارة حملة" },
              ].map((s, i) => (
                <div key={i} className="text-center p-3 rounded-xl" style={{ background: "rgba(0,163,255,0.06)", border: "1px solid rgba(0,163,255,0.12)" }}>
                  <p className="text-xl font-bold mb-1" style={{ color: "#00A3FF", fontFamily: "IBM Plex Mono" }}>{s.num}</p>
                  <p className="text-xs leading-tight" style={{ color: "rgba(240,244,255,0.5)" }}>{s.label}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl" style={{ background: "rgba(0,163,255,0.05)", border: "1px solid rgba(0,163,255,0.1)" }}>
              <p className="text-sm italic leading-relaxed" style={{ color: "rgba(240,244,255,0.7)" }}>
                "أصبحنا قادرين على استقبال ٤ أضعاف العملاء — كنا نرفض عملاء لأننا لا نستطيع التشغيل بعدد موظفينا."
              </p>
              <p className="text-xs mt-2" style={{ color: "#00A3FF" }}>— فريق Shortcut</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {["تطبيق داخلي مخصص", "تتبع المؤثرين", "إدارة الحملات", "تقارير تلقائية"].map((t, i) => (
                <span key={i} className="px-3 py-1 rounded-full text-xs" style={{ background: "rgba(240,244,255,0.06)", color: "rgba(240,244,255,0.5)", border: "1px solid rgba(240,244,255,0.1)" }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Nawat */}
          <div className="case-card p-8 rounded-[2rem] flex flex-col gap-6" style={{ background: "#020B19", border: "1px solid rgba(0,163,255,0.2)", opacity: 0 }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold">Nawat</p>
                <p className="text-sm" style={{ color: "#00A3FF" }}>خدمات قانونية — قطاع الرياضات الإلكترونية</p>
              </div>
              <div className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: "rgba(255,163,0,0.1)", color: "#FFA300", border: "1px solid rgba(255,163,0,0.3)" }}>
                جارٍ البناء
              </div>
            </div>

            <p className="text-sm leading-relaxed" style={{ color: "rgba(240,244,255,0.65)" }}>
              شركة قانونية متخصصة في شركات الرياضات الإلكترونية — نبني لهم منظومة كاملة: وكيل واتساب يستقبل ويؤهل العملاء، تطبيقات داخلية لإدارة القضايا، وصفحات هبوط مخصصة لكل خدمة.
            </p>

            <div className="grid grid-cols-3 gap-3">
              {[
                { num: "٢٤/٧", label: "استقبال العملاء تلقائياً" },
                { num: "٤", label: "أنظمة تُبنى بالتوازي" },
                { num: "E-Sports", label: "أول خدمة قانونية متخصصة" },
              ].map((s, i) => (
                <div key={i} className="text-center p-3 rounded-xl" style={{ background: "rgba(0,163,255,0.06)", border: "1px solid rgba(0,163,255,0.12)" }}>
                  <p className="text-xl font-bold mb-1" style={{ color: "#00A3FF", fontFamily: "IBM Plex Mono" }}>{s.num}</p>
                  <p className="text-xs leading-tight" style={{ color: "rgba(240,244,255,0.5)" }}>{s.label}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl" style={{ background: "rgba(0,163,255,0.05)", border: "1px solid rgba(0,163,255,0.1)" }}>
              <p className="text-sm italic leading-relaxed" style={{ color: "rgba(240,244,255,0.7)" }}>
                "نهر تحول ضجيج الذكاء الاصطناعي إلى أدوات حقيقية قابلة للتطبيق — هذا بالضبط ما يحتاجه المستقبل."
              </p>
              <p className="text-xs mt-2" style={{ color: "#00A3FF" }}>— فريق Nawat</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {["وكيل واتساب", "تطبيقات داخلية", "صفحات هبوط", "أتمتة كاملة"].map((t, i) => (
                <span key={i} className="px-3 py-1 rounded-full text-xs" style={{ background: "rgba(240,244,255,0.06)", color: "rgba(240,244,255,0.5)", border: "1px solid rgba(240,244,255,0.1)" }}>{t}</span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── CTA STRIP ────────────────────────────────────────────────────────────────
function CTAStrip() {
  return (
    <section className="py-24 px-6 text-center" style={{ background: "#020B19" }}>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
          شركتك تستحق بنية تحتية{" "}
          <span style={{ color: "#00A3FF" }} className="text-glow">حقيقية</span>
        </h2>
        <p className="text-base mb-10" style={{ color: "rgba(240,244,255,0.55)" }}>
          استشارة مجانية — نشرح لك بالضبط ما يمكن أتمتته في شركتك خلال ٩٠ يوماً.
        </p>
        <button onClick={() => window.dispatchEvent(new CustomEvent("open-chat"))} className="btn-primary text-lg py-4 px-10 electric-glow-strong">
          <span>احجز استشارة مجانية</span>
        </button>
      </div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <WhatWeBuildSection />
      <PhilosophySection />
      <WhyStaySection />
      <CaseStudiesSection />
      <WhoWeServeSection />
      <CTAStrip />
    </>
  );
}
