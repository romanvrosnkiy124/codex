import type { IconName } from "../components/LineIcon";

export type CaseVisualKind = "architecture" | "contract" | "registry" | "employment";

export type PracticeCase = {
  id: string;
  status: "illustrative";
  category: string;
  title: string;
  overview: string;
  visual: CaseVisualKind;
  summary: { label: string; value: string }[];
  situation: string;
  task: string;
  actions: string;
  result: string;
};

// All entries are illustrative prototypes, not verified matters or outcomes.
// Replace the copy and visuals with confirmed case materials before publication.
export const prototypeCases: PracticeCase[] = [
  {
    id: "debt",
    status: "illustrative",
    category: "Гражданские споры",
    title: "Взыскание задолженности",
    overview: "Документы, расчёты и последовательная правовая позиция в споре об оплате.",
    visual: "architecture",
    summary: [
      { label: "Сумма спора", value: "—" },
      { label: "Результат", value: "Дело завершено в интересах клиента" },
    ],
    situation: "Пример ситуации: между сторонами возникли разногласия по оплате исполненных обязательств.",
    task: "Оценить обоснованность требований и определить возможные способы защиты права на оплату.",
    actions: "В примере предусмотрены анализ договора и расчётов, подготовка претензии и правовой позиции, план представительства.",
    result: "Ориентир — защита права на оплату. Подтверждённый итог реального дела будет добавлен позднее.",
  },
  {
    id: "contract",
    status: "illustrative",
    category: "Арбитражные дела",
    title: "Спор по договорным обязательствам",
    overview: "Внимание к условиям договора, доказательствам исполнения и интересам бизнеса.",
    visual: "contract",
    summary: [
      { label: "Предмет спора", value: "Договорные обязательства" },
      { label: "Результат", value: "Позиция клиента защищена" },
    ],
    situation: "Пример ситуации: стороны по-разному оценивают условия договора и объём исполненных обязательств.",
    task: "Проанализировать условия сделки, оценить риски и сформировать аргументированную позицию.",
    actions: "В примере предусмотрены изучение договора и переписки, систематизация доказательств и подготовка позиции для суда.",
    result: "Ориентир — разрешение разногласий с учётом интересов бизнеса. Подтверждённый итог будет добавлен позднее.",
  },
  {
    id: "fas",
    status: "illustrative",
    category: "Административные дела",
    title: "Спор с ФАС и РНП",
    overview: "Анализ обстоятельств, процедурных требований и аргументов в защиту деловой репутации.",
    visual: "registry",
    summary: [
      { label: "Предмет спора", value: "РНП / ФАС" },
      { label: "Результат", value: "Интересы клиента защищены" },
    ],
    situation: "Пример ситуации: организация оспаривает основания для включения в реестр недобросовестных поставщиков.",
    task: "Оценить обстоятельства и правовые основания, определить порядок защиты интересов организации.",
    actions: "В примере предусмотрены анализ материалов закупки, проверка процедуры и подготовка аргументов и доказательств.",
    result: "Ориентир — защита интересов организации в споре. Подтверждённый итог реального дела будет добавлен позднее.",
  },
  {
    id: "employment",
    status: "illustrative",
    category: "Трудовые споры",
    title: "Защита интересов работодателя",
    overview: "Проверка кадровых документов и взвешенная оценка правовых рисков.",
    visual: "employment",
    summary: [
      { label: "Предмет спора", value: "Трудовой спор" },
      { label: "Результат", value: "Позиция клиента защищена" },
    ],
    situation: "Пример ситуации: между работодателем и сотрудником возникли разногласия по трудовым отношениям.",
    task: "Оценить документы и соблюдение процедуры, определить перспективы защиты позиции работодателя.",
    actions: "В примере предусмотрены изучение кадровых документов, анализ обстоятельств и подготовка правовой позиции.",
    result: "Ориентир — правовая защита интересов работодателя. Подтверждённый итог будет добавлен позднее.",
  },
];

export const caseFields = [
  { key: "situation", label: "Ситуация" },
  { key: "task", label: "Задача" },
  { key: "actions", label: "Что было сделано" },
  { key: "result", label: "Результат" },
] as const;

export const caseMethodSteps: { number: string; title: string; icon: IconName }[] = [
  { number: "01", title: "Анализ ситуации", icon: "document" },
  { number: "02", title: "Оценка перспектив", icon: "scales" },
  { number: "03", title: "Стратегия", icon: "strategy" },
  { number: "04", title: "Представительство и результат", icon: "check" },
];
