"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ArrowRightIcon, CheckIcon } from "./icons";

export function inputClass(invalid: boolean) {
  return `w-full border bg-white px-4 py-3 font-sans text-[15px] text-[#111111] outline-none transition-colors placeholder:text-neutral-400 focus:border-[#111111] ${
    invalid ? "border-[#b42318]" : "border-[#111111]/15"
  }`;
}

export function fieldA11y(id: string, error?: string) {
  return {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
  } as const;
}

export function Field({
  id,
  label,
  optionalLabel,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  optionalLabel?: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="flex items-baseline gap-2 font-sans text-[13px] font-semibold text-[#333333]">
        {label}
        {optionalLabel && <span className="text-[12px] font-normal text-neutral-400">{optionalLabel}</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="font-sans text-[13px] text-[#b42318]">
          {error}
        </p>
      ) : (
        hint && <p className="font-sans text-[12px] text-neutral-500">{hint}</p>
      )}
    </div>
  );
}

// Bots fill every input they find; people never see this one.
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Company
        <input type="text" name="company" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function FormAlert({ children }: { children: ReactNode }) {
  return (
    <div
      role="alert"
      className="border border-[#b42318]/30 bg-[#b42318]/5 px-4 py-3 font-sans text-sm text-[#7a1a12]"
    >
      {children}
    </div>
  );
}

export function SubmitButton({
  pending,
  label,
  pendingLabel,
}: {
  pending: boolean;
  label: string;
  pendingLabel: string;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="group inline-flex items-center gap-2.5 bg-[#111111] px-8 py-[17px] font-sans text-[15px] font-semibold text-[#F5F4F0] transition-colors hover:bg-black disabled:cursor-wait disabled:opacity-70"
    >
      {pending ? pendingLabel : label}
      {pending ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      ) : (
        <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </button>
  );
}

export function KvkkNote({ before, link, after }: { before: string; link: string; after: string }) {
  return (
    <p className="max-w-[460px] font-sans text-xs leading-relaxed text-neutral-500">
      {before}
      <a href="/kvkk" className="text-[#333333] underline underline-offset-2 hover:text-[#111111]">
        {link}
      </a>
      {after}
    </p>
  );
}

export function FormSuccess({
  title,
  copy,
  againLabel,
  againHref,
}: {
  title: string;
  copy: string;
  againLabel: string;
  againHref: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  return (
    <div ref={ref} tabIndex={-1} role="status" className="border-t-2 border-[#111111] pt-8 outline-none">
      <div className="mb-5 flex h-11 w-11 items-center justify-center bg-[#111111] text-white">
        <CheckIcon className="h-5 w-5" />
      </div>
      <h2 className="mb-3 font-sans text-[26px] font-extrabold leading-tight text-[#111111] md:text-[30px]">
        {title}
      </h2>
      <p className="mb-8 max-w-[460px] font-sans text-[15px] leading-relaxed text-[#555555]">{copy}</p>
      <a
        href={againHref}
        className="inline-flex items-center gap-2 border-b border-[#111111] pb-1 font-sans text-sm font-semibold text-[#111111]"
      >
        {againLabel}
        <ArrowRightIcon className="h-4 w-4" />
      </a>
    </div>
  );
}

// After a failed submit, move focus to the first field the server flagged.
export function useFocusFirstInvalid(formRef: React.RefObject<HTMLFormElement | null>, trigger: unknown) {
  useEffect(() => {
    formRef.current?.querySelector<HTMLElement>("[aria-invalid=true]")?.focus();
  }, [formRef, trigger]);
}
