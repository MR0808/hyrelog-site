"use client";

import { useActionState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TurnstileWidget } from "@/components/forms/turnstile-widget";
import { submitBookDemoLead } from "@/app/actions/book-demo";

function FormInner({
  state,
  pending,
}: {
  state: { ok: boolean; message: string } | null;
  pending: boolean;
}) {
  return (
    <>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="bd-name" className="text-sm font-medium">
            Name *
          </label>
          <Input id="bd-name" name="name" required placeholder="Jane Smith" />
        </div>
        <div className="space-y-2">
          <label htmlFor="bd-email" className="text-sm font-medium">
            Email *
          </label>
          <Input id="bd-email" name="email" type="email" required placeholder="jane@company.com" />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="bd-company" className="text-sm font-medium">
          Company
        </label>
        <Input id="bd-company" name="company" placeholder="Acme Inc." />
      </div>
      <div className="space-y-2">
        <label htmlFor="bd-message" className="text-sm font-medium">
          Message (optional)
        </label>
        <Textarea
          id="bd-message"
          name="message"
          rows={3}
          placeholder="What are you looking to solve?"
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="bd-consent"
          name="consent"
          value="on"
          className="rounded border-input"
        />
        <label htmlFor="bd-consent" className="text-sm text-muted-foreground">
          I agree to be contacted about HyreLog.
        </label>
      </div>
      <TurnstileWidget />
      {state && !state.ok && (
        <p className="text-sm text-destructive" role="alert">
          {state.message}
        </p>
      )}
      {state?.ok && (
        <p className="text-sm text-green-600 dark:text-green-400" role="status">
          {state.message}
        </p>
      )}
      <Button type="submit" disabled={pending}>
        {pending ? "Submitting…" : "Request demo"}
      </Button>
    </>
  );
}

export function BookDemoForm() {
  const pathname = usePathname();
  const [state, formAction, isPending] = useActionState(
    async (_prev: { ok: boolean; message: string } | null, formData: FormData) => {
      return submitBookDemoLead(formData);
    },
    null
  );

  useEffect(() => {
    if (state?.ok && typeof window.turnstile?.reset === "function") {
      window.turnstile.reset();
    }
  }, [state?.ok]);

  return (
    <form action={formAction} className="space-y-6">
      <div className="absolute -left-[9999px] top-0 opacity-0" aria-hidden>
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="pagePath" value={pathname ?? ""} />
      <FormInner state={state} pending={isPending} />
    </form>
  );
}
