import { maxContact, telegramContact } from "../lib/contact-content";
import ContactButton from "./ContactButton";
import FinalContactMotion from "./FinalContactMotion";
import { Arrow } from "./LineIcon";
import MessengerIcon from "./MessengerIcon";
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
              <a className={styles.messengerItem} href={telegramContact.url} target="_blank" rel="noopener noreferrer">
                <span className={styles.messengerIcon}><MessengerIcon messenger="telegram" /></span>
                <span className={styles.messengerCopy}>
                  <span className={styles.messengerName}>{telegramContact.label}</span>
                  <span className={styles.messengerHandle}>{telegramContact.handle}</span>
                  <span className={styles.messengerAction}>Написать в Telegram</span>
                </span>
                <span className={styles.messengerArrow}><Arrow /></span>
              </a>
              {maxContact.url ? (
                <a className={styles.messengerItem} href={maxContact.url} target="_blank" rel="noopener noreferrer">
                  <span className={styles.messengerIcon}><MessengerIcon messenger="max" /></span>
                  <span className={styles.messengerCopy}><span className={styles.messengerName}>{maxContact.label}</span><span className={styles.messengerAction}>Написать в MAX</span></span>
                  <span className={styles.messengerArrow}><Arrow /></span>
                </a>
              ) : (
                <button className={styles.messengerItem} type="button" disabled>
                  <span className={styles.messengerIcon}><MessengerIcon messenger="max" /></span>
                  <span className={styles.messengerCopy}><span className={styles.messengerName}>{maxContact.label}</span><span className={styles.messengerAction}>Написать в MAX</span></span>
                  <span className={styles.messengerArrow}><Arrow /></span>
                </button>
              )}
            </div>
            <div className={styles.actions} data-contact-actions>
              <ContactButton />
            </div>
          </div>
        </div>
      </section>
    </FinalContactMotion>
  );
}
