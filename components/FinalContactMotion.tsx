"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "../lib/gsap";
import styles from "./FinalSections.module.css";

export default function FinalContactMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      if (!root.current) return;
      const select = gsap.utils.selector(root.current);
      const eyebrow = select("[data-contact-eyebrow]")[0];
      const details = select("[data-contact-details]")[0];
      const enter = (trigger: Element) => ({ trigger, start: "top 90%", once: true });
      const text = gsap.timeline({ defaults: { ease: "power3.out" }, scrollTrigger: enter(eyebrow) });
      text
        .from(eyebrow, { opacity: 0, y: 15, duration: 0.95 }, 0)
        .from(select("[data-contact-heading]"), { opacity: 0, y: 18, duration: 1.1, stagger: 0.1 }, 0.12)
        .from(select("[data-contact-copy]"), { opacity: 0, y: 15, duration: 1 }, 0.38);
      const contact = gsap.timeline({ defaults: { ease: "power3.out" }, scrollTrigger: enter(details) });
      contact
        .from(details, { opacity: 0, y: 15, duration: 1 }, 0.45)
        .from(select("[data-contact-actions]"), { opacity: 0, y: 15, duration: 1 }, 0.7);
    }, root);
    return () => media.revert();
  }, []);

  return <div ref={root} className={styles.motionRoot}>{children}</div>;
}
