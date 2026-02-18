"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

const TURNSTILE_SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js";
const CALLBACK_NAME = "hyrelogTurnstileCallback";

declare global {
  interface Window {
    [CALLBACK_NAME]?: (token: string) => void;
    turnstile?: { reset: () => void };
  }
}

export function TurnstileWidget() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    window[CALLBACK_NAME] = (token: string) => {
      if (inputRef.current) inputRef.current.value = token;
    };
    return () => {
      delete window[CALLBACK_NAME];
    };
  }, []);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  if (!siteKey) return null;

  return (
    <>
      <Script src={TURNSTILE_SCRIPT} strategy="lazyOnload" />
      <input
        ref={inputRef}
        type="hidden"
        name="turnstileToken"
        defaultValue=""
        aria-hidden
      />
      <div
        className="cf-turnstile"
        data-sitekey={siteKey}
        data-callback={CALLBACK_NAME}
      />
    </>
  );
}
