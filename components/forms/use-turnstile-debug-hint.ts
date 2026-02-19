"use client";

import { useEffect, useRef, useState } from "react";

function getTokenFromForm(form: HTMLFormElement): string {
  const fields = form.querySelectorAll<HTMLInputElement>(
    'input[name="turnstileToken"], input[name="cf-turnstile-response"]'
  );
  for (let i = fields.length - 1; i >= 0; i--) {
    const value = fields[i]?.value?.trim();
    if (value) return value;
  }
  return "";
}

export function useTurnstileDebugHint() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [turnstileDebugHint, setTurnstileDebugHint] = useState<string | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    const form = formRef.current;
    if (!form) return;
    const token = getTokenFromForm(form);
    if (!token && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
      setTurnstileDebugHint(
        "Dev hint: Turnstile token is empty. Check domain allowlist, script blockers, and widget load."
      );
    }
  }, []);

  function updateTurnstileDebugHint(result: { ok: boolean; message: string } | null) {
    if (process.env.NODE_ENV === "production") return;
    if (!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) return;
    if (!result || result.ok) {
      setTurnstileDebugHint(null);
      return;
    }
    if (!/verification failed/i.test(result.message)) return;

    const form = formRef.current;
    if (!form) return;
    const token = getTokenFromForm(form);
    if (!token) {
      setTurnstileDebugHint(
        "Dev hint: Turnstile token is empty after verification failed. Check domain allowlist, script blockers, and widget load."
      );
    }
  }

  return { formRef, turnstileDebugHint, updateTurnstileDebugHint };
}
