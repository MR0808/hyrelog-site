/**
 * Cookie Consent Management
 * Handles GDPR-compliant cookie consent storage and retrieval
 */

const CONSENT_COOKIE_NAME = 'hyrelog-cookie-consent';
const CONSENT_COOKIE_EXPIRY_DAYS = 365;

export type ConsentStatus = 'accepted' | 'rejected' | null;

export function getConsent(): ConsentStatus {
  if (typeof window === 'undefined') return null;

  try {
    const cookies = document.cookie.split(';');
    const consentCookie = cookies.find((cookie) =>
      cookie.trim().startsWith(`${CONSENT_COOKIE_NAME}=`)
    );

    if (!consentCookie) return null;

    const value = consentCookie.split('=')[1];
    return value === 'accepted' ? 'accepted' : value === 'rejected' ? 'rejected' : null;
  } catch {
    return null;
  }
}

export function setConsent(status: 'accepted' | 'rejected'): void {
  if (typeof window === 'undefined') return;

  const expiryDate = new Date();
  expiryDate.setTime(expiryDate.getTime() + CONSENT_COOKIE_EXPIRY_DAYS * 24 * 60 * 60 * 1000);

  document.cookie = `${CONSENT_COOKIE_NAME}=${status}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
}

export function hasConsent(): boolean {
  return getConsent() === 'accepted';
}

