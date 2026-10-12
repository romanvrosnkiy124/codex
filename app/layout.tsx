import type { Metadata } from "next";
import type { ReactNode } from "react";
import { isIndexableProduction, SITE_URL, siteConfig } from "../lib/site-config";
import "lenis/dist/lenis.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: siteConfig.social.title,
    template: `%s — ${siteConfig.personName}`,
  },
  description: siteConfig.siteDescription,
  authors: [{ name: siteConfig.personName }],
  creator: siteConfig.personName,
  publisher: siteConfig.personName,
  // Child routes supply their own canonical path (for example, /privacy).
  alternates: { canonical: "/" },
  robots: {
    index: isIndexableProduction,
    follow: isIndexableProduction,
  },
  openGraph: {
    title: siteConfig.social.title,
    description: siteConfig.social.description,
    url: "/",
    siteName: siteConfig.siteName,
    type: "website",
    locale: "ru_RU",
    images: [{
      url: siteConfig.social.image,
      width: siteConfig.social.width,
      height: siteConfig.social.height,
      alt: siteConfig.social.alt,
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.social.title,
    description: siteConfig.social.description,
    images: [{ url: siteConfig.social.image, alt: siteConfig.social.alt }],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
