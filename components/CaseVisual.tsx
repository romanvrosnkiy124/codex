import type { CaseVisualKind } from "../lib/cases-content";
import styles from "./CasesSection.module.css";

const visualLabels: Record<CaseVisualKind, string> = {
  documents: "Абстрактная иллюстрация документов и расчётов",
  contract: "Абстрактная иллюстрация договорных документов",
  registry: "Абстрактная иллюстрация реестра и правовой позиции",
  employment: "Абстрактная иллюстрация кадровых документов",
};

// Neutral replaceable visuals; no real documents, seals or case information.
export default function CaseVisual({ kind }: { kind: CaseVisualKind }) {
  return (
    <div className={`${styles.visual} ${styles[kind]}`} data-case-visual>
      <span className={styles.visualCaption} aria-hidden="true">МАТЕРИАЛЫ И ПРАВОВАЯ ПОЗИЦИЯ</span>
      <svg viewBox="0 0 640 180" role="img" aria-label={visualLabels[kind]}>
        <g className={styles.visualGuide} fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M30 155h580M76 22v136M560 22v136" />
          <path d="M70 40h12m-12 40h12m-12 40h12m472-80h12m-12 40h12m-12 40h12" />
        </g>
        <g className={styles.paperBack}>
          <rect x="214" y="23" width="238" height="136" />
          <path d="M239 49h160m-160 16h115m-115 43h184m-184 16h184" />
        </g>
        <g className={styles.paperFront}>
          <rect x="179" y="12" width="238" height="136" />
          <path d="M204 37h142m-142 14h98m-98 24h186m-186 15h186m-186 15h164" />
          <path className={styles.paperAccent} d="M204 125h78m75-11v20m-10-10h20" />
        </g>
        {kind === "registry" && <path className={styles.visualAccent} d="M475 52h38m-38 19h38m-38 19h38m-38 19h38M463 46v70" />}
        {kind === "contract" && <path className={styles.visualAccent} d="m465 114 12-12 11 12 13-20 13 8M466 131h52" />}
        {kind === "documents" && <path className={styles.visualAccent} d="M470 53h44v50h-44zM478 65h28m-28 12h20m-20 12h28" />}
        {kind === "employment" && <g className={styles.visualAccent}><circle cx="491" cy="66" r="11" /><path d="M470 105v-8a21 21 0 0 1 42 0v8h-42z" /></g>}
      </svg>
    </div>
  );
}
