"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import Button from "@/components/ui/Button";
import CourseCard from "@/components/CourseCard";

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 px-margin-mobile md:px-margin-desktop overflow-hidden border-b border-outline-variant/20">
        {/* Decorative Background Grid */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#41e4c0 1px, transparent 1px), linear-gradient(90deg, #41e4c0 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>
        <div className="max-w-container-max mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 flex flex-col gap-8">
            <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary px-3 py-1.5 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span className="text-secondary text-label-caps font-label-caps">
                {t(d => d.home.v2Live)}
              </span>
            </div>
            <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg-mobile md:font-display-lg text-on-surface leading-tight">
              {t(d => d.home.title)}
            </h1>
            <p className="text-body-base font-body-base text-on-surface-variant max-w-2xl text-lg leading-relaxed">
              {t(d => d.home.desc)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                variant="primary"
                size="lg"
                href="/courses"
                icon="arrow_forward"
                iconPosition="right"
                glow
              >
                {t(d => d.home.startLearning)}
              </Button>
              <Button
                variant="secondary"
                size="lg"
                href="/courses"
                icon="play_circle"
              >
                {t(d => d.home.viewCurriculum)}
              </Button>
            </div>
          </div>
          <div className="flex-1 w-full max-w-lg lg:max-w-none relative">
            {/* Conceptual Abstract Visualization block */}
            <div className="aspect-square w-full rounded-full bg-gradient-to-tr from-tertiary-container via-surface-variant to-[#112240] p-1 glow-effect relative opacity-80">
              <div className="w-full h-full rounded-full bg-[#0A192F] flex items-center justify-center relative overflow-hidden border border-[#233554]">
                {/* Simulated Code Rings */}
                <div className="absolute inset-0 border border-secondary/20 rounded-full animate-[spin_60s_linear_infinite] m-8"></div>
                <div className="absolute inset-0 border border-secondary/40 rounded-full animate-[spin_40s_linear_infinite_reverse] m-16 border-dashed"></div>
                <div className="text-secondary text-opacity-50 font-code-sm text-code-sm text-center">
                  <span
                    className="material-symbols-outlined text-[64px] mb-4 text-secondary opacity-80 glow-effect"
                    style={{ fontVariationSettings: "'FILL' 0" }}
                  >
                    data_object
                  </span>
                  <br />
                  system.init();
                  <br />
                  core.loadModule('future');
                </div>
              </div>
            </div>
            {/* Floating stat card */}
            <div className="absolute bottom-10 -left-10 glass-panel p-4 rounded-lg hidden md:flex items-center gap-4 hover:-translate-y-1 transition-transform cursor-default group">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center group-hover:bg-secondary/30 transition-colors">
                <span
                  className="material-symbols-outlined text-secondary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  speed
                </span>
              </div>
              <div>
                <div className="text-label-caps font-label-caps text-on-surface-variant uppercase text-[10px]">
                  {t(d => d.home.runtimeEfficiency)}
                </div>
                <div className="text-headline-md font-headline-md text-secondary">
                  99.9%
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-margin-mobile md:px-margin-desktop bg-[#0b0f10] border-b border-outline-variant/20">
        <div className="max-w-container-max mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center md:items-start border-l-2 border-secondary/30 pl-4 group">
            <span className="text-display-lg-mobile font-display-lg-mobile text-secondary mb-1 group-hover:scale-105 transition-transform origin-left">
              142K+
            </span>
            <span className="text-label-caps font-label-caps text-on-surface-variant">
              {t(d => d.home.activeStudents)}
            </span>
          </div>
          <div className="flex flex-col items-center md:items-start border-l-2 border-secondary/30 pl-4 group">
            <span className="text-display-lg-mobile font-display-lg-mobile text-on-surface mb-1 group-hover:scale-105 transition-transform origin-left">
              8.5M
            </span>
            <span className="text-label-caps font-label-caps text-on-surface-variant">
              {t(d => d.home.linesOfCode)}
            </span>
          </div>
          <div className="flex flex-col items-center md:items-start border-l-2 border-secondary/30 pl-4 group">
            <span className="text-display-lg-mobile font-display-lg-mobile text-on-surface mb-1 group-hover:scale-105 transition-transform origin-left">
              450+
            </span>
            <span className="text-label-caps font-label-caps text-on-surface-variant">
              {t(d => d.home.interactiveLabs)}
            </span>
          </div>
          <div className="flex flex-col items-center md:items-start border-l-2 border-secondary/30 pl-4 group">
            <span className="text-display-lg-mobile font-display-lg-mobile text-on-surface mb-1 group-hover:scale-105 transition-transform origin-left">
              94%
            </span>
            <span className="text-label-caps font-label-caps text-on-surface-variant">
              {t(d => d.home.placementRate)}
            </span>
          </div>
        </div>
      </section>

      {/* Curated Learning Paths (Bento Grid) */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <div className="mb-12">
            <h2 className="text-display-lg-mobile font-display-lg-mobile text-on-surface mb-4">
              {t(d => d.home.curatedPaths)}
            </h2>
            <p className="text-body-base font-body-base text-on-surface-variant max-w-3xl">
              {t(d => d.home.curatedPathsDesc)}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
            {/* Path 1: Systems (Large) */}
            <div className="surface-card rounded-xl p-8 col-span-1 md:col-span-2 md:row-span-2 relative overflow-hidden group hover-glow border-t-2 border-t-secondary">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <span
                  className="material-symbols-outlined text-[120px] text-secondary"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  dns
                </span>
              </div>
              <div className="bg-secondary/10 text-secondary w-fit px-3 py-1 rounded-DEFAULT text-label-caps font-label-caps mb-6 border border-secondary/30">
                {t(d => d.home.coreEngineering)}
              </div>
              <h3 className="text-display-lg-mobile font-display-lg-mobile text-on-surface mb-4 relative z-10">
                {t(d => d.home.systemsTitle)}
              </h3>
              <p className="text-body-base font-body-base text-on-surface-variant mb-8 max-w-md relative z-10 leading-relaxed">
                {t(d => d.home.systemsDesc)}
              </p>
              <div className="mt-auto relative z-10">
                <div className="flex items-center gap-4 text-code-sm font-code-sm text-outline mb-6">
                  <div className="flex items-center gap-1">
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 0" }}
                    >
                      book
                    </span>{" "}
                    {t(d => d.home.modulesCount)}
                  </div>
                  <div className="flex items-center gap-1">
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 0" }}
                    >
                      schedule
                    </span>{" "}
                    {t(d => d.home.hoursCount)}
                  </div>
                </div>
                <Link
                  href="/courses"
                  className="text-secondary font-bold flex items-center gap-2 group-hover:translate-x-2 transition-transform"
                >
                  {t(d => d.home.explorePath)}{" "}
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 0" }}
                  >
                    arrow_right_alt
                  </span>
                </Link>
              </div>
            </div>
            {/* Path 2: AI */}
            <div className="surface-card rounded-xl p-6 col-span-1 md:col-span-1 md:row-span-1 relative overflow-hidden group hover-glow flex flex-col">
              <div className="bg-[#112240] border border-[#233554] w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:border-secondary transition-colors">
                <span
                  className="material-symbols-outlined text-tertiary-fixed-dim"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  psychology
                </span>
              </div>
              <h3 className="text-headline-md font-headline-md text-on-surface mb-2">
                {t(d => d.home.mlTitle)}
              </h3>
              <p className="text-body-base font-body-base text-on-surface-variant text-sm mb-4 flex-grow leading-relaxed">
                {t(d => d.home.mlDesc)}
              </p>
              <Link
                href="/courses"
                className="text-tertiary-fixed-dim font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform mt-auto w-fit"
              >
                {t(d => d.home.startBtn)}{" "}
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  chevron_right
                </span>
              </Link>
            </div>
            {/* Path 3: Web Dev */}
            <div className="surface-card rounded-xl p-6 col-span-1 md:col-span-1 md:row-span-1 relative overflow-hidden group hover-glow flex flex-col">
              <div className="bg-[#112240] border border-[#233554] w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:border-secondary transition-colors">
                <span
                  className="material-symbols-outlined text-primary-fixed-dim"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  code_blocks
                </span>
              </div>
              <h3 className="text-headline-md font-headline-md text-on-surface mb-2">
                {t(d => d.home.webTitle)}
              </h3>
              <p className="text-body-base font-body-base text-on-surface-variant text-sm mb-4 flex-grow leading-relaxed">
                {t(d => d.home.webDesc)}
              </p>
              <Link
                href="/courses"
                className="text-primary-fixed-dim font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform mt-auto w-fit"
              >
                {t(d => d.home.startBtn)}{" "}
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  chevron_right
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Courses */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop bg-[#0b0f10] border-y border-outline-variant/20">
        <div className="max-w-container-max mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-display-lg-mobile font-display-lg-mobile text-on-surface mb-2">
                {t(d => d.home.trendingCourses)}
              </h2>
              <p className="text-body-base font-body-base text-on-surface-variant">
                {t(d => d.home.trendingCoursesDesc)}
              </p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              href="/courses"
              className="hidden sm:flex"
            >
              {t(d => d.home.viewAllCourses)}
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <CourseCard
              id="DB-401"
              title={t(d => d.courses.pgTitle)}
              description={t(d => d.courses.pgDesc)}
              level="Advanced"
              rating={4.9}
              progress={0}
              syllabusUrl="/courses"
            />
            <CourseCard
              id="SYS-302"
              title={t(d => d.courses.raftTitle)}
              description={t(d => d.courses.raftDesc)}
              level="Intermediate"
              rating={4.8}
              progress={45}
              syllabusUrl="/courses"
            />
            <CourseCard
              id="CS-101"
              title={t(d => d.courses.compTitle)}
              description={t(d => d.courses.compDesc)}
              level="Beginner"
              rating={4.9}
              progress={0}
              syllabusUrl="/courses"
            />
            <CourseCard
              id="SEC-501"
              title={t(d => d.courses.cryptoTitle)}
              description={t(d => d.courses.cryptoDesc)}
              level="Advanced"
              rating={4.7}
              progress={100}
              syllabusUrl="/courses"
            />
          </div>
        </div>
      </section>
    </>
  );
}
