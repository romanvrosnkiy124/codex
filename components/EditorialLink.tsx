import type { ReactNode } from "react";
import { Arrow } from "./LineIcon";
import styles from "./EditorialSections.module.css";

export default function EditorialLink({ href, children, className = "" }: { href: string | null; children: ReactNode; className?: string }) {
  const content = <>{children}<Arrow /></>;
  const linkClass = `${styles.link} ${className}`;
  return href
    ? <a className={linkClass} href={href} target="_blank" rel="noopener noreferrer">{content}</a>
    : <span className={linkClass} aria-disabled="true">{content}</span>;
}
