"use client";

import Link from "next/link";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export interface CourseCardProps {
  id?: string;
  title: string;
  description: React.ReactNode;
  level: "Beginner" | "Intermediate" | "Advanced";
  category?: string;
  rating?: number;
  progress?: number;
  duration?: string;
  languages?: string[];
  featured?: boolean;
  syllabusUrl?: string;
  continueUrl?: string;
}

export default function CourseCard({
  id,
  title,
  description,
  level,
  category,
  rating,
  progress,
  duration,
  languages,
  featured = false,
  syllabusUrl = "#",
  continueUrl = "/lab",
}: CourseCardProps) {
  const { t } = useLanguage();
  const isCompleted = progress === 100;
  const isInProgress = progress !== undefined && progress > 0 && progress < 100;

  if (featured) {
    return (
      <div className="glass-panel rounded-xl overflow-hidden neon-glow transition-all duration-300 flex flex-col border-t-2 border-t-secondary relative group col-span-1 md:col-span-2 xl:col-span-2 row-span-2">
        <div
          className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none shimmer-bg"
          style={{
            backgroundImage:
              "radial-gradient(circle at 100% 0%, #41e4c0 0%, transparent 50%)",
          }}
        ></div>
        <div className="p-8 flex-1 flex flex-col justify-between relative z-10">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-2">
                <Badge variant="in-progress">
                  {t(d => d.common.inProgress)}
                </Badge>
              </div>
              <span className="material-symbols-outlined text-secondary hover:scale-110 transition-transform cursor-pointer">
                bookmark
              </span>
            </div>
            <h2 className="text-display-lg-mobile md:text-4xl font-display-lg-mobile text-on-surface mb-3 group-hover:text-secondary transition-colors duration-300">
              {title}
            </h2>
            <div className="text-on-surface-variant font-body-base text-body-base mb-6 max-w-xl">
              {description}
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {duration && (
                <div className="flex items-center gap-2 text-outline font-code-sm text-code-sm">
                  <span className="material-symbols-outlined text-[16px]">
                    schedule
                  </span>
                  {duration}
                </div>
              )}
              <div className="flex items-center gap-2 text-outline font-code-sm text-code-sm">
                <span className="material-symbols-outlined text-[16px]">
                  signal_cellular_alt
                </span>
                {t(d => level === "Beginner" ? d.common.beginner : level === "Intermediate" ? d.common.intermediate : d.common.advanced)}
              </div>
              {languages && languages.length > 0 && (
                <div className="flex items-center gap-2 text-outline font-code-sm text-code-sm">
                  <span className="material-symbols-outlined text-[16px]">
                    code
                  </span>
                  {languages.join(", ")}
                </div>
              )}
            </div>
          </div>
          {/* Progress Bar Section */}
          <div className="mt-auto">
            <div className="flex justify-between text-[10px] font-label-caps mb-2">
              <div className="flex gap-4">
                <span className="text-on-surface">
                  {t(d => d.courses.matrixChains)}
                </span>
              </div>
              <span className="text-secondary font-bold">{progress}% {t(d => d.common.complete)}</span>
            </div>
            <div className="w-full h-2 bg-[#020C1B] rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary progress-pulse rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="mt-8 flex justify-end">
              <Button
                variant="primary"
                size="md"
                href={continueUrl}
                glow
                className="font-bold shadow-[0_0_15px_rgba(65,228,192,0.3)] hover:shadow-[0_0_25px_rgba(65,228,192,0.5)]"
              >
                {t(d => d.common.continueLab)}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Completed State Overlay style
  if (isCompleted) {
    return (
      <div className="bg-[#112240]/50 border border-[#233554]/50 rounded-xl p-6 flex flex-col hover:border-[#233554] transition-all relative overflow-hidden group">
        <div className="absolute inset-0 bg-[#0A192F]/60 backdrop-blur-[2px] z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
          <Button
            variant="secondary"
            size="sm"
            className="bg-[#112240]"
          >
            {t(d => d.common.reviewMaterial)}
          </Button>
        </div>
        <div className="mb-4 flex justify-between items-center relative z-0">
        <div className="flex flex-col">
          {category && (
            <Badge variant="neutral">
              {t(d =>
                category === "Algorithms"
                  ? d.common.algorithms
                  : category === "Data Structures"
                  ? d.common.dataStructures
                  : category === "Machine Learning"
                  ? d.common.machineLearning
                  : category === "Fundamentals"
                  ? d.common.fundamentals
                  : category
              )}
            </Badge>
          )}
        </div>
        <span
          className="material-symbols-outlined text-secondary"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          check_circle
        </span>
      </div>
      <h3 className="text-headline-md font-headline-md text-outline mb-2 relative z-0">
        {title}
      </h3>
      <div className="text-outline/70 font-body-base text-sm mb-6 flex-1 line-clamp-2 relative z-0 leading-relaxed">
        {description}
      </div>
      <div className="pt-4 border-t border-[#233554]/50 relative z-0">
        <div className="w-full h-1 bg-secondary rounded-full shadow-[0_0_8px_#41e4c0]"></div>
      </div>
    </div>
  );
}

// Standard Card or In-Progress standard card
return (
  <div
    className={`bg-[#112240] border border-[#233554] rounded-xl p-6 flex flex-col hover:border-secondary/50 hover:bg-surface-container-low transition-all duration-300 group cursor-pointer relative overflow-hidden ${
      isInProgress && id === "SYS-302" ? "border-t-2 border-t-secondary" : ""
    }`}
  >
    <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
    
    <div className="mb-4 flex justify-between items-center relative z-10">
      <div className="flex gap-2">
        {category && (
          <Badge variant="neutral">
            {t(d =>
              category === "Algorithms"
                ? d.common.algorithms
                : category === "Data Structures"
                ? d.common.dataStructures
                : category === "Machine Learning"
                ? d.common.machineLearning
                : category === "Fundamentals"
                ? d.common.fundamentals
                : category
            )}
          </Badge>
        )}
        {isInProgress && id === "SYS-302" && (
          <Badge variant="active">
            {t(d => d.common.active)}
          </Badge>
        )}
      </div>
        {level && (
          <span className="text-[10px] font-label-caps text-outline opacity-65">
            {t(d => level === "Beginner" ? d.common.beginner : level === "Intermediate" ? d.common.intermediate : d.common.advanced)}
          </span>
        )}
      </div>

      <h3 className="text-headline-md font-headline-md text-on-surface mb-2 group-hover:text-secondary transition-colors relative z-10">
        {title}
      </h3>
      <div className="text-outline font-body-base text-sm mb-6 flex-1 line-clamp-3 relative z-10 leading-relaxed">
        {description}
      </div>

      {progress !== undefined && progress >= 0 && (
        <div className="mb-4 mt-auto relative z-10">
          <div className="w-full bg-[#020C1B] h-1 rounded-full overflow-hidden">
            <div className={`bg-secondary h-full ${progress > 0 ? "glow-effect" : ""}`} style={{ width: `${progress}%` }}></div>
          </div>
          <div className="text-label-caps font-label-caps text-outline mt-2 text-[10px]">
            {progress}% {t(d => d.common.completed)}
          </div>
        </div>
      )}

      <div className="pt-4 border-t border-[#233554] flex items-center justify-between relative z-10 mt-auto">
        <div className="flex items-center gap-1 text-on-surface-variant font-code-sm text-code-sm">
          <span className="material-symbols-outlined text-[16px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
            star
          </span>
          <span>{rating || 4.8}</span>
        </div>
        <Link
          href={syllabusUrl}
          className="text-secondary font-label-caps text-[10px] translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
        >
          {t(d => d.common.syllabusLink)}
        </Link>
      </div>
    </div>
  );
}
