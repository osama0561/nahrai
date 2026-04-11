"use client";
import { useEffect, useState, useRef } from "react";
import { X, Send, ChevronDown, Search } from "lucide-react";

const countryCodes = [
  { code: "+966", flag: "🇸🇦", name: "السعودية", nameEn: "Saudi Arabia", digits: 9 },
  { code: "+971", flag: "🇦🇪", name: "الإمارات", nameEn: "UAE", digits: 9 },
  { code: "+973", flag: "🇧🇭", name: "البحرين", nameEn: "Bahrain", digits: 8 },
  { code: "+968", flag: "🇴🇲", name: "عُمان", nameEn: "Oman", digits: 8 },
  { code: "+965", flag: "🇰🇼", name: "الكويت", nameEn: "Kuwait", digits: 8 },
  { code: "+974", flag: "🇶🇦", name: "قطر", nameEn: "Qatar", digits: 8 },
  { code: "+20", flag: "🇪🇬", name: "مصر", nameEn: "Egypt", digits: 10 },
  { code: "+962", flag: "🇯🇴", name: "الأردن", nameEn: "Jordan", digits: 9 },
  { code: "+961", flag: "🇱🇧", name: "لبنان", nameEn: "Lebanon", digits: 8 },
  { code: "+964", flag: "🇮🇶", name: "العراق", nameEn: "Iraq", digits: 10 },
  { code: "+212", flag: "🇲🇦", name: "المغرب", nameEn: "Morocco", digits: 9 },
  { code: "+216", flag: "🇹🇳", name: "تونس", nameEn: "Tunisia", digits: 8 },
  { code: "+213", flag: "🇩🇿", name: "الجزائر", nameEn: "Algeria", digits: 9 },
  { code: "+90", flag: "🇹🇷", name: "تركيا", nameEn: "Turkey", digits: 10 },
  { code: "+44", flag: "🇬🇧", name: "بريطانيا", nameEn: "United Kingdom", digits: 10 },
  { code: "+1", flag: "🇺🇸", name: "أمريكا", nameEn: "United States", digits: 10 },
  { code: "+91", flag: "🇮🇳", name: "الهند", nameEn: "India", digits: 10 },
  { code: "+92", flag: "🇵🇰", name: "باكستان", nameEn: "Pakistan", digits: 10 },
];

const revenueOptions = [
  "أقل من ٥٠٠,٠٠٠ ريال",
  "٥٠٠,٠٠٠ — ١ مليون ريال",
  "١ — ٣ مليون ريال",
  "٣ — ١٠ مليون ريال",
  "أكثر من ١٠ مليون ريال",
];

const budgetOptions = [
  "نعم، مناسب",
  "لا، غير مناسب",
];

export default function ConsultationForm() {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+966");
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [website, setWebsite] = useState("");
  const [revenue, setRevenue] = useState("");
  const [challenge, setChallenge] = useState("");
  const [budget, setBudget] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const countryRef = useRef<HTMLDivElement>(null);

  // Listen for open event from any button on the site
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-consultation", handler);
    // Also listen to old event name for backwards compat
    window.addEventListener("open-chat", handler);
    return () => {
      window.removeEventListener("open-consultation", handler);
      window.removeEventListener("open-chat", handler);
    };
  }, []);

  // Close country dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) {
        setCountryDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const resetForm = () => {
    setFirstName(""); setLastName(""); setEmail(""); setPhone("");
    setCountryCode("+966"); setWebsite(""); setRevenue(""); setChallenge(""); setBudget("");
    setSubmitted(false); setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    if (!firstName || !lastName || !email || !phone || !website || !revenue || !challenge || !budget) {
      setError("يرجى تعبئة جميع الحقول");
      return;
    }

    const selectedCountry = countryCodes.find(c => c.code === countryCode);
    if (selectedCountry && phone.length !== selectedCountry.digits) {
      setError(`رقم الهاتف يجب أن يكون ${selectedCountry.digits} أرقام`);
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      await fetch("/api/pricing-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`,
          company: website,
          email,
          whatsapp: `${countryCode}${phone}`,
          tier: "استشارة",
          description: `الإيرادات: ${revenue} | التحديات: ${challenge} | الميزانية: ${budget}`,
        }),
      });
      setSubmitted(true);
    } catch {
      setError("حدث خطأ، حاول مرة أخرى");
    }
    setSubmitting(false);
  };

  if (!open) return null;

  const selectedCountry = countryCodes.find(c => c.code === countryCode);
  const maxDigits = selectedCountry?.digits || 10;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(2,11,25,0.85)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) { setOpen(false); resetForm(); } }}
    >
      <div
        className="w-full max-w-lg rounded-[2rem] p-8 relative max-h-[90vh] overflow-y-auto"
        style={{ background: "#0A1628", border: "1px solid rgba(0,163,255,0.25)", boxShadow: "0 0 60px rgba(0,163,255,0.1)" }}
      >
        {/* Close */}
        <button
          onClick={() => { setOpen(false); resetForm(); }}
          className="absolute top-5 left-5 p-1 rounded-lg transition-colors hover:bg-[rgba(255,255,255,0.05)] cursor-pointer"
          style={{ color: "rgba(240,244,255,0.4)" }}
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <>
            <div className="mb-6">
              <p className="text-xs mb-2" style={{ color: "#00A3FF", fontFamily: "IBM Plex Mono" }}>احجز استشارة</p>
              <h3 className="text-xl font-bold mb-1">نكتشف إذا نقدر نساعدك</h3>
              <p className="text-sm" style={{ color: "rgba(240,244,255,0.45)" }}>عبّي البيانات وراح نتواصل معك خلال ٢٤ ساعة</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Name row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium mb-1.5 block" style={{ color: "rgba(240,244,255,0.6)" }}>الاسم الأول</label>
                  <input
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: "#020B19", border: "1px solid rgba(0,163,255,0.15)", color: "#F0F4FF" }}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium mb-1.5 block" style={{ color: "rgba(240,244,255,0.6)" }}>الاسم الأخير</label>
                  <input
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: "#020B19", border: "1px solid rgba(0,163,255,0.15)", color: "#F0F4FF" }}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-xs font-medium mb-1.5 block" style={{ color: "rgba(240,244,255,0.6)" }}>الإيميل</label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: "#020B19", border: "1px solid rgba(0,163,255,0.15)", color: "#F0F4FF" }}
                  dir="ltr"
                  placeholder="email@company.com"
                />
              </div>

              {/* Website */}
              <div>
                <label className="text-xs font-medium mb-1.5 block" style={{ color: "rgba(240,244,255,0.6)" }}>موقع الشركة</label>
                <input
                  required
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: "#020B19", border: "1px solid rgba(0,163,255,0.15)", color: "#F0F4FF" }}
                  dir="ltr"
                  placeholder="https://example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-xs font-medium mb-1.5 block" style={{ color: "rgba(240,244,255,0.6)" }}>رقم الواتساب</label>
                <div className="flex gap-2" dir="ltr">
                  <div className="relative" ref={countryRef}>
                    <button
                      type="button"
                      onClick={() => { setCountryDropdownOpen(!countryDropdownOpen); setCountrySearch(""); }}
                      className="flex items-center gap-1.5 px-3 py-3 rounded-xl text-sm cursor-pointer whitespace-nowrap"
                      style={{ background: "#020B19", border: "1px solid rgba(0,163,255,0.15)", color: "#F0F4FF", minWidth: "100px" }}
                    >
                      <span>{selectedCountry?.flag}</span>
                      <span>{countryCode}</span>
                      <ChevronDown size={14} style={{ color: "rgba(240,244,255,0.4)" }} />
                    </button>

                    {countryDropdownOpen && (
                      <div
                        className="absolute top-full left-0 mt-1 rounded-xl overflow-hidden z-50"
                        style={{ background: "#0A1628", border: "1px solid rgba(0,163,255,0.25)", boxShadow: "0 8px 30px rgba(0,0,0,0.4)", width: "280px", maxHeight: "250px" }}
                      >
                        <div className="p-2" style={{ borderBottom: "1px solid rgba(0,163,255,0.1)" }}>
                          <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: "#020B19", border: "1px solid rgba(0,163,255,0.15)" }}>
                            <Search size={14} style={{ color: "rgba(240,244,255,0.3)" }} />
                            <input
                              autoFocus
                              value={countrySearch}
                              onChange={(e) => setCountrySearch(e.target.value)}
                              placeholder="Search..."
                              className="bg-transparent outline-none text-sm flex-1"
                              style={{ color: "#F0F4FF" }}
                            />
                          </div>
                        </div>
                        <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                          {countryCodes
                            .filter(c =>
                              c.name.includes(countrySearch) ||
                              c.nameEn.toLowerCase().includes(countrySearch.toLowerCase()) ||
                              c.code.includes(countrySearch)
                            )
                            .map((c) => (
                              <button
                                key={c.code}
                                type="button"
                                onClick={() => { setCountryCode(c.code); setCountryDropdownOpen(false); setPhone(""); }}
                                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm cursor-pointer transition-colors hover:bg-[rgba(0,163,255,0.08)]"
                                style={{ color: "#F0F4FF" }}
                              >
                                <span className="text-base">{c.flag}</span>
                                <span className="flex-1 text-right" dir="rtl">{c.name}</span>
                                <span style={{ color: "rgba(240,244,255,0.4)", fontFamily: "IBM Plex Mono", fontSize: "12px" }}>{c.code}</span>
                              </button>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <input
                    required
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    minLength={maxDigits}
                    maxLength={maxDigits}
                    value={phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "").slice(0, maxDigits);
                      setPhone(val);
                    }}
                    className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: "#020B19", border: "1px solid rgba(0,163,255,0.15)", color: "#F0F4FF" }}
                    placeholder={`${"X".repeat(maxDigits)} (${maxDigits} أرقام)`}
                  />
                </div>
              </div>

              {/* Revenue */}
              <div>
                <label className="text-xs font-medium mb-1.5 block" style={{ color: "rgba(240,244,255,0.6)" }}>كم إيرادات شركتك السنوية؟</label>
                <div className="relative">
                  <select
                    required
                    value={revenue}
                    onChange={(e) => setRevenue(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none appearance-none cursor-pointer"
                    style={{ background: "#020B19", border: "1px solid rgba(0,163,255,0.15)", color: revenue ? "#F0F4FF" : "rgba(240,244,255,0.35)" }}
                  >
                    <option value="" disabled>اختر</option>
                    {revenueOptions.map((opt) => (
                      <option key={opt} value={opt} style={{ background: "#0A1628", color: "#F0F4FF" }}>{opt}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "rgba(240,244,255,0.4)" }} />
                </div>
              </div>

              {/* Challenge */}
              <div>
                <label className="text-xs font-medium mb-1.5 block" style={{ color: "rgba(240,244,255,0.6)" }}>ما التحديات التي تواجهها أو ما الذي تأمل أن نساعدك في حلّه؟</label>
                <textarea
                  required
                  value={challenge}
                  onChange={(e) => setChallenge(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                  style={{ background: "#020B19", border: "1px solid rgba(0,163,255,0.15)", color: "#F0F4FF" }}
                  placeholder="مثال: نبي نأتمت عمليات المبيعات، أو نقلل الشغل اليدوي..."
                />
              </div>

              {/* Budget */}
              <div>
                <label className="text-xs font-medium mb-1.5 block" style={{ color: "rgba(240,244,255,0.6)" }}>ميزانيتنا تبدأ من ٢٠,٠٠٠ ريال وأعلى. هل هذا مناسب لك؟</label>
                <div className="relative">
                  <select
                    required
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none appearance-none cursor-pointer"
                    style={{ background: "#020B19", border: "1px solid rgba(0,163,255,0.15)", color: budget ? "#F0F4FF" : "rgba(240,244,255,0.35)" }}
                  >
                    <option value="" disabled>اختر</option>
                    {budgetOptions.map((opt) => (
                      <option key={opt} value={opt} style={{ background: "#0A1628", color: "#F0F4FF" }}>{opt}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "rgba(240,244,255,0.4)" }} />
                </div>
              </div>

              {/* Error */}
              {error && (
                <p className="text-sm text-center px-3 py-2 rounded-xl" style={{ background: "rgba(255,60,60,0.1)", border: "1px solid rgba(255,60,60,0.3)", color: "#ff6b6b" }}>
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
                style={{ opacity: submitting ? 0.6 : 1 }}
              >
                <Send size={16} style={{ transform: "rotate(180deg)" }} />
                <span>{submitting ? "جاري الإرسال..." : "احجز الاستشارة"}</span>
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(0,163,255,0.12)", border: "1px solid rgba(0,163,255,0.3)" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00A3FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <h3 className="text-xl font-bold mb-2">تم استلام طلبك</h3>
            <p className="text-sm mb-6" style={{ color: "rgba(240,244,255,0.55)" }}>نتواصل معك خلال ٢٤ ساعة عبر واتساب.</p>
            <button onClick={() => { setOpen(false); resetForm(); }} className="btn-primary inline-flex px-8 py-3 cursor-pointer">
              <span>تمام</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
