"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { Target, Eye, Award, Shield, Building2, ArrowLeft } from "lucide-react";

const values = [
  { icon: Eye, title: "شفافية كاملة", desc: "تقارير واضحة، مؤشرات قابلة للقياس، لا مصطلحات مبهمة. تعرف دائماً ما الذي يُبنى وما هي النتيجة." },
  { icon: Award, title: "جودة قياسية", desc: "كل نظام نسلّمه يجتاز معايير جودة صارمة. لا نشر جزئي، لا وعود بدون تنفيذ." },
  { icon: Target, title: "نتائج مثبتة", desc: "قياس ROI حقيقي لكل نظام. إذا لم يحقق النظام النتائج المتفق عليها، نعيد بناءه." },
  { icon: Shield, title: "شراكة طويلة الأمد", desc: "لسنا مورداً — نحن جزء من فريقك التشغيلي. نجاحك هو نجاحنا بالمعنى الحرفي." },
];

const teamMembers = [
  { name: "مدير المشاريع", role: "قيادة التنفيذ والتواصل مع العملاء", initials: "م" },
  { name: "مهندس الذكاء الاصطناعي", role: "بناء وكلاء الذكاء الاصطناعي وأنظمة الأتمتة", initials: "ذ" },
  { name: "مطور التطبيقات", role: "بناء التطبيقات الداخلية وواجهات المستخدم", initials: "ت" },
  { name: "مستشار النمو", role: "استراتيجية التسويق وبنية النمو الرقمي", initials: "ن" },
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
                <span style={{ color: "#00A3FF" }} className="text-glow">نحن شريك تشغيلي</span>
              </h1>
              <p className="about-hero text-base leading-relaxed" style={{ color: "rgba(240,244,255,0.65)", opacity: 0 }}>
                نهر AI ليست وكالة تبيع مشاريع تنتهي. نحن نبني البنية التشغيلية الرقمية لشركتك — ثم نديرها معك على المدى الطويل.
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
              رأينا عشرات الشركات السعودية في قطاعات B2B المختلفة تعاني من نفس المشكلة: تملك عمليات ضخمة، فرقاً متمرسة، وعملاء محترمين — لكنها تعمل بأدوات متفرقة وعمليات يدوية تستنزف طاقتها وتبطّئ نموها.
            </p>
            <p>
              الحل الموجود في السوق كان إما أدوات جاهزة لا تناسب طبيعة العمل السعودي، أو مشاريع تقنية باهظة تنتهي دون نتائج ملموسة. لم يكن هناك من يبني ويدير ويحسّن باستمرار بجانب الشركة.
            </p>
            <p>
              أنشأنا نهر AI لملء هذا الفراغ. نموذجنا بسيط: عقد سنوي يشمل البناء والنشر والإدارة والتحسين المستمر — لأي شركة B2B تريد أن تتحرك أسرع، تخسر أقل، وتنمو بشكل مستدام.
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
              <p className="text-sm mb-3" style={{ color: "#00A3FF", fontFamily: "IBM Plex Mono" }}>لماذا B2B</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">العمليات المعقدة = أكبر فرصة</h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "rgba(240,244,255,0.7)" }}>
                <p>
                  شركات B2B تملك أعمق العمليات وأكثرها تكراراً — وهذا بالضبط ما يجعل الأتمتة هنا ذات ROI ضخم وقابل للقياس بوضوح.
                </p>
                <p>
                  سواء كانت شركة لوجستيات، مطوراً عقارياً، موزعاً، أو مكتب استشارات — كل شركة B2B تملك عشرات العمليات اليدوية التي يمكن أتمتتها اليوم.
                </p>
                <p>
                  نموذجنا يعمل عبر القطاعات لأننا نبني حول طبيعة عمل شركتك تحديداً — لا حلولاً جاهزة تناسب الجميع ولا تناسب أحداً.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { label: "المهام اليدوية المتكررة", val: "تُلغى بالكامل" },
                { label: "سرعة الرد على العملاء", val: "فوري ٢٤/٧" },
                { label: "التقارير والمتابعة", val: "تلقائية بدون جهد" },
                { label: "تكاليف التشغيل", val: "تنخفض بشكل قابل للقياس" },
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
            <p className="text-base" style={{ color: "rgba(240,244,255,0.55)" }}>متخصصون في الذكاء الاصطناعي، الأتمتة، والنمو الرقمي للسوق السعودي</p>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">هل شركتك جاهزة للتحول؟</h2>
          <p className="text-base mb-10" style={{ color: "rgba(240,244,255,0.55)" }}>استشارة مجانية — نفهم عملياتك ونريك ما يمكن تحويله.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-primary text-base py-4 px-8">
              <span>احجز استشارة مجانية</span>
            </Link>
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
