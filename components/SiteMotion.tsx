"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "../lib/gsap";
import { motionConfig as motion } from "../lib/motion-config";
import { drawLine, fadeUp, parallaxImage, revealImage, revealLines, staggerGroup } from "../lib/motion-primitives";
import { registerMotionReveal, requestMotionRefresh, useMotionScope } from "../lib/motion-runtime";

export default function SiteMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const introPlayed = useRef(false);
  const entrance = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const preference = window.matchMedia(motion.queries.motion);
    if (!preference.matches) introPlayed.current = true;
    const interact = () => {
      introPlayed.current = true;
      entrance.current?.totalProgress(1, false);
    };
    const preferenceChange = () => { introPlayed.current = true; };
    const refresh = () => requestMotionRefresh();
    const inputs = ["wheel", "touchstart", "pointerdown", "keydown"] as const;
    inputs.forEach(event => window.addEventListener(event, interact, { passive: true, capture: true }));
    preference.addEventListener("change", preferenceChange);
    window.addEventListener("resize", refresh, { passive: true });
    window.addEventListener("load", refresh, { once: true });
    root.current?.addEventListener("load", refresh, true);
    let active = true;
    document.fonts.ready.then(() => { if (active) refresh(); });
    requestMotionRefresh();
    return () => {
      active = false;
      inputs.forEach(event => window.removeEventListener(event, interact, true));
      preference.removeEventListener("change", preferenceChange);
      window.removeEventListener("resize", refresh);
      window.removeEventListener("load", refresh);
      root.current?.removeEventListener("load", refresh, true);
    };
  }, []);

  useMotionScope(root, scope => {
    const select = scope.select;
    const intro = select("[data-intro]");
    const portrait = select("[data-portrait-image]");
    const mask = select("[data-portrait-mask]");
    const header = select("[data-header]");
    const lines = select("[data-headline-line]");
    const details = select("[data-hero-detail]");
    const actions = select("[data-hero-actions]");
    const trust = select("[data-trust-item]");
    const strip = select("[data-trust]")[0];
    const hero = select("[data-hero]")[0];
    const mobile = scope.conditions.mobile;
    const visibleTrust = strip.getBoundingClientRect().top < innerHeight;
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    const playIntro = !introPlayed.current && !location.hash && scrollY < 80 && navigation?.type !== "back_forward";

    if (playIntro) {
      const sequence = gsap.timeline({ onStart: () => { introPlayed.current = true; } });
      entrance.current = sequence;
      gsap.set(intro, { autoAlpha: 1 });
      sequence
        .add(fadeUp(select("[data-intro] .monogram"), { duration: 0.28 }, 0), 0)
        .add(fadeUp(select(".intro__name"), { duration: 0.3 }, 6), 0.12)
        .add(drawLine(select(".intro__rule"), { duration: 0.3 }), 0.2)
        .to(intro, { clipPath: "inset(0 0 100% 0)", duration: 0.6, ease: motion.easings.heading }, 0.35)
        .set(intro, { autoAlpha: 0 }, 0.95)
        .fromTo(header, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.6)
        .add(revealLines(lines), 0.4)
        .add(revealImage(mask, { duration: 0.9 }), 0.48)
        .fromTo(portrait, { scale: 1.015 }, { scale: 1, duration: 0.95, ease: motion.easings.heading }, 0.48)
        .add(staggerGroup(details.filter(element => !element.classList.contains("hero__rule")), { duration: 0.5, stagger: 0.06 }, mobile ? motion.distances.mobile : 12), 0.9)
        .add(drawLine(select(".hero__rule"), { duration: 0.45 }), 0.9)
        .add(fadeUp(actions, { duration: 0.48 }, mobile ? 6 : 8), 1.12);
      if (visibleTrust) sequence.add(staggerGroup(trust, { duration: 0.4, stagger: motion.stagger.trust }, motion.distances.trust), 1.22);
      sequence.eventCallback("onComplete", () => {
        gsap.set([...header, ...lines, ...details, ...actions, ...portrait, ...(visibleTrust ? trust : [])], { clearProps: "opacity,visibility,transform" });
        gsap.set(mask, { clearProps: "clipPath" });
        entrance.current = null;
      });
      scope.onCleanup(registerMotionReveal(sequence, [...header, ...lines, ...details, ...actions, ...mask, ...portrait, ...(visibleTrust ? [strip, ...trust] : [])], hero));
      scope.onCleanup(() => { entrance.current = null; });
      if (mobile) sequence.timeScale(sequence.duration() / motion.durations.mobileIntro);
    } else {
      introPlayed.current = true;
    }

    if (!visibleTrust) scope.reveal(trust, {
      opacity: 0, y: motion.distances.trust, duration: motion.durations.content,
      stagger: mobile ? motion.stagger.mobile : motion.stagger.trust, ease: motion.easings.content,
    }, strip, motion.starts.trust);
    const heading = select("[data-practice-heading]")[0];
    scope.reveal(heading, { opacity: 0, y: mobile ? motion.distances.mobile : motion.distances.content, duration: motion.durations.content, ease: motion.easings.content }, heading, motion.starts.heading);
    const grid = select(".practice-grid")[0];
    const columns = getComputedStyle(grid).gridTemplateColumns.split(/\s+/).length;
    select("[data-practice-card]").forEach((card, index) => scope.reveal(card, {
      opacity: 0, y: mobile ? motion.distances.mobile : motion.distances.content,
      duration: motion.durations.content, ease: motion.easings.content,
      delay: Math.min((index % columns) * (mobile ? motion.stagger.mobile : motion.stagger.cards), 0.3),
    }, card, motion.starts.cards));

    if (scope.conditions.desktop) {
      const scroll = gsap.timeline({ scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: motion.scroll.scrub } });
      scroll.add(parallaxImage(select("[data-portrait-parallax]"), { scale: motion.distances.portraitScale, transformOrigin: "center bottom", duration: 1 }), 0)
        .to(select("[data-hero-content]"), { y: motion.distances.heroText, duration: 1, ease: motion.easings.scroll }, 0);
    }
    requestMotionRefresh();
  }, { desktop: motion.queries.desktop, mobile: motion.queries.mobile, compactGrid: motion.queries.compactGrid, tabletGrid: "(max-width: 1199px)", singleGrid: "(max-width: 359px)" });

  return <div ref={root} className="site-shell">{children}</div>;
}
