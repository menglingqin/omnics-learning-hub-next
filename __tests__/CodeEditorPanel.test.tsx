import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CodeEditorPanel from "@/components/lab/CodeEditorPanel";
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

describe("CodeEditorPanel Component", () => {
  it("renders editor structure and mock solution code", () => {
    render(
      <LanguageProvider>
        <CodeEditorPanel />
      </LanguageProvider>
    );

    expect(screen.getByText("solution.py")).toBeInTheDocument();
    expect(screen.getByText(/class/)).toBeInTheDocument();
    expect(screen.getByText(/Solution/)).toBeInTheDocument();
    expect(screen.getByText(/climbStairs/)).toBeInTheDocument();
  });

  it("updates localized code comments when language switches", () => {
    render(
      <LanguageProvider>
        <LanguageToggler />
        <CodeEditorPanel />
      </LanguageProvider>
    );

    // Default ZH comment
    expect(screen.getByText("# 基本情况 (Base cases)")).toBeInTheDocument();
    expect(screen.getByText("# 初始化 DP 数组 (或优化空间变量)")).toBeInTheDocument();

    // Toggle to EN
    fireEvent.click(screen.getByText("To EN"));
    expect(screen.getByText("# Base cases")).toBeInTheDocument();
    expect(screen.getByText("# Initialize DP array (or variables to optimize space)")).toBeInTheDocument();
  });
});
