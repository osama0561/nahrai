"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "الرئيسية" },
  { href: "/services", label: "خدماتنا" },
  { href: "/pricing", label: "الباقات" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "تواصل معنا" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-5xl transition-all duration-500 rounded-[2rem] px-6 py-3 flex items-center justify-between ${
        scrolled ? "navbar-glass" : "bg-transparent"
      }`}
      style={{ border: scrolled ? "1px solid rgba(0,163,255,0.15)" : "1px solid transparent" }}
    >
      {/* Logo right (RTL = visual left) */}
      <Link href="/" className="flex items-center gap-2 select-none">
        <span
          className="text-xl font-bold"
          style={{
            fontFamily: "'IBM Plex Sans Arabic', sans-serif",
            color: "#00A3FF",
            letterSpacing: "-0.5px",
          }}
        >
          نهر
        </span>
        <span
          className="font-mono text-sm px-2 py-0.5 rounded-lg"
          style={{ background: "rgba(0,163,255,0.15)", color: "#00A3FF", fontFamily: "IBM Plex Mono" }}
        >
          AI
        </span>
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-6">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="text-sm font-medium transition-colors duration-200 hover:text-[#00A3FF]"
            style={{ color: "rgba(240,244,255,0.75)" }}
          >
            {l.label}
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="hidden md:flex">
        <Link href="/contact" className="btn-primary text-sm py-2.5 px-5">
          <span>احجز استشارة</span>
        </Link>
      </div>

      {/* Mobile menu toggle */}
      <button
        className="md:hidden text-[#F0F4FF] p-2"
        onClick={() => setOpen(!open)}
        aria-label="toggle menu"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile menu */}
      {open && (
        <div
          className="absolute top-full right-0 mt-3 w-full rounded-[1.5rem] py-4 px-6 flex flex-col gap-4 md:hidden"
          style={{ background: "rgba(10,22,40,0.97)", border: "1px solid rgba(0,163,255,0.2)" }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-base font-medium text-[#F0F4FF] hover:text-[#00A3FF] transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary text-sm justify-center mt-2" onClick={() => setOpen(false)}>
            <span>احجز استشارة</span>
          </Link>
        </div>
      )}
    </nav>
  );
}
