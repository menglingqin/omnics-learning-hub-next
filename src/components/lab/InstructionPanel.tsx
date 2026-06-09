"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import Badge from "@/components/ui/Badge";

export interface InstructionPanelProps {
  activeTab: "instructions" | "lesson";
  onTabChange: (tab: "instructions" | "lesson") => void;
  onViewHints?: () => void;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  duration: string;
  description: React.ReactNode;
  exampleInput: string;
  exampleOutput: string;
  explanation?: string;
  constraints: string[];
}

export default function InstructionPanel({
  activeTab,
  onTabChange,
  onViewHints,
  title,
  difficulty,
  duration,
  description,
  exampleInput,
  exampleOutput,
  explanation,
  constraints,
}: InstructionPanelProps) {
  const { t } = useLanguage();

  return (
    <aside className="w-80 flex-none bg-[#112240] border-r border-outline-variant/30 flex flex-col h-full z-10">
      {/* Tabs */}
      <div className="flex border-b border-outline-variant/30">
        <button
          onClick={() => onTabChange("instructions")}
          className={`flex-1 py-3 text-label-caps font-label-caps flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === "instructions"
              ? "text-secondary border-b-2 border-secondary bg-secondary/5"
              : "text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/20"
          }`}
        >
          <span className="material-symbols-outlined text-sm">description</span>
          {t(d => d.lab.instructionsTab)}
        </button>
        <button
          onClick={() => onTabChange("lesson")}
          className={`flex-1 py-3 text-label-caps font-label-caps flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === "lesson"
              ? "text-secondary border-b-2 border-secondary bg-secondary/5"
              : "text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/20"
          }`}
        >
          <span className="material-symbols-outlined text-sm">video_library</span>
          {t(d => d.lab.lessonTab)}
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {activeTab === "instructions" ? (
          <>
            <div>
              <h2 className="text-headline-md font-headline-md text-on-surface mb-2">
                {title}
              </h2>
              <div className="flex items-center gap-3 mb-6">
                <Badge variant={difficulty === "Easy" ? "easy" : difficulty === "Medium" ? "medium" : "hard"}>
                  {difficulty === "Easy" ? t(d => d.lab.easyBadge) : difficulty === "Medium" ? "MEDIUM" : "HARD"}
                </Badge>
                <span className="text-on-surface-variant text-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">
                    schedule
                  </span>
                  {duration}
                </span>
              </div>
            </div>
            
            <div className="prose prose-invert prose-sm max-w-none text-on-surface-variant space-y-4">
              <div className="space-y-3">
                {description}
              </div>
              
              <div className="glass-panel p-4 rounded mt-4">
                <h4 className="text-on-surface font-semibold mb-2">
                  {t(d => d.lab.example1)}
                </h4>
                <div className="font-code-sm text-code-sm mb-1 leading-relaxed">
                  <span className="text-outline">Input:</span> <span className="text-on-surface font-mono">{exampleInput}</span>
                </div>
                <div className="font-code-sm text-code-sm mb-1 leading-relaxed">
                  <span className="text-outline">Output:</span> <span className="text-on-surface font-mono">{exampleOutput}</span>
                </div>
                {explanation && (
                  <p className="text-xs mt-2 text-on-surface-variant leading-relaxed">
                    <span className="text-outline font-semibold">
                      {t(d => d.lab.explanationLabel)}
                    </span>{" "}
                    {explanation}
                  </p>
                )}
              </div>
              
              <div className="mt-6">
                <h4 className="text-on-surface font-semibold mb-2">
                  {t(d => d.lab.constraintsLabel)}
                </h4>
                <ul className="list-disc pl-5 font-code-sm text-code-sm text-outline-variant space-y-1">
                  {constraints.map((constraint, index) => (
                    <li key={index}>
                      <code>{constraint}</code>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <h3 className="text-headline-md font-bold text-on-surface">
              {t(d => d.lab.memoizationTitle)}
            </h3>
            <div className="aspect-video w-full rounded border border-outline-variant bg-[#020C1B] flex items-center justify-center text-outline cursor-pointer hover:border-secondary transition-colors group">
              <span className="material-symbols-outlined text-[48px] animate-pulse group-hover:scale-110 transition-transform">
                play_circle
              </span>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {t(d => d.lab.optimizeDesc)}
            </p>
          </div>
        )}
      </div>

      {/* Contextual Actions */}
      <div className="p-4 border-t border-outline-variant/30 bg-[#112240]/80 backdrop-blur-md">
        <button
          onClick={onViewHints}
          className="w-full py-2 px-4 bg-transparent border border-outline text-on-surface hover:border-secondary hover:text-secondary rounded transition-colors text-label-caps font-label-caps flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">lightbulb</span>
          {t(d => d.lab.viewHintsBtn)}
        </button>
      </div>
    </aside>
  );
}
