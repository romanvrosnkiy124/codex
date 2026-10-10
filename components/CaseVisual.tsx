import type { CaseVisualKind } from "../lib/cases-content";
import styles from "./CasesSection.module.css";

const visualLabels: Record<CaseVisualKind, string> = {
  architecture: "Нейтральная иллюстрация фасада жилого здания",
  contract: "Нейтральная иллюстрация судейского молотка и юридического стола",
  registry: "Нейтральная иллюстрация документа и ручки",
  employment: "Нейтральная иллюстрация делового костюма и папки с документами",
};

// Local editorial placeholders. No external photography or real case documents.
export default function CaseVisual({ kind }: { kind: CaseVisualKind }) {
  return (
    <div className={styles.visual}>
      <svg viewBox="0 0 400 210" role="img" aria-label={visualLabels[kind]}>
        {kind === "architecture" && <>
          <path className={styles.visualBackdrop} d="M0 0h400v210H0z" />
          <path className={styles.visualSecondary} d="M255 32 400 0v210H255z" />
          <path className={styles.visualMain} d="m38 18 234 25v167H38z" />
          <path className={styles.visualLight} d="m62 45 38 4v30l-38-3zm63 7 39 4v29l-39-3zm64 7 38 4v29l-38-3zM62 99l38 3v30l-38-2zm63 4 39 2v30l-39-2zm64 4 38 2v29l-38-2zM62 155l38 1v30H62zm63 2h39v31h-39zm64 2h38v30h-38z" />
          <g className={styles.visualLines}><path d="m38 86 234 17M38 141l234 11M51 5v205M111 23v187M176 30v180M240 37v173M255 71l145-18m-145 73 145-12m-145 69 145-5" /></g>
        </>}
        {kind === "contract" && <>
          <path className={styles.visualSecondary} d="M0 0h400v210H0z" />
          <path className={styles.visualMain} d="M0 157h400v53H0z" />
          <path className={styles.visualLight} d="m30 125 123-12 60 24-122 11z" />
          <g className={styles.visualLines}><path d="m56 129 84-8m-64 18 86-8M0 171h400" /></g>
          <g transform="rotate(-24 256 94)">
            <path className={styles.visualDark} d="M151 87h105v14H151z" />
            <rect className={styles.visualBronze} x="252" y="52" width="39" height="87" />
            <path className={styles.visualDark} d="M244 51h55v13h-55zm0 75h55v13h-55z" />
            <path className={styles.visualLines} d="M263 69v50m15-50v50" />
          </g>
          <ellipse className={styles.visualBronze} cx="273" cy="169" rx="52" ry="12" />
          <path className={styles.visualDark} d="M221 169v9c0 17 104 17 104 0v-9c0 16-104 16-104 0z" />
        </>}
        {kind === "registry" && <>
          <path className={styles.visualBackdrop} d="M0 0h400v210H0z" />
          <g transform="rotate(-7 181 112)">
            <path className={styles.visualSecondary} d="M74 32h228v159H74z" />
            <path className={styles.visualLight} d="M61 23h228v159H61z" />
            <g className={styles.visualLines}><path d="M91 70h83m-83 15h148M91 106h167m-167 13h167m-167 13h146m-146 25h72" /><path d="M241 43h18v18h-18zM246 48h8m-8 7h8" /></g>
          </g>
          <path className={styles.visualDark} d="m250 72 10-8 94 102-10 8z" />
          <path className={styles.visualBronze} d="m344 174 10-8 5 16z" />
        </>}
        {kind === "employment" && <>
          <path className={styles.visualBackdrop} d="M0 0h400v210H0z" />
          <path className={styles.visualDark} d="M85 0h225l37 74-16 136H57L46 74z" />
          <path className={styles.visualLight} d="M153 0h81l-17 108h-49z" />
          <path className={styles.visualBronze} d="m191 0 13 16-9 67-13-67z" />
          <path className={styles.visualLines} d="m132 0-15 43 39 47m99-90 19 45-44 45" />
          <path className={styles.visualLight} d="M123 90h76v65h-76zM219 79h45v79h-45z" />
          <path className={styles.visualMain} d="M92 116h221v94H92z" />
          <path className={styles.visualSecondary} d="M180 116h46v94h-46z" />
          <path className={styles.visualLines} d="M111 99h73m47-9h20M92 131h221" />
          <path className={styles.visualBronze} d="M69 128c14-8 31 7 28 24l-5 24c-17 3-34-22-23-48zm260 0c-14-8-31 7-28 24l5 24c17 3 34-22 23-48z" />
        </>}
      </svg>
    </div>
  );
}
