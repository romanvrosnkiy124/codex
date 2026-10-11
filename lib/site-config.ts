// TODO: Set NEXT_PUBLIC_SITE_URL to the confirmed HTTPS production origin before
// launch. The reserved example.com origin is a placeholder, not a real site URL.
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const parsedSiteUrl = new URL(configuredSiteUrl || "https://example.com");

if (!["http:", "https:"].includes(parsedSiteUrl.protocol) || parsedSiteUrl.username || parsedSiteUrl.password) {
  throw new Error("NEXT_PUBLIC_SITE_URL must be an absolute HTTP(S) site URL without credentials.");
}

export const SITE_URL = parsedSiteUrl.origin;

const placeholderOrLocalDomain =
  /(^|\.)example\.(com|org|net)$/.test(parsedSiteUrl.hostname) ||
  /(^|\.)localhost$/.test(parsedSiteUrl.hostname) ||
  parsedSiteUrl.hostname === "[::1]" ||
  /^127\./.test(parsedSiteUrl.hostname);

// A production build alone is not proof of a public launch: preview deployments
// and an unconfigured domain stay noindex even though Next builds in production.
export const isIndexableProduction = Boolean(
  configuredSiteUrl &&
  parsedSiteUrl.protocol === "https:" &&
  !placeholderOrLocalDomain &&
  process.env.NODE_ENV === "production" &&
  process.env.VERCEL_ENV !== "preview" &&
  process.env.VERCEL_ENV !== "development"
);

export const siteConfig = {
  siteName: "Руслан Рагимов",
  personName: "Руслан Рагимов",
  siteDescription: "Руслан Рагимов — практикующий юрист. Представительство в судах, арбитражные, гражданские, административные и трудовые споры.",
  siteUrl: SITE_URL,
  telegramUrl: "https://t.me/ragimovlaw",
  // TODO: Insert the confirmed MAX profile URL; null keeps MAX non-navigating.
  maxUrl: null as string | null,
  social: {
    title: "Руслан Рагимов — юрист и представитель в судах",
    description: "Представительство в судах и сопровождение юридических споров по всей России.",
    // Reuse the approved local hero crop without modifying the portrait.
    image: "/images/ruslan/ruslan-hero-reference.webp",
    width: 856,
    height: 628,
    alt: "Руслан Рагимов — юрист и представитель в судах",
  },
} as const;
