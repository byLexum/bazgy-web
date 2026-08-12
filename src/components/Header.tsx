"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import CtaButton from "./CtaButton";

const NAV_KEYS = [
  ["kurumsal", "/hakkimizda"],
  ["hizmetler", "/#hizmetler"],
  ["projeler", "/#projeler"],
  ["surdurulebilirlik", "/#surdurulebilirlik"],
  ["kariyer", "/career"],
] as const;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const dark = scrolled || menuOpen || isHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [language]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "border-b border-white/10 bg-black/95 backdrop-blur-md"
          : isHome
            ? "border-b border-transparent bg-gradient-to-b from-black/55 via-black/15 to-transparent"
            : "border-b border-black/5 bg-transparent"
      }`}
    >
      <div
        className={`flex items-center justify-between px-6 transition-all duration-300 md:px-12 ${
          scrolled || menuOpen ? "py-4" : "py-5 md:py-7"
        }`}
      >
        <div className="flex items-center gap-5 md:gap-7">
          <a href="/" className="block">
            <Image
              src="/images/baz-logo.svg"
              alt="BAZ Yatırım ve İnşaat Anonim Şirketi"
              height={32}
              width={134}
              className={`h-7 w-auto transition-all duration-300 md:h-8 ${dark ? "" : "invert"}`}
              priority
            />
          </a>
          <span
            className={`hidden h-5 w-px sm:block ${dark ? "bg-white/20" : "bg-black/15"}`}
          />
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label="Dil değiştir / Switch language"
            className={`hidden items-center gap-1.5 font-mono text-[13px] font-semibold tracking-wide transition-colors sm:flex ${
              dark ? "text-white/60 hover:text-white" : "text-black/60 hover:text-black"
            }`}
          >
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
            {language.toUpperCase()} ⌄
          </button>
        </div>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-8">
          {NAV_KEYS.map(([key, href]) => (
            <a
              key={key}
              href={href}
              className={`whitespace-nowrap font-sans text-sm font-medium transition-colors duration-300 ${
                dark ? "text-[#F5F4F0]" : "text-[#111111]"
              }`}
            >
              {t.nav[key]}
            </a>
          ))}
          <CtaButton
            href="/contact"
            variant={dark ? "outline" : "outlineDark"}
            size="sm"
            className="whitespace-nowrap"
          >
            {t.nav.iletisimCta}
          </CtaButton>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={menuOpen}
          className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] lg:hidden"
        >
          <motion.span
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
            className={`h-px w-5 transition-colors duration-300 ${dark ? "bg-white" : "bg-[#111111]"}`}
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1 }}
            className={`h-px w-5 transition-colors duration-300 ${dark ? "bg-white" : "bg-[#111111]"}`}
          />
          <motion.span
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
            className={`h-px w-5 transition-colors duration-300 ${dark ? "bg-white" : "bg-[#111111]"}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/10 lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-6 md:px-12">
              {NAV_KEYS.map(([key, href]) => (
                <a
                  key={key}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-white/10 py-3 font-sans text-base font-medium text-[#F5F4F0]"
                >
                  {t.nav[key]}
                </a>
              ))}
              <button
                type="button"
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 py-4 font-mono text-[13px] font-semibold tracking-wide text-white/60"
              >
                {language === "tr" ? "EN" : "TR"} diline geç / switch language
              </button>
              <CtaButton
                href="/contact"
                variant="outline"
                className="mt-2 w-fit"
                onClick={() => setMenuOpen(false)}
              >
                {t.nav.iletisimCta}
              </CtaButton>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
