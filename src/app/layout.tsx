import type { Metadata } from "next";
import { Orbitron, Exo_2 } from "next/font/google";
import "./globals.css";
import AuthGate from "@/components/AuthGate";

const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron", weight: ["500", "700", "900"] });
const exo = Exo_2({ subsets: ["latin"], variable: "--font-exo" });

export const metadata: Metadata = {
  title: "RotSec",
  description: "RotSec — All Tools",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${orbitron.variable} ${exo.variable}`}>
      <body className="min-h-screen font-exo">
        <AuthGate>{children}</AuthGate>
      </body>
    </html>
  );
}
