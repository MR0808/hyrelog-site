import { siteMetadata } from '@/lib/siteMetadata';

interface SiteStructuredDataProps {
  currentPath?: string;
}

export function SiteStructuredData({ currentPath = '/' }: SiteStructuredDataProps) {
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact' },
  ];

  // BreadcrumbList for current page
  const breadcrumbs = [
    { name: 'Home', url: siteMetadata.siteUrl },
  ];

  if (currentPath !== '/') {
    const pathParts = currentPath.split('/').filter(Boolean);
    pathParts.forEach((part, index) => {
      const url = `${siteMetadata.siteUrl}/${pathParts.slice(0, index + 1).join('/')}`;
      const name = part
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      breadcrumbs.push({ name, url });
    });
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      // Organization (enhanced)
      {
        '@type': 'Organization',
        '@id': `${siteMetadata.siteUrl}/#organization`,
        name: 'HyreLog',
        url: siteMetadata.siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${siteMetadata.siteUrl}/HyreLogLogoLight.png`,
          width: 1200,
          height: 400,
        },
        image: `${siteMetadata.siteUrl}/HyreLogLogoLight.png`,
        description: siteMetadata.description,
        foundingDate: '2024',
        founder: {
          '@type': 'Person',
          name: 'Mark Rosenberg',
          jobTitle: 'Founder',
          url: `${siteMetadata.siteUrl}/about`,
        },
        sameAs: [
          siteMetadata.linkedin,
          'https://twitter.com/hyrelog',
          'https://github.com/hyrelog',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Customer Service',
          url: `${siteMetadata.siteUrl}/contact`,
        },
      },
      // WebSite with SiteLinks
      {
        '@type': 'WebSite',
        '@id': `${siteMetadata.siteUrl}/#website`,
        url: siteMetadata.siteUrl,
        name: 'HyreLog',
        alternateName: 'HyreLog Audit Trail API',
        publisher: {
          '@id': `${siteMetadata.siteUrl}/#organization`,
        },
        description: siteMetadata.description,
        inLanguage: 'en-AU',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${siteMetadata.siteUrl}/blog?search={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
      // SiteNavigationElement for site links
      {
        '@type': 'SiteNavigationElement',
        '@id': `${siteMetadata.siteUrl}/#main-navigation`,
        name: 'Main Navigation',
        hasPart: navLinks.map((link) => ({
          '@type': 'SiteNavigationElement',
          name: link.label,
          url: `${siteMetadata.siteUrl}${link.href}`,
        })),
      },
      // BreadcrumbList for current page
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteMetadata.siteUrl}${currentPath}#breadcrumb`,
        itemListElement: breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: crumb.url,
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

