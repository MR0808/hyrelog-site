import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const CONTACT_TO = process.env.CONTACT_TO_EMAIL ?? "";
const CONTACT_FROM = process.env.CONTACT_FROM_EMAIL ?? "HyreLog <onboarding@resend.dev>";

export interface ContactEmailPayload {
  name: string;
  email: string;
  company?: string;
  message: string;
  subject?: string;
  metadata?: Record<string, string>;
}

export async function sendContactEmail(payload: ContactEmailPayload): Promise<{ ok: boolean; error?: string }> {
  if (!resend) {
    console.error("[Resend] RESEND_API_KEY not set.");
    return { ok: false, error: "Email service not configured." };
  }

  const to = CONTACT_TO || "contact@hyrelog.com";
  const subject = payload.subject ?? `Contact: ${payload.name} (${payload.company ?? "—"})`;

  const { error } = await resend.emails.send({
    from: CONTACT_FROM,
    to,
    replyTo: payload.email,
    subject,
    html: `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Company:</strong> ${escapeHtml(payload.company ?? "—")}</p>
      ${payload.subject ? `<p><strong>Subject:</strong> ${escapeHtml(payload.subject)}</p>` : ""}
      <h3>Message</h3>
      <pre style="white-space: pre-wrap; font-family: sans-serif;">${escapeHtml(payload.message)}</pre>
      ${payload.metadata && Object.keys(payload.metadata).length > 0 ? `<p><small>${Object.entries(payload.metadata).map(([k, v]) => `${k}: ${v}`).join(" | ")}</small></p>` : ""}
    `,
  });

  if (error) {
    console.error("[Resend] Send failed:", error);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

export async function sendAutoReply(to: string, name: string): Promise<{ ok: boolean }> {
  if (!resend || !CONTACT_TO) return { ok: true };
  const { error } = await resend.emails.send({
    from: CONTACT_FROM,
    to,
    subject: "We received your message — HyreLog",
    html: `
      <p>Hi ${escapeHtml(name)},</p>
      <p>Thanks for reaching out. We've received your message and will get back to you soon.</p>
      <p>— The HyreLog team</p>
    `,
  });
  return { ok: !error };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
