# Руслан Рагимов

Первый визуальный этап сайта на Next.js с App Router и TypeScript. Менеджер пакетов — npm.
Реализованы интро, шапка, hero, полоса доверия и направления практики по `hero-reference.png`.

## Требования

Node.js 20.9 или новее и npm. Рекомендуется актуальная LTS-версия Node.js.

## Локальный запуск

```bash
npm install
npm run dev
```

Откройте http://localhost:3000.

## Production-сборка

```bash
npm run build
npm start
```

## Структура

- `app/layout.tsx` — корневой layout и метаданные.
- `app/page.tsx` — главная страница.
- `tsconfig.json` — конфигурация TypeScript.
- `next-env.d.ts` — типы Next.js (генерируется Next.js).
- `package-lock.json` — зафиксированные версии зависимостей.

## Визуальный этап

- `components/` — блоки страницы, мобильное меню и анимации.
- `lib/gsap.ts` — GSAP и регистрация ScrollTrigger.
- `app/globals.css` — адаптивная вёрстка, палитра и локальные шрифты.
- `public/fonts/` — Cormorant Garamond и Manrope (WOFF2), с лицензиями.
- `next.config.ts` — разрешённое качество оптимизации изображений.

Анимации используют GSAP и ScrollTrigger, плавный скролл — Lenis.
При `prefers-reduced-motion: reduce` интро, параллакс и плавный скролл отключаются.
Контент доступен и без JavaScript.

Hero использует исходный `public/images/ruslan/ruslan-02.jpg` через Next/Image;
оригинальные изображения не изменены. Кнопки связи ведут на https://t.me/ragimovlaw.
Секции «Обо мне», судебных дел, отзывов и СМИ пока не реализованы;
их пункты меню отображаются без переходов.
