"use client";

import { useEffect, useRef, useState } from "react";
import ContactButton from "./ContactButton";
import Monogram from "./Monogram";

const navigation = ["Обо мне", "Практики", "Судебная практика", "Отзывы", "СМИ", "Контакты"];

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
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menu.current?.querySelector<HTMLAnchorElement>("a")?.focus();
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
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className={`site-header${scrolled ? " site-header--scrolled" : ""}${open ? " site-header--open" : ""}`} data-header>
      <div className="container site-header__inner">
        <a href="#top" className="brand" aria-label="Руслан Рагимов — на главную" onClick={() => setOpen(false)}>
          <Monogram />
          <span className="brand__copy"><span className="brand__name">РУСЛАН РАГИМОВ</span><span className="brand__caption">ЮРИСТ | ПРЕДСТАВИТЕЛЬ В СУДАХ</span></span>
        </a>
        <nav className="desktop-nav" aria-label="Основная навигация">
          {navigation.map((label) => label === "Практики" ? <a href="#practices" key={label}>{label}</a> : label === "Контакты" ? <a key={label} href="https://t.me/ragimovlaw" target="_blank" rel="noopener noreferrer">{label}</a> : <span key={label} aria-disabled="true">{label}</span>)}
        </nav>
        <div className="site-header__contact"><ContactButton compact /></div>
        <button ref={menuButton} type="button" className="menu-toggle" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Закрыть меню" : "Открыть меню"} onClick={() => setOpen(!open)}><span /><span /></button>
      </div>
      <nav ref={menu} id="mobile-navigation" className="mobile-nav" hidden={!open} aria-label="Мобильная навигация" data-lenis-prevent>
        {navigation.map((label) => label === "Практики" ? <a key={label} href="#practices" onClick={() => { setOpen(false); menuButton.current?.focus(); }}>{label}</a> : label === "Контакты" ? <a key={label} href="https://t.me/ragimovlaw" target="_blank" rel="noopener noreferrer">{label}</a> : <span key={label} aria-disabled="true">{label}</span>)}
        <ContactButton />
      </nav>
    </header>
  );
}
