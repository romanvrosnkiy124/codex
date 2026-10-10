import type { PracticeCase } from "../lib/cases-content";
import CaseVisual from "./CaseVisual";
import { Arrow } from "./LineIcon";
import styles from "./CasesSection.module.css";

export default function CaseCard({ item }: { item: PracticeCase }) {
  return (
    <li className={styles.card} data-case-card>
      <article className={styles.cardInner} aria-labelledby={`case-${item.id}-heading`}>
        <div className={styles.cardVisual}>
          <CaseVisual kind={item.visual} />
          <p className={styles.category}>{item.category}</p>
          <span className={styles.prototypeLabel}>Прототип</span>
        </div>
        <div className={styles.cardBody}>
          <h3 id={`case-${item.id}-heading`} className={styles.caseTitle}>{item.title}</h3>
          <dl className={styles.summary}>
            {item.summary.map(({ label, value }) => (
              <div className={styles.summaryItem} key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <span className={styles.detailCta} aria-disabled="true">Подробнее о деле <Arrow /></span>
        </div>
      </article>
    </li>
  );
}
