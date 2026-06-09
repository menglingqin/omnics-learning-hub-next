"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useApp } from "@/context/AppContext";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import JobCard from "@/components/JobCard";

interface Job {
  title: string;
  company: string;
  location: string;
  type: "REMOTE" | "ON-SITE";
  tech: string;
}

export default function CareersPage() {
  const { t, language } = useLanguage();
  const { resumeData, saveResume, completedProblems } = useApp();

  // State for Job filtering
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<"ALL" | "REMOTE" | "ON-SITE">("ALL");

  // State for Resume Builder Modal
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const jobs: Job[] = [
    {
      title: "Senior Backend Engineer",
      company: "Stripe",
      location: "Remote",
      type: "REMOTE",
      tech: "Python, Go",
    },
    {
      title: "Frontend Developer",
      company: "Vercel",
      location: "San Francisco, CA",
      type: "ON-SITE",
      tech: "React, TypeScript",
    },
    {
      title: "Machine Learning Engineer",
      company: "OpenAI",
      location: "Remote",
      type: "REMOTE",
      tech: "PyTorch, C++",
    },
    {
      title: "Systems Engineer",
      company: "AWS",
      location: "Seattle, WA",
      type: "ON-SITE",
      tech: "Rust, C++",
    },
  ];

  const filteredJobs = jobs.filter((job) => {
    if (selectedTypeFilter === "ALL") return true;
    return job.type === selectedTypeFilter;
  });

  const handlePrintResume = () => {
    window.print();
  };

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
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
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
            
            {/* Interactive Filters */}
            <div className="flex gap-2 bg-surface-container rounded-lg p-1 border border-outline-variant/20">
              <button
                onClick={() => setSelectedTypeFilter("ALL")}
                className={`px-3 py-1 text-label-caps font-label-caps rounded transition-all cursor-pointer ${
                  selectedTypeFilter === "ALL"
                    ? "bg-secondary text-primary-container font-bold"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {language === "zh" ? "全部" : "ALL"}
              </button>
              <button
                onClick={() => setSelectedTypeFilter("REMOTE")}
                className={`px-3 py-1 text-label-caps font-label-caps rounded transition-all cursor-pointer ${
                  selectedTypeFilter === "REMOTE"
                    ? "bg-secondary text-primary-container font-bold"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {language === "zh" ? "远程" : "REMOTE"}
              </button>
              <button
                onClick={() => setSelectedTypeFilter("ON-SITE")}
                className={`px-3 py-1 text-label-caps font-label-caps rounded transition-all cursor-pointer ${
                  selectedTypeFilter === "ON-SITE"
                    ? "bg-secondary text-primary-container font-bold"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {language === "zh" ? "线下" : "ON-SITE"}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, idx) => (
                <JobCard
                  key={idx}
                  title={job.title}
                  company={job.company}
                  location={job.location}
                  tech={job.tech}
                />
              ))
            ) : (
              <div className="text-center py-12 text-on-surface-variant">
                {language === "zh" ? "暂无匹配的职位" : "No matching jobs found"}
              </div>
            )}
          </div>
          
          <Button
            variant="secondary"
            size="sm"
            className="mt-auto self-start border-secondary/40 hover:border-secondary"
          >
            {t(d => d.careers.viewAllRoles)}
          </Button>
        </section>

        {/* Resume Builder Widget */}
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
            onClick={() => setIsResumeOpen(true)}
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
              <div className="flex items-center gap-3">
                <Badge variant="hard">HARD</Badge>
                <Link href="/lab?problem=dp">
                  <Button variant="transparent" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    {t(d => d.careers.startSession)} →
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="group flex justify-between items-center p-4 bg-surface-container rounded-lg border border-outline/10 hover:border-secondary/30 transition-colors">
              <span className="text-body-base font-body-base group-hover:text-secondary transition-colors">
                {t(d => d.careers.graphTraversal)}
              </span>
              <div className="flex items-center gap-3">
                <Badge variant="medium">MEDIUM</Badge>
                <Link href="/lab?problem=graph">
                  <Button variant="transparent" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    {t(d => d.careers.startSession)} →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
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

      {/* Resume Builder Modal */}
      {isResumeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="glass-panel w-full max-w-5xl h-[85vh] rounded-xl flex flex-col overflow-hidden relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-outline-variant/30 bg-[#112240] flex-none">
              <div>
                <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">edit_document</span>
                  {language === "zh" ? "智能简历构建器" : "Smart Resume Builder"}
                </h3>
              </div>
              <button
                onClick={() => setIsResumeOpen(false)}
                className="text-on-surface-variant hover:text-on-surface p-1 rounded hover:bg-surface-variant/30 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Modal Body (Split Panel) */}
            <div className="flex-1 flex overflow-hidden min-h-0">
              {/* Left Form Inputs */}
              <div className="w-1/2 overflow-y-auto p-6 space-y-4 border-r border-outline-variant/30">
                <div>
                  <label className="block text-xs font-label-caps text-outline mb-1">
                    {language === "zh" ? "姓名" : "Name"}
                  </label>
                  <input
                    type="text"
                    value={resumeData.name}
                    onChange={(e) => saveResume({ ...resumeData, name: e.target.value })}
                    className="w-full bg-[#020C1B] border border-outline-variant rounded px-3 py-2 text-on-surface text-sm focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-label-caps text-outline mb-1">
                    {language === "zh" ? "求职意向 / 称号" : "Target Title"}
                  </label>
                  <input
                    type="text"
                    value={resumeData.title}
                    onChange={(e) => saveResume({ ...resumeData, title: e.target.value })}
                    className="w-full bg-[#020C1B] border border-outline-variant rounded px-3 py-2 text-on-surface text-sm focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary/50 transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-label-caps text-outline mb-1">
                      {language === "zh" ? "电子邮箱" : "Email"}
                    </label>
                    <input
                      type="email"
                      value={resumeData.email}
                      onChange={(e) => saveResume({ ...resumeData, email: e.target.value })}
                      className="w-full bg-[#020C1B] border border-outline-variant rounded px-3 py-2 text-on-surface text-sm focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-label-caps text-outline mb-1">
                      {language === "zh" ? "GitHub 链接" : "GitHub Link"}
                    </label>
                    <input
                      type="text"
                      value={resumeData.github}
                      onChange={(e) => saveResume({ ...resumeData, github: e.target.value })}
                      className="w-full bg-[#020C1B] border border-outline-variant rounded px-3 py-2 text-on-surface text-sm focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary/50 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-label-caps text-outline mb-1">
                    {language === "zh" ? "专业技能 (逗号分隔)" : "Skills (comma-separated)"}
                  </label>
                  <input
                    type="text"
                    value={resumeData.skills}
                    onChange={(e) => saveResume({ ...resumeData, skills: e.target.value })}
                    className="w-full bg-[#020C1B] border border-outline-variant rounded px-3 py-2 text-on-surface text-sm focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-label-caps text-outline mb-1">
                    {language === "zh" ? "项目经验 & 自我介绍" : "Experience & Introduction"}
                  </label>
                  <textarea
                    rows={6}
                    value={resumeData.experience}
                    onChange={(e) => saveResume({ ...resumeData, experience: e.target.value })}
                    className="w-full bg-[#020C1B] border border-outline-variant rounded px-3 py-2 text-on-surface text-sm focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary/50 transition-all font-sans"
                  />
                </div>
              </div>

              {/* Right Resume Preview (ATS-friendly styling) */}
              <div className="w-1/2 overflow-y-auto p-8 bg-white text-slate-800 flex flex-col font-sans select-text">
                <div id="ats-resume-print" className="space-y-6">
                  {/* Header */}
                  <div className="text-center border-b-2 border-slate-800 pb-4">
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{resumeData.name}</h1>
                    <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide mt-1">{resumeData.title}</p>
                    <div className="flex justify-center gap-4 text-xs text-slate-500 mt-2 font-mono">
                      <span>{resumeData.email}</span>
                      <span>•</span>
                      <span>{resumeData.github}</span>
                    </div>
                  </div>

                  {/* Skills Section */}
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                      {language === "zh" ? "专业技能" : "TECHNICAL SKILLS"}
                    </h4>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {resumeData.skills.split(",").map((skill, index) => (
                        <span key={index} className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200">
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Experience Section */}
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                      {language === "zh" ? "项目经历与实践" : "PROJECT EXPERIENCE & PRACTICE"}
                    </h4>
                    
                    {/* Render completed coding challenges from global AppContext */}
                    {completedProblems.length > 0 && (
                      <div className="mb-4 space-y-3 border-l-2 border-slate-300 pl-3">
                        {completedProblems.includes("dp") && (
                          <div>
                            <div className="font-semibold text-xs text-slate-800 flex justify-between">
                              <span>{language === "zh" ? "算法工程实战：爬楼梯 (Easy)" : "Algorithm: Climbing Stairs (Easy)"}</span>
                              <span className="text-emerald-600 text-[10px] uppercase font-mono tracking-wider font-bold">✓ Verified</span>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5">
                              {language === "zh"
                                ? "使用 Python 独立实现了空间复杂度 O(1) 的迭代动态规划解决方案，成功通过全套性能边界用例校验。"
                                : "Implemented space-optimized O(1) iterative Dynamic Programming solution in Python, passing all structural test cases."}
                            </p>
                          </div>
                        )}
                        {completedProblems.includes("graph") && (
                          <div>
                            <div className="font-semibold text-xs text-slate-800 flex justify-between">
                              <span>{language === "zh" ? "算法工程实战：岛屿数量 (Medium)" : "Algorithm: Number of Islands (Medium)"}</span>
                              <span className="text-emerald-600 text-[10px] uppercase font-mono tracking-wider font-bold">✓ Verified</span>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5">
                              {language === "zh"
                                ? "基于 DFS 深度优先遍历算法解决了 2D 网格连通块划分难题，算法时间复杂度达 O(M*N)。"
                                : "Solved 2D grid component partitioning using a Depth First Search (DFS) traversal, achieving O(M*N) runtime."}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                      {resumeData.experience}
                    </div>
                  </div>
                  
                  {/* Education / Platform Verification */}
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                      {language === "zh" ? "教育背景 & 学术认证" : "EDUCATION & PLATFORM CERTIFICATIONS"}
                    </h4>
                    <div className="flex justify-between text-xs font-semibold text-slate-800">
                      <span>CS.Academy Learning Platform</span>
                      <span>2024 - Present</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      {language === "zh"
                        ? "成功通过高级算法设计与底层系统架构课程，已同步平台认证微服务技能。"
                        : "Completed Advanced Algorithms & Systems Architecture paths. Synchronized verified platform skills."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-outline-variant/30 bg-[#112240] flex-none">
              <Button variant="secondary" onClick={() => setIsResumeOpen(false)}>
                {language === "zh" ? "取消" : "Cancel"}
              </Button>
              <Button variant="primary" icon="print" onClick={handlePrintResume} glow>
                {language === "zh" ? "打印 / 导出 PDF" : "Print / Export PDF"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
