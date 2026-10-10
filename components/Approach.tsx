import { approachSteps } from "../lib/about-content";
import { Arrow, LineIcon } from "./LineIcon";
import styles from "./AboutSection.module.css";

export default function Approach() {
  return (
    <section className={styles.approach} aria-labelledby="approach-heading">
      <div className={`container ${styles.approachInner}`}>
        <div className={styles.approachHeading} data-about-reveal>
          <p className="eyebrow">МОЙ ПОДХОД</p>
          <h3 id="approach-heading">Чёткий план<br />и прозрачная работа.</h3>
        </div>
        <ol className={styles.steps}>
          {approachSteps.map(({ number, title, description, icon }, index) => (
            <li key={number} className={styles.step} data-approach-step>
              <div className={styles.stepTop}>
                <LineIcon name={icon} className={styles.stepIcon} data-approach-icon />
                <span className={styles.stepNumber} aria-hidden="true">{number}</span>
                {index < approachSteps.length - 1 && <span className={styles.connector} data-approach-connector><Arrow /></span>}
              </div>
              <div className={styles.stepCopy}>
                <h4>{title}</h4>
                <p>{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
