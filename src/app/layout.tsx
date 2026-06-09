import type { Metadata } from "next";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "CS.Academy - Master the Architecture of Tomorrow",
  description: "Dive deep into advanced computer science concepts, modern system design, and algorithmic engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-background text-on-surface">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
