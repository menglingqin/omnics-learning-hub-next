"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { language, t } = useLanguage();

  const getDocLabel = () => t(d => d.footer.documentation);

  const getApiLabel = () => t(d => d.footer.apiReference);

  const getStatusLabel = () => t(d => d.footer.status);

  const getPrivacyLabel = () => t(d => d.footer.privacyPolicy);

  const getTermsLabel = () => t(d => d.footer.termsOfService);

  return (
    <footer className="bg-surface-container-lowest text-secondary text-body-base font-body-base w-full mt-auto border-t border-outline-variant/20 flex-none">
      <div className="max-w-container-max mx-auto px-margin-desktop py-12 flex flex-col md:flex-row justify-between items-center gap-base">
        <div className="flex flex-col items-center md:items-start gap-4">
          <Link
            href="/"
            className="text-headline-md font-headline-md text-on-surface font-bold tracking-tighter"
          >
            CS.Academy
          </Link>
          <p className="text-outline text-sm">
            {t(d => d.common.copyright)}
          </p>
        </div>
        <nav className="flex flex-wrap justify-center gap-6 text-label-caps font-label-caps font-medium">
          <Link
            className="text-outline hover:text-on-surface transition-colors hover:text-secondary"
            href="#"
          >
            {getDocLabel()}
          </Link>
          <Link
            className="text-outline hover:text-on-surface transition-colors hover:text-secondary"
            href="#"
          >
            {getApiLabel()}
          </Link>
          <Link
            className="text-outline hover:text-on-surface transition-colors hover:text-secondary"
            href="#"
          >
            {getStatusLabel()}
          </Link>
          <Link
            className="text-outline hover:text-on-surface transition-colors hover:text-secondary"
            href="#"
          >
            {getPrivacyLabel()}
          </Link>
          <Link
            className="text-outline hover:text-on-surface transition-colors hover:text-secondary"
            href="#"
          >
            {getTermsLabel()}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
