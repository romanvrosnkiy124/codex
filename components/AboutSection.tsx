import Image from "next/image";
import { experienceMetrics } from "../lib/about-content";
import AboutMotion from "./AboutMotion";
import Approach from "./Approach";
import CareerTimeline from "./CareerTimeline";
import styles from "./AboutSection.module.css";

export default function AboutSection() {
  return (
    <AboutMotion>
      <section id="about" className={styles.about} aria-labelledby="about-heading">
        <div className={`container ${styles.lead}`}>
          <figure className={styles.portrait}>
            <div className={styles.imageFrame} data-about-image>
              <Image
                src="/images/ruslan/ruslan-01.jpg"
                alt="Руслан Рагимов в синем костюме"
                fill
                sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 1000px) 560px, (max-width: 1440px) 43vw, 640px"
                quality={85}
                className={styles.image}
              />
            </div>
            <figcaption className={styles.quote} data-about-quote>
              <span className={styles.quoteMark} aria-hidden="true">“</span>
              <blockquote>«Моя задача — не просто участвовать в процессе, а добиваться реального результата для клиента.»</blockquote>
              <span className={styles.quoteEnd} aria-hidden="true"><span className={styles.quoteMark}>”</span></span>
            </figcaption>
          </figure>

          <div className={styles.copy}>
            <p className="eyebrow" data-about-eyebrow>ОБО МНЕ</p>
            <h2 id="about-heading" className={styles.heading}>
              <span className={styles.lineMask}><span data-about-heading-line>Опыт, который</span></span>
              <span className={`${styles.lineMask} ${styles.accent}`}><span data-about-heading-line>работает на ваш результат.</span></span>
            </h2>
            <div className={styles.biography}>
              <p data-about-copy>Я — Руслан Рагимов, практикующий юрист, представляю интересы частных клиентов и бизнеса в судах по всей России.</p>
              <p data-about-copy>За годы работы я прошёл путь от государственной службы и следственной деятельности до руководящих позиций в коммерческих организациях и юридической практики. Этот опыт позволяет мне глубоко понимать, как работает система, и находить эффективные решения даже в сложных и нестандартных ситуациях.</p>
            </div>
            <dl className={styles.metrics} aria-label="Опыт и география практики">
              {experienceMetrics.map(({ value, description }, index) => (
                <div key={value[0]} className={styles.metric} data-about-metric>
                  <dt className={index === 3 ? styles.metricValueLong : styles.metricValue}>
                    {value.map((line) => <span key={line}>{line}</span>)}
                  </dt>
                  <dd>{description.map((line) => <span key={line}>{line}</span>)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <CareerTimeline />
        <Approach />
      </section>
    </AboutMotion>
  );
}
