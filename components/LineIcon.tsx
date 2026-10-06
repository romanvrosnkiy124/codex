import type { SVGProps } from "react";

export type IconName = "scales" | "court" | "document" | "people" | "briefcase" | "shield" | "coins";

const paths: Record<IconName, React.ReactNode> = {
  scales: <><path d="M16 4v24M10 28h12M7 10h18M16 4l-2 3h4zM7 10l-4 10h8L7 10zm18 0-4 10h8l-4-10z" /><path d="M3 20c0 4 8 4 8 0m10 0c0 4 8 4 8 0" /></>,
  court: <><path d="m3 10 13-7 13 7H3zm2 3h22M5 26h22M3 29h26M7 13v13m6-13v13m6-13v13m6-13v13" /></>,
  document: <><path d="M8 3h11l6 6v20H8V3zm11 0v7h6M12 15h9m-9 5h9m-9 5h6" /></>,
  people: <><circle cx="16" cy="9" r="4" /><path d="M9 28v-7a7 7 0 0 1 14 0v7H9zM5 7a3 3 0 0 0 0 6m22-6a3 3 0 0 1 0 6M7 17a6 6 0 0 0-5 6v5h4m19-11a6 6 0 0 1 5 6v5h-4" /></>,
  briefcase: <><rect x="3" y="10" width="26" height="19" rx="1" /><path d="M11 10V6h10v4M3 17a42 42 0 0 0 26 0M14 17v4h4v-4" /></>,
  shield: <><path d="M16 3c4 4 8 4 12 4v9c0 7-7 12-12 14C11 28 4 23 4 16V7c4 0 8 0 12-4zM16 9v14m-6-7 6 3 6-3" /></>,
  coins: <><ellipse cx="12" cy="7" rx="8" ry="4" /><path d="M4 7v5c0 5 16 5 16 0V7M4 12v5c0 3 7 5 12 3M4 17v5c0 3 6 5 11 4" /><ellipse cx="23" cy="20" rx="6" ry="3" /><path d="M17 20v5c0 4 12 4 12 0v-5" /></>,
};

export function LineIcon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>;
}

export function Arrow({ ...props }: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true" {...props}><path d="M1 8h21m-6-6 6 6-6 6" /></svg>;
}
