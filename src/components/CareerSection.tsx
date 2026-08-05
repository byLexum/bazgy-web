"use client";

import Image from "next/image";
import CtaButton from "./CtaButton";
import Reveal from "./Reveal";
import { useLanguage } from "@/i18n/LanguageContext";

export default function CareerSection() {
  const { t } = useLanguage();
  const c = t.career;
  return (
    <section id="kariyer" className="grid grid-cols-1 md:grid-cols-2">
      <div className="relative h-64 overflow-hidden md:h-[440px]">
        <Image
          src="/images/team/baz-ekip.jpg"
          alt={c.photoLabel}
          fill
          quality={100}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="photo-bw object-cover object-top"
        />
      </div>
      <div className="flex flex-col justify-center bg-[#F5F5F5] px-6 py-16 md:px-16">
        <Reveal>
          <h2 className="mb-4.5 max-w-[420px] font-sans text-[28px] font-extrabold leading-tight text-[#111111] md:text-[32px]">
            {c.heading}
          </h2>
          <p className="mb-7 max-w-[400px] font-sans text-[15px] leading-relaxed text-[#555555]">
            {c.copy}
          </p>
          <CtaButton href="/career" variant="dark" className="w-fit">
            {c.cta}
          </CtaButton>
        </Reveal>
      </div>
    </section>
  );
}
