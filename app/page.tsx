"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Zap, Link2, Brain, Globe,
  BarChart3, Users,
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
          أنظمتك موجودة — لكنها لا تتحدث مع بعضها.
        </p>
        <h1
          className="hero-line2 leading-none mb-6 font-serif"
          style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)", fontFamily: "'Noto Naskh Arabic', serif", color: "#F0F4FF", fontStyle: "italic", opacity: 0, lineHeight: 1.1 }}
        >
          نهر توحّد{" "}
          <span style={{ color: "#00A3FF" }} className="text-glow">أنظمتك.</span>
        </h1>
        <p className="hero-sub text-base md:text-lg mb-8 leading-relaxed" style={{ color: "rgba(240,244,255,0.6)", opacity: 0, maxWidth: "560px" }}>
          بنية أتمتة على مستوى المؤسسات — نربط ERP و CRM وأدواتك اليومية في منظومة واحدة تعمل بالذكاء الاصطناعي. للشركات السعودية من ١٠ ملايين ريال فأعلى.
        </p>
        <div className="flex flex-wrap gap-4 justify-end">
          <Link href="/services" className="hero-cta btn-outline" style={{ opacity: 0 }}>
            <span>اكتشف كيف نعمل</span>
            <ArrowLeft size={16} />
          </Link>
          <button onClick={() => window.dispatchEvent(new CustomEvent("open-consultation"))} className="hero-cta btn-primary" style={{ opacity: 0 }}>
            <span>احجز استشارة</span>
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── PROBLEM ─────────────────────────────────────────────────────────────────
const painPoints = [
  { icon: Link2, title: "أنظمة معزولة: ERP في وادٍ و CRM في وادٍ آخر", desc: "بيانات العميل مبعثرة بين SAP والـ CRM وملفات Excel. التقارير تتأخر، والقرارات تُتَّخذ بمعلومات ناقصة." },
  { icon: Zap, title: "عمليات يدوية على مستوى المؤسسات", desc: "فِرَق كاملة تُدخل البيانات من نظام إلى آخر يومياً — كلفة حقيقية في الوقت، والأخطاء البشرية، وسرعة التنفيذ." },
  { icon: Brain, title: "ذكاء اصطناعي بلا جذور في أنظمتك", desc: "شراء أدوات AI منفصلة لا يحل المشكلة. القيمة الحقيقية تأتي من وكلاء يعملون فوق ERP و CRM الحاليَين — لا بمعزل عنهما." },
  { icon: Globe, title: "نمو الشركة يسبق بنيتها التقنية", desc: "العمليات التي تصلح لـ ١٠ موظفين تنهار عند ١٠٠. بدون بنية أتمتة قابلة للتوسع، النمو يصبح عبئاً لا فرصة." },
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
            بنيتك التقنية{" "}
            <span style={{ color: "#00A3FF" }}>تعيق نموّك</span>
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

// ─── INTEGRATIONS MARQUEE ────────────────────────────────────────────────────
const integrationsRowA = [
  { name: "SAP", src: "/integrations/sap.svg" },
  { name: "Oracle NetSuite", src: "/integrations/oracle-netsuite.svg" },
  { name: "Microsoft Dynamics 365", src: "/integrations/ms-dynamics.svg" },
  { name: "Odoo", src: "/integrations/odoo.svg" },
  { name: "Sage", src: "/integrations/sage.svg" },
  { name: "Zoho One", src: "/integrations/zoho-one.svg" },
  { name: "Salesforce", src: "/integrations/salesforce.svg" },
];

const integrationsRowB = [
  { name: "Zoho CRM", src: "/integrations/zoho-crm.svg" },
  { name: "Zoho Books", src: "/integrations/zoho-books.svg" },
  { name: "Qoyod", src: "/integrations/qoyod.svg" },
  { name: "Daftra", src: "/integrations/daftra.svg" },
  { name: "ZATCA e-Invoice", src: "/integrations/zatca.svg" },
  { name: "WhatsApp Business", src: "/integrations/whatsapp-business.svg" },
  { name: "HubSpot", src: "/integrations/hubspot.svg" },
];

function IntegrationsSection() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const load = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(
        ref.current?.querySelectorAll(".integ-fade") || [],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 80%" } }
      );
    };
    load();
  }, []);

  return (
    <section ref={ref} className="py-24 px-6 overflow-hidden" style={{ background: "#081122" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="integ-fade text-sm mb-4" style={{ color: "#00A3FF", fontFamily: "IBM Plex Mono", opacity: 0 }}>
            الأنظمة التي نربطها
          </p>
          <h2 className="integ-fade text-3xl md:text-5xl font-bold leading-tight mb-5" style={{ opacity: 0 }}>
            بياناتك تتحدث مع بعضها.{" "}
            <span style={{ color: "#00A3FF" }} className="text-glow">أدواتك تعمل كمنظومة واحدة.</span>
          </h2>
          <p className="integ-fade text-base md:text-lg max-w-2xl mx-auto" style={{ color: "rgba(240,244,255,0.6)", opacity: 0 }}>
            نربط ونؤتمت الأنظمة التي تعتمد عليها شركتك — من ERP الكبرى إلى الأدوات اليومية — في منظومة تعمل بلا لمسة يدوية.
          </p>
        </div>

        <div className="integ-fade marquee-mask flex flex-col gap-5" style={{ opacity: 0 }}>
          <div className="marquee-row overflow-hidden" dir="ltr">
            <div className="marquee-track marquee-track-ltr">
              {[...integrationsRowA, ...integrationsRowA].map((logo, i) => (
                <div key={`a-${i}`} className="logo-mark" aria-label={logo.name}>
                  <img src={logo.src} alt={logo.name} />
                </div>
              ))}
            </div>
          </div>
          <div className="marquee-row overflow-hidden" dir="ltr">
            <div className="marquee-track marquee-track-rtl">
              {[...integrationsRowB, ...integrationsRowB].map((logo, i) => (
                <div key={`b-${i}`} className="logo-mark" aria-label={logo.name}>
                  <img src={logo.src} alt={logo.name} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="integ-fade text-xs text-center mt-8 leading-relaxed max-w-2xl mx-auto" style={{ color: "rgba(240,244,255,0.35)", opacity: 0 }}>
          * الأسماء والعلامات المذكورة تعود لأصحابها. نحن نُنفذ التكاملات والأتمتة مع هذه الأنظمة — لسنا شركاء رسميين.
        </p>
      </div>
    </section>
  );
}

// ─── WHAT WE BUILD ────────────────────────────────────────────────────────────
const services = [
  { icon: Bot, title: "وكلاء الذكاء الاصطناعي المؤسسيون", subtitle: "يعملون فوق ERP و CRM وبياناتك الفعلية", desc: "وكلاء AI مربوطون مباشرة بأنظمتك المؤسسية — يقرؤون من ERP، يكتبون في CRM، يفتحون الفواتير، يحدّثون المخزون، ويتخذون قرارات مدروسة بناءً على سياق شركتك الكامل بدون نسخ يدوي.", examples: ["وكيل واتساب مرتبط بـ CRM لحظياً", "وكيل مبيعات يفتح الصفقات في ERP", "وكيل تقارير تنفيذية يومية", "مساعد داخلي يقرأ بياناتك الفعلية"] },
  { icon: Workflow, title: "أنظمة الأتمتة المؤسسية", subtitle: "نربط ERP و CRM وكل أدواتك", desc: "نربط أنظمتك المؤسسية معاً — SAP، Oracle، Microsoft Dynamics، Zoho، Odoo، NetSuite، Sage — ونبني فوقها طبقة أتمتة وذكاء اصطناعي تلغي العمل اليدوي، وتجعل بياناتك تتحرك بسلاسة بين الأقسام بدون تدخل بشري.", examples: ["تكامل ERP ⇄ CRM ⇄ واتساب في نظام واحد", "مزامنة البيانات بين الأنظمة لحظياً", "أتمتة الفواتير والتحصيل وZATCA", "تقارير تنفيذية موحّدة من كل مصادرك"] },
  { icon: AppWindow, title: "البوابات والداشبوردات الموحّدة", subtitle: "تجمع بيانات أنظمتك المؤسسية في مكان واحد", desc: "بوابات وداشبوردات داخلية مربوطة مباشرة بـ ERP و CRM والأنظمة المحاسبية عبر API آمنة. صلاحيات دقيقة لكل دور، تحديث لحظي، ولا نسخ يدوي بين الشاشات.", examples: ["بوابة العملاء الموحّدة", "داشبورد تنفيذي 360°", "بوابة الموردين والمشتريات", "إدارة العمليات الميدانية"] },
  { icon: TrendingUp, title: "بنية النمو المؤسسية", subtitle: "تربط توليد العملاء مباشرة بـ CRM والمبيعات", desc: "نمو حقيقي للمؤسسات: مواقع B2B تنفيذية، حملات Outbound مرتبطة بـ CRM، تأهيل آلي للعملاء بالذكاء الاصطناعي، وتقارير ROI موصولة بأنظمة المبيعات الفعلية.", examples: ["موقع B2B موصول بـ CRM", "حملات Outbound مؤتمتة", "تأهيل عملاء بالذكاء الاصطناعي", "تقارير ROI تنفيذية"] },
  { icon: Lightbulb, title: "استشارة بنية المؤسسة الرقمية", subtitle: "قرارات تكامل وذكاء اصطناعي مبنية على أنظمتك الفعلية", desc: "جلسات شهرية مبنية على فحص حقيقي لـ ERP والـ CRM وأدواتك المؤسسية. نُخبرك بصراحة ما يستحق الاستثمار، وما يجب إيقافه، وما يمكن تحسينه فوراً — بدون بيع ولا تحيّز لمورّد.", examples: ["جلسة بنية تقنية شهرية", "تقرير ROI لكل تكامل", "خارطة طريق ٩٠ يوم", "تقييم مستقل لمورّدي ERP"] },
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
          <h2 className="text-3xl md:text-5xl font-bold">خمس طبقات تجعل أنظمتك تعمل كمنظومة واحدة</h2>
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
        <h2 className="text-3xl md:text-5xl font-bold mb-4">شركتك تعمل كمنظومة واحدة</h2>
        <p className="text-base mb-12 max-w-2xl mx-auto" style={{ color: "rgba(240,244,255,0.6)" }}>
          خلال ٩٠ يوماً من بدء العمل، أنظمتك تتحدث مع بعضها، وفريقك يتوقف عن إدخال البيانات بين الشاشات.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Zap, title: "بياناتك تتدفق آلياً بين الأنظمة", text: "ERP و CRM والمحاسبة مزامنة لحظياً — لا إدخال يدوي مزدوج، لا أخطاء بشرية، لا تأخير." },
            { icon: Users, title: "وكلاء AI يعملون فوق أنظمتك", text: "وكلاء يقرؤون من بياناتك الفعلية ويتخذون قرارات حقيقية — لا روبوتات معزولة." },
            { icon: BarChart3, title: "رؤية تنفيذية موحّدة", text: "داشبورد واحد يجمع كل المؤشرات من كل الأنظمة — قرارات مبنية على رؤية كاملة." },
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
          <p className="text-base mb-2" style={{ color: "rgba(240,244,255,0.8)" }}>التكاملات التي نبنيها تتعمّق مع نمو شركتك — وتزيد قيمتها مع كل نظام جديد يُربط بها.</p>
          <p className="text-sm flex items-center justify-center gap-2" style={{ color: "#00A3FF", fontFamily: "IBM Plex Mono" }}>
            <Lock size={13} /> بنية تتراكم قيمتها — لا مصروف يتكرر.
          </p>
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
          <h2 className="text-3xl md:text-5xl font-bold mb-4">شركات بنينا معها بنية موحّدة</h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "rgba(240,244,255,0.55)" }}>
            لا وعود — أنظمة موثّقة في الإنتاج عند شركات عملت معنا فعلاً.
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
          شركتك تستحق منظومة{" "}
          <span style={{ color: "#00A3FF" }} className="text-glow">موحّدة</span>
        </h2>
        <p className="text-base mb-10" style={{ color: "rgba(240,244,255,0.55)" }}>
          نحلل بنيتك التقنية ونُظهر لك بالضبط ما يمكن ربطه وأتمتته خلال ٩٠ يوماً.
        </p>
        <button onClick={() => window.dispatchEvent(new CustomEvent("open-consultation"))} className="btn-primary text-lg py-4 px-10 electric-glow-strong">
          <span>احجز استشارة</span>
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
      <IntegrationsSection />
      <WhatWeBuildSection />
      <WhyStaySection />
      <CaseStudiesSection />
      <CTAStrip />
    </>
  );
}
