import Image from "next/image";
import type { CaseVisualKind } from "../lib/cases-content";
import styles from "./CasesSection.module.css";

const visualLabels: Record<CaseVisualKind, string> = {
  architecture: "Архитектурная деталь каменного фасада",
  contract: "Судейский молоток и документы на деревянном столе",
  registry: "Папка с документами и перьевая ручка",
  employment: "Деловая сцена: работа с документами на столе",
};

// Locally stored AI-generated editorial compositions, not real case photography
// or evidence. Documents contain no actual case details or identifying marks.
export default function CaseVisual({ kind }: { kind: CaseVisualKind }) {
  return (
    <div className={styles.visual}>
      <Image
        src={`/images/cases/${kind}-editorial.webp`}
        alt={visualLabels[kind]}
        fill
        sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1199px) calc((100vw - 88px) / 2), (max-width: 1300px) calc((100vw - 156px) / 4), (max-width: 1440px) calc((100vw - 192px) / 4), 312px"
        quality={85}
      />
    </div>
  );
}
