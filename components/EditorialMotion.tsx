"use client";

import { useRef, type ReactNode } from "react";
import { useMotionScope } from "../lib/motion-runtime";
import styles from "./EditorialSections.module.css";

export default function EditorialMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useMotionScope(root, (scope) => {
    const select = scope.select;

    select("[data-editorial-reveal]").forEach((element: Element) => {
      scope.reveal(element, { opacity: 0, y: 15, duration: 0.95, ease: "power3.out" }, element, "top 92%");
    });
    select("[data-editorial-heading]").forEach((line: Element, index: number) => {
      scope.reveal(line, { opacity: 0, y: 18, duration: 1.1, delay: (index % 2) * 0.1, ease: "power3.out" }, line, "top 92%");
    });
    select("[data-editorial-card]").forEach((card: Element, index: number) => {
      const grid = card.parentElement;
      const columns = grid ? getComputedStyle(grid).gridTemplateColumns.split(" ").length : 1;
      const position = grid ? Array.from(grid.children).indexOf(card) : index;
      scope.reveal(card, { opacity: 0, y: 18, duration: 1, delay: (position % columns) * 0.09, ease: "power3.out" }, card, "top 92%");
    });
  }, { tablet: "(max-width: 1199px)", mobile: "(max-width: 767px)" });

  return <div ref={root} className={styles.motionRoot}>{children}</div>;
}
