"use client";

import { useEffect, useRef, useState } from "react";
import ContactButton from "./ContactButton";
import Monogram from "./Monogram";

import { footerNavigation as navigation } from "../lib/contact-content";
import { siteConfig } from "../lib/site-config";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previousOverflow = document.body.style.overflow;
    const previousRootOverflow = root.style.overflow;
    const previousMenuOpen = root.dataset.menuOpen;
    const background = Array.from(document.querySelectorAll<HTMLElement>("main, .site-shell > footer"));
    const previousInert = background.map((element) => element.inert);
    document.body.style.overflow = "hidden";
    root.style.overflow = "hidden";
    root.dataset.menuOpen = "true";
    background.forEach((element) => { element.inert = true; });
    window.dispatchEvent(new CustomEvent("site:menu", { detail: true }));
    menu.current?.querySelector<HTMLAnchorElement>("a")?.focus({ preventScroll: true });
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
      if (event.key === "Tab") {
        const focusable = [menuButton.current, ...Array.from(menu.current?.querySelectorAll<HTMLAnchorElement>("a") ?? [])].filter(Boolean) as HTMLElement[];
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    const onResize = () => { if (window.innerWidth >= 1200) setOpen(false); };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      root.style.overflow = previousRootOverflow;
      if (previousMenuOpen === undefined) delete root.dataset.menuOpen;
      else root.dataset.menuOpen = previousMenuOpen;
      background.forEach((element, index) => { element.inert = previousInert[index]; });
      window.dispatchEvent(new CustomEvent("site:menu", { detail: false }));
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className={`site-header${scrolled ? " site-header--scrolled" : ""}${open ? " site-header--open" : ""}`} data-header>
      <div className="container site-header__inner">
        <a href="#top" className="brand" aria-label={`${siteConfig.personName} — на главную`} onClick={() => setOpen(false)}>
          <Monogram />
          <span className="brand__copy"><span className="brand__name">{siteConfig.personName.toLocaleUpperCase("ru-RU")}</span><span className="brand__caption">ЮРИСТ | ПРЕДСТАВИТЕЛЬ В СУДАХ</span></span>
        </a>
        <nav className="desktop-nav" aria-label="Основная навигация">
          {navigation.map(({ label, href }) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <div className="site-header__contact"><ContactButton compact /></div>
        <button ref={menuButton} type="button" className="menu-toggle" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Закрыть меню" : "Открыть меню"} onClick={() => setOpen(!open)}><span /><span /></button>
      </div>
      <nav ref={menu} id="mobile-navigation" className="mobile-nav" hidden={!open} aria-label="Мобильная навигация" data-lenis-prevent>
        {navigation.map(({ label, href }) => <a key={href} href={href} onClick={() => { setOpen(false); menuButton.current?.focus(); }}>{label}</a>)}
        <ContactButton onClick={() => { setOpen(false); menuButton.current?.focus(); }} />
      </nav>
    </header>
  );
}
