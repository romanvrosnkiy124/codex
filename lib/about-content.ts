import type { IconName } from "../components/LineIcon";

// Prototype values supplied for this stage. Replace here when confirmed.
export const experienceMetrics = [
  { value: ["13+"], description: ["лет", "юридического", "стажа"] },
  { value: ["500+"], description: ["судебных дел", "в практике"] },
  { value: ["Вся Россия"], description: ["география", "сопровождения"] },
  { value: ["Частные клиенты", "и бизнес"], description: ["основные", "направления работы"] },
];

export const careerStages: { date?: string; title: string }[] = [
  { date: "2012–2016", title: "Высшее юридическое образование" },
  { date: "2016–2020", title: "Государственная служба и следственная деятельность" },
  { title: "Работа в коммерческих организациях" },
  { date: "С 2020", title: "Юридическая практика и представительство в судах" },
  { date: "В настоящее время", title: "Ведущий партнёр SUDNOTICE" },
];

export const approachSteps: { number: string; title: string; description: string; icon: IconName }[] = [
  { number: "01", title: "Анализ ситуации", description: "Изучаю документы, оцениваю перспективы и ключевые риски.", icon: "document" },
  { number: "02", title: "Разработка стратегии", description: "Предлагаю варианты решения и согласовываю план действий.", icon: "strategy" },
  { number: "03", title: "Представительство в суде", description: "Полное сопровождение на всех этапах.", icon: "people" },
  { number: "04", title: "Результат", description: "Добиваюсь максимально возможного результата в интересах клиента.", icon: "check" },
];
