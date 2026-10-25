import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ProKit",
  description: "ProKit — All Tools",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-[#0a0a0b] text-neutral-200">{children}</body>
    </html>
  );
}