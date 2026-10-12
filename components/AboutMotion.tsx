"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "../lib/gsap";
import { motionConfig as motion } from "../lib/motion-config";
import { drawLine, fadeUp, parallaxImage, revealImage, revealLines, staggerGroup } from "../lib/motion-primitives";
import { useMotionScope } from "../lib/motion-runtime";
import styles from "./AboutSection.module.css";

export default function AboutMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useMotionScope(root, (scope) => {
    const select = scope.select;
    const phase = motion.phase2;
    const mobile = scope.conditions.mobile;
    const distance = mobile ? motion.distances.mobile : phase.distances.about;
    const image = select("[data-about-image]")[0];
    const quote = select("[data-about-quote]")[0];

    scope.onceTimeline(image, motion.starts.image, (reveal) => {
      reveal.add(revealImage(image, {
        duration: mobile ? phase.durations.mobileImage : motion.durations.image,
      }, "y"), 0);
      if (!scope.conditions.vertical) {
        reveal.add(fadeUp(quote, { duration: phase.durations.quote }, phase.distances.quote), phase.at.quote);
      }
    });

    // In the stacked layout the quote arrives after the tall portrait, so it has
    // its own entrance instead of completing while it is still below the screen.
    if (scope.conditions.vertical) {
      scope.onceTimeline(quote, motion.starts.content, (reveal) => {
        reveal.add(fadeUp(quote, {
          duration: mobile ? phase.durations.mobileContent : phase.durations.quote,
        }, mobile ? motion.distances.mobile : phase.distances.quote), phase.at.quote);
      });
    }

    if (scope.conditions.desktop) {
      // Animate only translation; GSAP retains the approved CSS scale(.94).
      // The quote is a sibling of this image and does not inherit the movement.
      parallaxImage(select("[data-about-image] img"), {
        y: phase.distances.portrait,
        scrollTrigger: { trigger: image, start: "top bottom", end: "bottom top", scrub: motion.scroll.scrub },
      });
    }

    const eyebrow = select("[data-about-eyebrow]")[0];
    scope.onceTimeline(eyebrow, motion.starts.heading, (reveal) => {
      reveal
        .add(fadeUp(eyebrow, {
          duration: mobile ? phase.durations.mobileContent : phase.durations.body,
        }, distance), 0)
        .add(revealLines(select("[data-about-heading-line]")), phase.at.description)
        .add(staggerGroup(select("[data-about-copy]"), {
          duration: mobile ? phase.durations.mobileContent : phase.durations.body,
          stagger: mobile ? phase.stagger.mobile : phase.stagger.body,
        }, distance), phase.at.description * 2);
    });

    const metrics = select("[data-about-metric]");
    const metricGrid = metrics[0].parentElement!;
    const metricColumns = getComputedStyle(metricGrid).gridTemplateColumns.split(/\s+/).length;
    for (let index = 0; index < metrics.length; index += metricColumns) {
      const row = metrics.slice(index, index + metricColumns);
      scope.onceTimeline(row[0], motion.starts.content, (reveal) => {
        reveal.add(staggerGroup(row, {
          duration: mobile ? phase.durations.mobileContent : phase.durations.metric,
          stagger: mobile ? phase.stagger.mobile : phase.stagger.metrics,
        }, mobile ? motion.distances.mobile : phase.distances.metric));
      });
    }

    const careerHeading = select("#career-heading")[0];
    scope.onceTimeline(careerHeading, motion.starts.heading, (reveal) => {
      reveal.add(fadeUp(careerHeading, {
        duration: motion.durations.heading, ease: motion.easings.heading,
      }, mobile ? motion.distances.mobile : phase.distances.stage));
    });

    // Only decoration follows scroll progress. Stage copy is revealed once by
    // its own visible stage and remains readable when the visitor scrolls back.
    const stages = select("[data-career-stage]");
    const nodes = select("[data-career-node]");
    const nodeTweens: { index: number; tween: gsap.core.Tween }[] = [];
    const lineTweens: { index: number; tween: gsap.core.Tween }[] = [];
    const nodePositions = () => {
      const centers = nodes.map(node => {
        const bounds = node.getBoundingClientRect();
        return scope.conditions.vertical ? bounds.top + bounds.height / 2 : bounds.left + bounds.width / 2;
      });
      const length = Math.max(1, centers[centers.length - 1] - centers[0]);
      return centers.map(center => (center - centers[0]) / length);
    };
    const remapDecoration = (animation: gsap.core.Timeline) => {
      // The first refresh can precede population of the timeline. Later font or
      // viewport refreshes reuse the same tweens with measured node geometry.
      if (!nodeTweens.length) return;
      const positions = nodePositions();
      nodeTweens.forEach(({ index, tween }) => {
        const span = Math.min(phase.timeline.accentSpan, positions[index]);
        tween.duration(span).startTime(positions[index] - span);
      });
      lineTweens.forEach(({ index, tween }) => {
        tween.duration(positions[index + 1] - positions[index]).startTime(positions[index]);
      });
      animation.render(animation.time(), true, true);
    };
    gsap.set(nodes, { opacity: phase.timeline.nodeOpacity, scale: phase.timeline.nodeScale });
    gsap.set(nodes[0], { opacity: 1, scale: 1 });
    const timeline = gsap.timeline({
      defaults: { ease: motion.easings.scroll },
      scrollTrigger: {
        trigger: select("[data-career-timeline]")[0],
        start: phase.timeline.start, end: phase.timeline.end, scrub: phase.timeline.scrub,
        onRefresh: (trigger) => remapDecoration(trigger.animation as gsap.core.Timeline),
      },
    });
    const positions = nodePositions();
    stages.forEach((stage, index) => {
      const node = stage.querySelector("[data-career-node]");
      const line = stage.querySelector("[data-career-line]");
      if (index > 0) {
        const span = Math.min(phase.timeline.accentSpan, positions[index]);
        const tween = gsap.fromTo(node, {
          opacity: phase.timeline.nodeOpacity, scale: phase.timeline.nodeScale,
        }, { opacity: 1, scale: 1, duration: span, ease: motion.easings.scroll });
        timeline.add(tween, positions[index] - span);
        nodeTweens.push({ index, tween });
      }
      if (line) {
        const tween = drawLine(line, {
          duration: positions[index + 1] - positions[index], ease: motion.easings.scroll,
        }, scope.conditions.vertical ? "y" : "x");
        timeline.add(tween, positions[index]);
        lineTweens.push({ index, tween });
      }
    });
    remapDecoration(timeline);
    // Populate the decorative timeline before creating subsequent triggers,
    // whose initial refresh can inspect the preceding scrub animation.
    stages.forEach(stage => {
      const text = Array.from(stage.querySelectorAll<HTMLElement>("[data-career-text]"))
        .filter(element => element.textContent?.trim());
      scope.onceTimeline(stage, phase.timeline.stageStart, (reveal) => {
        reveal.add(staggerGroup(text, {
          duration: mobile ? phase.durations.mobileContent : phase.durations.stage,
          stagger: phase.at.description,
        }, mobile ? motion.distances.mobile : phase.distances.stage));
      });
    });

    const approachHeading = select("[data-about-reveal]").find(element => element.id !== "career-heading")!;
    scope.onceTimeline(approachHeading, motion.starts.heading, (reveal) => {
      reveal.add(staggerGroup(Array.from(approachHeading.children), {
        duration: mobile ? phase.durations.mobileContent : motion.durations.heading,
        stagger: motion.stagger.lines, ease: motion.easings.heading,
      }, mobile ? motion.distances.mobile : phase.distances.approach));
    });

    const steps = select("[data-approach-step]");
    const stepColumns = getComputedStyle(steps[0].parentElement!).gridTemplateColumns.split(/\s+/).length;
    steps.forEach((step, index) => {
      scope.onceTimeline(step, motion.starts.content, (reveal) => {
        reveal
          .add(fadeUp([
            step.querySelector("[data-approach-number]"),
            step.querySelector("[data-approach-icon]"),
          ], { duration: motion.durations.ui }, mobile ? motion.distances.mobile : phase.distances.approach), 0)
          .add(fadeUp(step.querySelector("[data-approach-title]"), {
            duration: mobile ? phase.durations.mobileContent : phase.durations.approach,
          }, mobile ? motion.distances.mobile : phase.distances.approach), phase.at.approachTitle)
          .add(fadeUp(step.querySelector("[data-approach-copy]"), {
            duration: mobile ? phase.durations.mobileContent : phase.durations.body,
          }, mobile ? motion.distances.mobile : phase.distances.approach), phase.at.approachBody);
        const connector = step.querySelector("[data-approach-connector]");
        if (connector && getComputedStyle(connector).display !== "none") {
          reveal.add(drawLine(connector, { duration: motion.durations.ui }), phase.at.connector);
        }
      }, { delay: (index % stepColumns) * (mobile ? phase.stagger.mobile : phase.stagger.approach) });
    });
  }, {
    vertical: "(max-width: 1000px)", metricsRows: "(max-width: 1279px)",
    compactGrid: motion.queries.compactGrid, desktop: motion.queries.desktop, mobile: motion.queries.mobile,
  });

  return <div ref={root} className={styles.motionRoot}>{children}</div>;
}
