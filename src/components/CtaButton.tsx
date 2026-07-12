"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function CtaButton({
  href,
  children,
  variant = "light",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "light" | "dark";
  className?: string;
}) {
  const isLight = variant === "light";
  return (
    <motion.a
      href={href}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
      animate="rest"
      className={`group relative inline-flex items-center gap-3 overflow-hidden px-8 py-[17px] font-sans text-[15px] font-semibold ${
        isLight ? "bg-white text-black" : "bg-[#111111] text-[#F5F4F0]"
      } ${className}`}
    >
      <motion.span
        aria-hidden="true"
        variants={{ rest: { x: "-100%" }, hover: { x: 0 } }}
        transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
        className={`absolute inset-0 ${
          isLight ? "bg-[#111111]" : "bg-white"
        }`}
      />
      <span
        className={`relative z-10 transition-colors duration-300 ${
          isLight ? "group-hover:text-white" : "group-hover:text-black"
        }`}
      >
        {children}
      </span>
      <motion.span
        aria-hidden="true"
        variants={{ rest: { x: 0 }, hover: { x: 4 } }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`relative z-10 transition-colors duration-300 ${
          isLight ? "group-hover:text-white" : "group-hover:text-black"
        }`}
      >
        →
      </motion.span>
    </motion.a>
  );
}
