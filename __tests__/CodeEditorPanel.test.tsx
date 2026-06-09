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

const TestWrapper = () => {
  const { t } = useLanguage();
  const getCode = () => `class Solution:
    def climbStairs(self, n: int) -> int:
        ${t(d => d.lab.codeCommentBaseCases)}
        if n <= 2:
            return n
            
        ${t(d => d.lab.codeCommentInitializeDp)}
        prev1 = 1
        prev2 = 2
        for i in range(3, n + 1):
            curr = prev1 + prev2
            prev1 = prev2
            prev2 = curr
            
        return prev2`;

  const [code, setCode] = React.useState("");

  React.useEffect(() => {
    setCode(getCode());
  }, [t]);

  return <CodeEditorPanel code={code} onChange={setCode} />;
};

describe("CodeEditorPanel Component", () => {
  it("renders editor structure and mock solution code", () => {
    render(
      <LanguageProvider>
        <TestWrapper />
      </LanguageProvider>
    );

    expect(screen.getByText("solution.py")).toBeInTheDocument();
    
    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    expect(textarea.value).toContain("class");
    expect(textarea.value).toContain("Solution");
    expect(textarea.value).toContain("climbStairs");
  });

  it("updates localized code comments when language switches", () => {
    render(
      <LanguageProvider>
        <LanguageToggler />
        <TestWrapper />
      </LanguageProvider>
    );

    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;

    // Default ZH comment
    expect(textarea.value).toContain("# 基本情况 (Base cases)");
    expect(textarea.value).toContain("# 初始化 DP 数组 (或优化空间变量)");

    // Toggle to EN
    fireEvent.click(screen.getByText("To EN"));
    expect(textarea.value).toContain("# Base cases");
    expect(textarea.value).toContain("# Initialize DP array (or variables to optimize space)");
  });
});
