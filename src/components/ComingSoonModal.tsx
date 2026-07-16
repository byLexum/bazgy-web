"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

export default function ComingSoonModal() {
  const { t } = useLanguage();
  const c = t.comingSoon;
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[480px] rounded-[14px] border border-white/10 bg-black p-8 text-center shadow-2xl md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Kapat"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white"
        >
          ✕
        </button>
        <h2 className="mb-5 font-sans text-2xl font-extrabold text-[#F5F4F0] md:text-[28px]">
          {c.heading}
        </h2>
        <p className="mb-3 font-sans text-[15px] leading-relaxed text-white/70">
          {c.p1}
        </p>
        <p className="mb-3 font-sans text-[15px] leading-relaxed text-white/70">
          {c.p2}
        </p>
        <p className="mb-6 font-sans text-[15px] leading-relaxed text-white/70">
          {c.p3}
        </p>
        <p className="mb-8 font-sans text-[15px] font-bold text-[#F5F4F0]">
          {c.signature}
        </p>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 font-sans text-sm font-semibold text-black transition hover:bg-white/85"
        >
          {c.close}
        </button>
      </motion.div>
    </motion.div>
  );
}
