"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { motionConfig } from "../lib/motion-config";
import { ensureMotionVisible, requestMotionRefresh } from "../lib/motion-runtime";

export default function SmoothScroll() {
  useEffect(() => {
    let lenis: Lenis | null = null;
    let releaseLenis: (() => void) | null = null;
    let anchorFrame = 0;
    let syncFrame = 0;
    let restoreFrame = 0;
    let resizeFrame = 0;
    let disposed = false;
    const motion = window.matchMedia(motionConfig.queries.motion);
    const desktop = window.matchMedia(motionConfig.queries.desktop);
    const menuOpen = () => document.documentElement.dataset.menuOpen === "true";
    const hashTarget = () => {
      if (!location.hash) return null;
      try { return document.getElementById(decodeURIComponent(location.hash.slice(1))); }
      catch { return null; }
    };
    const focusTarget = (target: HTMLElement) => {
      ensureMotionVisible(target);
      const heading = target.querySelector<HTMLElement>("h1, h2, h3") ?? target;
      const temporaryTabIndex = !heading.hasAttribute("tabindex");
      if (temporaryTabIndex) heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
      if (temporaryTabIndex) heading.addEventListener("blur", () => heading.removeAttribute("tabindex"), { once: true });
    };
    const destroyLenis = () => {
      releaseLenis?.();
      releaseLenis = null;
      lenis = null;
    };
    const createLenis = () => {
      if (lenis || !motion.matches || !desktop.matches) return;
      const instance = new Lenis({ duration: motionConfig.scroll.lenisDuration, smoothWheel: true, syncTouch: false, anchors: false });
      lenis = instance;
      const update = () => ScrollTrigger.update();
      const tick = (time: number) => instance.raf(time * 1000);
      instance.on("scroll", update);
      gsap.ticker.add(tick);
      if (menuOpen()) instance.stop();
      releaseLenis = () => {
        gsap.ticker.remove(tick);
        instance.off("scroll", update);
        instance.destroy();
      };
    };
    const onMediaChange = () => {
      const position = { x: window.scrollX, y: window.scrollY };
      cancelAnimationFrame(anchorFrame);
      cancelAnimationFrame(restoreFrame);
      destroyLenis();
      window.scrollTo({ left: position.x, top: position.y, behavior: "instant" });
      createLenis();
      restoreFrame = requestAnimationFrame(() => {
        if (disposed) return;
        window.scrollTo({ left: position.x, top: position.y, behavior: "instant" });
        lenis?.resize();
        if (menuOpen()) lenis?.stop();
        requestMotionRefresh();
      });
    };
    const synchronizeNavigation = () => {
      const target = hashTarget();
      if (target) ensureMotionVisible(target);
      // Cancel a pending smooth tween before the browser restores history scroll.
      lenis?.scrollTo(window.scrollY, { immediate: true, force: true });
      cancelAnimationFrame(syncFrame);
      syncFrame = requestAnimationFrame(() => {
        // Native hash/history restoration can happen after the event dispatch.
        syncFrame = requestAnimationFrame(() => {
          if (disposed) return;
          lenis?.resize();
          requestMotionRefresh();
        });
      });
    };
    const onResize = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        if (disposed) return;
        lenis?.scrollTo(window.scrollY, { immediate: true, force: true });
        lenis?.resize();
        requestMotionRefresh();
      });
    };
    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof HTMLElement)) return;
      ensureMotionVisible(event.target);
      // Keyboard focus can move the native viewport without a wheel event.
      // Synchronize Lenis so its next frame cannot pull the focused item away.
      lenis?.scrollTo(window.scrollY, { immediate: true, force: true });
    };

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
      ensureMotionVisible(target);
      if (location.hash !== url.hash) history.pushState(history.state, "", url.hash);
      cancelAnimationFrame(anchorFrame);
      // React closes the mobile menu and releases its scroll lock before this frame.
      anchorFrame = requestAnimationFrame(() => {
        if (disposed || menuOpen()) return;
        if (lenis) {
          lenis.start();
          // Lenis reads the same root scroll-padding as native anchor navigation.
          lenis.scrollTo(target, { offset: 0, onComplete: () => focusTarget(target) });
        } else {
          target.scrollIntoView({ behavior: motion.matches ? "smooth" : "instant", block: "start" });
          focusTarget(target);
        }
      });
    };
    createLenis();
    synchronizeNavigation();
    motion.addEventListener("change", onMediaChange);
    desktop.addEventListener("change", onMediaChange);
    window.addEventListener("popstate", synchronizeNavigation);
    window.addEventListener("hashchange", synchronizeNavigation);
    window.addEventListener("pageshow", synchronizeNavigation);
    window.addEventListener("load", synchronizeNavigation, { once: true });
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("site:menu", onMenuChange);
    document.addEventListener("click", onAnchorClick);
    document.addEventListener("focusin", onFocus);
    return () => {
      disposed = true;
      cancelAnimationFrame(anchorFrame);
      cancelAnimationFrame(syncFrame);
      cancelAnimationFrame(restoreFrame);
      cancelAnimationFrame(resizeFrame);
      motion.removeEventListener("change", onMediaChange);
      desktop.removeEventListener("change", onMediaChange);
      window.removeEventListener("popstate", synchronizeNavigation);
      window.removeEventListener("hashchange", synchronizeNavigation);
      window.removeEventListener("pageshow", synchronizeNavigation);
      window.removeEventListener("load", synchronizeNavigation);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("click", onAnchorClick);
      document.removeEventListener("focusin", onFocus);
      window.removeEventListener("site:menu", onMenuChange);
      destroyLenis();
    };
  }, []);
  return null;
}
