import React from 'react';
import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://yusklussenbedrijf.nl';

export default function SEO({
  title = 'YUS Klussenbedrijf | Renovatie, Stucwerk & Schilderwerk in Nederland',
  description = 'YUS Klussenbedrijf helpt met renovatie, stucwerk, schilderwerk, badkamers, vloeren, veranda\'s en complete verbouwingen. Vraag vrijblijvend een offerte aan.',
  canonical = '/',
  type = 'website',
  imageUrl = `${BASE_URL}/og-image.jpg`,
}) {
  const fullTitle = title.includes('YUS Klussenbedrijf') ? title : `${title} | YUS Klussenbedrijf`;
  const fullUrl = `${BASE_URL}${canonical}`;

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="YUS Klussenbedrijf" />
      <meta property="og:locale" content="nl_NL" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Extra */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
    </Helmet>
  );
}
