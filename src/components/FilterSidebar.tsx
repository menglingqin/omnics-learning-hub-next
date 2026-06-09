"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import Button from "@/components/ui/Button";
import { Dictionary } from "@/locales/types";

export interface FilterSidebarProps {
  selectedLevels?: string[];
  selectedTopics?: string[];
  selectedLanguage?: string;
  onLevelToggle?: (level: string) => void;
  onTopicToggle?: (topic: string) => void;
  onLanguageSelect?: (lang: string) => void;
  onClearAll?: () => void;
}

export default function FilterSidebar({
  selectedLevels = ["Intermediate"],
  selectedTopics = ["Algorithms"],
  selectedLanguage = "Python",
  onLevelToggle,
  onTopicToggle,
  onLanguageSelect,
  onClearAll,
}: FilterSidebarProps) {
  const { t, language } = useLanguage();

  const difficulties = [
    { id: "Beginner", getLabel: (d: Dictionary) => d.common.beginner },
    { id: "Intermediate", getLabel: (d: Dictionary) => d.common.intermediate },
    { id: "Advanced", getLabel: (d: Dictionary) => d.common.advanced },
  ];

  const topics = [
    { id: "Algorithms", getLabel: (d: Dictionary) => d.common.algorithms },
    { id: "Data Structures", getLabel: (d: Dictionary) => d.common.dataStructures },
    { id: "Machine Learning", getLabel: (d: Dictionary) => d.common.machineLearning },
    { id: "Fundamentals", getLabel: (d: Dictionary) => d.common.fundamentals },
  ];

  const languagesList = ["Python", "C++", "JS", "Go"];

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="sticky top-24">
        <h3 className="text-headline-md font-headline-md text-on-surface mb-6 border-b border-[#233554] pb-2 flex justify-between items-center">
          {t(d => d.common.filters)}
          <span
            onClick={onClearAll}
            className="text-[10px] font-label-caps text-secondary cursor-pointer hover:underline lg:hidden"
          >
            {t(d => d.common.clearAll)}
          </span>
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-8">
          {/* Level Filter */}
          <div>
            <h4 className="font-label-caps text-label-caps text-outline mb-4 flex items-center justify-between">
              {t(d => d.common.difficultyLevel)}
            </h4>
            <div className="flex flex-col gap-3">
              {difficulties.map((diff) => {
                const isChecked = selectedLevels.includes(diff.id);
                return (
                  <label key={diff.id} className="flex items-center gap-3 cursor-pointer group">
                     <div className="relative flex items-center">
                      <input
                        className="checkbox-custom opacity-0 absolute h-5 w-5 cursor-pointer z-10"
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => onLevelToggle?.(diff.id)}
                      />
                      <div className="h-5 w-5 border border-[#233554] rounded bg-[#112240] group-hover:border-secondary/50 transition-colors flex items-center justify-center">
                        <svg
                          className={`${isChecked ? "block" : "hidden"} w-3 h-3 text-primary-container pointer-events-none`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M5 13l4 4L19 7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <span className="text-on-surface-variant group-hover:text-on-surface transition-colors flex flex-col leading-tight">
                      <span>{language === "zh" ? t(diff.getLabel) : diff.id}</span>
                      {language === "zh" && (
                        <span className="text-[10px] opacity-50">{diff.id}</span>
                      )}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Topic Filter */}
          <div>
            <h4 className="font-label-caps text-label-caps text-outline mb-4 flex items-center justify-between">
              {t(d => d.common.topics)}
            </h4>
            <div className="flex flex-col gap-3">
              {topics.map((topic) => {
                const isChecked = selectedTopics.includes(topic.id);
                return (
                  <label key={topic.id} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input
                        className="checkbox-custom opacity-0 absolute h-5 w-5 cursor-pointer z-10"
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => onTopicToggle?.(topic.id)}
                      />
                      <div className="h-5 w-5 border border-[#233554] rounded bg-[#112240] group-hover:border-secondary/50 transition-colors flex items-center justify-center">
                        <svg
                          className={`${isChecked ? "block" : "hidden"} w-3 h-3 text-primary-container pointer-events-none`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M5 13l4 4L19 7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <span className="text-on-surface-variant group-hover:text-on-surface transition-colors flex flex-col leading-tight">
                      <span>{language === "zh" ? t(topic.getLabel) : topic.id}</span>
                      {language === "zh" && (
                        <span className="text-[10px] opacity-50">{topic.id}</span>
                      )}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Language Filter */}
          <div>
            <h4 className="font-label-caps text-label-caps text-outline mb-4">
              {t(d => d.common.language)}
            </h4>
            <div className="flex flex-wrap gap-2">
              {languagesList.map((lang) => {
                const isSelected = selectedLanguage === lang;
                return (
                  <Button
                    key={lang}
                    variant={isSelected ? "primary" : "secondary"}
                    size="sm"
                    className="rounded-full"
                    onClick={() => onLanguageSelect?.(lang)}
                  >
                    {lang}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
