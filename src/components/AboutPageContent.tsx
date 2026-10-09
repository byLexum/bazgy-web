"use client";

import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Reveal from "./Reveal";
import PageIntro from "./PageIntro";
import CtaButton from "./CtaButton";
import { ArrowRightIcon } from "./icons";
import { useLanguage } from "@/i18n/LanguageContext";

const sectionId = (i: number) => `bolum-${i + 1}`;

// Real site photography breaks up the long read after the values list.
const BREAK_AFTER = 3;

export default function AboutPageContent() {
  const { t } = useLanguage();
  const c = t.aboutPage;
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = c.sections
      .map((_, i) => document.getElementById(sectionId(i)))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(els.indexOf(visible.target as HTMLElement));
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [c.sections]);

  return (
    <div className="bg-[#F5F5F5] text-[#111111]">
      <Header />
      <PageIntro title={c.heading} intro={c.intro}>
        <Reveal
          delay={0.12}
          className="mt-12 grid grid-cols-1 gap-3 md:mt-16 md:grid-cols-[1.7fr_1fr]"
        >
          <div className="relative h-64 overflow-hidden md:h-[480px]">
            <Image
              src="/images/projects/ito-eminonu/saha-1.jpg"
              alt="İTO Merkez Binası şantiyesi, Eminönü"
              fill
              priority
              quality={90}
              sizes="(min-width: 768px) 63vw, 100vw"
              className="photo-bw object-cover"
            />
          </div>
          <div className="relative hidden h-[480px] overflow-hidden md:block">
            <Image
              src="/images/projects/izmir-dikili-aat/saha-1.jpg"
              alt="İzmir Dikili Atıksu Arıtma Tesisi şantiyesi"
              fill
              quality={90}
              sizes="37vw"
              className="photo-bw object-cover"
            />
          </div>
        </Reveal>
      </PageIntro>

      <section className="mx-auto max-w-[1280px] px-6 pb-24 md:px-12 md:pb-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-20">
          <nav aria-label={c.navLabel} className="hidden lg:block">
            <div className="sticky top-32">
              <div className="mb-4 font-sans text-[13px] font-semibold text-neutral-500">{c.navLabel}</div>
              <ul className="border-l border-[#111111]/15">
                {c.sections.map((s, i) => (
                  <li key={s.heading}>
                    <a
                      href={`#${sectionId(i)}`}
                      aria-current={active === i ? "true" : undefined}
                      className={`-ml-px block border-l py-2 pl-4 font-sans text-[14px] leading-snug transition-colors ${
                        active === i
                          ? "border-[#111111] font-semibold text-[#111111]"
                          : "border-transparent text-[#777777] hover:text-[#111111]"
                      }`}
                    >
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="min-w-0">
            {c.sections.map((s, i) => (
              <Fragment key={s.heading}>
                <Reveal>
                  <section
                    id={sectionId(i)}
                    className="scroll-mt-28 border-t border-[#111111]/15 py-10 md:py-14"
                  >
                    <h2 className="mb-6 font-sans text-[26px] font-extrabold leading-[1.15] text-[#111111] md:text-[34px]">
                      {s.heading}
                    </h2>
                    <div className="max-w-[68ch]">
                      {s.body.map((paragraph, pi) => (
                        <p
                          key={paragraph}
                          className={
                            i === 0 && pi === 0
                              ? "mb-6 font-sans text-[19px] font-medium leading-[1.6] text-[#111111] md:text-[21px]"
                              : "mb-4 font-sans text-[15.5px] leading-[1.75] text-[#555555] last:mb-0 md:text-[16.5px]"
                          }
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    {s.list.length > 0 && (
                      <ul className="mt-2 grid grid-cols-1 border-t border-[#111111]/15 sm:grid-cols-2 sm:gap-x-10">
                        {s.list.map((item) => (
                          <li
                            key={item}
                            className="border-b border-[#111111]/15 py-4 font-sans text-[16px] font-semibold leading-snug text-[#111111] md:text-[17px]"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                </Reveal>

                {i === BREAK_AFTER && (
                  <Reveal className="relative mb-10 h-64 overflow-hidden md:mb-14 md:h-[420px]">
                    <Image
                      src="/images/projects/izmir-dikili-aat/saha-2.jpg"
                      alt="İzmir Dikili Atıksu Arıtma Tesisi, saha çalışmaları"
                      fill
                      quality={90}
                      sizes="(min-width: 1024px) 900px, 100vw"
                      className="photo-bw object-cover"
                    />
                  </Reveal>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-24 md:px-12 md:py-36">
        <Image
          src="/images/renders/karlitepe-render-30.png"
          alt=""
          fill
          quality={90}
          sizes="100vw"
          className="photo-bw object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
        <Reveal className="relative mx-auto max-w-[1280px]">
          <p className="max-w-[980px] font-sans text-[28px] font-extrabold leading-[1.15] tracking-[-0.02em] text-[#F5F4F0] md:text-[52px]">
            {c.slogan}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6 md:mt-14">
            <CtaButton href="/projeler" variant="light">
              {t.projects.exploreLink}
            </CtaButton>
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 border-b border-white/50 pb-1 font-sans text-sm font-semibold text-[#F5F4F0] transition-colors hover:border-white"
            >
              {t.nav.iletisimCta}
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
