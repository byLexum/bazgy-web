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
          <div className="mb-5 font-mono text-xs font-semibold tracking-[0.12em] text-white/70">
            {c.eyebrow}
          </div>
          <h2 className="mb-12 max-w-[640px] font-sans text-3xl font-extrabold leading-tight text-[#F5F4F0] md:mb-14 md:text-[38px]">
            {c.heading}
          </h2>
        </Reveal>
        <Reveal
          delay={0.1}
          className="grid max-w-[900px] grid-cols-1 gap-8 sm:grid-cols-3 md:gap-10"
        >
          {c.items.map((item) => (
            <div key={item.title}>
              <div className="mb-2.5 font-sans text-base font-bold text-[#F5F4F0]">
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
