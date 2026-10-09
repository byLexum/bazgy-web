"use client";

import { useActionState, useRef } from "react";
import {
  sendContactMessage,
  type ContactField,
  type ContactState,
} from "@/app/contact/actions";
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

const initialState: ContactState = { status: "idle" };

export default function ContactForm() {
  const { t } = useLanguage();
  const c = t.contactPage;
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  useFocusFirstInvalid(formRef, state);

  if (state.status === "success") {
    return (
      <FormSuccess
        title={c.formSuccessTitle}
        copy={c.formSuccessCopy}
        againLabel={c.formSendAnother}
        againHref="/contact"
      />
    );
  }

  const errorFor = (field: ContactField) => {
    const code = state.fieldErrors?.[field];
    if (!code) return undefined;
    if (code === "invalid") {
      return field === "phone" ? c.formFieldErrors.invalidPhone : c.formFieldErrors.invalidEmail;
    }
    return c.formFieldErrors[code];
  };

  const input = (
    name: ContactField,
    label: string,
    opts: { type?: string; required?: boolean; autoComplete?: string; maxLength: number }
  ) => {
    const id = `contact-${name}`;
    const error = errorFor(name);
    return (
      <Field id={id} label={label} optionalLabel={opts.required ? undefined : c.formOptional} error={error}>
        <input
          {...fieldA11y(id, error)}
          name={name}
          type={opts.type ?? "text"}
          required={opts.required}
          autoComplete={opts.autoComplete}
          maxLength={opts.maxLength}
          defaultValue={state.values?.[name] ?? ""}
          className={inputClass(Boolean(error))}
        />
      </Field>
    );
  };

  const messageError = errorFor("message");

  return (
    <form ref={formRef} action={formAction} className="relative flex flex-col gap-5">
      <Honeypot />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {input("name", c.formName, { required: true, autoComplete: "name", maxLength: 120 })}
        {input("email", c.formEmail, { type: "email", required: true, autoComplete: "email", maxLength: 200 })}
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {input("phone", c.formPhone, { type: "tel", autoComplete: "tel", maxLength: 40 })}
        {input("subject", c.formSubject, { maxLength: 160 })}
      </div>
      <Field id="contact-message" label={c.formMessage} error={messageError}>
        <textarea
          {...fieldA11y("contact-message", messageError)}
          name="message"
          rows={6}
          required
          maxLength={5000}
          defaultValue={state.values?.message ?? ""}
          className={`${inputClass(Boolean(messageError))} resize-y`}
        />
      </Field>

      {state.status === "error" && state.code && <FormAlert>{c.formErrors[state.code]}</FormAlert>}

      <div className="mt-2 flex flex-col items-start gap-4">
        <SubmitButton pending={pending} label={c.formSubmit} pendingLabel={c.formSending} />
        <KvkkNote before={c.formKvkkBefore} link={c.formKvkkLink} after={c.formKvkkAfter} />
      </div>
    </form>
  );
}
