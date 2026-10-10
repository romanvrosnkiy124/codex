export type ClientReview = {
  id: string;
  name: string;
  initials: string;
  role: string;
  text: string;
  verified: boolean;
};

// Illustrative copy supplied for the prototype, not confirmed client testimonials.
export const reviews: ClientReview[] = [
  {
    id: "alexey",
    name: "Алексей В.",
    initials: "АВ",
    role: "Предприниматель, Москва",
    text: "Руслан сопровождал спор с подрядчиком. Отдельно отмечу внимательность к деталям, понятную коммуникацию и последовательную работу по делу.",
    verified: false,
  },
  {
    id: "marina",
    name: "Марина К.",
    initials: "МК",
    role: "Клиент, Красноярск",
    text: "Обратилась с трудовым спором. Получила подробное объяснение возможных вариантов и понятный план дальнейших действий.",
    verified: false,
  },
  {
    id: "dmitry",
    name: "Дмитрий С.",
    initials: "ДС",
    role: "Руководитель компании",
    text: "Требовалось разобраться в сложной правовой ситуации. Работа была организована системно и с постоянной обратной связью.",
    verified: false,
  },
];

export const allReviewsUrl: string | null = null;
