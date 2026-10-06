import type { Metadata } from "next";
import type { ReactNode } from "react";
import "lenis/dist/lenis.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Руслан Рагимов — юрист и представитель в судах",
  description: "Судебные споры, арбитраж, административные и трудовые дела. Представительство интересов частных клиентов и бизнеса по всей России.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
