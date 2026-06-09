import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CourseCard from "@/components/CourseCard";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";

const LanguageToggler = () => {
  const { setLanguage } = useLanguage();
  return (
    <div>
      <button onClick={() => setLanguage("en")}>To EN</button>
      <button onClick={() => setLanguage("zh")}>To ZH</button>
    </div>
  );
};

describe("CourseCard Component", () => {
  it("renders standard card correctly", () => {
    render(
      <LanguageProvider>
        <CourseCard
          title="Graph Theory Foundations"
          description="Learn topological sort."
          category="Algorithms"
          level="Intermediate"
          rating={4.9}
          syllabusUrl="/syllabus/graph"
        />
      </LanguageProvider>
    );

    expect(screen.getByText("Graph Theory Foundations")).toBeInTheDocument();
    expect(screen.getByText("Learn topological sort.")).toBeInTheDocument();
    expect(screen.getByText("算法")).toBeInTheDocument(); // category translated in default zh
    expect(screen.getByText("中级")).toBeInTheDocument(); // level translated
    expect(screen.getByText("4.9")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "教学大纲 →" })).toHaveAttribute("href", "/syllabus/graph");
  });

  it("renders featured card with progress details correctly", () => {
    render(
      <LanguageProvider>
        <CourseCard
          featured
          title="Advanced Dynamic Programming"
          description="Master state transitions."
          level="Advanced"
          progress={68}
          duration="12h 45m"
          languages={["Python", "C++"]}
          continueUrl="/lab/dp"
        />
      </LanguageProvider>
    );

    expect(screen.getByText("Advanced Dynamic Programming")).toBeInTheDocument();
    expect(screen.getByText("进行中")).toBeInTheDocument(); // progress badge in zh
    expect(screen.getByText("高级")).toBeInTheDocument();
    expect(screen.getByText("12h 45m")).toBeInTheDocument();
    expect(screen.getByText("Python, C++")).toBeInTheDocument();
    expect(screen.getByText("68% 已完成")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "继续实验" })).toHaveAttribute("href", "/lab/dp");
  });

  it("renders completed card with overlay correctly", () => {
    render(
      <LanguageProvider>
        <CourseCard
          title="Asymptotic Notation"
          description="Big O analysis."
          category="Fundamentals"
          level="Beginner"
          progress={100}
        />
      </LanguageProvider>
    );

    expect(screen.getByText("Asymptotic Notation")).toBeInTheDocument();
    expect(screen.getByText("基础")).toBeInTheDocument(); // fundamentals category translated
    expect(screen.getByText("复习资料")).toBeInTheDocument(); // overlay button
  });

  it("changes translations when language context changes", () => {
    render(
      <LanguageProvider>
        <LanguageToggler />
        <CourseCard
          title="Asymptotic Notation"
          description="Big O analysis."
          category="Algorithms"
          level="Beginner"
          progress={100}
        />
      </LanguageProvider>
    );

    // Default ZH
    expect(screen.getByText("算法")).toBeInTheDocument();
    expect(screen.getByText("复习资料")).toBeInTheDocument();

    // Toggle to EN
    fireEvent.click(screen.getByText("To EN"));
    expect(screen.getByText("Algorithms")).toBeInTheDocument();
    expect(screen.getByText("REVIEW MATERIAL")).toBeInTheDocument();
  });
});
