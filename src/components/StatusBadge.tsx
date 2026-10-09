import type { ReactNode } from "react";
import { CheckIcon } from "./icons";

// Completed projects get a solid light tag with a check; everything still on
// site keeps the quieter outlined tag with a live dot.
export default function StatusBadge({
  children,
  completed = false,
  tone = "dark",
  className = "",
}: {
  children: ReactNode;
  completed?: boolean;
  tone?: "dark" | "overlay";
  className?: string;
}) {
  if (completed) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 bg-[#F5F4F0] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.06em] text-[#111111] ${className}`}
      >
        <CheckIcon className="h-3 w-3" />
        {children}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-2 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#F5F4F0] ${
        tone === "overlay" ? "bg-black/60 backdrop-blur-sm" : "border border-white/20"
      } ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#F5F4F0]/70" />
      {children}
    </span>
  );
}
