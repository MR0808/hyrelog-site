import { Resend } from "resend";

const client = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM = process.env.CONTACT_FROM_EMAIL ?? "HyreLog <onboarding@resend.dev>";
const TO = process.env.CONTACT_TO_EMAIL ?? "";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendContactEmail(payload: {
  name: string;
  email: string;
  company?: string;
  message: string;
  subject?: string;
  meta?: Record<string, string>;
}): Promise<{ ok: boolean; error?: string }> {
  if (!client) {
    console.error("[Resend] RESEND_API_KEY not set.");
    return { ok: false, error: "Email service not configured." };
  }
  const to = TO || "contact@hyrelog.com";
  const subject = payload.subject ?? `Contact: ${payload.name} (${payload.company ?? "—"})`;
  const { error } = await client.emails.send({
    from: FROM,
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
      ${payload.meta && Object.keys(payload.meta).length > 0 ? `<p><small>${Object.entries(payload.meta).map(([k, v]) => `${k}: ${String(v).slice(0, 200)}`).join(" | ")}</small></p>` : ""}
    `,
  });
  if (error) {
    console.error("[Resend] Send failed:", error.message);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

export async function sendAutoReply(to: string, name: string): Promise<{ ok: boolean }> {
  if (!client || !TO) return { ok: true };
  const { error } = await client.emails.send({
    from: FROM,
    to,
    subject: "We received your message — HyreLog",
    html: `<p>Hi ${escapeHtml(name)},</p><p>Thanks for reaching out. We've received your message and will get back to you soon.</p><p>— The HyreLog team</p>`,
  });
  return { ok: !error };
}

export async function sendNewsletterConfirmEmail(payload: {
  email: string;
  confirmUrl: string;
}): Promise<{ ok: boolean; error?: string }> {
  if (!client) return { ok: false, error: "Email service not configured." };
  const { error } = await client.emails.send({
    from: FROM,
    to: payload.email,
    subject: "Confirm your subscription — HyreLog",
    html: `
      <p>Thanks for subscribing to HyreLog.</p>
      <p><a href="${escapeHtml(payload.confirmUrl)}">Confirm your email</a> to receive updates on audit logging and compliance.</p>
      <p>If you didn't request this, you can ignore this email.</p>
      <p>— The HyreLog team</p>
    `,
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function sendLeadMagnetEmail(payload: {
  email: string;
  downloadUrl: string;
  magnet: string;
}): Promise<{ ok: boolean; error?: string }> {
  if (!client) return { ok: false, error: "Email service not configured." };
  const title = payload.magnet === "soc2-audit-trail-checklist" ? "SOC 2 Audit Trail Checklist" : "Your resource";
  const { error } = await client.emails.send({
    from: FROM,
    to: payload.email,
    subject: `${title} — HyreLog`,
    html: `
      <p>Here’s your download link for the <strong>${escapeHtml(title)}</strong>.</p>
      <p><a href="${escapeHtml(payload.downloadUrl)}">Download now</a></p>
      <p>This link is for your use only. If you didn’t request this, you can ignore this email.</p>
      <p>— The HyreLog team</p>
    `,
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function sendBookDemoLeadEmail(payload: {
  name: string;
  email: string;
  company?: string;
  message?: string;
  meta?: Record<string, string>;
}): Promise<{ ok: boolean; error?: string }> {
  if (!client) return { ok: false, error: "Email service not configured." };
  const to = TO || "contact@hyrelog.com";
  const { error } = await client.emails.send({
    from: FROM,
    to,
    replyTo: payload.email,
    subject: `Book demo request: ${payload.name} (${payload.company ?? "—"})`,
    html: `
      <h2>Book demo request</h2>
      <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Company:</strong> ${escapeHtml(payload.company ?? "—")}</p>
      ${payload.message ? `<h3>Message</h3><pre style="white-space: pre-wrap;">${escapeHtml(payload.message)}</pre>` : ""}
      ${payload.meta && Object.keys(payload.meta).length > 0 ? `<p><small>${Object.entries(payload.meta).map(([k, v]) => `${k}: ${String(v).slice(0, 200)}`).join(" | ")}</small></p>` : ""}
    `,
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
