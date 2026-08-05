"use client";

import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const c = t.footer;
  const services = t.services.items;
  return (
    <footer className="relative overflow-hidden px-6 pb-8 pt-16 md:px-12 md:pt-20">
      <Image
        src="/images/karlitepe-project.png"
        alt=""
        fill
        quality={100}
        sizes="100vw"
        className="object-cover"
        style={{ filter: "grayscale(1) brightness(.4)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/90 to-black/97" />
      <div className="relative mx-auto max-w-[1280px]">
        <div className="mb-14 grid grid-cols-1 gap-10 sm:grid-cols-2 md:mb-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-12">
          <div>
            <Image
              src="/images/baz-logo.svg"
              alt="BAZ"
              height={36}
              width={151}
              className="mb-5 block h-9 w-auto"
            />
            <div className="max-w-[280px] font-sans text-sm leading-relaxed text-white/55">
              {c.tagline}
            </div>
          </div>
          <div>
            <div className="mb-4 font-mono text-[11px] font-semibold tracking-[0.1em] text-white/40">
              {c.kurumsalLabel}
            </div>
            <div className="flex flex-col gap-3 font-sans text-sm text-white/75">
              <a href="#kurumsal">{c.links.hakkimizda}</a>
              <a href="#surdurulebilirlik">{c.links.surdurulebilirlik}</a>
              <a href="/career">{c.links.kariyer}</a>
              <a href="/contact">{c.links.iletisim}</a>
            </div>
          </div>
          <div>
            <div className="mb-4 font-mono text-[11px] font-semibold tracking-[0.1em] text-white/40">
              {c.faaliyetLabel}
            </div>
            <div className="flex flex-col gap-3 font-sans text-sm text-white/75">
              {services.map((svc) => (
                <a key={svc.name} href="#hizmetler">
                  {svc.name}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-4 font-mono text-[11px] font-semibold tracking-[0.1em] text-white/40">
              {c.iletisimLabel}
            </div>
            <div className="flex flex-col gap-3 font-sans text-sm text-white/75">
              <span>{c.addressPlaceholder}</span>
              <span>{c.phonePlaceholder}</span>
              <a href="mailto:info@bazgy.com">info@bazgy.com</a>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-7">
          <div className="font-sans text-xs text-white/40">
            {c.copyright}
          </div>
          <div className="flex flex-wrap items-center gap-6 font-sans text-xs text-white/40">
            <a href="/kvkk" className="hover:text-white/70">
              {c.legal.kvkk}
            </a>
            <a href="/cerez-politikasi" className="hover:text-white/70">
              {c.legal.cerez}
            </a>
            <a href="/gizlilik-politikasi" className="hover:text-white/70">
              {c.legal.gizlilik}
            </a>
            <a
              href="https://www.zt1projects.com/tr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/55 hover:text-white"
            >
              {c.credit}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
