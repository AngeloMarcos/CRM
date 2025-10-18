import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MentoArk CRM",
  description: "CRM base com Next.js + Tailwind",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className="antialiased">{children}</body>
    </html>
  );
}
