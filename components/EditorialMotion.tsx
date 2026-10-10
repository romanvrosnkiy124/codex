"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "../lib/gsap";
import styles from "./EditorialSections.module.css";

export default function EditorialMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      if (!root.current) return;
      const select = gsap.utils.selector(root.current);
      const enter = (trigger: Element) => ({ trigger, start: "top 92%", once: true });

      select("[data-editorial-reveal]").forEach((element: Element) => {
        gsap.from(element, { opacity: 0, y: 15, duration: 0.95, ease: "power3.out", scrollTrigger: enter(element) });
      });
      select("[data-editorial-heading]").forEach((line: Element, index: number) => {
        gsap.from(line, { opacity: 0, y: 18, duration: 1.1, delay: (index % 2) * 0.1, ease: "power3.out", scrollTrigger: enter(line) });
      });
      select("[data-editorial-card]").forEach((card: Element, index: number) => {
        const grid = card.parentElement;
        const columns = grid ? getComputedStyle(grid).gridTemplateColumns.split(" ").length : 1;
        const position = grid ? Array.from(grid.children).indexOf(card) : index;
        gsap.from(card, { opacity: 0, y: 18, duration: 1, delay: (position % columns) * 0.09, ease: "power3.out", scrollTrigger: enter(card) });
      });
    }, root);
    return () => media.revert();
  }, []);

  return <div ref={root} className={styles.motionRoot}>{children}</div>;
}
