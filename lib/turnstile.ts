const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export interface TurnstileVerifyResult {
  success: boolean;
  "error-codes"?: string[];
}

/**
 * Verify Cloudflare Turnstile token server-side.
 * If TURNSTILE_SECRET_KEY is not set, returns { success: true } and logs a warning.
 */
export async function verifyTurnstileToken(token: string): Promise<TurnstileVerifyResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.warn("[Turnstile] TURNSTILE_SECRET_KEY not set; skipping verification.");
    return { success: true };
  }

  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token);

  const res = await fetch(TURNSTILE_VERIFY_URL, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    console.error("[Turnstile] Verify request failed:", res.status);
    return { success: false, "error-codes": ["fetch-failed"] };
  }

  const data = (await res.json()) as TurnstileVerifyResult;
  return data;
}
