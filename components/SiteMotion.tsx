"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";

export default function SiteMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add({ motion: "(prefers-reduced-motion: no-preference)", desktop: "(min-width: 768px)" }, (context) => {
      if (!context.conditions?.motion || !root.current) return;
      const select = gsap.utils.selector(root.current);
      const intro = select("[data-intro]");
      const portrait = select("[data-portrait-image]");
      const mask = select("[data-portrait-mask]");
      const header = select("[data-header]");
      const eyebrow = select("[data-hero-eyebrow]");
      const lines = select("[data-headline-line]");
      const details = select("[data-hero-detail]");
      const actions = select("[data-hero-actions]");
      const trust = select("[data-trust-item]");
      const atTop = window.scrollY < 80;
      const trustInitiallyVisible = select("[data-trust]")[0].getBoundingClientRect().top < window.innerHeight;

      if (atTop) {
        gsap.set(intro, { autoAlpha: 1 });
        gsap.set(select("[data-intro-brand]"), { autoAlpha: 0, y: 10 });
        gsap.set([header, eyebrow, details, actions], { autoAlpha: 0, y: 14 });
        gsap.set(lines, { yPercent: 108 });
        gsap.set(portrait, { scale: 1.04 });
        gsap.set(mask, { clipPath: "inset(0 0 0 100%)" });
        const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
        timeline
          .to(select("[data-intro-brand]"), { autoAlpha: 1, y: 0, duration: 0.45 }, 0.08)
          .to(intro, { clipPath: "inset(0 0 100% 0)", duration: 0.85, ease: "power4.inOut" }, 0.65)
          .set(intro, { autoAlpha: 0 }, 1.5)
          .to(header, { autoAlpha: 1, y: 0, duration: 0.65, clearProps: "transform,opacity,visibility" }, 0.95)
          .to(mask, { clipPath: "inset(0 0 0 0)", duration: 1.1, ease: "power4.out" }, 0.8)
          .to(portrait, { scale: 1, duration: 1.55 }, 0.8)
          .to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.65 }, 1.02)
          .to(lines, { yPercent: 0, duration: 0.95, stagger: 0.12, ease: "power4.out" }, 1.12)
          .to(details, { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.1 }, 1.7)
          .to(actions, { autoAlpha: 1, y: 0, duration: 0.75 }, 2.08);
      }

      gsap.from(trust, { autoAlpha: 0, y: 10, duration: 0.8, stagger: 0.08, delay: atTop && trustInitiallyVisible ? 2.55 : 0, scrollTrigger: { trigger: select("[data-trust]")[0], start: "top 95%", once: true } });
      gsap.from(select("[data-practice-heading]"), { autoAlpha: 0, y: 16, duration: 0.85, scrollTrigger: { trigger: select("[data-practices]")[0], start: "top 90%", once: true } });
      // Animate cards separately so all remain visible during keyboard navigation and on tall pages.
      select("[data-practice-card]").forEach((card: Element, index: number) => {
        gsap.from(card, { opacity: 0, y: 18, duration: 0.85, delay: (index % (context.conditions?.desktop ? 6 : 2)) * 0.065, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 96%", once: true } });
      });
      if (context.conditions?.desktop) {
        gsap.to(select("[data-portrait-parallax]"), { y: -10, ease: "none", scrollTrigger: { trigger: select("[data-hero]")[0], start: "top top", end: "bottom top", scrub: 0.8 } });
        gsap.to(select("[data-hero-content]"), { y: -16, ease: "none", scrollTrigger: { trigger: select("[data-hero]")[0], start: "top top", end: "bottom top", scrub: 0.8 } });
      }
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh, { once: true });
      document.fonts.ready.then(() => { if (root.current) refresh(); });
      return () => window.removeEventListener("load", refresh);
    }, root);
    return () => media.revert();
  }, []);

  return <div ref={root} className="site-shell">{children}</div>;
}
