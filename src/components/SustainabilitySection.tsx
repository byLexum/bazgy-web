"use client";

import Image from "next/image";
import Reveal from "./Reveal";
import { useLanguage } from "@/i18n/LanguageContext";

export default function SustainabilitySection() {
  const { t } = useLanguage();
  const c = t.sustainability;
  return (
    <section
      id="surdurulebilirlik"
      className="relative overflow-hidden px-6 py-24 md:px-12 md:py-[140px]"
    >
      <Image
        src="/images/karlitepe-sustainability.png"
        alt=""
        fill
        quality={100}
        sizes="100vw"
        className="photo-bw object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 to-black/70" />
      <div className="relative mx-auto max-w-[1280px]">
        <Reveal>
          <h2 className="mb-12 max-w-[640px] font-sans text-[32px] font-extrabold leading-[1.08] text-[#F5F4F0] md:mb-16 md:text-[48px]">
            {c.heading}
          </h2>
        </Reveal>
        <Reveal
          delay={0.1}
          className="grid max-w-[900px] grid-cols-1 gap-8 sm:grid-cols-3 md:gap-10"
        >
          {c.items.map((item) => (
            <div key={item.title} className="border-t border-white/30 pt-5">
              <div className="mb-2.5 font-sans text-[17px] font-bold text-[#F5F4F0]">
                {item.title}
              </div>
              <div className="font-sans text-sm leading-relaxed text-white/70">
                {item.desc}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
