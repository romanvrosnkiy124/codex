import { telegramContact } from "../lib/contact-content";
import ContactButton from "./ContactButton";
import FinalContactMotion from "./FinalContactMotion";
import { Arrow } from "./LineIcon";
import styles from "./FinalSections.module.css";

export default function FinalContactSection() {
  return (
    <FinalContactMotion>
      <section id="contacts" className={styles.contact} aria-labelledby="contacts-heading">
        <div className={`container ${styles.contactGrid}`}>
          <div>
            <p className={`eyebrow ${styles.eyebrow}`} data-contact-eyebrow>КОНСУЛЬТАЦИЯ</p>
            <h2 id="contacts-heading" className={styles.heading}>
              <span className={styles.headingMask}><span data-contact-heading>Обсудим</span></span>
              <span className={`${styles.headingMask} ${styles.accent}`}><span data-contact-heading>вашу ситуацию?</span></span>
            </h2>
            <p className={styles.supporting} data-contact-copy>Расскажите о вашей ситуации.<br />Я изучу вводные данные и помогу понять возможные варианты дальнейших действий.</p>
          </div>
          <div className={styles.contactRight}>
            <div className={styles.contactDetails} data-contact-details>
              <dl>
                <dt>{telegramContact.label}</dt>
                <dd>{telegramContact.handle}</dd>
              </dl>
              <a className={styles.contactLink} href={telegramContact.url} target="_blank" rel="noopener noreferrer">Написать <Arrow /></a>
            </div>
            <div className={styles.actions} data-contact-actions>
              <ContactButton />
              <a className={styles.contactLink} href={telegramContact.url} target="_blank" rel="noopener noreferrer">Написать в Telegram <Arrow /></a>
            </div>
          </div>
        </div>
      </section>
    </FinalContactMotion>
  );
}
