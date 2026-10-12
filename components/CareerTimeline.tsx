import { careerStages } from "../lib/about-content";
import styles from "./AboutSection.module.css";

export default function CareerTimeline() {
  return (
    <section className={`container ${styles.career}`} aria-labelledby="career-heading">
      <h3 id="career-heading" className={styles.careerHeading} data-about-reveal>Ключевые этапы</h3>
      <ol className={styles.timeline} data-career-timeline>
        {careerStages.map(({ date, title }, index) => (
          <li key={title} className={styles.careerStage} data-career-stage>
            <span className={styles.careerDate} data-career-text aria-hidden={date ? undefined : true}>{date}</span>
            <span className={styles.node} data-career-node aria-hidden="true" />
            {index < careerStages.length - 1 && (
              <span className={styles.track} aria-hidden="true"><span className={styles.progress} data-career-line /></span>
            )}
            <p className={styles.careerTitle} data-career-text>{title}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
