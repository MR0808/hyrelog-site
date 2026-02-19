const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

const hasTurnstileConfig = (): boolean =>
  Boolean(process.env.TURNSTILE_SECRET_KEY && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

/**
 * Verify Turnstile token server-side.
 * - If keys are not configured: log warning and return (no throw).
 * - If keys are configured and token missing/empty: throw.
 * - If verification fails: throw with friendly message.
 * Never log secrets or full response.
 */
export async function verifyTurnstile(token: string | null): Promise<void> {
  if (!hasTurnstileConfig()) {
    console.warn("Turnstile not configured; proceeding without token verification.");
    return;
  }

  const t = token?.trim();
  if (!t) {
    console.warn(
      "[Turnstile] Missing token while Turnstile is configured. Check widget load, domain allowlist, and script blockers."
    );
    throw new Error("Verification failed. Please try again.");
  }

  const form = new FormData();
  form.append("secret", process.env.TURNSTILE_SECRET_KEY!);
  form.append("response", t);

  const res = await fetch(TURNSTILE_VERIFY_URL, { method: "POST", body: form });
  if (!res.ok) {
    console.warn(`[Turnstile] Verify request failed with status ${res.status}.`);
    throw new Error("Verification failed. Please try again.");
  }

  const data = (await res.json()) as {
    success?: boolean;
    "error-codes"?: string[];
    hostname?: string;
    action?: string;
  };
  if (!data.success) {
    const codes = data["error-codes"] ?? [];
    if (codes.length > 0) {
      console.warn("[Turnstile] error-codes:", codes.join(", "));
      if (codes.includes("invalid-input-secret")) {
        console.warn("[Turnstile] Secret key appears invalid. Check TURNSTILE_SECRET_KEY.");
      }
      if (codes.includes("invalid-input-response")) {
        console.warn(
          "[Turnstile] Token invalid/expired. Check widget callback timing and domain allowlist."
        );
      }
      if (codes.includes("timeout-or-duplicate")) {
        console.warn(
          "[Turnstile] Token timed out or was reused. Ask user to retry and ensure fresh token."
        );
      }
    }
    if (data.hostname) {
      console.warn(`[Turnstile] Response hostname: ${data.hostname}`);
    }
    if (data.action) {
      console.warn(`[Turnstile] Response action: ${data.action}`);
    }
    throw new Error("Verification failed. Please try again.");
  }
}
