import Link from "next/link";
import { ReactNode } from "react";

type Props = { title: string; subtitle?: string; href?: string; children?: ReactNode; className?: string };

export default function BentoCard({ title, subtitle, href, children, className = "" }: Props) {
  const inner = (
    <div className={`group rounded-2xl border border-[#1f1f24] bg-[#111114] p-5 transition hover:border-[#7c5cff]/60 ${className}`}>
      <div className="text-sm font-semibold text-neutral-100">{title}</div>
      {subtitle && <div className="mt-1 text-xs text-neutral-500">{subtitle}</div>}
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
  return href ? <Link href={href}>{inner}</Link> : inner;
}