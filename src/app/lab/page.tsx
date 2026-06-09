"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useApp } from "@/context/AppContext";
import InstructionPanel from "@/components/lab/InstructionPanel";
import CodeEditorPanel from "@/components/lab/CodeEditorPanel";
import ConsolePanel from "@/components/lab/ConsolePanel";

interface ProblemDetails {
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  duration: string;
  description: React.ReactNode;
  exampleInput: string;
  exampleOutput: string;
  explanation?: string;
  constraints: string[];
  defaultCode: string;
  testCases: {
    1: { input: string; output: string };
    2: { input: string; output: string };
    3: { input: string; output: string };
  };
  hints: string;
}

function LabContent() {
  const { language, setLanguage, t } = useLanguage();
  const { problemCode, saveProblemCode, completeProblem, updateCourseProgress } = useApp();
  const searchParams = useSearchParams();
  const problemType = searchParams.get("problem") || "dp";

  // State
  const [activeTab, setActiveTab] = useState<"instructions" | "lesson">("instructions");
  const [activeCase, setActiveCase] = useState<1 | 2 | 3>(1);
  const [code, setCode] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [expectedOutput, setExpectedOutput] = useState<string>("");
  const [consoleMsg, setConsoleMsg] = useState<string>("");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Memoize problem details so they aren't recreated on every render
  const activeProblem = useMemo<ProblemDetails>(() => {
    const problemData: Record<string, ProblemDetails> = {
      dp: {
        title: language === "zh" ? "爬楼梯" : "Climbing Stairs",
        difficulty: "Easy",
        duration: "15 mins",
        description: language === "zh" ? (
          <>
            <p>假设你正在爬楼梯。需要 <code>n</code> 阶才能到达楼顶。</p>
            <p>每次你可以爬 <code>1</code> 或 <code>2</code> 个台阶。你有多少种不同的方法可以爬到楼顶呢？</p>
          </>
        ) : (
          <>
            <p>You are climbing a staircase. It takes <code>n</code> steps to reach the top.</p>
            <p>Each time you can either climb <code>1</code> or <code>2</code> steps. In how many distinct ways can you climb to the top?</p>
          </>
        ),
        exampleInput: "n = 2",
        exampleOutput: "2",
        explanation: language === "zh"
          ? "有两种方法可以爬到楼顶。\n1. 1 阶 + 1 阶\n2. 2 阶"
          : "There are two ways to climb to the top.\n1. 1 step + 1 step\n2. 2 steps",
        constraints: ["1 <= n <= 45"],
        defaultCode: `class Solution:
    def climbStairs(self, n: int) -> int:
        # ${language === "zh" ? "基本情况 (Base cases)" : "Base cases"}
        if n <= 2:
            return n
            
        # ${language === "zh" ? "初始化 DP 数组 (或优化空间变量)" : "Initialize DP array (or variables to optimize space)"}
        prev1 = 1
        prev2 = 2
        for i in range(3, n + 1):
            curr = prev1 + prev2
            prev1 = prev2
            prev2 = curr
            
        return prev2`,
        testCases: {
          1: { input: "2", output: "2" },
          2: { input: "3", output: "3" },
          3: { input: "45", output: "1836311903" },
        },
        hints: language === "zh"
          ? "提示：1. 首先尝试递归方法。2. 存储中间结果以达到 O(n) 的时间复杂度。"
          : "Hints: 1. Try a recursive approach first. 2. Store intermediate results to achieve O(n) time complexity.",
      },
      graph: {
        title: language === "zh" ? "岛屿数量" : "Number of Islands",
        difficulty: "Medium",
        duration: "25 mins",
        description: language === "zh" ? (
          <>
            <p>给你一个由 <code>'1'</code>（陆地）和 <code>'0'</code>（水）组成的二维网格，请你计算网格中岛屿的数量。</p>
            <p>岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接。此外，你可以假设该网格的四个边缘都被水包围。</p>
          </>
        ) : (
          <>
            <p>Given an <code>m x n</code> 2D binary grid <code>grid</code> which represents a map of <code>'1'</code>s (land) and <code>'0'</code>s (water), return <em>the number of islands</em>.</p>
            <p>An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.</p>
          </>
        ),
        exampleInput: `grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]`,
        exampleOutput: "1",
        explanation: language === "zh" ? "整个网格被认为是一个岛屿，因为所有陆地都是连通的。" : "The entire grid is connected as a single island.",
        constraints: ["m == grid.length", "n == grid[i].length", "1 <= m, n <= 300", "grid[i][j] 的值为 '0' 或 '1'"],
        defaultCode: `class Solution:
    def numIslands(self, grid: list[list[str]]) -> int:
        # ${language === "zh" ? "基本情况 (Base cases)" : "Base cases"}
        if not grid:
            return 0
            
        # ${language === "zh" ? "初始化 BFS / DFS 队列与变量" : "Initialize BFS / DFS variables"}
        m, n = len(grid), len(grid[0])
        count = 0
        
        def dfs(r, c):
            if r < 0 or r >= m or c < 0 or c >= n or grid[r][c] == "0":
                return
            grid[r][c] = "0"
            dfs(r + 1, c)
            dfs(r - 1, c)
            dfs(r, c + 1)
            dfs(r, c - 1)
            
        for r in range(m):
            for c in range(n):
                if grid[r][c] == "1":
                    dfs(r, c)
                    count += 1
                    
        return count`,
        testCases: {
          1: {
            input: `[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]`,
            output: "1",
          },
          2: {
            input: `[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]`,
            output: "3",
          },
          3: {
            input: `[["0","0","0"],["0","0","0"]]`,
            output: "0",
          },
        },
        hints: language === "zh"
          ? "提示：1. 遍历网格。当遇到 '1' 时，触发深度优先搜索 (DFS) 以清除该连通岛屿。2. 清除完毕后，岛屿计数器加 1。"
          : "Hints: 1. Traverse the grid. When encountering '1', trigger DFS to sink the connected island. 2. Increment count after DFS finish.",
      },
    };
    return problemData[problemType] || problemData.dp;
  }, [problemType, language]);

  // Sync state when problemType changes
  useEffect(() => {
    const savedCode = problemCode[problemType];
    setCode(savedCode !== undefined ? savedCode : activeProblem.defaultCode);
    setInputValue(activeProblem.testCases[1].input);
    setExpectedOutput(activeProblem.testCases[1].output);
    setActiveCase(1);
    setConsoleMsg("");
  }, [problemType, activeProblem]);

  // Handle local storage hydration:
  // When problemCode transitions from empty to having a value for the current problemType,
  // and we haven't modified it yet (or we are still on the default code), load it.
  useEffect(() => {
    const savedCode = problemCode[problemType];
    if (savedCode !== undefined && code !== savedCode && (code === activeProblem.defaultCode || code === "")) {
      setCode(savedCode);
    }
  }, [problemCode, problemType, activeProblem.defaultCode]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    saveProblemCode(problemType, newCode);
  };

  const handleCaseChange = (caseNum: 1 | 2 | 3) => {
    setActiveCase(caseNum);
    setInputValue(activeProblem.testCases[caseNum].input);
    setExpectedOutput(activeProblem.testCases[caseNum].output);
  };

  const checkBracketMismatch = (codeStr: string): boolean => {
    const stack: string[] = [];
    const openBrackets = ["(", "[", "{"];
    const closeBrackets = [")", "]", "}"];
    const pairs: Record<string, string> = {
      ")": "(",
      "]": "[",
      "}": "{",
    };

    for (let char of codeStr) {
      if (openBrackets.includes(char)) {
        stack.push(char);
      } else if (closeBrackets.includes(char)) {
        const matchingOpen = pairs[char];
        if (stack.length === 0 || stack[stack.length - 1] !== matchingOpen) {
          return true; // Mismatch found
        }
        stack.pop();
      }
    }
    return stack.length > 0; // If anything left in stack, it is a mismatch
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setConsoleMsg(t((d) => d.lab.runningTests));

    setTimeout(() => {
      setIsRunning(false);
      
      // Perform mock syntax compile check
      const hasSyntaxError = checkBracketMismatch(code);
      if (hasSyntaxError) {
        setConsoleMsg(
          language === "zh"
            ? "SyntaxError: invalid syntax (solution.py, line 6)\n    括号匹配错误或未闭合：请检查代码中的括号配对。"
            : "SyntaxError: invalid syntax (solution.py, line 6)\n    Mismatched brackets: Please check your parenthesis or brackets."
        );
        return;
      }

      setConsoleMsg(
        t((d) => d.lab.testPassed)(activeCase, inputValue, expectedOutput)
      );
    }, 1200);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      
      // Update global context state upon successful submission
      completeProblem(problemType);
      const courseId = problemType === "graph" ? "SYS-302" : "DP-401";
      updateCourseProgress(courseId, 100);

      alert(t((d) => d.lab.submitSuccess));
    }, 1500);
  };

  return (
    <div className="bg-primary-container text-on-surface font-body-base text-body-base overflow-hidden h-screen flex flex-col">
      {/* TopNavBar */}
      <header className="bg-surface/70 dark:bg-surface/70 backdrop-blur-xl docked full-width top-0 z-50 border-b border-outline-variant/30 shadow-[0px_0px_15px_rgba(65,228,192,0.1)] flex-none">
        <div className="max-w-container-max mx-auto px-margin-desktop flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link
              className="text-headline-md font-headline-md font-bold text-on-surface dark:text-on-surface tracking-tighter"
              href="/"
            >
              CS.Academy
            </Link>
            <div className="hidden md:flex gap-6 items-center border-l border-outline-variant/30 pl-6 h-8">
              <span className="text-label-caps font-label-caps text-on-surface-variant">
                MODULE 4
              </span>
              <span className="text-label-caps font-label-caps text-secondary">
                {problemType === "graph" ? "GRAPH TRAVERSAL" : "DYNAMIC PROGRAMMING"}
              </span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link
              className="text-on-surface-variant hover:text-on-surface transition-colors duration-200 text-label-caps font-label-caps hover:bg-surface-variant/50 hover:text-secondary transition-all px-3 py-2 rounded"
              href="/courses"
            >
              {t((d) => d.common.courses)}
            </Link>
            <Link
              className="text-secondary font-bold border-b-2 border-secondary pb-1 text-label-caps font-label-caps px-3 py-2 scale-95 transition-transform glow-active"
              href="/lab"
            >
              {t((d) => d.common.practice)}
            </Link>
            <Link
              className="text-on-surface-variant hover:text-on-surface transition-colors duration-200 text-label-caps font-label-caps hover:bg-surface-variant/50 hover:text-secondary transition-all px-3 py-2 rounded"
              href="#"
            >
              {t((d) => d.common.community)}
            </Link>
            <Link
              className="text-on-surface-variant hover:text-on-surface transition-colors duration-200 text-label-caps font-label-caps hover:bg-surface-variant/50 hover:text-secondary transition-all px-3 py-2 rounded"
              href="/careers"
            >
              {t((d) => d.common.career)}
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center bg-surface-variant/30 rounded-full p-1 border border-outline-variant/30">
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1 rounded-full text-[10px] font-label-caps transition-all cursor-pointer ${
                  language === "en"
                    ? "bg-secondary text-primary-container font-bold"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("zh")}
                className={`px-3 py-1 rounded-full text-[10px] font-label-caps transition-all cursor-pointer ${
                  language === "zh"
                    ? "bg-secondary text-primary-container font-bold"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                ZH
              </button>
            </div>
            <button className="text-on-surface-variant hover:text-secondary transition-colors p-2 rounded-full hover:bg-surface-variant/30 cursor-pointer">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="text-on-surface-variant hover:text-secondary transition-colors p-2 rounded-full hover:bg-surface-variant/30 cursor-pointer">
              <span className="material-symbols-outlined">terminal</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-surface-variant border border-secondary/30 overflow-hidden ml-2 cursor-pointer">
              <img
                alt="Student Profile"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida/AP1WRLuNFrR5mA0RjQqn6hXVGs5edad7xsSXhR2zZS9DE3YFqEMiM1O0LQUVGppPJd09qNh3JJaW4P5gt6FD1RpHhxIqbPQporO2of_82VYZ0Akuji6sKEDJbQtK4kImFK_Ah3XyMuEj183O6Kyqa7jSX8DFNHMUVXbbJxIA2TAlvl_ju_OBvQRwrEAxFCim9SGDLUMC_KMbIaLoS_qZtuiXZ7sf6VZmfXLCHTU9lFuzApUFnt36FbT54tO_Vw"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main IDE Workspace */}
      <main className="flex-1 flex overflow-hidden">
        {/* SideNavBar / Left Panel (Instructions) */}
        <InstructionPanel
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onViewHints={() => alert(activeProblem.hints)}
          title={activeProblem.title}
          difficulty={activeProblem.difficulty}
          duration={activeProblem.duration}
          description={activeProblem.description}
          exampleInput={activeProblem.exampleInput}
          exampleOutput={activeProblem.exampleOutput}
          explanation={activeProblem.explanation}
          constraints={activeProblem.constraints}
        />

        {/* Center Code Editor & Bottom Terminal */}
        <section className="flex-1 flex flex-col min-w-0 bg-[#020C1B]">
          <CodeEditorPanel
            code={code}
            onChange={handleCodeChange}
            fileName={problemType === "graph" ? "solution_graph.py" : "solution_dp.py"}
          />

          <ConsolePanel
            activeCase={activeCase}
            onCaseChange={handleCaseChange}
            inputValue={inputValue}
            onInputValueChange={setInputValue}
            expectedOutput={expectedOutput}
            consoleMsg={consoleMsg}
            isRunning={isRunning}
            isSubmitted={isSubmitted}
            onRunCode={handleRunCode}
            onSubmit={handleSubmit}
          />
        </section>
      </main>
    </div>
  );
}

export default function LabPage() {
  return (
    <Suspense fallback={<div className="bg-[#0A192F] min-h-screen text-on-surface p-8">Loading IDE Workspace...</div>}>
      <LabContent />
    </Suspense>
  );
}
