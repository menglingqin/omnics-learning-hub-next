import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterSidebar from "@/components/FilterSidebar";
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

describe("FilterSidebar Component", () => {
  const mockOnLevelToggle = jest.fn();
  const mockOnTopicToggle = jest.fn();
  const mockOnLanguageSelect = jest.fn();
  const mockOnClearAll = jest.fn();

  const renderSidebar = (selectedLevels = ["Intermediate"], selectedTopics = ["Algorithms"], selectedLanguage = "Python") => {
    return render(
      <LanguageProvider>
        <LanguageToggler />
        <FilterSidebar
          selectedLevels={selectedLevels}
          selectedTopics={selectedTopics}
          selectedLanguage={selectedLanguage}
          onLevelToggle={mockOnLevelToggle}
          onTopicToggle={mockOnTopicToggle}
          onLanguageSelect={mockOnLanguageSelect}
          onClearAll={mockOnClearAll}
        />
      </LanguageProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders checklist items and filter headings in default zh mode", () => {
    renderSidebar();

    expect(screen.getByText("筛选")).toBeInTheDocument();
    expect(screen.getByText("难度等级")).toBeInTheDocument();
    expect(screen.getByText("主题")).toBeInTheDocument();
    expect(screen.getByText("编程语言")).toBeInTheDocument();

    // Check language subtexts
    expect(screen.getByText("初级")).toBeInTheDocument();
    expect(screen.getByText("中级")).toBeInTheDocument();
    expect(screen.getByText("高级")).toBeInTheDocument();
    expect(screen.getByText("算法")).toBeInTheDocument();
    expect(screen.getByText("数据结构")).toBeInTheDocument();
  });

  it("renders filters correctly in en mode", () => {
    renderSidebar();
    fireEvent.click(screen.getByText("To EN"));

    expect(screen.getByText("Filters")).toBeInTheDocument();
    expect(screen.getByText("DIFFICULTY LEVEL")).toBeInTheDocument();
    expect(screen.getByText("TOPICS")).toBeInTheDocument();
    expect(screen.getByText("LANGUAGE")).toBeInTheDocument();

    // In English mode, Chinese helper subtexts should not render
    expect(screen.queryByText("初级")).not.toBeInTheDocument();
  });

  it("calls callbacks when clicking filters, language chips, and clear all button", () => {
    renderSidebar();

    // Click checkbox
    const checkboxes = screen.getAllByRole("checkbox");
    // Beginner is first
    fireEvent.click(checkboxes[0]);
    expect(mockOnLevelToggle).toHaveBeenCalledWith("Beginner");

    // Click topic (Data Structures)
    fireEvent.click(checkboxes[4]); // Index 4 is Data Structures checkbox
    expect(mockOnTopicToggle).toHaveBeenCalledWith("Data Structures");

    // Click language chip (C++)
    const cppButton = screen.getByRole("button", { name: "C++" });
    fireEvent.click(cppButton);
    expect(mockOnLanguageSelect).toHaveBeenCalledWith("C++");

    // Click clear all
    const clearAllButton = screen.getByText("清除全部");
    fireEvent.click(clearAllButton);
    expect(mockOnClearAll).toHaveBeenCalledTimes(1);
  });
});
