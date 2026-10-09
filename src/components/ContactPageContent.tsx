"use client";

import Header from "./Header";
import Footer from "./Footer";
import Reveal from "./Reveal";
import ContactForm from "./ContactForm";
import PageIntro from "./PageIntro";
import { useLanguage } from "@/i18n/LanguageContext";

export default function ContactPageContent() {
  const { t } = useLanguage();
  const c = t.contactPage;

  return (
    <div className="bg-[#F5F5F5] text-[#111111]">
      <Header />
      <PageIntro title={c.heading} intro={c.intro} />
      <section className="mx-auto max-w-[1280px] px-6 pb-24 md:px-12 md:pb-32">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-[1.2fr_1fr] md:gap-20">
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.2}>
            <div className="border border-[#111111]/10 bg-white p-8">
              <h2 className="mb-6 font-sans text-[20px] font-bold text-[#111111]">
                {c.officeLabel}
              </h2>
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
