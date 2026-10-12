"use client";

import { useRef, type ReactNode } from "react";
import { motionConfig as motion } from "../lib/motion-config";
import { fadeUp, revealImage, revealLines } from "../lib/motion-primitives";
import { useMotionScope } from "../lib/motion-runtime";
import styles from "./CasesSection.module.css";

export default function CasesMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useMotionScope(root, (scope) => {
    const select = scope.select;
    const mobile = scope.conditions.mobile;
    const phase = motion.phase2;
    const contentDistance = mobile ? motion.distances.mobile : motion.distances.content;
    const contentDuration = mobile ? phase.durations.mobileContent : motion.durations.content;

    select("[data-cases-intro]").forEach(element => {
      scope.onceTimeline(element, element.classList.contains("eyebrow") ? motion.starts.heading : motion.starts.content, timeline => {
        timeline.add(fadeUp(element, {
          duration: contentDuration, clearProps: "opacity,transform",
        }, contentDistance), 0);
      });
    });
    const lines = select("[data-cases-heading]");
    const heading = lines[0]?.closest("h2");
    if (heading) {
      scope.onceTimeline(heading, motion.starts.heading, timeline => {
        timeline.add(revealLines(lines, { clearProps: "transform" }), 0);
      });
    }

    select("[data-case-card]").forEach((card, index) => {
      const grid = card.parentElement;
      const columns = grid ? getComputedStyle(grid).gridTemplateColumns.split(/\s+/).length : 1;
      const rowOffset = (index % columns) * (mobile ? phase.stagger.mobile : phase.stagger.cards);
      const image = card.querySelector<HTMLElement>("[data-case-image]");
      const category = card.querySelector<HTMLElement>("[data-case-category]");
      const title = card.querySelector<HTMLElement>("[data-case-title]");
      const facts = card.querySelector<HTMLElement>("[data-case-facts]");
      const cta = card.querySelector<HTMLElement>("[data-case-cta]");
      const textDuration = mobile ? phase.durations.mobileContent : phase.durations.cardText;
      const textVars = { duration: textDuration, clearProps: "opacity,transform" };

      scope.onceTimeline(card, motion.starts.cards, timeline => {
        // A single scene owns the shell, mask and content; image hover stays on <img>.
        timeline.add(fadeUp(card, {
          duration: phase.durations.cardShell, clearProps: "opacity,transform",
        }, phase.distances.card), rowOffset);
        if (image) timeline.add(revealImage(image, {
          duration: mobile ? phase.durations.mobileImage : motion.durations.image,
          clearProps: "clipPath",
        }, "y"), rowOffset);
        if (category) timeline.add(fadeUp(category, textVars, phase.distances.card), rowOffset + (mobile ? phase.at.mobileCategory : phase.at.category));
        if (title) timeline.add(fadeUp(title, textVars, phase.distances.card), rowOffset + (mobile ? phase.at.mobileTitle : phase.at.cardTitle));
        if (facts) timeline.add(fadeUp(facts, textVars, phase.distances.card), rowOffset + (mobile ? phase.at.mobileFacts : phase.at.facts));
        if (cta) timeline.add(fadeUp(cta, {
          duration: motion.durations.ui, clearProps: "opacity,transform",
        }, phase.distances.card), rowOffset + (mobile ? phase.at.mobileCta : phase.at.cta));
      });
    });
  }, { tablet: "(max-width: 1199px)", mobile: motion.queries.mobile, compactGrid: motion.queries.compactGrid });

  return <div className={styles.motionRoot} ref={root}>{children}</div>;
}
