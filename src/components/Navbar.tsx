"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { name: "Courses", href: "/courses" },
    { name: "Practice", href: "/lab" },
    { name: "Community", href: "#" },
    { name: "Career", href: "/careers" },
  ];

  const translateLabel = (name: string) => {
    if (name === "Courses") return t(d => d.common.courses);
    if (name === "Practice") return t(d => d.common.practice);
    if (name === "Community") return t(d => d.common.community);
    if (name === "Career") return t(d => d.common.career);
    return name;
  };

  const renderLanguageSwitcher = () => {
    return (
      <div className="flex items-center bg-surface-container rounded-full p-1 border border-outline-variant/30">
        <button
          onClick={() => setLanguage("en")}
          className={`px-2.5 py-1 text-[10px] font-label-caps rounded-full transition-all hover:text-secondary cursor-pointer ${
            language === "en"
              ? "bg-secondary text-primary-container font-bold"
              : "text-on-surface-variant"
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage("zh")}
          className={`px-2.5 py-1 text-[10px] font-label-caps rounded-full transition-all hover:text-secondary cursor-pointer ${
            language === "zh"
              ? "bg-secondary text-primary-container font-bold"
              : "text-on-surface-variant"
          }`}
        >
          中文
        </button>
      </div>
    );
  };

  return (
    <header className="bg-surface/70 backdrop-blur-xl docked full-width top-0 sticky z-50 border-b border-outline-variant/30 shadow-[0px_0px_15px_rgba(65,228,192,0.1)] flex-none">
      <div className="max-w-container-max mx-auto px-margin-desktop flex items-center justify-between h-16">
        <div className="flex items-center gap-8">
          <Link
            className="text-headline-md font-headline-md font-bold text-on-surface tracking-tighter hover:text-secondary transition-colors"
            href="/"
          >
            CS.Academy
          </Link>
          <nav className="hidden lg:flex gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  className={`text-label-caps font-label-caps hover:bg-surface-variant/50 transition-all px-3 py-2 rounded-DEFAULT active:scale-95 transition-transform ${
                    isActive
                      ? "text-secondary font-bold border-b-2 border-secondary rounded-none pb-1"
                      : "text-on-surface-variant hover:text-on-surface hover:text-secondary"
                  }`}
                  href={link.href}
                >
                  {translateLabel(link.name)}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {renderLanguageSwitcher()}
          <div className="relative hidden sm:block">
            <span
              className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-[20px]"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              search
            </span>
            <input
              className="bg-[#112240] border border-outline-variant text-on-surface text-code-sm font-code-sm rounded-DEFAULT pl-10 pr-4 py-1.5 focus:outline-none focus:border-secondary focus:shadow-[0_0_8px_rgba(65,228,192,0.3)] transition-all placeholder:text-outline-variant w-48 xl:w-64"
              placeholder={t(d => d.common.searchPlaceholder)}
              type="text"
            />
          </div>
          <button className="text-on-surface-variant hover:text-secondary transition-colors p-2 rounded-full hover:bg-surface-variant/50 flex items-center justify-center group active:scale-90">
            <span
              className="material-symbols-outlined group-hover:drop-shadow-[0_0_5px_#41e4c0]"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              notifications
            </span>
          </button>
          <button className="text-on-surface-variant hover:text-secondary transition-colors p-2 rounded-full hover:bg-surface-variant/50 flex items-center justify-center group active:scale-90">
            <span
              className="material-symbols-outlined group-hover:drop-shadow-[0_0_5px_#41e4c0]"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              terminal
            </span>
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant ml-2 cursor-pointer hover:border-secondary transition-colors active:scale-95">
            <img
              alt="Student Profile"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida/AP1WRLvfQnpzk17SJPS9rG1wMEaP5cd_6uUlZxZeWjI-3PRZefJoBegwQ1ekb1yXQFfGmq1VunaJlz71HW-72VmrFqGfPm9TmaoNC-v2Do4EbeJZb28Job4UrauPeKCGmj9R1YqiGQDbNCH6_ybrnBiI6fQddDlJ5qIUqK7FZj8eFKQAxiqTk2L-8x0kk_24R1WUTfMP7KmKER6_pL_G5W3Oz5Pba5eEpha9ajfr2i470CbcJpkpt7KIb2veG10"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
