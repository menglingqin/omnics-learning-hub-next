"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface ResumeData {
  name: string;
  title: string;
  email: string;
  github: string;
  skills: string;
  experience: string;
}

export interface AppState {
  enrolledCourses: Record<string, number>; // courseId -> progress (0 to 100)
  problemCode: Record<string, string>; // problemType -> code string
  completedProblems: string[]; // list of completed problemTypes (e.g. ['dp', 'graph'])
  resumeData: ResumeData;
}

export interface AppContextProps extends AppState {
  updateCourseProgress: (courseId: string, progress: number) => void;
  saveProblemCode: (problemType: string, code: string) => void;
  completeProblem: (problemType: string) => void;
  saveResume: (data: ResumeData) => void;
}

const defaultResume: ResumeData = {
  name: "李越",
  title: "高级后端工程师 / Senior Backend Engineer",
  email: "yue.li@cs.academy.com",
  github: "github.com/yueli-dev",
  skills: "Python, Go, Next.js, PostgreSQL, Distributed Systems, Raft",
  experience: "在 CS.Academy 完成了系统架构与动态规划核心模块。主导微服务架构重构，处理高并发数据流。",
};

const defaultState: AppState = {
  enrolledCourses: {
    "DP-401": 68,
    "SYS-302": 45,
    "CS-101": 100,
  },
  problemCode: {},
  completedProblems: [],
  resumeData: defaultResume,
};

const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("omnics_learning_hub_state");
      if (stored) {
        setState(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load state from localStorage:", e);
    }
    setIsInitialized(true);
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem("omnics_learning_hub_state", JSON.stringify(state));
    } catch (e) {
      console.error("Failed to save state to localStorage:", e);
    }
  }, [state, isInitialized]);

  const updateCourseProgress = (courseId: string, progress: number) => {
    setState((prev) => ({
      ...prev,
      enrolledCourses: {
        ...prev.enrolledCourses,
        [courseId]: progress,
      },
    }));
  };

  const saveProblemCode = (problemType: string, code: string) => {
    setState((prev) => ({
      ...prev,
      problemCode: {
        ...prev.problemCode,
        [problemType]: code,
      },
    }));
  };

  const completeProblem = (problemType: string) => {
    setState((prev) => {
      if (prev.completedProblems.includes(problemType)) return prev;
      return {
        ...prev,
        completedProblems: [...prev.completedProblems, problemType],
      };
    });
  };

  const saveResume = (data: ResumeData) => {
    setState((prev) => ({
      ...prev,
      resumeData: data,
    }));
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        updateCourseProgress,
        saveProblemCode,
        completeProblem,
        saveResume,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
