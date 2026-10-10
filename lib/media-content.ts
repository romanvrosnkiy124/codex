export type MediaPublication = {
  id: string;
  source: string;
  date: string | null;
  title: string;
  url: string | null;
  verified: boolean;
};

// Neutral publication topics only. No confirmed media appearances, dates or links.
export const publications: MediaPublication[] = [
  {
    id: "contract-risks",
    source: "Юридический комментарий",
    date: null,
    title: "Комментарий по вопросам договорных рисков",
    url: null,
    verified: false,
  },
  {
    id: "business-disputes",
    source: "Экспертное мнение",
    date: null,
    title: "Как защитить интересы бизнеса при споре",
    url: null,
    verified: false,
  },
  {
    id: "registry",
    source: "Правовой разбор",
    date: null,
    title: "Особенности включения в РНП",
    url: null,
    verified: false,
  },
  {
    id: "employment",
    source: "Профессиональная публикация",
    date: null,
    title: "На что обратить внимание работодателю",
    url: null,
    verified: false,
  },
];

export const mediaNotice = "Примеры тем публикаций. Источники, даты и ссылки будут добавлены после подтверждения.";
export const allPublicationsUrl: string | null = null;
