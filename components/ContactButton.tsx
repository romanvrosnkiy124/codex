import type { MouseEventHandler } from "react";
import { siteConfig } from "../lib/site-config";

import { Arrow } from "./LineIcon";

export default function ContactButton({ compact = false, onClick }: { compact?: boolean; onClick?: MouseEventHandler<HTMLAnchorElement> }) {
  return (
    <a onClick={onClick} href={siteConfig.telegramUrl} target="_blank" rel="noopener noreferrer" className={`button ${compact ? "button--header" : "button--primary"}`}>
      <span>Обсудить ситуацию</span>
      {!compact && <Arrow />}
    </a>
  );
}
