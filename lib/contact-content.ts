import { siteConfig } from "./site-config";

// Confirmed messenger contacts supplied by the site owner.
export const telegramContact = {
  label: "Telegram",
  handle: "@ragimovlaw",
  url: siteConfig.telegramUrl,
} as const;

export const whatsappContact = {
  label: "WhatsApp",
  url: siteConfig.whatsappUrl,
} as const;

export const footerNavigation = [
  { label: "Обо мне", href: "#about" },
  { label: "Практики", href: "#practices" },
  { label: "Судебная практика", href: "#cases" },
  { label: "Отзывы", href: "#reviews" },
  { label: "СМИ", href: "#media" },
  { label: "Контакты", href: "#contacts" },
] as const;
