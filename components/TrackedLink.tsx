'use client';

import Link from 'next/link';
import { analytics } from '@/lib/analytics';
import { hasConsent } from '@/lib/cookieConsent';

interface TrackedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  eventName: string;
  location?: string;
  onClick?: () => void;
}

export function TrackedLink({
  href,
  children,
  className,
  eventName,
  location,
  onClick,
}: TrackedLinkProps) {
  const handleClick = () => {
    if (hasConsent()) {
      analytics.trackButtonClick(eventName, location || window.location.pathname);
      if (href.startsWith('http')) {
        analytics.trackLinkClick(eventName, href);
      }
    }
    onClick?.();
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}

