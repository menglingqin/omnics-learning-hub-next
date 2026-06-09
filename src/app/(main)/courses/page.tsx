"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import FilterSidebar from "@/components/FilterSidebar";
import CourseCard from "@/components/CourseCard";

export default function CoursesPage() {
  const { t } = useLanguage();

  // Simple state for filters to make the app interactive and premium!
  const [selectedLevels, setSelectedLevels] = useState<string[]>(["Intermediate"]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>(["Algorithms"]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Python");

  const handleLevelToggle = (level: string) => {
    setSelectedLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  const handleTopicToggle = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleClearAll = () => {
    setSelectedLevels([]);
    setSelectedTopics([]);
  };

  return (
    <div className="flex-1 max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop py-[40px] flex flex-col lg:flex-row gap-gutter">
      {/* Filter Sidebar */}
      <FilterSidebar
        selectedLevels={selectedLevels}
        selectedTopics={selectedTopics}
        selectedLanguage={selectedLanguage}
        onLevelToggle={handleLevelToggle}
        onTopicToggle={handleTopicToggle}
        onLanguageSelect={setSelectedLanguage}
        onClearAll={handleClearAll}
      />

      {/* Course Grid Area */}
      <main className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
          <div>
            <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg-mobile md:font-display-lg text-on-surface tracking-tight mb-2">
              {t(d => d.courses.catalogTitle)}
            </h1>
            <p className="text-outline-variant font-body-base text-body-base">
              {t(d => d.courses.modulesAvailable)}
            </p>
          </div>
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 bg-[#112240] border border-[#233554] rounded-md px-4 py-2 cursor-pointer hover:border-secondary/50 transition-all hover:bg-surface-container-high group">
            <span className="font-label-caps text-[10px] text-on-surface-variant group-hover:text-on-surface">
              {t(d => d.courses.sortBy)}
            </span>
            <span className="material-symbols-outlined text-on-surface-variant text-sm transition-transform group-hover:rotate-180">
              expand_more
            </span>
          </div>
        </div>

        {/* Bento-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Course Card 1: Featured/Active Course Card (Enrolled) */}
          <CourseCard
            featured
            title={t(d => d.courses.dpTitle)}
            description={t(d => d.courses.dpDesc)}
            level="Advanced"
            duration="12h 45m"
            languages={["Python", "C++"]}
            progress={68}
            continueUrl="/lab"
          />

          {/* Course Card 2 */}
          <CourseCard
            title={t(d => d.courses.graphTitle)}
            description={t(d => d.courses.graphDesc)}
            category="Algorithms"
            level="Intermediate"
            rating={4.9}
            syllabusUrl="/lab"
          />

          {/* Course Card 3 */}
          <CourseCard
            title={t(d => d.courses.treesTitle)}
            description={t(d => d.courses.treesDesc)}
            category="Data Structures"
            level="Intermediate"
            rating={4.8}
            syllabusUrl="/lab"
          />

          {/* Course Card 4 */}
          <CourseCard
            title={t(d => d.courses.neuralTitle)}
            description={t(d => d.courses.neuralDesc)}
            category="Machine Learning"
            level="Intermediate"
            rating={4.9}
            syllabusUrl="/lab"
          />

          {/* Course Card 5 (Completed State) */}
          <CourseCard
            title={t(d => d.courses.asymptoticTitle)}
            description={t(d => d.courses.asymptoticDesc)}
            category="Fundamentals"
            level="Beginner"
            progress={100}
          />
        </div>
      </main>
    </div>
  );
}
