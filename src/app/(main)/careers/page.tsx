"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import JobCard from "@/components/JobCard";

export default function CareersPage() {
  const { t, language } = useLanguage();

  const jobs = [
    {
      title: "Senior Backend Engineer",
      company: "Stripe",
      location: "Remote",
      tech: "Python, Go",
    },
    {
      title: "Frontend Developer",
      company: "Vercel",
      location: "San Francisco, CA",
      tech: "React, TypeScript",
    },
    {
      title: "Machine Learning Engineer",
      company: "OpenAI",
      location: "Remote",
      tech: "PyTorch, C++",
    },
  ];

  return (
    <div className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 flex flex-col gap-16">
      {/* Hero Section */}
      <header className="flex flex-col gap-6 text-center max-w-3xl mx-auto">
        <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg-mobile md:font-display-lg text-on-surface">
          {t(d => d.careers.heroTitle)}
        </h1>
        <p className="text-body-base font-body-base text-on-surface-variant">
          {t(d => d.careers.heroDesc)}
        </p>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {/* Tech Job Board (Large Span) */}
        <section className="glass-panel glow-hover rounded-xl p-8 md:col-span-8 flex flex-col gap-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-transparent opacity-50"></div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <h2 className="text-headline-md font-headline-md text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">work</span>{" "}
                {t(d => d.careers.techJobBoard)}
              </h2>
              {language === "zh" && (
                <span className="text-code-sm text-outline mt-1 font-mono uppercase tracking-wider">
                  {t(d => d.careers.jobBoardSubtitle)}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <span className="text-label-caps font-label-caps bg-secondary/10 border border-secondary text-secondary px-2 py-1 rounded-sm">
                REMOTE
              </span>
              <span className="text-label-caps font-label-caps bg-surface-variant text-on-surface-variant px-2 py-1 rounded-sm border border-outline/30">
                ON-SITE
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {jobs.map((job, idx) => (
              <JobCard
                key={idx}
                title={job.title}
                company={job.company}
                location={job.location}
                tech={job.tech}
              />
            ))}
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="mt-auto self-start border-secondary/40 hover:border-secondary"
          >
            {t(d => d.careers.viewAllRoles)}
          </Button>
        </section>

        {/* Resume Builder */}
        <section className="glass-panel glow-hover rounded-xl p-8 md:col-span-4 flex flex-col gap-6">
          <div className="flex flex-col">
            <h2 className="text-headline-md font-headline-md text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">
                description
              </span>{" "}
              {t(d => d.careers.resumeBuilder)}
            </h2>
            {language === "zh" && (
              <span className="text-code-sm text-outline mt-1 font-mono uppercase tracking-wider">
                {t(d => d.careers.resumeBuilderSubtitle)}
              </span>
            )}
          </div>
          <p className="text-body-base font-body-base text-on-surface-variant">
            {t(d => d.careers.resumeBuilderDesc)}
          </p>
          <div className="bg-[#020C1B] p-4 rounded-lg border border-[#233554] mt-auto">
            <div className="flex items-center gap-2 mb-2 text-secondary">
              <span className="material-symbols-outlined text-[16px]">
                check_circle
              </span>
              <span className="text-code-sm font-code-sm">
                {t(d => d.careers.skillSyncEnabled)}
              </span>
            </div>
            <p className="text-code-sm font-code-sm text-outline font-mono">
              {t(d => d.careers.lastUpdated)}
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            icon="edit_document"
            glow
            className="w-full flex justify-center items-center"
          >
            {t(d => d.careers.editResume)}
          </Button>
        </section>

        {/* Mock Interviews */}
        <section className="glass-panel glow-hover rounded-xl p-8 md:col-span-6 flex flex-col gap-6 border-t-2 border-t-secondary">
          <div className="flex flex-col">
            <h2 className="text-headline-md font-headline-md text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">
                code_blocks
              </span>{" "}
              {t(d => d.careers.mockInterviews)}
            </h2>
            {language === "zh" && (
              <span className="text-code-sm text-outline mt-1 font-mono uppercase tracking-wider">
                {t(d => d.careers.mockInterviewsSubtitle)}
              </span>
            )}
          </div>
          <p className="text-body-base font-body-base text-on-surface-variant">
            {t(d => d.careers.mockInterviewsDesc)}
          </p>
          <div className="flex flex-col gap-3">
            <div className="group flex justify-between items-center p-4 bg-surface-container rounded-lg border border-outline/10 hover:border-secondary/30 transition-colors">
              <span className="text-body-base font-body-base group-hover:text-secondary transition-colors">
                {t(d => d.careers.dynamicProgramming)}
              </span>
              <Badge variant="hard">HARD</Badge>
            </div>
            <div className="group flex justify-between items-center p-4 bg-surface-container rounded-lg border border-outline/10 hover:border-secondary/30 transition-colors">
              <span className="text-body-base font-body-base group-hover:text-secondary transition-colors">
                {t(d => d.careers.graphTraversal)}
              </span>
              <Badge variant="medium">MEDIUM</Badge>
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            href="/lab"
            className="mt-auto self-start"
          >
            {t(d => d.careers.startSession)}
          </Button>
        </section>

        {/* Company Insights */}
        <section className="glass-panel glow-hover rounded-xl p-8 md:col-span-6 flex flex-col gap-6 relative overflow-hidden">
          <h2 className="text-headline-md font-headline-md text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">
              insights
            </span>{" "}
            {t(d => d.careers.companyInsights)}
          </h2>
          <p className="text-body-base font-body-base text-on-surface-variant">
            {t(d => d.careers.companyInsightsDesc)}
          </p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-surface-container-high p-6 rounded-lg flex flex-col items-center justify-center text-center border border-outline/10 hover:border-secondary hover:bg-surface-container-highest hover:-translate-y-1 transition-all duration-300 cursor-pointer group shadow-sm">
              <span className="text-headline-md font-headline-md font-bold mb-1 group-hover:text-secondary transition-colors">
                FAANG
              </span>
              <span className="text-label-caps font-label-caps text-on-surface-variant">
                {t(d => d.careers.interviewGuides)}
              </span>
            </div>
            <div className="bg-surface-container-high p-6 rounded-lg flex flex-col items-center justify-center text-center border border-outline/10 hover:border-secondary hover:bg-surface-container-highest hover:-translate-y-1 transition-all duration-300 cursor-pointer group shadow-sm">
              <span className="text-headline-md font-headline-md font-bold mb-1 group-hover:text-secondary transition-colors">
                Startups
              </span>
              <span className="text-label-caps font-label-caps text-on-surface-variant">
                {t(d => d.careers.equityBasics)}
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
