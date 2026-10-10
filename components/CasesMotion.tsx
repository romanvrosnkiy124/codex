"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "../lib/gsap";
import styles from "./CasesSection.module.css";

export default function CasesMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      if (!root.current) return;
      const select = gsap.utils.selector(root.current);
      const enter = (trigger: Element) => ({ trigger, start: "top 92%", once: true });

      select("[data-cases-intro]").forEach((element: Element) => {
        gsap.from(element, { opacity: 0, y: 16, duration: 0.95, ease: "power3.out", scrollTrigger: enter(element) });
      });
      select("[data-cases-heading]").forEach((line: Element, index: number) => {
        gsap.from(line, { opacity: 0, y: 24, duration: 1.1, delay: (index % 2) * 0.1, ease: "power3.out", scrollTrigger: enter(line) });
      });
      select("[data-case-card]").forEach((card: Element, index: number) => {
        const grid = card.parentElement;
        const columns = grid ? getComputedStyle(grid).gridTemplateColumns.split(" ").length : 1;
        gsap.from(card, { opacity: 0, y: 20, duration: 0.95, delay: (index % columns) * 0.09, ease: "power3.out", scrollTrigger: enter(card) });
      });

    }, root);
    return () => media.revert();
  }, []);

  return <div className={styles.motionRoot} ref={root}>{children}</div>;
}
