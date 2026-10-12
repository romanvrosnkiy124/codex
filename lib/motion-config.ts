export const motionConfig = {
  durations: { micro: 0.3, ui: 0.45, content: 0.85, heading: 0.9, image: 1.1, intro: 1.8, mobileIntro: 1.5 },
  easings: { content: "power3.out", heading: "power4.out", scroll: "none" },
  distances: { content: 16, mobile: 8, linePercent: 105, trust: 8, heroText: -16, portrait: -10, portraitScale: 1.015 },
  stagger: { lines: 0.09, cards: 0.065, trust: 0.06, mobile: 0.045 },
  starts: { heading: "top 80%", content: "top 82%", image: "top 85%", cards: "top 86%", trust: "top 88%" },
  queries: {
    motion: "(prefers-reduced-motion: no-preference)",
    desktop: "(min-width: 1024px) and (hover: hover) and (pointer: fine)",
    mobile: "(max-width: 767px), (pointer: coarse)",
    compactGrid: "(max-width: 767px)",
  },
  scroll: { lenisDuration: 1.05, scrub: 0.4 },
  phase2: {
    durations: { quote: 0.8, body: 0.8, metric: 0.75, stage: 0.72, approach: 0.72, cardShell: 0.5, cardText: 0.55, mobileImage: 0.75, mobileContent: 0.6 },
    distances: { about: 12, quote: 10, metric: 10, portrait: -10, stage: 10, approach: 10, card: 8 },
    stagger: { body: 0.07, metrics: 0.07, approach: 0.07, cards: 0.065, mobile: 0.045 },
    at: { quote: 0.15, description: 0.08, approachTitle: 0.1, approachBody: 0.18, connector: 0.26, category: 0.14, cardTitle: 0.24, facts: 0.36, cta: 0.56, mobileCategory: 0.1, mobileTitle: 0.18, mobileFacts: 0.28, mobileCta: 0.42 },
    timeline: { start: "top 85%", end: "bottom 35%", stageStart: "top 96%", scrub: 0.4, nodeOpacity: 0.45, nodeScale: 0.86, accentSpan: 0.035 },
  },
} as const;
