"use client";

import Header from "./Header";
import Footer from "./Footer";
import Reveal from "./Reveal";
import CtaButton from "./CtaButton";
import { useLanguage } from "@/i18n/LanguageContext";

export default function ContactPageContent() {
  const { t } = useLanguage();
  const c = t.contactPage;

  return (
    <div className="bg-[#F5F5F5] text-[#111111]">
      <Header />
      <section className="mx-auto max-w-[1280px] px-6 pb-24 pt-40 md:px-12 md:pb-32 md:pt-48">
        <Reveal>
          <div className="mb-5 font-mono text-xs font-semibold tracking-[0.12em] text-neutral-500">
            {c.eyebrow}
          </div>
          <h1 className="mb-6 max-w-[640px] font-sans text-4xl font-extrabold leading-[1.1] text-[#111111] md:text-[52px]">
            {c.heading}
          </h1>
          <p className="max-w-[560px] font-sans text-base leading-relaxed text-[#555555] md:text-[17px]">
            {c.intro}
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-14 md:mt-20 md:grid-cols-[1.2fr_1fr] md:gap-20">
          <Reveal delay={0.1}>
            <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="font-mono text-[11px] font-semibold tracking-[0.08em] text-neutral-500">
                    {c.formName.toUpperCase()}
                  </span>
                  <input
                    type="text"
                    className="border border-[#111111]/15 bg-white px-4 py-3 font-sans text-sm text-[#111111] outline-none transition-colors focus:border-[#111111]"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="font-mono text-[11px] font-semibold tracking-[0.08em] text-neutral-500">
                    {c.formEmail.toUpperCase()}
                  </span>
                  <input
                    type="email"
                    className="border border-[#111111]/15 bg-white px-4 py-3 font-sans text-sm text-[#111111] outline-none transition-colors focus:border-[#111111]"
                  />
                </label>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="font-mono text-[11px] font-semibold tracking-[0.08em] text-neutral-500">
                    {c.formPhone.toUpperCase()}
                  </span>
                  <input
                    type="tel"
                    className="border border-[#111111]/15 bg-white px-4 py-3 font-sans text-sm text-[#111111] outline-none transition-colors focus:border-[#111111]"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="font-mono text-[11px] font-semibold tracking-[0.08em] text-neutral-500">
                    {c.formSubject.toUpperCase()}
                  </span>
                  <input
                    type="text"
                    className="border border-[#111111]/15 bg-white px-4 py-3 font-sans text-sm text-[#111111] outline-none transition-colors focus:border-[#111111]"
                  />
                </label>
              </div>
              <label className="flex flex-col gap-2">
                <span className="font-mono text-[11px] font-semibold tracking-[0.08em] text-neutral-500">
                  {c.formMessage.toUpperCase()}
                </span>
                <textarea
                  rows={6}
                  className="resize-none border border-[#111111]/15 bg-white px-4 py-3 font-sans text-sm text-[#111111] outline-none transition-colors focus:border-[#111111]"
                />
              </label>
              <div className="mt-2 flex flex-col items-start gap-3">
                <CtaButton href="mailto:info@bazgy.com" variant="dark">
                  {c.formSubmit}
                </CtaButton>
                <p className="font-sans text-xs text-neutral-500">{c.formNote}</p>
              </div>
            </form>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="border border-[#111111]/10 bg-white p-8">
              <div className="mb-6 font-mono text-xs font-semibold tracking-[0.12em] text-neutral-500">
                {c.officeLabel}
              </div>
              <dl className="flex flex-col gap-6">
                <div>
                  <dt className="mb-1.5 font-sans text-sm font-semibold text-[#111111]">
                    {c.addressLabel}
                  </dt>
                  <dd className="font-sans text-sm text-[#555555]">{c.address}</dd>
                </div>
                <div>
                  <dt className="mb-1.5 font-sans text-sm font-semibold text-[#111111]">
                    {c.phoneLabel}
                  </dt>
                  <dd className="font-sans text-sm text-[#555555]">{c.phone}</dd>
                </div>
                <div>
                  <dt className="mb-1.5 font-sans text-sm font-semibold text-[#111111]">
                    {c.emailLabel}
                  </dt>
                  <dd className="font-sans text-sm text-[#555555]">
                    <a href={`mailto:${c.email}`} className="hover:underline">
                      {c.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="mb-1.5 font-sans text-sm font-semibold text-[#111111]">
                    {c.hoursLabel}
                  </dt>
                  <dd className="font-sans text-sm text-[#555555]">{c.hours}</dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </section>
      <Footer />
    </div>
  );
}
