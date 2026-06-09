"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import InstructionPanel from "@/components/lab/InstructionPanel";
import CodeEditorPanel from "@/components/lab/CodeEditorPanel";
import ConsolePanel from "@/components/lab/ConsolePanel";

export default function LabPage() {
  const { language, setLanguage, t } = useLanguage();

  const [activeTab, setActiveTab] = useState<"instructions" | "lesson">(
    "instructions"
  );
  const [activeCase, setActiveCase] = useState<1 | 2 | 3>(1);
  const [inputValue, setInputValue] = useState<string>("2");
  const [expectedOutput, setExpectedOutput] = useState<string>("2");
  const [consoleMsg, setConsoleMsg] = useState<string>("");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleCaseChange = (caseNum: 1 | 2 | 3) => {
    setActiveCase(caseNum);
    if (caseNum === 1) {
      setInputValue("2");
      setExpectedOutput("2");
    } else if (caseNum === 2) {
      setInputValue("3");
      setExpectedOutput("3");
    } else if (caseNum === 3) {
      setInputValue("45");
      setExpectedOutput("1836311903");
    }
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setConsoleMsg(t(d => d.lab.runningTests));
    setTimeout(() => {
      setIsRunning(false);
      setConsoleMsg(
        t(d => d.lab.testPassed)(activeCase, inputValue, expectedOutput)
      );
    }, 1200);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      alert(t(d => d.lab.submitSuccess));
    }, 1500);
  };

  return (
    <div className="bg-primary-container text-on-surface font-body-base text-body-base overflow-hidden h-screen flex flex-col">
      {/* TopNavBar */}
      <header className="bg-surface/70 dark:bg-surface/70 backdrop-blur-xl docked full-width top-0 z-50 border-b border-outline-variant/30 shadow-[0px_0px_15px_rgba(65,228,192,0.1)] flex-none">
        <div className="max-w-container-max mx-auto px-margin-desktop flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link
              className="text-headline-md font-headline-md font-bold text-on-surface dark:text-on-surface tracking-tighter"
              href="/"
            >
              CS.Academy
            </Link>
            <div className="hidden md:flex gap-6 items-center border-l border-outline-variant/30 pl-6 h-8">
              <span className="text-label-caps font-label-caps text-on-surface-variant">
                MODULE 4
              </span>
              <span className="text-label-caps font-label-caps text-secondary">
                DYNAMIC PROGRAMMING
              </span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link
              className="text-on-surface-variant hover:text-on-surface transition-colors duration-200 text-label-caps font-label-caps hover:bg-surface-variant/50 hover:text-secondary transition-all px-3 py-2 rounded"
              href="/courses"
            >
              {t(d => d.common.courses)}
            </Link>
            <Link
              className="text-secondary font-bold border-b-2 border-secondary pb-1 text-label-caps font-label-caps px-3 py-2 scale-95 transition-transform glow-active"
              href="/lab"
            >
              {t(d => d.common.practice)}
            </Link>
            <Link
              className="text-on-surface-variant hover:text-on-surface transition-colors duration-200 text-label-caps font-label-caps hover:bg-surface-variant/50 hover:text-secondary transition-all px-3 py-2 rounded"
              href="#"
            >
              {t(d => d.common.community)}
            </Link>
            <Link
              className="text-on-surface-variant hover:text-on-surface transition-colors duration-200 text-label-caps font-label-caps hover:bg-surface-variant/50 hover:text-secondary transition-all px-3 py-2 rounded"
              href="/careers"
            >
              {t(d => d.common.career)}
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center bg-surface-variant/30 rounded-full p-1 border border-outline-variant/30">
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1 rounded-full text-[10px] font-label-caps transition-all cursor-pointer ${
                  language === "en"
                    ? "bg-secondary text-primary-container font-bold"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("zh")}
                className={`px-3 py-1 rounded-full text-[10px] font-label-caps transition-all cursor-pointer ${
                  language === "zh"
                    ? "bg-secondary text-primary-container font-bold"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                ZH
              </button>
            </div>
            <button className="text-on-surface-variant hover:text-secondary transition-colors p-2 rounded-full hover:bg-surface-variant/30 cursor-pointer">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="text-on-surface-variant hover:text-secondary transition-colors p-2 rounded-full hover:bg-surface-variant/30 cursor-pointer">
              <span className="material-symbols-outlined">terminal</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-surface-variant border border-secondary/30 overflow-hidden ml-2 cursor-pointer">
              <img
                alt="Student Profile"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida/AP1WRLuNFrR5mA0RjQqn6hXVGs5edad7xsSXhR2zZS9DE3YFqEMiM1O0LQUVGppPJd09qNh3JJaW4P5gt6FD1RpHhxIqbPQporO2of_82VYZ0Akuji6sKEDJbQtK4kImFK_Ah3XyMuEj183O6Kyqa7jSX8DFNHMUVXbbJxIA2TAlvl_ju_OBvQRwrEAxFCim9SGDLUMC_KMbIaLoS_qZtuiXZ7sf6VZmfXLCHTU9lFuzApUFnt36FbT54tO_Vw"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main IDE Workspace */}
      <main className="flex-1 flex overflow-hidden">
        {/* SideNavBar / Left Panel (Instructions) */}
        <InstructionPanel
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onViewHints={() => alert(t(d => d.lab.hintsAlert))}
        />

        {/* Center Code Editor & Bottom Terminal */}
        <section className="flex-1 flex flex-col min-w-0 bg-[#020C1B]">
          <CodeEditorPanel />

          <ConsolePanel
            activeCase={activeCase}
            onCaseChange={handleCaseChange}
            inputValue={inputValue}
            onInputValueChange={setInputValue}
            expectedOutput={expectedOutput}
            consoleMsg={consoleMsg}
            isRunning={isRunning}
            isSubmitted={isSubmitted}
            onRunCode={handleRunCode}
            onSubmit={handleSubmit}
          />
        </section>
      </main>
    </div>
  );
}
