// The only confirmed contact channel supplied by the site owner.
export const telegramContact = {
  label: "Telegram",
  handle: "@ragimovlaw",
  url: "https://t.me/ragimovlaw",
} as const;

export const maxContact = {
  label: "MAX",
  // TODO: Insert Ruslan's confirmed MAX profile URL here; null keeps the action disabled.
  url: null as string | null,
} as const;

export const footerNavigation = [
  { label: "Обо мне", href: "#about" },
  { label: "Практики", href: "#practices" },
  { label: "Судебная практика", href: "#cases" },
  { label: "Отзывы", href: "#reviews" },
  { label: "СМИ", href: "#media" },
  { label: "Контакты", href: "#contacts" },
] as const;
