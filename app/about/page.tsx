"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { Target, Eye, Award, Shield, Building2, ArrowLeft } from "lucide-react";

const values = [
  { icon: Eye, title: "شفافية مؤسسية كاملة", desc: "تقارير تكامل واضحة، مؤشرات قابلة للقياس، ومستندات تقنية لكل API ومسار بيانات. تعرف بالضبط ما الذي يتدفق بين أنظمتك." },
  { icon: Award, title: "هندسة على مستوى المؤسسات", desc: "كل تكامل يجتاز معايير صارمة: أمان البيانات، استرجاع الأخطاء، التوثيق، والاختبار قبل النشر. لا حلول هشّة، لا مفاجآت في الإنتاج." },
  { icon: Target, title: "ROI مرتبط بأنظمتك", desc: "نقيس قيمة كل تكامل بالأرقام: ساعات يدوية مُلغاة، أخطاء بشرية مُزالة، سرعة تنفيذ مضاعفة. نتائج موثقة لا وعود." },
  { icon: Shield, title: "شراكة طويلة الأمد", desc: "لسنا مورّداً يسلّم مشروعاً وينصرف. نحن جزء من فريقك التقني — نراقب، نُحسّن، ونُوسّع التكاملات مع نمو شركتك." },
];

const teamMembers = [
  { name: "مدير حسابات المؤسسات", role: "قيادة التنفيذ والتواصل مع فِرق العميل التقنية والتشغيلية", initials: "م" },
  { name: "مهندس تكامل الأنظمة", role: "ربط ERP و CRM وبناء طبقات الأتمتة بين الأنظمة المؤسسية", initials: "ت" },
  { name: "مهندس الذكاء الاصطناعي", role: "بناء وكلاء AI يعملون فوق بياناتك وأنظمتك الحالية", initials: "ذ" },
  { name: "مطور التطبيقات الداخلية", role: "بناء بوابات وداشبوردات تنفيذية موحّدة من مصادر متعددة", initials: "ط" },
];

export default function AboutPage() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const load = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(".about-hero", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out", delay: 0.3 });
      gsap.fromTo(".val-card", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: ".values-section", start: "top 80%" } });
      gsap.fromTo(".team-card", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.4)", scrollTrigger: { trigger: ".team-section", start: "top 80%" } });
    };
    load();
  }, []);

  return (
    <div ref={ref}>
      {/* Hero */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #020B19 0%, #001830 100%)" }}>
        <div className="absolute inset-0 opacity-8 pointer-events-none" style={{ backgroundImage: "radial-gradient(ellipse at 30% 50%, #00A3FF 0%, transparent 50%)" }} />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="about-hero text-sm mb-4" style={{ color: "#00A3FF", fontFamily: "IBM Plex Mono", opacity: 0 }}>من نحن</p>
              <h1 className="about-hero text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ opacity: 0 }}>
                لسنا وكالة —{" "}
                <span style={{ color: "#00A3FF" }} className="text-glow">نحن فريق التكامل المؤسسي لشركتك</span>
              </h1>
              <p className="about-hero text-base leading-relaxed" style={{ color: "rgba(240,244,255,0.65)", opacity: 0 }}>
                نهر AI تبني طبقة الأتمتة والتكامل التي تربط ERP و CRM وكل أنظمتك في منظومة واحدة — للشركات السعودية من ١٠ ملايين ريال سنوياً فأعلى. نبني، ندير، ونُحسّن باستمرار.
              </p>
            </div>
            <div className="about-hero" style={{ opacity: 0 }}>
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80"
                alt="Nahr AI office"
                className="w-full h-80 object-cover rounded-[2rem]"
                style={{ filter: "brightness(0.6) saturate(1.4)", border: "1px solid rgba(0,163,255,0.15)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-6" style={{ background: "#0A1628" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm mb-3" style={{ color: "#00A3FF", fontFamily: "IBM Plex Mono" }}>قصتنا</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">كيف رأينا المشكلة</h2>
          </div>
          <div className="space-y-6 text-base leading-loose" style={{ color: "rgba(240,244,255,0.7)" }}>
            <p>
              رأينا عشرات الشركات السعودية الكبيرة والمتوسطة تشترك في نفس المعاناة: SAP في وادٍ، Zoho في وادٍ، ملفات Excel في وادٍ ثالث — وفرق كاملة تُدخل البيانات يدوياً بين الأنظمة. شركات تملك أدوات قوية، لكن لا منظومة موحّدة.
            </p>
            <p>
              الحل المتاح في السوق كان إما "إضافة أداة جديدة" تزيد الفوضى، أو مشاريع تكامل كبرى تنتهي بمستندات ولا تعمل في الإنتاج. لم يكن هناك فريق متخصص يبني التكاملات، يديرها، ويُحسّنها مع نمو الشركة.
            </p>
            <p>
              أنشأنا نهر AI لملء هذا الفراغ. نموذجنا: عقد سنوي يشمل ربط أنظمتك المؤسسية، بناء طبقة الأتمتة والذكاء الاصطناعي فوقها، وإدارتها باستمرار — لأي شركة سعودية تريد أن تجعل بياناتها وأدواتها تعمل كمنظومة واحدة بلا لمسة يدوية.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values-section py-20 px-6" style={{ background: "#020B19" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm mb-3" style={{ color: "#00A3FF", fontFamily: "IBM Plex Mono" }}>قيمنا</p>
            <h2 className="text-3xl md:text-4xl font-bold">ما يحكم طريقة عملنا</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <div key={i} className="val-card card-hover p-8 rounded-[1.5rem] flex gap-5" style={{ background: "#0A1628", border: "1px solid rgba(0,163,255,0.12)", opacity: 0 }}>
                <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(0,163,255,0.1)" }}>
                  <v.icon size={22} color="#00A3FF" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">{v.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(240,244,255,0.6)" }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why B2B */}
      <section className="py-20 px-6" style={{ background: "linear-gradient(135deg, #001830 0%, #003060 50%, #001830 100%)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 electric-glow" style={{ background: "rgba(0,163,255,0.15)" }}>
                <Building2 size={30} color="#00A3FF" />
              </div>
              <p className="text-sm mb-3" style={{ color: "#00A3FF", fontFamily: "IBM Plex Mono" }}>لماذا المؤسسات</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">الأنظمة المتعددة = أكبر فرصة تكامل</h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "rgba(240,244,255,0.7)" }}>
                <p>
                  الشركات المؤسسية تملك أعمق الأنظمة وأكثرها قيمة — ERP، CRM، أنظمة محاسبة، منصات لوجستية. لكن قوة هذه الأنظمة لا تتحقق إلا حين تتحدث مع بعضها كمنظومة واحدة.
                </p>
                <p>
                  سواء كنت تستخدم SAP، Oracle، Microsoft Dynamics، Zoho، Odoo، NetSuite، أو Sage — نحن نربطها مع أدواتك اليومية ونبني فوقها طبقة ذكاء اصطناعي تجعل البيانات تتدفق تلقائياً بين الأقسام.
                </p>
                <p>
                  نموذجنا يعمل عبر القطاعات لأن مبدأ التكامل واحد: نقرأ بنيتك التقنية الحالية، نحدد نقاط الاحتكاك، ونبني الجسور الذكية بينها — بلا استبدال غير ضروري ولا فوضى انتقالية.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { label: "ربط ERP و CRM والأنظمة المحاسبية", val: "منظومة موحّدة" },
                { label: "الإدخال اليدوي بين الأنظمة", val: "يُلغى بالكامل" },
                { label: "توافق فاتورة و ZATCA", val: "آلي ١٠٠٪" },
                { label: "التقارير التنفيذية الموحّدة", val: "في لوحة واحدة" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-5 rounded-xl" style={{ background: "rgba(2,11,25,0.5)", border: "1px solid rgba(0,163,255,0.15)" }}>
                  <span className="text-sm" style={{ color: "rgba(240,244,255,0.7)" }}>{item.label}</span>
                  <span className="font-bold text-sm" style={{ color: "#00A3FF", fontFamily: "IBM Plex Mono" }}>{item.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="team-section py-20 px-6" style={{ background: "#0A1628" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm mb-3" style={{ color: "#00A3FF", fontFamily: "IBM Plex Mono" }}>الفريق</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">الفريق الذي يبني معك</h2>
            <p className="text-base" style={{ color: "rgba(240,244,255,0.55)" }}>متخصصون في تكامل الأنظمة المؤسسية، أتمتة العمليات، ووكلاء الذكاء الاصطناعي للسوق السعودي</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((m, i) => (
              <div key={i} className="team-card card-hover p-6 rounded-[1.5rem] text-center" style={{ background: "#020B19", border: "1px solid rgba(0,163,255,0.12)", opacity: 0 }}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold" style={{ background: "rgba(0,163,255,0.12)", color: "#00A3FF", fontFamily: "IBM Plex Mono" }}>
                  {m.initials}
                </div>
                <h3 className="font-bold mb-1 text-sm">{m.name}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(240,244,255,0.5)" }}>{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center" style={{ background: "#020B19" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">هل أنظمتك جاهزة للتحدث مع بعضها؟</h2>
          <p className="text-base mb-10" style={{ color: "rgba(240,244,255,0.55)" }}>نحلل بنيتك التقنية الحالية ونرسم لك خارطة التكامل خلال جلسة واحدة.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => window.dispatchEvent(new CustomEvent("open-consultation"))} className="btn-primary text-base py-4 px-8">
              <span>احجز استشارة</span>
            </button>
            <Link href="/services" className="btn-outline text-base py-4 px-8">
              <span>شاهد خدماتنا</span>
              <ArrowLeft size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
