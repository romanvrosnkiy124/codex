"use client";

import { useRef, type ReactNode } from "react";
import { useMotionScope } from "../lib/motion-runtime";
import styles from "./FinalSections.module.css";

export default function FinalContactMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useMotionScope(root, (scope) => {
    const select = scope.select;
    const eyebrow = select("[data-contact-eyebrow]")[0];
    const details = select("[data-contact-details]")[0];
    scope.onceTimeline(eyebrow, "top 90%", (text) => {
      text
        .from(eyebrow, { opacity: 0, y: 15, duration: 0.95 }, 0)
        .from(select("[data-contact-heading]"), { opacity: 0, y: 18, duration: 1.1, stagger: 0.1 }, 0.12)
        .from(select("[data-contact-copy]"), { opacity: 0, y: 15, duration: 1 }, 0.38);
    }, { defaults: { ease: "power3.out" } });
    scope.onceTimeline(details, "top 90%", (contact) => {
      contact
        .from(details, { opacity: 0, y: 15, duration: 1 }, 0.45)
        .from(select("[data-contact-actions]"), { opacity: 0, y: 15, duration: 1 }, 0.7);
    }, { defaults: { ease: "power3.out" } });
  });

  return <div ref={root} className={styles.motionRoot}>{children}</div>;
}
