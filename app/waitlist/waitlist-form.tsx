"use client";

import { useActionState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { submitWaitlist } from "@/app/actions/waitlist";
import { TurnstileWidget } from "@/components/forms/turnstile-widget";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/lib/analytics";

function WaitlistFormInner({
  state,
  pending,
}: {
  state: { ok: boolean; message: string } | null;
  pending: boolean;
}) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="waitlist-email" className="text-sm font-medium">
            Work email *
          </label>
          <Input
            id="waitlist-email"
            type="email"
            name="email"
            required
            placeholder="you@company.com"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="waitlist-name" className="text-sm font-medium">
            Name
          </label>
          <Input id="waitlist-name" name="name" placeholder="Jane Smith" />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="waitlist-company" className="text-sm font-medium">
          Company
        </label>
        <Input id="waitlist-company" name="company" placeholder="Acme Inc." />
      </div>
      <div className="space-y-2">
        <label htmlFor="waitlist-message" className="text-sm font-medium">
          Notes (optional)
        </label>
        <Textarea
          id="waitlist-message"
          name="message"
          rows={3}
          placeholder="Anything we should know about your audit logging needs?"
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="waitlist-consent"
          name="consent"
          value="on"
          className="rounded border-input"
        />
        <label htmlFor="waitlist-consent" className="text-sm text-muted-foreground">
          I agree to receive launch updates and pricing changes (optional).
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
        {pending ? "Submitting..." : "Join the waitlist"}
      </Button>
    </>
  );
}

export function WaitlistForm() {
  const pathname = usePathname();
  const [state, formAction, isPending] = useActionState(
    async (_prev: { ok: boolean; message: string } | null, formData: FormData) => {
      return submitWaitlist(formData);
    },
    null
  );

  useEffect(() => {
    if (state?.ok) {
      trackEvent("waitlist_submit_success", { page: pathname ?? "/waitlist" });
      if (typeof window.turnstile?.reset === "function") window.turnstile.reset();
    }
  }, [state?.ok, pathname]);

  return (
    <form action={formAction} className="mt-8 space-y-6">
      <div className="absolute -left-[9999px] top-0 opacity-0" aria-hidden>
        <label htmlFor="waitlist-website">Website</label>
        <input id="waitlist-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="pagePath" value={pathname ?? ""} />
      <WaitlistFormInner state={state} pending={isPending} />
    </form>
  );
}
