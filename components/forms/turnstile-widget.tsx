"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const TURNSTILE_SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js";
declare global {
  interface Window {
    turnstile?: { reset: () => void };
  }
}

export function TurnstileWidget() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  if (!siteKey || !mounted) return null;

  return (
    <>
      <Script src={TURNSTILE_SCRIPT} strategy="afterInteractive" />
      <div
        className="cf-turnstile"
        data-sitekey={siteKey}
        data-response-field="true"
        data-response-field-name="turnstileToken"
      />
    </>
  );
}
