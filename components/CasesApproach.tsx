import { caseMethodSteps } from "../lib/cases-content";
import { Arrow, LineIcon } from "./LineIcon";
import styles from "./CasesSection.module.css";

export default function CasesApproach() {
  return (
    <section className={styles.method} aria-labelledby="cases-method-heading" data-cases-method>
      <div className={styles.methodShade} data-method-shade aria-hidden="true" />
      <div className={`container ${styles.methodInner}`}>
        <div className={styles.methodIntro}>
          <div>
            <p className={`eyebrow ${styles.methodEyebrow}`} data-method-reveal>МОЙ ПОДХОД</p>
            <h2 id="cases-method-heading" className={styles.methodHeading}>
              <span className={styles.headingMask}><span data-method-heading>Системный подход</span></span>
              <span className={`${styles.headingMask} ${styles.methodAccent}`}><span data-method-heading>к каждому делу.</span></span>
            </h2>
          </div>
          <p className={styles.methodCopy} data-method-reveal>Я детально изучаю ситуацию, оцениваю перспективы, разрабатываю стратегию и сопровождаю клиента на всех этапах до достижения результата.</p>
        </div>
        <ol className={styles.methodSteps}>
          {caseMethodSteps.map(({ number, title, icon }, index) => (
            <li className={styles.methodStep} key={number} data-method-step>
              <div className={styles.methodStepTop}>
                <span className={styles.methodNumber} aria-hidden="true">{number}</span>
                <LineIcon name={icon} className={styles.methodIcon} />
                {index < caseMethodSteps.length - 1 && <span className={styles.methodConnector} data-method-connector><Arrow /></span>}
              </div>
              <h3>{title}</h3>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
