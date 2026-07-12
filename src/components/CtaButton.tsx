"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function CtaButton({
  href,
  children,
  variant = "light",
  size = "md",
  onClick,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "light" | "dark" | "outline";
  size?: "md" | "sm";
  onClick?: () => void;
  className?: string;
}) {
  const isLight = variant === "light";
  const isOutline = variant === "outline";

  const padding = size === "sm" ? "px-5 py-2.5" : "px-8 py-[17px]";
  const textSize = size === "sm" ? "text-[13px]" : "text-[15px]";

  const baseBg = isOutline ? "bg-transparent" : isLight ? "bg-white" : "bg-[#111111]";
  const baseText = isOutline || !isLight ? "text-[#F5F4F0]" : "text-black";
  const fillColor = isOutline || isLight ? "bg-white" : "bg-white";
  const hoverText = "group-hover:text-black";
  const border = isOutline ? "border border-white/40 group-hover:border-white" : "";

  return (
    <motion.a
      href={href}
      onClick={onClick}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
      animate="rest"
      className={`group relative inline-flex items-center gap-2.5 overflow-hidden font-sans font-semibold ${padding} ${textSize} ${baseBg} ${baseText} ${border} ${className}`}
    >
      <motion.span
        aria-hidden="true"
        variants={{ rest: { x: "-100%" }, hover: { x: 0 } }}
        transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
        className={`absolute inset-0 ${
          isOutline ? fillColor : isLight ? "bg-[#111111]" : "bg-white"
        }`}
      />
      <span
        className={`relative z-10 transition-colors duration-300 ${
          isOutline
            ? hoverText
            : isLight
              ? "group-hover:text-white"
              : hoverText
        }`}
      >
        {children}
      </span>
      <motion.span
        aria-hidden="true"
        variants={{ rest: { x: 0 }, hover: { x: 4 } }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`relative z-10 transition-colors duration-300 ${
          isOutline
            ? hoverText
            : isLight
              ? "group-hover:text-white"
              : hoverText
        }`}
      >
        →
      </motion.span>
    </motion.a>
  );
}
