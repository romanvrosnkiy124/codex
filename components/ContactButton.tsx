import { Arrow } from "./LineIcon";

export default function ContactButton({ compact = false }: { compact?: boolean }) {
  return (
    <a href="https://t.me/ragimovlaw" target="_blank" rel="noopener noreferrer" className={`button ${compact ? "button--header" : "button--primary"}`}>
      <span>Обсудить ситуацию</span>
      {!compact && <Arrow />}
    </a>
  );
}
