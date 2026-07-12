"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { navLinks } from "@/data/content";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 transition-all duration-300 md:px-12 ${
        scrolled
          ? "border-b border-white/10 bg-black/90 py-4 backdrop-blur-md"
          : "border-b border-transparent bg-transparent py-7"
      }`}
    >
      <a href="#" className="block">
        <Image
          src="/images/baz-logo.svg"
          alt="BAZ Mühendislik ve Yapı"
          height={22}
          width={92}
          className="h-[22px] w-auto"
          priority
        />
      </a>
      <nav className="hidden items-center gap-9 md:flex">
        {navLinks.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="font-sans text-sm font-medium text-[#F5F4F0]"
          >
            {l.label}
          </a>
        ))}
        <span className="flex items-center gap-1.5 font-mono text-[13px] font-semibold tracking-wide text-white/60">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9s1.3-6.4 3.8-9Z" />
          </svg>
          TR ⌄
        </span>
        <a
          href="#iletisim"
          className="border border-white/40 px-5 py-2.5 font-sans text-[13px] font-semibold text-[#F5F4F0]"
        >
          İletişime Geç
        </a>
      </nav>
    </header>
  );
}
