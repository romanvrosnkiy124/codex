import { prototypeCases } from "../lib/cases-content";
import CaseCard from "./CaseCard";
import CasesMotion from "./CasesMotion";
import styles from "./CasesSection.module.css";

export default function CasesSection() {
  return (
    <CasesMotion>
      <section id="cases" className={styles.cases} aria-labelledby="cases-heading">
        <div className="container">
          <div className={styles.intro}>
            <div>
              <p className="eyebrow" data-cases-intro>СУДЕБНАЯ ПРАКТИКА</p>
              <h2 id="cases-heading" className={styles.heading}>
                <span className={styles.headingMask}><span data-cases-heading>Реальные дела.</span></span>
                <span className={`${styles.headingMask} ${styles.accent}`}><span data-cases-heading>Реальные результаты.</span></span>
              </h2>
              <p className={styles.supporting} data-cases-intro>Каждое дело — это конкретная ситуация, люди, аргументы и решение суда. Ниже — примеры практики, которые показывают подход к защите интересов клиента.</p>
            </div>
          </div>
          <ol className={styles.cards} aria-label="Примеры судебных дел">
            {prototypeCases.map((item) => <CaseCard item={item} key={item.id} />)}
          </ol>
        </div>
      </section>
    </CasesMotion>
  );
}
