import { caseFields, type PracticeCase } from "../lib/cases-content";
import CaseCounter from "./CaseCounter";
import CaseVisual from "./CaseVisual";
import { Arrow } from "./LineIcon";
import styles from "./CasesSection.module.css";

export default function CasePanel({ item, index, total }: { item: PracticeCase; index: number; total: number }) {
  return (
    <li className={styles.panel} data-case-panel>
      <article className={styles.panelInner} aria-labelledby={`case-${item.id}-heading`}>
        <div className={styles.caseHead} data-case-head>
          <CaseCounter index={index} total={total} />
          <p className={styles.category}>{item.category}</p>
          <h3 id={`case-${item.id}-heading`} className={styles.caseTitle}>{item.title}</h3>
          <p className={styles.overview}>{item.overview}</p>
          <p className={styles.prototypeLabel}>Пример · прототип</p>
        </div>
        <div className={styles.caseDetail}>
          <CaseVisual kind={item.visual} />
          <dl className={styles.fields}>
            {caseFields.map(({ key, label }) => (
              <div className={styles.field} key={key} data-case-field>
                <dt>{label}</dt>
                <dd>{item[key]}</dd>
              </div>
            ))}
          </dl>
          <span className={styles.detailCta} aria-disabled="true">Подробнее о деле <Arrow /></span>
        </div>
      </article>
    </li>
  );
}
