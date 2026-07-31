"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const SEEN_KEY = "baz-coming-soon-seen";

export default function ComingSoonModal() {
  const { t } = useLanguage();
  const c = t.comingSoon;
  // Sayfalar statik üretildiği için başlangıçta kapalı: sessionStorage'a
  // ancak mount sonrası bakılabiliyor. Sekme kapanana kadar bir kez gösterilir,
  // site içi gezinmede tekrar açılmaz.
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SEEN_KEY)) return;
    setOpen(true);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(SEEN_KEY, "1");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-6 backdrop-blur-md"
      onClick={dismiss}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[520px] overflow-hidden rounded-[18px] border border-white/12 bg-black p-9 text-center shadow-[0_30px_90px_-20px_rgba(0,0,0,0.8)] md:p-12"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_460px_260px_at_50%_0%,rgba(255,255,255,0.09),transparent_70%)]" />

        <button
          type="button"
          onClick={dismiss}
          aria-label="Kapat"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white"
        >
          ✕
        </button>

        <div className="relative">
          <Image
            src="/images/baz-logo.svg"
            alt="BAZ"
            width={140}
            height={34}
            className="mx-auto mb-8 h-6 w-auto md:h-7"
          />

          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            {c.badge}
          </div>

          <h2 className="mb-6 font-sans text-[26px] font-extrabold leading-tight text-[#F5F4F0] md:text-[30px]">
            {c.heading}
          </h2>

          <div className="mx-auto mb-6 h-px w-14 bg-white/20" />

          <p className="mb-3 font-sans text-[15px] leading-relaxed text-white/60">
            {c.p1}
          </p>
          <p className="mb-3 font-sans text-[15px] leading-relaxed text-white/60">
            {c.p2}
          </p>
          <p className="mb-8 font-sans text-[15px] leading-relaxed text-white/60">
            {c.p3}
          </p>

          <p className="mb-8 font-sans text-[15px] font-bold text-[#F5F4F0]">
            {c.signature}
          </p>

          <button
            type="button"
            onClick={dismiss}
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 font-sans text-sm font-semibold text-black transition hover:scale-[1.03] hover:bg-white/90"
          >
            {c.close}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
