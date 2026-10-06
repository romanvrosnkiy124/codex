# Руслан Рагимов

Минимальный проект на Next.js с App Router и TypeScript. Менеджер пакетов — npm.
Главная страница содержит только «Руслан Рагимов» и «Premium legal website».

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

Дизайн, анимации и дополнительные библиотеки пока не добавлены.
