import Link from "next/link";
import { ReactNode } from "react";

type Props = { title: string; subtitle?: string; href?: string; children?: ReactNode; className?: string };

export default function BentoCard({ title, subtitle, href, children, className = "" }: Props) {
  const inner = (
    <div className={`glass glass-hover rounded-2xl p-5 transition ${className}`}>
      <div className="font-orbitron text-sm font-semibold tracking-wide text-slate-800">{title}</div>
      {subtitle && <div className="mt-1 text-xs text-slate-500">{subtitle}</div>}
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
  return href ? <Link href={href}>{inner}</Link> : inner;
}
