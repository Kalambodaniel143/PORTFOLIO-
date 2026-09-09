"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  submitContact,
  type ContactFormState,
} from "@/app/contact/actions";
import { cn } from "@/lib/cn";

const initialState: ContactFormState = { status: "idle" };

const fieldClass =
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors placeholder:text-subtle focus:border-accent";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-11 items-center justify-center rounded-full bg-accent px-6 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90 disabled:opacity-60"
    >
      {pending ? "Sending…" : "Send message"}
    </button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm text-muted">
            Name
          </label>
          <input id="name" name="name" required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm text-muted">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm text-muted">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className={cn(fieldClass, "resize-y")}
        />
      </div>

      {/* Honeypot */}
      <div aria-hidden className="hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <SubmitButton />
        {state.status !== "idle" && state.message && (
          <p
            role="status"
            className={cn(
              "text-sm",
              state.status === "success" ? "text-accent" : "text-red-500",
            )}
          >
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
