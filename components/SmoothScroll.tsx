"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "../lib/gsap";

export default function SmoothScroll() {
  useEffect(() => {
    let lenis: Lenis | null = null;
    let anchorFrame = 0;
    const motion = gsap.matchMedia();
    const focusTarget = (target: HTMLElement) => {
      const heading = target.querySelector<HTMLElement>("h1, h2, h3") ?? target;
      const temporaryTabIndex = !heading.hasAttribute("tabindex");
      if (temporaryTabIndex) heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
      if (temporaryTabIndex) heading.addEventListener("blur", () => heading.removeAttribute("tabindex"), { once: true });
    };

    motion.add("(prefers-reduced-motion: no-preference)", () => {
      const instance = new Lenis({ duration: 1.05, smoothWheel: true, syncTouch: false, anchors: false });
      lenis = instance;
      const update = () => ScrollTrigger.update();
      const tick = (time: number) => instance.raf(time * 1000);
      instance.on("scroll", update);
      gsap.ticker.add(tick);
      if (document.documentElement.dataset.menuOpen === "true") instance.stop();
      return () => {
        gsap.ticker.remove(tick);
        instance.off("scroll", update);
        instance.destroy();
        lenis = null;
      };
    });

    const onMenuChange = (event: Event) => {
      if ((event as CustomEvent<boolean>).detail) lenis?.stop();
      else lenis?.start();
    };
    const onAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash) return;
      let id: string;
      try { id = decodeURIComponent(url.hash.slice(1)); } catch { return; }
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      if (location.hash !== url.hash) history.pushState(null, "", url.hash);
      cancelAnimationFrame(anchorFrame);
      // React closes the mobile menu and releases its scroll lock before this frame.
      anchorFrame = requestAnimationFrame(() => {
        if (lenis) {
          lenis.start();
          // Lenis reads the same root scroll-padding as native anchor navigation.
          lenis.scrollTo(target, { offset: 0, onComplete: () => focusTarget(target) });
        } else {
          target.scrollIntoView({ behavior: "instant", block: "start" });
          focusTarget(target);
        }
      });
    };
    window.addEventListener("site:menu", onMenuChange);
    document.addEventListener("click", onAnchorClick);
    return () => {
      cancelAnimationFrame(anchorFrame);
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("site:menu", onMenuChange);
      motion.revert();
    };
  }, []);
  return null;
}
