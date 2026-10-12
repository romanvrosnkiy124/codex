"use client";

import { gsap } from "./gsap";
import { motionConfig as motion } from "./motion-config";

// Primitives own tween values; their scene owns triggers and lifecycle.
export function revealLines(targets: gsap.TweenTarget, vars: gsap.TweenVars = {}) {
  return gsap.fromTo(targets, { yPercent: motion.distances.linePercent }, {
    yPercent: 0, duration: motion.durations.heading, ease: motion.easings.heading,
    stagger: motion.stagger.lines, ...vars,
  });
}

export function revealImage(targets: gsap.TweenTarget, vars: gsap.TweenVars = {}, axis: "x" | "y" = "x") {
  // Keep units identical in every coordinate: mixed %/unitless zeros produce
  // invalid intermediate CSS in GSAP's complex-string interpolation.
  return gsap.fromTo(targets, { clipPath: axis === "y" ? "inset(0% 0% 100% 0%)" : "inset(0% 0% 0% 100%)" }, {
    clipPath: "inset(0% 0% 0% 0%)", duration: motion.durations.image, ease: motion.easings.heading, ...vars,
  });
}

export function fadeUp(targets: gsap.TweenTarget, vars: gsap.TweenVars = {}, distance: number = motion.distances.content) {
  return gsap.fromTo(targets, { opacity: 0, y: distance }, {
    opacity: 1, y: 0, duration: motion.durations.content, ease: motion.easings.content, ...vars,
  });
}

export function staggerGroup(targets: gsap.TweenTarget, vars: gsap.TweenVars = {}, distance: number = motion.distances.content) {
  return fadeUp(targets, { stagger: motion.stagger.cards, ...vars }, distance);
}

export function parallaxImage(targets: gsap.TweenTarget, vars: gsap.TweenVars = {}) {
  return gsap.to(targets, { y: motion.distances.portrait, ease: motion.easings.scroll, ...vars });
}

export function drawLine(targets: gsap.TweenTarget, vars: gsap.TweenVars = {}, axis: "x" | "y" = "x") {
  const scale = axis === "y" ? "scaleY" : "scaleX";
  return gsap.fromTo(targets, { [scale]: 0, transformOrigin: axis === "y" ? "center top" : "left center" }, {
    [scale]: 1, duration: motion.durations.content, ease: motion.easings.content, ...vars,
  });
}
