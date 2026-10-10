export type MediaPublication = {
  id: string;
  source: string;
  date: string | null;
  title: string;
  description: string;
  url: string | null;
  verified: boolean;
};

// Commentary items confirmed by the site owner. The supplied links point to
// the source homepage; individual article URLs and dates have not been supplied.
export const publications: MediaPublication[] = [
  {
    id: "zheleznogorsk-mavrodi",
    source: "SUDNOTICE",
    date: null,
    title: "Железногорский «Мавроди»",
    description: "Комментарий ведущего партнёра SUDNOTICE Руслана Рагимова по вынесенному приговору.",
    url: "https://sudnotice.ru/",
    verified: true,
  },
  {
    id: "employee-rights",
    source: "SUDNOTICE",
    date: null,
    title: "Злоупотребление работником трудовыми правами",
    description: "Комментарий Руслана Рагимова по спору бывшего работника с работодателем о взыскании заработной платы.",
    url: "https://sudnotice.ru/",
    verified: true,
  },
];
