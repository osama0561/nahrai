"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  MessageSquare, RefreshCw, BarChart3, Mail, UserCheck, Bell,
  Smartphone, Globe, FileText, LayoutDashboard, Package, Users,
  CheckCircle
} from "lucide-react";

const agents = [
  {
    icon: MessageSquare,
    title: "وكيل واتساب",
    desc: "يرد على استفسارات العملاء ٢٤/٧، يؤهلهم، ويحول الجاهزين لمبيعات.",
    tag: "الأكثر طلباً",
  },
  {
    icon: UserCheck,
    title: "وكيل تأهيل العملاء",
    desc: "يسأل العميل المحتمل الأسئلة الصح ويحدد إذا كان يستحق وقت فريق المبيعات.",
    tag: null,
  },
  {
    icon: Mail,
    title: "وكيل البريد البارد",
    desc: "يرسل حملات بريد مخصصة تلقائياً ويتابع مع من لم يرد — بدون تدخل بشري.",
    tag: null,
  },
  {
    icon: RefreshCw,
    title: "وكيل المتابعة التلقائية",
    desc: "يتابع العملاء الذين لم يكملوا الشراء أو لم يردوا — عبر واتساب أو بريد.",
    tag: null,
  },
  {
    icon: BarChart3,
    title: "وكيل التقارير",
    desc: "يولد تقارير أداء يومية أو أسبوعية ويرسلها لك مباشرة — بدون Excel.",
    tag: null,
  },
  {
    icon: Bell,
    title: "وكيل تحليل المنافسين",
    desc: "يراقب منافسيك أسبوعياً ويرسل لك ملخصاً بأبرز التغييرات في أسعارهم وعروضهم.",
    tag: null,
  },
];

const apps = [
  {
    icon: LayoutDashboard,
    title: "داشبورد عمليات مركزي",
    desc: "كل بيانات شركتك في مكان واحد — طلبات، سائقين، مبيعات، أداء الفريق.",
  },
  {
    icon: FileText,
    title: "نظام عروض الأسعار الآلي",
    desc: "العميل يملأ تفاصيله، النظام يولد عرض سعر احترافي في ثوانٍ ويرسله تلقائياً.",
  },
  {
    icon: Smartphone,
    title: "بوابة العملاء الذكية",
    desc: "عملاؤك يتابعون طلباتهم، يرفعون مستنداتهم، ويتواصلون معك — كل شيء في تطبيق واحد.",
  },
  {
    icon: Package,
    title: "نظام تتبع الشحنات والسائقين",
    desc: "موقع السائقين في الوقت الفعلي، تحديثات تلقائية للعملاء، وتقارير الأداء اليومية.",
  },
  {
    icon: Globe,
    title: "موقع عالي التحويل",
    desc: "موقع مبني لتحويل الزوار لعملاء — صفحات هبوط، نماذج ذكية، وتتبع كامل.",
  },
  {
    icon: Users,
    title: "نظام إدارة الفريق الداخلي",
    desc: "جدولة المهام، تتبع الإنجاز، والتواصل الداخلي — كل شيء في أداة واحدة مخصصة لك.",
  },
];

function Card({ icon: Icon, title, desc, tag }: { icon: React.ElementType; title: string; desc: string; tag?: string | null }) {
  return (
    <div
      className="card-hover p-6 rounded-[1.5rem] flex flex-col gap-4 relative"
      style={{ background: "#0A1628", border: "1px solid rgba(0,163,255,0.12)" }}
    >
      {tag && (
        <div className="absolute -top-3 right-6 px-3 py-1 rounded-full text-xs font-bold" style={{ background: "#00A3FF", color: "#020B19" }}>
          {tag}
        </div>
      )}
      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,163,255,0.1)", border: "1px solid rgba(0,163,255,0.2)" }}>
        <Icon size={22} color="#00A3FF" />
      </div>
      <div>
        <h3 className="font-bold text-base mb-2">{title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: "rgba(240,244,255,0.6)" }}>{desc}</p>
      </div>
    </div>
  );
}

export default function PricingPage() {
  useEffect(() => {
    const load = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(".pricing-hero", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out", delay: 0.3 });
      gsap.fromTo(".p-card", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ".cards-grid", start: "top 80%" } });
    };
    load();
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-16 px-6 text-center relative overflow-hidden" style={{ background: "linear-gradient(180deg, #020B19 0%, #001830 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(ellipse at center, rgba(0,163,255,0.08) 0%, transparent 60%)" }} />
        <p className="pricing-hero text-sm mb-4 relative z-10" style={{ color: "#00A3FF", fontFamily: "IBM Plex Mono", opacity: 0 }}>ماذا نبني</p>
        <h1 className="pricing-hero text-4xl md:text-5xl font-bold mb-4 relative z-10 leading-tight" style={{ opacity: 0 }}>
          اختر ما يناسب{" "}
          <span style={{ color: "#00A3FF" }} className="text-glow">شركتك</span>
        </h1>
        <p className="pricing-hero text-base max-w-xl mx-auto relative z-10" style={{ color: "rgba(240,244,255,0.55)", opacity: 0 }}>
          كل شركة تحتاج شيئاً مختلفاً — اختر الأنظمة التي تحل مشاكلك الفعلية، ونبنيها لك.
        </p>
      </section>

      {/* AI Agents */}
      <section className="py-20 px-6" style={{ background: "#020B19" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-sm mb-3" style={{ color: "#00A3FF", fontFamily: "IBM Plex Mono" }}>وكلاء الذكاء الاصطناعي</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">أنظمة تعمل بدلاً عنك</h2>
            <p className="text-base max-w-2xl" style={{ color: "rgba(240,244,255,0.55)" }}>
              وكلاء مستقلون يعملون ٢٤/٧ — يردون، يتابعون، يحللون، ويرسلون التقارير تلقائياً.
            </p>
          </div>
          <div className="cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {agents.map((a, i) => (
              <div key={i} className="p-card" style={{ opacity: 0 }}>
                <Card icon={a.icon} title={a.title} desc={a.desc} tag={a.tag} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(0,163,255,0.2), transparent)" }} />

      {/* Apps */}
      <section className="py-20 px-6" style={{ background: "#020B19" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-sm mb-3" style={{ color: "#00A3FF", fontFamily: "IBM Plex Mono" }}>التطبيقات والأنظمة</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">أدوات مبنية لطريقة عملك</h2>
            <p className="text-base max-w-2xl" style={{ color: "rgba(240,244,255,0.55)" }}>
              لا حلول جاهزة — نبني تطبيقات مخصصة تعكس عملياتك الفعلية بالضبط.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {apps.map((a, i) => (
              <div key={i} className="p-card" style={{ opacity: 0 }}>
                <Card icon={a.icon} title={a.title} desc={a.desc} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom note */}
      <section className="py-16 px-6" style={{ background: "#0A1628" }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-8 rounded-[2rem]" style={{ background: "#020B19", border: "1px solid rgba(0,163,255,0.15)" }}>
            <CheckCircle size={32} color="#00A3FF" className="mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3">لا تعرف من أين تبدأ؟</h3>
            <p className="text-sm mb-6 leading-relaxed" style={{ color: "rgba(240,244,255,0.6)" }}>
              تحدث مع مساعدنا — نفهم وضع شركتك ونقترح لك الأنظمة التي ستحدث أكبر أثر.
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
