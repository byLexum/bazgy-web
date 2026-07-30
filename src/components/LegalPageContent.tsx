"use client";

import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";
import Reveal from "./Reveal";
import { useLanguage } from "@/i18n/LanguageContext";

export type LegalDocKey = "kvkk" | "cerez" | "gizlilik";

export default function LegalPageContent({ doc }: { doc: LegalDocKey }) {
  const { t } = useLanguage();
  const c = t.legalPages;
  const d = c[doc];

  return (
    <div className="bg-[#F5F5F5] text-[#111111]">
      <Header />
      <section className="mx-auto max-w-[1280px] px-6 pb-16 pt-40 md:px-12 md:pb-20 md:pt-48">
        <Reveal>
          <div className="mb-5 font-mono text-xs font-semibold tracking-[0.12em] text-neutral-500">
            {c.eyebrow}
          </div>
          <h1 className="mb-6 max-w-[760px] font-sans text-3xl font-extrabold leading-[1.15] text-[#111111] md:text-[44px]">
            {d.title}
          </h1>
          <p className="max-w-[720px] font-sans text-base leading-relaxed text-[#555555] md:text-[17px]">
            {d.intro}
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 pb-20 md:px-12 md:pb-28">
        <div className="max-w-[760px]">
          {d.sections.map((s, i) => (
            <Reveal
              key={s.heading}
              delay={Math.min(i, 4) * 0.06}
              className="border-t border-[#111111]/10 py-8 md:py-10"
            >
              <h2 className="mb-4 font-sans text-lg font-bold text-[#111111] md:text-xl">
                {s.heading}
              </h2>
              {s.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mb-4 font-sans text-[15px] leading-relaxed text-[#555555] last:mb-0 md:text-base"
                >
                  {paragraph}
                </p>
              ))}
              {s.list.length > 0 && (
                <ul className="mt-4 flex flex-col gap-2.5">
                  {s.list.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 font-sans text-[15px] leading-relaxed text-[#555555] md:text-base"
                    >
                      <span aria-hidden className="text-neutral-400">
                        —
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}

          <Reveal className="border-t border-[#111111]/10 pt-8 md:pt-10">
            <p className="mb-6 font-sans text-[15px] leading-relaxed text-[#555555] md:text-base">
              {c.contactNote}
            </p>
            <Link
              href="/"
              className="w-fit border-b border-[#111111] font-sans text-sm font-semibold text-[#111111]"
            >
              {c.backLink}
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
