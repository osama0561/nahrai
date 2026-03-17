import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="relative mt-0"
      style={{
        background: "#020B19",
        borderTop: "1px solid rgba(0,163,255,0.1)",
        borderRadius: "3rem 3rem 0 0",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold" style={{ color: "#00A3FF", fontFamily: "'IBM Plex Sans Arabic'" }}>نهر</span>
              <span className="font-mono text-sm px-2 py-0.5 rounded-lg" style={{ background: "rgba(0,163,255,0.15)", color: "#00A3FF" }}>AI</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(240,244,255,0.55)" }}>
              البنية التحتية التي تعمل عليها شركتك.
              <br />
              وكالة أتمتة بعقود سنوية.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm" style={{ color: "#00A3FF" }}>روابط سريعة</h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: "الرئيسية" },
                { href: "/services", label: "خدماتنا" },
                { href: "/pricing", label: "الباقات" },
                { href: "/about", label: "من نحن" },
                { href: "/contact", label: "تواصل معنا" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm transition-colors hover:text-[#00A3FF]" style={{ color: "rgba(240,244,255,0.55)" }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-sm" style={{ color: "#00A3FF" }}>تواصل معنا</h4>
            <div className="space-y-2 text-sm" style={{ color: "rgba(240,244,255,0.55)" }}>
              <p>المملكة العربية السعودية</p>
              <p>متخصصون في قطاع اللوجستيات و B2B</p>
            </div>
            <Link href="/contact" className="btn-primary text-sm py-2.5 px-5 mt-6 inline-flex">
              <span>ابدأ الآن</span>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(0,163,255,0.1)" }}
        >
          <p className="text-xs" style={{ color: "rgba(240,244,255,0.35)" }}>
            © {new Date().getFullYear()} نهر AI — جميع الحقوق محفوظة
          </p>
          <div className="flex items-center gap-2">
            <span className="pulse-dot"></span>
            <span className="font-mono text-xs" style={{ color: "rgba(240,244,255,0.45)", fontFamily: "IBM Plex Mono" }}>
              الأنظمة تعمل
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
