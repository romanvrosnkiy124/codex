import { siteConfig } from "./site-config";

// The only confirmed contact channel supplied by the site owner.
export const telegramContact = {
  label: "Telegram",
  handle: "@ragimovlaw",
  url: siteConfig.telegramUrl,
} as const;

export const maxContact = {
  label: "MAX",
  // The confirmed MAX URL will be set centrally in site-config.ts.
  url: siteConfig.maxUrl,
} as const;

export const footerNavigation = [
  { label: "Обо мне", href: "#about" },
  { label: "Практики", href: "#practices" },
  { label: "Судебная практика", href: "#cases" },
  { label: "Отзывы", href: "#reviews" },
  { label: "СМИ", href: "#media" },
  { label: "Контакты", href: "#contacts" },
] as const;
