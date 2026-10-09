"use client";

import { useActionState, useRef, useState } from "react";
import {
  sendApplication,
  type ApplicationField,
  type ApplicationState,
} from "@/app/career/actions";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  Field,
  FormAlert,
  FormSuccess,
  Honeypot,
  KvkkNote,
  SubmitButton,
  fieldA11y,
  inputClass,
  useFocusFirstInvalid,
} from "./form";

// Keep in sync with MAX_CV_BYTES in app/career/actions.ts.
const CV_MAX_BYTES = 4 * 1024 * 1024;
const CV_EXTENSIONS = ["pdf", "doc", "docx"];

const initialState: ApplicationState = { status: "idle" };

export function positionLabel(p: { title: string; location: string }) {
  return `${p.title} · ${p.location}`;
}

export default function CareerApplicationForm({
  position,
  onPositionChange,
}: {
  position: string;
  onPositionChange: (value: string) => void;
}) {
  const { t } = useLanguage();
  const c = t.careerPage;
  const f = c.form;
  const shared = t.contactPage;
  const [state, formAction, pending] = useActionState(sendApplication, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  // The chosen file only counts for the state it was picked under: React
  // resets the form after every submit, which empties the file input.
  const [picked, setPicked] = useState<{ name: string; forState: ApplicationState } | null>(null);
  const [clientCvError, setClientCvError] = useState<string | null>(null);
  useFocusFirstInvalid(formRef, state);

  if (state.status === "success") {
    return (
      <FormSuccess
        title={f.successTitle}
        copy={f.successCopy}
        againLabel={f.sendAnother}
        againHref="/career#basvuru"
      />
    );
  }

  const fileName = picked && picked.forState === state ? picked.name : null;

  const errorFor = (field: ApplicationField) => {
    const code = state.fieldErrors?.[field];
    if (!code) return undefined;
    if (code === "cvRequired" || code === "cvType" || code === "cvSize") return f[code];
    if (code === "invalid") {
      return field === "phone" ? shared.formFieldErrors.invalidPhone : shared.formFieldErrors.invalidEmail;
    }
    return shared.formFieldErrors[code];
  };

  const input = (
    name: "name" | "email" | "phone",
    label: string,
    opts: { type?: string; autoComplete: string; maxLength: number }
  ) => {
    const id = `apply-${name}`;
    const error = errorFor(name);
    return (
      <Field id={id} label={label} error={error}>
        <input
          {...fieldA11y(id, error)}
          name={name}
          type={opts.type ?? "text"}
          required
          autoComplete={opts.autoComplete}
          maxLength={opts.maxLength}
          defaultValue={state.values?.[name] ?? ""}
          className={inputClass(Boolean(error))}
        />
      </Field>
    );
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setClientCvError(null);
    if (!file) {
      setPicked(null);
      return;
    }
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    const problem = !CV_EXTENSIONS.includes(ext) ? f.cvType : file.size > CV_MAX_BYTES ? f.cvSize : null;
    if (problem) {
      setClientCvError(problem);
      setPicked(null);
      e.target.value = "";
      return;
    }
    setPicked({ name: file.name, forState: state });
  };

  const cvServerError = errorFor("cv");
  const cvError =
    clientCvError ??
    (fileName ? undefined : cvServerError ?? (state.status === "error" ? f.cvReselect : undefined));
  const positionError = errorFor("position");
  const messageError = errorFor("message");

  return (
    <form ref={formRef} action={formAction} className="relative flex flex-col gap-5">
      <Honeypot />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {input("name", shared.formName, { autoComplete: "name", maxLength: 120 })}
        {input("email", shared.formEmail, { type: "email", autoComplete: "email", maxLength: 200 })}
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {input("phone", shared.formPhone, { type: "tel", autoComplete: "tel", maxLength: 40 })}
        <Field id="apply-position" label={f.position} error={positionError}>
          <div className="relative">
            {/* Uncontrolled on purpose: React resets the form after each submit,
                and a reset select falls back to its defaultValue, not to state. */}
            <select
              key={position}
              {...fieldA11y("apply-position", positionError)}
              name="position"
              required
              defaultValue={position}
              onChange={(e) => onPositionChange(e.target.value)}
              className={`${inputClass(Boolean(positionError))} appearance-none pr-10`}
            >
              {c.positions.map((p) => (
                <option key={p.title} value={positionLabel(p)}>
                  {positionLabel(p)}
                </option>
              ))}
              <option value={f.general}>{f.general}</option>
            </select>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#555555]"
            >
              <path d="m7 10 5 5 5-5" strokeLinecap="square" />
            </svg>
          </div>
        </Field>
      </div>

      <Field id="apply-cv" label={f.cv} hint={f.cvHint} error={cvError}>
        <div
          className={`flex flex-wrap items-center gap-4 border border-dashed bg-white px-4 py-4 ${
            cvError ? "border-[#b42318]" : "border-[#111111]/25"
          }`}
        >
          <input
            ref={fileRef}
            {...fieldA11y("apply-cv", cvError)}
            name="cv"
            type="file"
            required
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={onFileChange}
            className="sr-only"
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="border border-[#111111] px-4 py-2 font-sans text-[13px] font-semibold text-[#111111] transition-colors hover:bg-[#111111] hover:text-white"
          >
            {f.cvChoose}
          </button>
          <span className={`min-w-0 truncate font-sans text-sm ${fileName ? "text-[#111111]" : "text-neutral-400"}`}>
            {fileName ?? f.cvNone}
          </span>
        </div>
      </Field>

      <Field id="apply-message" label={f.message} optionalLabel={shared.formOptional} error={messageError}>
        <textarea
          {...fieldA11y("apply-message", messageError)}
          name="message"
          rows={5}
          maxLength={5000}
          defaultValue={state.values?.message ?? ""}
          className={`${inputClass(Boolean(messageError))} resize-y`}
        />
      </Field>

      {state.status === "error" && state.code && <FormAlert>{shared.formErrors[state.code]}</FormAlert>}

      <div className="mt-2 flex flex-col items-start gap-4">
        <SubmitButton pending={pending} label={f.submit} pendingLabel={shared.formSending} />
        <KvkkNote before={shared.formKvkkBefore} link={shared.formKvkkLink} after={shared.formKvkkAfter} />
      </div>
    </form>
  );
}
