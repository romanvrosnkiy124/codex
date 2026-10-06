import type { ReactNode } from "react";

export default function RevealText({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return <span className={`reveal-line${accent ? " reveal-line--accent" : ""}`}><span data-headline-line>{children}</span></span>;
}
