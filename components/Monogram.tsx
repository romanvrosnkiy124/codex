export default function Monogram({ className = "" }: { className?: string }) {
  return <span className={`monogram ${className}`} aria-hidden="true"><span>R</span><span>R</span></span>;
}
