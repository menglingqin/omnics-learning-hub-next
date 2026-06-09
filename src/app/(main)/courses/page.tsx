"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useApp } from "@/context/AppContext";
import FilterSidebar from "@/components/FilterSidebar";
import CourseCard from "@/components/CourseCard";
import Button from "@/components/ui/Button";

interface Course {
  id: string;
  title: string;
  description: string;
  category: "Algorithms" | "Data Structures" | "Machine Learning" | "Fundamentals";
  level: "Beginner" | "Intermediate" | "Advanced";
  languages: string[];
  rating?: number;
  progress?: number;
  duration?: string;
  featured?: boolean;
  continueUrl?: string;
  syllabusUrl?: string;
}

export default function CoursesPage() {
  const { t, language } = useLanguage();
  const { enrolledCourses } = useApp();

  // State for filters and search
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

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
    setSelectedLanguage("");
    setSearchQuery("");
  };

  // Mock course database
  const courses: Course[] = [
    {
      id: "DP-401",
      title: "Advanced Dynamic Programming",
      description: "Master complex state transitions and optimization problems. This comprehensive module covers memoization, tabulation, and spatial optimization techniques.",
      category: "Algorithms",
      level: "Advanced",
      languages: ["Python", "C++"],
      duration: "12h 45m",
      progress: 68,
      featured: true,
      continueUrl: "/lab",
    },
    {
      id: "SYS-302",
      title: "Graph Theory Foundations",
      description: "Understand topological sorts, shortest path algorithms, and minimum spanning trees.",
      category: "Algorithms",
      level: "Intermediate",
      languages: ["Python", "C++", "Go"],
      rating: 4.9,
      syllabusUrl: "/lab",
    },
    {
      id: "DS-201",
      title: "Trees & Heaps Deep Dive",
      description: "Implementation and application of AVL trees and priority queues in system design.",
      category: "Data Structures",
      level: "Intermediate",
      languages: ["Python", "C++", "JS"],
      rating: 4.8,
      syllabusUrl: "/lab",
    },
    {
      id: "ML-301",
      title: "Neural Network Architecture",
      description: "Build backpropagation algorithms from scratch. A math-heavy approach to fundamentals.",
      category: "Machine Learning",
      level: "Intermediate",
      languages: ["Python", "JS"],
      rating: 4.9,
      syllabusUrl: "/lab",
    },
    {
      id: "CS-101",
      title: "Asymptotic Notation",
      description: "Big O, Omega, and Theta tight bounds. Master complexity analysis.",
      category: "Fundamentals",
      level: "Beginner",
      languages: ["Python", "C++", "JS", "Go"],
      progress: 100,
    },
    {
      id: "DB-401",
      title: "PostgreSQL Internals",
      description: "Understand MVCC, vacuuming, and index structures beneath the surface.",
      category: "Data Structures",
      level: "Advanced",
      languages: ["C++", "Go"],
      rating: 4.9,
      progress: 0,
      syllabusUrl: "/lab",
    },
    {
      id: "SYS-402",
      title: "Distributed Consensus (Raft)",
      description: "Implementing Raft and Paxos algorithms from scratch in Go.",
      category: "Algorithms",
      level: "Intermediate",
      languages: ["Go"],
      rating: 4.8,
      progress: 45,
      syllabusUrl: "/lab",
    },
    {
      id: "CS-102",
      title: "Computer Architecture",
      description: "From NAND gates to CPU design. Understand how hardware executes code.",
      category: "Fundamentals",
      level: "Beginner",
      languages: ["C++"],
      rating: 4.9,
      progress: 0,
      syllabusUrl: "/lab",
    },
    {
      id: "SEC-501",
      title: "Applied Cryptography",
      description: "Zero-knowledge proofs, elliptic curves, and modern protocol security.",
      category: "Fundamentals",
      level: "Advanced",
      languages: ["Go", "Python"],
      rating: 4.7,
      progress: 100,
    },
  ];

  // Filtering Logic
  const filteredCourses = courses.filter((course) => {
    // 1. Difficulty Level Filter
    if (selectedLevels.length > 0 && !selectedLevels.includes(course.level)) {
      return false;
    }
    // 2. Topic Category Filter
    if (selectedTopics.length > 0 && !selectedTopics.includes(course.category)) {
      return false;
    }
    // 3. Programming Language Filter
    if (selectedLanguage && !course.languages.includes(selectedLanguage)) {
      return false;
    }
    // 4. Text Search Filter (Case insensitive match on title or description)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchTitle = course.title.toLowerCase().includes(query);
      const matchDesc = course.description.toLowerCase().includes(query);
      if (!matchTitle && !matchDesc) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="flex-1 max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop py-[40px] flex flex-col lg:flex-row gap-gutter">
      {/* Filter Sidebar */}
      <FilterSidebar
        selectedLevels={selectedLevels}
        selectedTopics={selectedTopics}
        selectedLanguage={selectedLanguage}
        onLevelToggle={handleLevelToggle}
        onTopicToggle={handleTopicToggle}
        onLanguageSelect={(lang) => setSelectedLanguage(lang === selectedLanguage ? "" : lang)}
        onClearAll={handleClearAll}
      />

      {/* Course Grid Area */}
      <main className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
          <div className="w-full sm:w-auto">
            <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg-mobile md:font-display-lg text-on-surface tracking-tight mb-2">
              {t(d => d.courses.catalogTitle)}
            </h1>
            <p className="text-outline-variant font-body-base text-body-base">
              {language === "zh"
                ? `显示 ${filteredCourses.length} 个可用模块。`
                : `Showing ${filteredCourses.length} available modules.`}
            </p>
          </div>
          
          {/* Search Input & Sort Dropdown */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-[18px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === "zh" ? "搜索课程..." : "Search courses..."}
                className="w-full sm:w-48 xl:w-64 bg-[#112240] border border-outline-variant/30 text-on-surface text-code-sm font-code-sm rounded-DEFAULT pl-10 pr-4 py-2 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/50 transition-all placeholder:text-outline-variant"
              />
            </div>
            
            <div className="flex items-center gap-2 bg-[#112240] border border-outline-variant/30 rounded-md px-4 py-2 cursor-pointer hover:border-secondary/50 transition-all hover:bg-surface-container-high group">
              <span className="font-label-caps text-[10px] text-on-surface-variant group-hover:text-on-surface">
                {t(d => d.courses.sortBy)}
              </span>
              <span className="material-symbols-outlined text-on-surface-variant text-sm transition-transform group-hover:rotate-180">
                expand_more
              </span>
            </div>
          </div>
        </div>

        {/* Catalog List / Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              // Get translated title and description if matches are found in dictionaries
              let cardTitle = course.title;
              let cardDesc = course.description;

              if (course.id === "DP-401") {
                cardTitle = t(d => d.courses.dpTitle);
                cardDesc = t(d => d.courses.dpDesc);
              } else if (course.id === "SYS-302") {
                cardTitle = t(d => d.courses.graphTitle);
                cardDesc = t(d => d.courses.graphDesc);
              } else if (course.id === "DS-201") {
                cardTitle = t(d => d.courses.treesTitle);
                cardDesc = t(d => d.courses.treesDesc);
              } else if (course.id === "ML-301") {
                cardTitle = t(d => d.courses.neuralTitle);
                cardDesc = t(d => d.courses.neuralDesc);
              } else if (course.id === "CS-101") {
                cardTitle = t(d => d.courses.asymptoticTitle);
                cardDesc = t(d => d.courses.asymptoticDesc);
              } else if (course.id === "DB-401") {
                cardTitle = t(d => d.courses.pgTitle);
                cardDesc = t(d => d.courses.pgDesc);
              } else if (course.id === "SYS-402") {
                cardTitle = t(d => d.courses.raftTitle);
                cardDesc = t(d => d.courses.raftDesc);
              } else if (course.id === "CS-102") {
                cardTitle = t(d => d.courses.compTitle);
                cardDesc = t(d => d.courses.compDesc);
              } else if (course.id === "SEC-501") {
                cardTitle = t(d => d.courses.cryptoTitle);
                cardDesc = t(d => d.courses.cryptoDesc);
              }

              const courseProgress = enrolledCourses[course.id] !== undefined
                ? enrolledCourses[course.id]
                : course.progress;

              return (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  title={cardTitle}
                  description={cardDesc}
                  category={course.category}
                  level={course.level}
                  languages={course.languages}
                  rating={course.rating}
                  progress={courseProgress}
                  duration={course.duration}
                  featured={course.featured}
                  continueUrl={course.continueUrl}
                  syllabusUrl={course.syllabusUrl}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 bg-[#112240] rounded-xl border border-outline-variant/30 text-center gap-4 my-8">
            <span className="material-symbols-outlined text-[64px] text-outline">
              search_off
            </span>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-on-surface">
                {language === "zh" ? "没有找到符合条件的课程" : "No courses found"}
              </h3>
              <p className="text-sm text-on-surface-variant max-w-sm">
                {language === "zh"
                  ? "请尝试放宽筛选条件，或使用不同的搜索词重新检索。"
                  : "Please try adjusting your filters or search terms to find what you are looking for."}
              </p>
            </div>
            <Button variant="primary" size="sm" onClick={handleClearAll} className="mt-2">
              {language === "zh" ? "重置筛选条件" : "Reset Filters"}
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
