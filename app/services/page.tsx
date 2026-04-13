"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { Bot, Workflow, AppWindow, TrendingUp, Lightbulb, CheckCircle, ArrowLeft } from "lucide-react";

const serviceDetails = [
  {
    icon: Bot,
    title: "وكلاء الذكاء الاصطناعي",
    subtitle: "يعملون باستقلالية داخل شركتك",
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&auto=format&fit=crop&q=80",
    desc: `وكلاء الذكاء الاصطناعي التي نبنيها ليست روبوتات دردشة بسيطة — إنها أنظمة مستقلة تتعلم من بيانات شركتك وتتخذ قرارات مدروسة على مدار الساعة.

نبني كل وكيل بناءً على احتياجاتك المحددة: سواء كان يتابع العملاء المحتملين، يجيب على استفسارات المشترين، يحلل المنافسين أسبوعياً، أو يدير حملاتك التسويقية — كل ذلك بشكل تلقائي كامل.`,
    examples: [
      { title: "وكيل واتساب للمتابعة", desc: "يرد على العملاء المحتملين فوراً، يصنّفهم، ويجدول المتابعات تلقائياً." },
      { title: "وكيل التحليل التنافسي", desc: "يرصد تحركات منافسيك أسبوعياً ويرسل تقريراً موجزاً لك." },
      { title: "وكيل حملات البريد الإلكتروني", desc: "يكتب، يجدول، ويتتبع حملات البريد الآلية بناءً على سلوك العميل." },
      { title: "مساعد الفريق الداخلي", desc: "يجيب على أسئلة الموظفين عن السياسات، الإجراءات، والعمليات." },
    ],
    logistics: "أمثلة: وكيل يرد على طلبات الشحن ويسعّر تلقائياً — أو وكيل يتابع العملاء المحتملين في العقارات — أو وكيل يجيب على استفسارات الموزعين فورياً.",
  },
  {
    icon: Workflow,
    title: "أنظمة الأتمتة المؤسسية",
    subtitle: "نربط ERP و CRM وكل أدواتك في منظومة واحدة",
    img: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&auto=format&fit=crop&q=80",
    desc: `معظم الشركات المؤسسية تملك أنظمة قوية — SAP، Oracle، Microsoft Dynamics، Zoho، Odoo، NetSuite، Sage، Qoyod، Daftra — لكنها تعمل في جزر منفصلة. النتيجة: فِرَق كاملة تُدخل نفس البيانات مرتين وثلاث مرات، وتقارير تُبنى يدوياً كل أسبوع.

نحن نربط هذه الأنظمة معاً عبر واجهات API آمنة، ونبني فوقها طبقة أتمتة وذكاء اصطناعي تجعل بياناتك تتحرك بسلاسة بين الأقسام بلا تدخل بشري — من العميل إلى ERP إلى المحاسبة إلى التقارير التنفيذية.`,
    examples: [
      { title: "تكامل ERP ⇄ CRM ⇄ واتساب", desc: "كل طلب جديد يتدفق تلقائياً بين الأنظمة — بدون إدخال يدوي مزدوج أو أخطاء بشرية." },
      { title: "مزامنة البيانات لحظياً", desc: "ERP محدّث، CRM محدّث، المخزون محدّث — كل شيء في تزامن مستمر على مدار الساعة." },
      { title: "أتمتة الفواتير و ZATCA", desc: "إصدار الفواتير، ربطها بالـ ERP، وإرسالها لمنصة فاتورة بشكل كامل ومتوافق." },
      { title: "تقارير تنفيذية موحّدة", desc: "داشبورد واحد يجمع بيانات من كل أنظمتك — قرارات مبنية على رؤية كاملة لا مجزّأة." },
    ],
    logistics: "أمثلة: ربط SAP بنظام تتبع الأساطيل في اللوجستيات — أو مزامنة Zoho CRM مع ERP عقاري — أو أتمتة تدفق طلبات الموردين بين NetSuite ومنصات التوزيع.",
  },
  {
    icon: AppWindow,
    title: "التطبيقات الداخلية",
    subtitle: "مبنية حول طريقة عمل شركتك",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    desc: `الحلول الجاهزة لا تناسب شركتك — لأن شركتك ليست نسخة عن غيرها. نبني تطبيقات ويب داخلية مخصصة تعكس عملياتك الفعلية وتلغي الاحتكاك اليومي.

من بوابات العملاء إلى لوحات تتبع السائقين، كل تطبيق يُصمَّم مع فريقك ويُنشر ضمن البنية التحتية لشركتك.`,
    examples: [
      { title: "بوابة العملاء الذكية", desc: "العميل يتابع طلباته، يرفع مستندات، ويتواصل — كله في مكان واحد." },
      { title: "لوحة تتبع السائقين", desc: "تتبع مباشر للأسطول، مهام السائقين، والتسليمات على خريطة حية." },
      { title: "نظام إدارة الطلبات", desc: "من استقبال الطلب إلى التسليم — تتبع كامل مع تنبيهات تلقائية." },
      { title: "داشبورد العمليات", desc: "نظرة شاملة على مؤشرات الأداء، الإيرادات، والعمليات في لوحة واحدة." },
    ],
    logistics: "أمثلة: بوابة تتبع أسطول في اللوجستيات — أو بوابة عملاء للمطور العقاري — أو داشبورد طلبات الموزع مع المخزون الحي.",
  },
  {
    icon: TrendingUp,
    title: "بنية النمو",
    subtitle: "يحول حضورك الرقمي لآلة توليد عملاء",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    desc: `حضورك الرقمي ليس مجرد موقع — إنه منظومة متكاملة تعمل على توليد عملاء جدد باستمرار. نبني هذه المنظومة كاملاً: من الموقع إلى البريد البارد إلى المحتوى اليومي.

كل عنصر مُصمَّم لتحويل الزوار إلى عملاء محتملين وتأهيلهم قبل أن يصلوا إليك.`,
    examples: [
      { title: "الموقع الإلكتروني", desc: "موقع سريع، محسّن للتحويل، ومبني لإقناع المشتري B2B قبل الاتصال." },
      { title: "صفحات الهبوط", desc: "صفحات مخصصة لكل خدمة وكل جمهور — مع تتبع دقيق للأداء." },
      { title: "نظام البريد البارد الآلي", desc: "تسلسلات مُعدّة مسبقاً تصل للعملاء المستهدفين بشكل آلي ومنتظم." },
      { title: "محتوى LinkedIn", desc: "١٦ منشور شهرياً يُقوّي سلطتك في القطاع ويجلب استفسارات مؤهلة." },
    ],
    logistics: "أمثلة: حملة بريد بارد تستهدف مدراء سلسلة التوريد — أو محتوى LinkedIn يبني سلطة شركتك الاستشارية — أو صفحات هبوط لكل خدمة توزيع.",
  },
  {
    icon: Lightbulb,
    title: "الاستشارة الاستراتيجية",
    subtitle: "قرارات صح في الذكاء الاصطناعي",
    img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop&q=80",
    desc: `تقنية الذكاء الاصطناعي تتطور بسرعة — ومعظم الشركات لا تعرف من أين تبدأ، أو ما الذي يستحق الاستثمار. نحن نملأ هذا الفراغ.

جلساتنا الشهرية ليست فقط لمراجعة الأرقام — إنها لاتخاذ قرارات استراتيجية مبنية على بيانات حقيقية من عملياتك.`,
    examples: [
      { title: "جلسة استراتيجية شهرية", desc: "ساعة مركزة: مراجعة الأداء، تحديد الأولويات، وتعديل الخطة." },
      { title: "مراجعة الأداء والمؤشرات", desc: "تقارير واضحة تُظهر ROI حقيقي لكل نظام تم بناؤه." },
      { title: "خارطة طريق الذكاء الاصطناعي", desc: "خطة ٩٠ يوم تحدد بالضبط ما يُبنى وما يُحسَّن وما يُوقف." },
      { title: "توصيات تقنية مخصصة", desc: "نصيحة واضحة بدون بيع: هل تحتاج هذه الأداة؟ هل هذا الاستثمار مبرر؟" },
    ],
    logistics: "أمثلة: خارطة طريق أتمتة لشركة شحن — أو استراتيجية ذكاء اصطناعي لمكتب استشارات — أو تقرير ROI فصلي لمطوّر عقاري.",
  },
];

function ServiceCard({ service, index }: { service: typeof serviceDetails[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const load = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(ref.current!, { opacity: 0, x: isEven ? -40 : 40 }, { opacity: 1, x: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 80%" } });
    };
    load();
  }, [isEven]);

  const Icon = service.icon;

  return (
    <div ref={ref} className="py-20 px-6" style={{ background: index % 2 === 0 ? "#020B19" : "#0A1628", opacity: 0 }}>
      <div className="max-w-6xl mx-auto">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${!isEven ? "lg:grid-flow-col-dense" : ""}`}>
          {/* Content */}
          <div className={!isEven ? "lg:col-start-2" : ""}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center electric-glow" style={{ background: "rgba(0,163,255,0.12)", border: "1px solid rgba(0,163,255,0.3)" }}>
                <Icon size={26} color="#00A3FF" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">{service.title}</h2>
                <p className="text-sm" style={{ color: "#00A3FF" }}>{service.subtitle}</p>
              </div>
            </div>
            <div className="space-y-4 mb-8 text-base leading-relaxed" style={{ color: "rgba(240,244,255,0.7)" }}>
              {service.desc.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {service.examples.map((ex, i) => (
                <div key={i} className="p-4 rounded-xl" style={{ background: "rgba(0,163,255,0.06)", border: "1px solid rgba(0,163,255,0.12)" }}>
                  <p className="font-semibold text-sm mb-1" style={{ color: "#00A3FF" }}>{ex.title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(240,244,255,0.6)" }}>{ex.desc}</p>
                </div>
              ))}
            </div>
            {/* Logistics callout */}
            <div className="p-5 rounded-2xl flex gap-4" style={{ background: "rgba(0,80,160,0.2)", border: "1px solid rgba(0,163,255,0.25)" }}>
              <div className="flex-shrink-0 mt-0.5">
                <CheckCircle size={18} color="#00A3FF" />
              </div>
              <div>
                <p className="text-xs font-bold mb-1" style={{ color: "#00A3FF", fontFamily: "IBM Plex Mono" }}>أمثلة تطبيقية</p>
                <p className="text-sm" style={{ color: "rgba(240,244,255,0.75)" }}>{service.logistics}</p>
              </div>
            </div>
          </div>
          {/* Image */}
          <div className={`relative ${!isEven ? "lg:col-start-1" : ""}`}>
            <div className="rounded-[2rem] overflow-hidden" style={{ border: "1px solid rgba(0,163,255,0.15)" }}>
              <img
                src={service.img}
                alt={service.title}
                className="w-full h-72 lg:h-96 object-cover"
                style={{ filter: "brightness(0.75) saturate(1.3)" }}
              />
              <div className="absolute inset-0 rounded-[2rem]" style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(2,11,25,0.6) 100%)" }} />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl electric-glow" style={{ background: "rgba(0,163,255,0.1)", border: "1px solid rgba(0,163,255,0.3)" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const heroRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const load = async () => {
      const { gsap } = await import("gsap");
      gsap.fromTo(heroRef.current?.querySelectorAll(".hero-s") || [], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out", delay: 0.3 });
    };
    load();
  }, []);

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="pt-40 pb-24 px-6 text-center relative overflow-hidden" style={{ background: "linear-gradient(180deg, #020B19 0%, #001830 100%)" }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(ellipse at center, #00A3FF 0%, transparent 60%)" }} />
        <p className="hero-s text-sm mb-4" style={{ color: "#00A3FF", fontFamily: "IBM Plex Mono", opacity: 0 }}>خدماتنا</p>
        <h1 className="hero-s text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ opacity: 0 }}>
          ما الذي نبنيه{" "}
          <span style={{ color: "#00A3FF" }} className="text-glow">داخل شركتك</span>
        </h1>
        <p className="hero-s text-base md:text-lg max-w-2xl mx-auto" style={{ color: "rgba(240,244,255,0.6)", opacity: 0 }}>
          خمسة محاور تكمل بعضها — من ربط ERP و CRM إلى وكلاء الذكاء الاصطناعي والاستراتيجية. بنية أتمتة مؤسسية مبنية على أنظمتك الفعلية.
        </p>
      </section>

      {/* Service sections */}
      {serviceDetails.map((s, i) => (
        <ServiceCard key={i} service={s} index={i} />
      ))}

      {/* CTA */}
      <section className="py-24 px-6 text-center" style={{ background: "#0A1628" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">جاهز لتعرف ما يمكن بناؤه في شركتك؟</h2>
          <p className="text-base mb-10" style={{ color: "rgba(240,244,255,0.55)" }}>نشرح لك بالضبط أين تبدأ.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => window.dispatchEvent(new CustomEvent("open-consultation"))} className="btn-primary text-base py-4 px-8">
              <span>احجز استشارة</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
