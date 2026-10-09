"use client";

import Reveal from "./Reveal";
import { useLanguage } from "@/i18n/LanguageContext";

export default function GeographySection() {
  const { t } = useLanguage();
  const c = t.geography;
  return (
    <section className="bg-black px-6 py-20 md:px-12 md:py-[120px]">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <h2 className="mb-12 max-w-[720px] font-sans text-[32px] font-extrabold leading-[1.08] text-[#F5F4F0] md:mb-16 md:text-[48px]">
            {c.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="border-t border-white/20">
          {c.regions.map((region) => (
            <div
              key={region.name}
              className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-b border-white/20 py-6 md:grid-cols-[1.2fr_1fr_auto] md:py-8"
            >
              <div className="font-sans text-[28px] font-bold tracking-[-0.02em] text-[#F5F4F0] md:text-[40px]">
                {region.name}
              </div>
              <div className="order-3 col-span-2 font-sans text-[15px] text-white/60 md:order-none md:col-span-1">
                {region.focus}
              </div>
              <div className="font-sans text-[15px] font-semibold tabular-nums text-white">
                {region.count}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
