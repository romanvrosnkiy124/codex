import { prototypeCases } from "../lib/cases-content";
import CasePanel from "./CasePanel";
import CasesApproach from "./CasesApproach";
import CasesMotion from "./CasesMotion";
import { LineIcon } from "./LineIcon";
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
            <aside className={styles.note} aria-label="Подход к судебной практике" data-cases-intro>
              <LineIcon name="scales" />
              <blockquote>Каждое дело требует внимательного анализа, правильно выстроенной позиции и ориентации на результат.</blockquote>
              <p>Руслан Рагимов</p>
            </aside>
          </div>
          <p className={styles.prototypeNotice} data-cases-intro>Прототипы дел — примеры структуры подачи. Подтверждённые материалы и результаты будут добавлены позднее.</p>
          <ol className={styles.panels} aria-label="Прототипы судебных дел">
            {prototypeCases.map((item, index) => <CasePanel item={item} index={index + 1} total={prototypeCases.length} key={item.id} />)}
          </ol>
        </div>
      </section>
      <CasesApproach />
    </CasesMotion>
  );
}
