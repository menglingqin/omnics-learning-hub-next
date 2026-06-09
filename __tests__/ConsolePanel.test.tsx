import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ConsolePanel from "@/components/lab/ConsolePanel";
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

describe("ConsolePanel Component", () => {
  const mockOnCaseChange = jest.fn();
  const mockOnInputValueChange = jest.fn();
  const mockOnRunCode = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderPanel = (
    activeCase: 1 | 2 | 3 = 1,
    inputValue = "2",
    expectedOutput = "2",
    consoleMsg = "",
    isRunning = false,
    isSubmitted = false
  ) => {
    return render(
      <LanguageProvider>
        <LanguageToggler />
        <ConsolePanel
          activeCase={activeCase}
          onCaseChange={mockOnCaseChange}
          inputValue={inputValue}
          onInputValueChange={mockOnInputValueChange}
          expectedOutput={expectedOutput}
          consoleMsg={consoleMsg}
          isRunning={isRunning}
          isSubmitted={isSubmitted}
          onRunCode={mockOnRunCode}
          onSubmit={mockOnSubmit}
        />
      </LanguageProvider>
    );
  };

  it("renders ConsolePanel layout correctly in default zh mode", () => {
    renderPanel(1, "2", "2", "");

    expect(screen.getByText("测试用例")).toBeInTheDocument();
    expect(screen.getByText("控制台")).toBeInTheDocument();
    expect(screen.getByText("运行代码")).toBeInTheDocument();
    expect(screen.getByText("提交")).toBeInTheDocument();
    expect(screen.getByText("控制台输出：")).toBeInTheDocument();
    expect(screen.getByText(/控制台为空。点击“运行代码”来执行测试用例/)).toBeInTheDocument();
  });

  it("handles case switching and input value changes", () => {
    renderPanel(1, "2", "2", "");

    // Click case 2
    fireEvent.click(screen.getByRole("button", { name: "Case 2" }));
    expect(mockOnCaseChange).toHaveBeenCalledWith(2);

    // Change input
    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "5" } });
    expect(mockOnInputValueChange).toHaveBeenCalledWith("5");
  });

  it("triggers run/submit actions and shows loading text", () => {
    const { rerender } = renderPanel(1, "2", "2", "", true, false);

    // Run Code button is in running state
    expect(screen.getByText("运行中...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /运行中\.\.\./ })).toBeDisabled();

    // Re-render in submitting state
    rerender(
      <LanguageProvider>
        <ConsolePanel
          activeCase={1}
          onCaseChange={mockOnCaseChange}
          inputValue="2"
          onInputValueChange={mockOnInputValueChange}
          expectedOutput="2"
          consoleMsg=""
          isRunning={false}
          isSubmitted={true}
          onRunCode={mockOnRunCode}
          onSubmit={mockOnSubmit}
        />
      </LanguageProvider>
    );

    expect(screen.getByText("提交中...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /提交中\.\.\./ })).toBeDisabled();
  });

  it("changes translations when language context changes", () => {
    renderPanel(1, "2", "2", "");

    // Toggle to EN
    fireEvent.click(screen.getByText("To EN"));
    expect(screen.getByText("TEST CASES")).toBeInTheDocument();
    expect(screen.getByText("CONSOLE")).toBeInTheDocument();
    expect(screen.getByText("RUN CODE")).toBeInTheDocument();
    expect(screen.getByText("SUBMIT")).toBeInTheDocument();
    expect(screen.getByText("Console Output:")).toBeInTheDocument();
    expect(screen.getByText(/Console is empty. Click 'RUN CODE' to execute test cases/)).toBeInTheDocument();
  });
});
