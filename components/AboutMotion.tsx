"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "../lib/gsap";
import styles from "./AboutSection.module.css";

export default function AboutMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add({ motion: "(prefers-reduced-motion: no-preference)", vertical: "(max-width: 1000px)" }, (context) => {
      if (!context.conditions?.motion || !root.current) return;
      const select = gsap.utils.selector(root.current);
      const enter = (trigger: Element) => ({ trigger, start: "top 92%", once: true });

      gsap.from(select("[data-about-image]"), {
        clipPath: "inset(0 0 100% 0)", duration: 1.2, ease: "power3.out",
        scrollTrigger: enter(select("[data-about-image]")[0]),
      });
      gsap.from(select("[data-about-quote]"), {
        opacity: 0, y: 16, duration: 1, delay: 0.15, ease: "power3.out",
        scrollTrigger: enter(select("[data-about-quote]")[0]),
      });
      gsap.from(select("[data-about-eyebrow]"), {
        opacity: 0, y: 12, duration: 0.8, ease: "power3.out",
        scrollTrigger: enter(select("[data-about-eyebrow]")[0]),
      });
      select("[data-about-heading-line]").forEach((line: Element, index: number) => {
        gsap.from(line, { opacity: 0, y: 26, duration: 1, delay: index * 0.1, ease: "power3.out", scrollTrigger: enter(line) });
      });
      select("[data-about-copy], [data-about-reveal]").forEach((element: Element) => {
        gsap.from(element, { opacity: 0, y: 16, duration: 0.9, ease: "power3.out", scrollTrigger: enter(element) });
      });
      select("[data-about-metric]").forEach((metric: Element, index: number) => {
        gsap.from(metric, { opacity: 0, y: 12, duration: 0.85, delay: index * 0.07, ease: "power3.out", scrollTrigger: enter(metric) });
      });

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: select("[data-career-timeline]")[0], start: "top 88%", end: "clamp(bottom 58%)", scrub: 0.6 },
      });
      select("[data-career-stage]").forEach((stage: Element, index: number) => {
        const node = stage.querySelector("[data-career-node]");
        const line = stage.querySelector("[data-career-line]");
        const text = stage.querySelectorAll("[data-career-text]");
        timeline.from(node, { opacity: 0, duration: 0.18 }, index);
        timeline.from(text, { opacity: 0, y: 10, duration: 0.8 }, index);
        if (line) timeline.from(line, { [context.conditions?.vertical ? "scaleY" : "scaleX"]: 0, duration: 1 }, index);
      });

      select("[data-approach-step]").forEach((step: Element, index: number) => {
        const reveal = gsap.timeline({ defaults: { ease: "power3.out" }, scrollTrigger: enter(step) });
        reveal.from(step, { opacity: 0, y: 16, duration: 0.9, delay: index * 0.08 });
        reveal.from(step.querySelector("[data-approach-icon]"), { opacity: 0, y: 10, duration: 0.8 }, "<");
        const connector = step.querySelector("[data-approach-connector]");
        if (connector) reveal.from(connector, { scaleX: 0, opacity: 0, transformOrigin: "left", duration: 0.8 }, "<0.15");
      });
    }, root);
    return () => media.revert();
  }, []);

  return <div ref={root} className={styles.motionRoot}>{children}</div>;
}
