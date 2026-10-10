import styles from "./CasesSection.module.css";

export default function CaseCounter({ index, total }: { index: number; total: number }) {
  return (
    <p className={styles.counter}>
      <span className={styles.srOnly}>Дело {index} из {total}</span>
      <span aria-hidden="true">{String(index).padStart(2, "0")}</span>
      <span className={styles.counterTotal} aria-hidden="true">/ {String(total).padStart(2, "0")}</span>
    </p>
  );
}
