"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import Button from "@/components/ui/Button";

export interface ConsolePanelProps {
  activeCase: 1 | 2 | 3;
  onCaseChange: (caseNum: 1 | 2 | 3) => void;
  inputValue: string;
  onInputValueChange: (val: string) => void;
  expectedOutput: string;
  consoleMsg: string;
  isRunning: boolean;
  isSubmitted: boolean;
  onRunCode: () => void;
  onSubmit: () => void;
}

export default function ConsolePanel({
  activeCase,
  onCaseChange,
  inputValue,
  onInputValueChange,
  expectedOutput,
  consoleMsg,
  isRunning,
  isSubmitted,
  onRunCode,
  onSubmit,
}: ConsolePanelProps) {
  const { t } = useLanguage();

  return (
    <div className="h-64 flex-none border-t border-outline-variant/30 bg-[#112240] flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 border-b border-outline-variant/30 flex-none">
        <div className="flex gap-6">
          <button className="text-label-caps font-label-caps text-secondary border-b-2 border-secondary pb-1 cursor-pointer">
            {t(d => d.lab.testCasesTab)}
          </button>
          <button className="text-label-caps font-label-caps text-on-surface-variant hover:text-on-surface pb-1 cursor-pointer">
            {t(d => d.lab.testResultsTab)}
          </button>
          <button className="text-label-caps font-label-caps text-on-surface-variant hover:text-on-surface pb-1 flex items-center gap-1 cursor-pointer">
            <span className="material-symbols-outlined text-xs">
              terminal
            </span>{" "}
            {t(d => d.lab.consoleTab)}
          </button>
        </div>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={onRunCode}
            disabled={isRunning}
            icon="play_arrow"
            className="disabled:opacity-50"
          >
            {isRunning ? t(d => d.lab.runningBtnText) : t(d => d.lab.runCodeBtnText)}
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onSubmit}
            disabled={isSubmitted}
            icon="rocket_launch"
            glow
            className="font-bold glow-active disabled:opacity-50"
          >
            {isSubmitted ? t(d => d.lab.submittingBtnText) : t(d => d.lab.submitBtnText)}
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4 flex gap-6">
        {/* Left Case Switcher */}
        <div className="w-1/3 flex flex-col gap-2 border-r border-outline-variant/30 pr-4">
          <div className="flex gap-2">
            {[1, 2, 3].map((num) => (
              <button
                key={num}
                onClick={() => onCaseChange(num as 1 | 2 | 3)}
                className={`px-3 py-1 rounded text-sm border cursor-pointer ${
                  activeCase === num
                    ? "bg-surface-variant text-on-surface border-outline/30"
                    : "bg-transparent text-on-surface-variant border-transparent hover:bg-surface-variant/30"
                }`}
              >
                Case {num}
              </button>
            ))}
          </div>
          <div className="space-y-3 mt-3">
            <div>
              <label className="block text-xs text-outline mb-1">
                Input: n =
              </label>
              <input
                className="w-full bg-[#020C1B] border border-outline-variant rounded px-3 py-1.5 text-on-surface font-code-sm text-code-sm focus:border-secondary focus:ring-1 focus:ring-secondary/50 focus:outline-none transition-all"
                type="text"
                value={inputValue}
                onChange={(e) => onInputValueChange(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs text-outline mb-1">
                Expected Output =
              </label>
              <div className="w-full bg-[#020C1B] border border-outline-variant rounded px-3 py-1.5 text-on-surface font-code-sm text-code-sm text-outline-variant">
                {expectedOutput}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-grow flex flex-col">
          <span className="text-xs text-outline mb-1">
            {t(d => d.lab.consoleOutputHeader)}
          </span>
          <pre className="flex-1 bg-[#020C1B] border border-outline-variant rounded p-3 font-code-sm text-code-sm text-on-surface overflow-auto whitespace-pre-wrap font-mono">
            {consoleMsg || t(d => d.lab.consoleEmptyText)}
          </pre>
        </div>
      </div>
    </div>
  );
}
