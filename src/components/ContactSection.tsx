"use client";

import CtaButton from "./CtaButton";
import Reveal from "./Reveal";
import { useLanguage } from "@/i18n/LanguageContext";

export default function ContactSection() {
  const { t } = useLanguage();
  const c = t.contact;
  return (
    <section
      id="iletisim"
      className="bg-black px-6 py-24 text-center md:px-12 md:py-[140px]"
    >
      <Reveal className="flex flex-col items-center">
        <h2 className="mx-auto mb-6 max-w-[700px] font-sans text-3xl font-extrabold leading-tight text-[#F5F4F0] md:text-[40px]">
          {c.heading}
        </h2>
        <CtaButton href="/contact" variant="light">
          {c.cta}
        </CtaButton>
      </Reveal>
    </section>
  );
}
