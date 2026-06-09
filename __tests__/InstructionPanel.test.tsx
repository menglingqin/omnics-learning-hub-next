import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InstructionPanel from "@/components/lab/InstructionPanel";
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

const TestWrapper = ({
  activeTab,
  onTabChange,
  onViewHints,
}: {
  activeTab: "instructions" | "lesson";
  onTabChange: jest.Mock;
  onViewHints: jest.Mock;
}) => {
  const { t } = useLanguage();
  return (
    <InstructionPanel
      activeTab={activeTab}
      onTabChange={onTabChange}
      onViewHints={onViewHints}
      title={t(d => d.lab.climbingStairsTitle)}
      difficulty="Easy"
      duration="15 mins"
      description={t(d => d.lab.problemDescription)}
      exampleInput="n = 2"
      exampleOutput="2"
      explanation={t(d => d.lab.explanationText)}
      constraints={["1 <= n <= 45"]}
    />
  );
};

describe("InstructionPanel Component", () => {
  const mockOnTabChange = jest.fn();
  const mockOnViewHints = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderPanel = (activeTab: "instructions" | "lesson" = "instructions") => {
    return render(
      <LanguageProvider>
        <LanguageToggler />
        <TestWrapper
          activeTab={activeTab}
          onTabChange={mockOnTabChange}
          onViewHints={mockOnViewHints}
        />
      </LanguageProvider>
    );
  };

  it("renders instructions tab correctly by default in zh mode", () => {
    renderPanel();

    expect(screen.getByText("任务说明")).toHaveClass("text-secondary");
    expect(screen.getByText("爬楼梯")).toBeInTheDocument();
    expect(screen.getByText("简单")).toBeInTheDocument();
    expect(screen.getByText(/假设你正在爬楼梯/)).toBeInTheDocument();
    expect(screen.getByText("查看提示 (2)")).toBeInTheDocument();
  });

  it("renders lesson tab when activeTab is lesson", () => {
    renderPanel("lesson");

    expect(screen.getByText("视频课程")).toHaveClass("text-secondary");
    expect(screen.getByText("记忆化搜索入门")).toBeInTheDocument();
    expect(screen.getByText(/学习如何使用缓存优化/)).toBeInTheDocument();
  });

  it("triggers callbacks on tab change and hint button click", () => {
    renderPanel();

    // Click lesson tab
    fireEvent.click(screen.getByText("视频课程"));
    expect(mockOnTabChange).toHaveBeenCalledWith("lesson");

    // Click view hints
    fireEvent.click(screen.getByText("查看提示 (2)"));
    expect(mockOnViewHints).toHaveBeenCalledTimes(1);
  });

  it("changes translations when language context changes", () => {
    renderPanel();

    // Default is zh, check English title doesn't show
    expect(screen.queryByText("Climbing Stairs")).not.toBeInTheDocument();

    // Toggle to EN
    fireEvent.click(screen.getByText("To EN"));
    expect(screen.getByText("Climbing Stairs")).toBeInTheDocument();
    expect(screen.getByText("EASY")).toBeInTheDocument();
    expect(screen.getByText(/You are climbing a staircase/)).toBeInTheDocument();
    expect(screen.getByText("VIEW HINTS (2)")).toBeInTheDocument();
  });
});
