import { siteConfig } from "../lib/site-config";
import { footerNavigation, telegramContact } from "../lib/contact-content";
import Monogram from "./Monogram";
import styles from "./FinalSections.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerMain}>
          <a className={styles.brand} href="#top" aria-label={`${siteConfig.personName} — на главную`}>
            <Monogram />
            <span className={styles.brandCopy}>
              <span className={styles.brandName}>{siteConfig.personName}</span>
              <span className={styles.brandRole}>Юрист | Представитель в судах</span>
            </span>
          </a>
          <nav aria-label="Навигация в подвале">
            <ul className={styles.navigation}>
              {footerNavigation.map(({ label, href }) => <li key={href}><a href={href}>{label}</a></li>)}
            </ul>
          </nav>
          <div className={styles.footerContact}>
            <p>{telegramContact.label}</p>
            <a href={telegramContact.url} target="_blank" rel="noopener noreferrer">{telegramContact.handle}</a>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>© 2026 {siteConfig.personName}</p>
          <a href="/privacy">Политика конфиденциальности</a>
        </div>
      </div>
    </footer>
  );
}
