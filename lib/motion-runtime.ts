"use client";

import { useLayoutEffect, type RefObject } from "react";
import { gsap, ScrollTrigger } from "./gsap";
import { motionConfig } from "./motion-config";

type Animation = gsap.core.Tween | gsap.core.Timeline;
type Reveal = { animation: Animation; targets: Element[]; trigger: Element; finish: () => void };
const reveals = new Set<Reveal>();
const seen = new WeakSet<Element>();
let refreshFrame = 0;
let restoreFrame = 0;

export function preserveScrollPosition(callback: () => void) {
  const x = window.scrollX;
  const y = window.scrollY;
  callback();
  cancelAnimationFrame(restoreFrame);
  // A no-op refresh must not undo the next frame of an active smooth scroll.
  if (Math.abs(window.scrollY - y) > 0.5 || Math.abs(window.scrollX - x) > 0.5) {
    window.scrollTo({ left: x, top: y, behavior: "instant" });
    restoreFrame = requestAnimationFrame(() => window.scrollTo({ left: x, top: y, behavior: "instant" }));
  }
}

export function requestMotionRefresh() {
  if (refreshFrame) return;
  refreshFrame = requestAnimationFrame(() => {
    refreshFrame = 0;
    // Safe refresh waits for scrollEnd instead of cancelling native smooth scroll.
    preserveScrollPosition(() => { ScrollTrigger.refresh(true); ScrollTrigger.update(); });
  });
}

export function ensureMotionVisible(target: HTMLElement) {
  for (const reveal of Array.from(reveals)) {
    if (target.contains(reveal.trigger) || reveal.targets.some(element => element.contains(target) || target.contains(element))) reveal.finish();
  }
}

export function registerMotionReveal(animation: Animation, targets: Element[], trigger: Element = targets[0]) {
  const record: Reveal = { animation, targets, trigger, finish: () => { animation.totalProgress(1, false); } };
  reveals.add(record);
  const complete = animation.eventCallback("onComplete");
  animation.eventCallback("onComplete", () => {
    seen.add(trigger);
    targets.forEach(element => seen.add(element));
    reveals.delete(record);
    complete?.call(animation);
  });
  return () => reveals.delete(record);
}

export type MotionScope = {
  select: (selector: string) => HTMLElement[];
  conditions: Record<string, boolean>;
  reveal: (targets: gsap.TweenTarget, vars: gsap.TweenVars, trigger: Element, start: string) => gsap.core.Tween | null;
  onceTimeline: (trigger: Element, start: string, build: (timeline: gsap.core.Timeline) => void, vars?: gsap.TimelineVars) => gsap.core.Timeline | null;
  onCleanup: (callback: () => void) => void;
};

// Native media listeners avoid ScrollTrigger's recorded matchMedia scroll reset.
// Completed/in-progress reveals are remembered across responsive rebuilds.
export function useMotionScope(
  root: RefObject<HTMLElement | null>,
  setup: (scope: MotionScope) => void,
  queries: Record<string, string> = {},
) {
  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    const media = Object.entries({ motion: motionConfig.queries.motion, ...queries })
      .map(([name, query]) => [name, window.matchMedia(query)] as const);
    let context: gsap.Context | undefined;
    let cleanups: (() => void)[] = [];
    let disposed = false;
    let rebuilding = false;

    const build = () => {
      const conditions = Object.fromEntries(media.map(([name, query]) => [name, query.matches]));
      if (!conditions.motion || disposed) return;
      context = gsap.context(() => {
        const skip = (trigger: Element) => {
          if (seen.has(trigger)) return true;
          const rect = trigger.getBoundingClientRect();
          if (rect.bottom <= 0 || ((rebuilding || location.hash || window.scrollY > 80) && rect.top < innerHeight)) {
            seen.add(trigger);
            return true;
          }
          return false;
        };
        const attach = (animation: Animation, trigger: Element, start: string, targets: Element[]) => {
          cleanups.push(registerMotionReveal(animation, targets, trigger));
          const complete = animation.eventCallback("onComplete");
          let killFrame = 0;
          const scrollTrigger = ScrollTrigger.create({
            trigger, start, animation, toggleActions: "play none none none",
            // Native once can splice GSAP's trigger array during initial refresh.
            // Defer removal until outside the refresh/update iteration instead.
            onEnter: () => { seen.add(trigger); targets.forEach(target => seen.add(target)); },
          });
          animation.eventCallback("onComplete", () => {
            complete?.call(animation);
            killFrame = requestAnimationFrame(() => scrollTrigger.kill(false, true));
          });
          cleanups.push(() => { cancelAnimationFrame(killFrame); scrollTrigger.kill(false, true); });
          return animation;
        };
        const scope: MotionScope = {
          select: selector => Array.from(element.querySelectorAll<HTMLElement>(selector)),
          conditions,
          onCleanup: callback => { cleanups.push(callback); },
          reveal: (targets, vars, trigger, start) => {
            if (skip(trigger)) return null;
            const nodes = gsap.utils.toArray<Element>(targets);
            const animation = gsap.from(targets, { ...vars, paused: true });
            return attach(animation, trigger, start, nodes) as gsap.core.Tween;
          },
          onceTimeline: (trigger, start, populate, vars = {}) => {
            if (skip(trigger)) return null;
            const timeline = gsap.timeline({ ...vars, paused: true });
            populate(timeline);
            const targets = timeline.getChildren(true, true, false)
              .flatMap(child => (child as gsap.core.Tween).targets())
              .filter((target): target is Element => target instanceof Element);
            return attach(timeline, trigger, start, targets) as gsap.core.Timeline;
          },
        };
        setup(scope);
      }, element);
    };
    const clear = () => {
      cleanups.forEach(cleanup => cleanup());
      cleanups = [];
      context?.revert();
      context = undefined;
    };
    const change = () => preserveScrollPosition(() => { rebuilding = true; clear(); build(); requestMotionRefresh(); });
    const focus = (event: FocusEvent) => {
      if (event.target instanceof HTMLElement) ensureMotionVisible(event.target);
    };
    media.forEach(([, query]) => query.addEventListener("change", change));
    element.addEventListener("focusin", focus);
    build();
    return () => {
      disposed = true;
      media.forEach(([, query]) => query.removeEventListener("change", change));
      element.removeEventListener("focusin", focus);
      clear();
    };
  }, [root]);
}
