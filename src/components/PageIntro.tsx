import type { ReactNode } from "react";
import Reveal from "./Reveal";

// Opening block shared by the inner pages: one strong heading and a lead
// paragraph, sized down for long legal titles.
export default function PageIntro({
  title,
  intro,
  size = "lg",
  children,
}: {
  title: string;
  intro?: string;
  size?: "lg" | "md";
  children?: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-[1280px] px-6 pb-14 pt-36 md:px-12 md:pb-20 md:pt-48">
      <Reveal>
        <h1
          className={`max-w-[920px] font-sans font-extrabold text-[#111111] ${
            size === "lg"
              ? "text-[40px] leading-[1.04] md:text-[68px]"
              : "text-[30px] leading-[1.12] md:text-[46px]"
          }`}
        >
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-[640px] font-sans text-[17px] leading-relaxed text-[#555555] md:mt-8 md:text-[19px]">
            {intro}
          </p>
        )}
      </Reveal>
      {children}
    </section>
  );
}
