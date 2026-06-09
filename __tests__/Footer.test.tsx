import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Footer from "@/components/Footer";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";

// Simple test helper to toggle language
const LanguageToggler = () => {
  const { setLanguage } = useLanguage();
  return (
    <div>
      <button onClick={() => setLanguage("en")}>To EN</button>
      <button onClick={() => setLanguage("zh")}>To ZH</button>
    </div>
  );
};

describe("Footer Component", () => {
  const renderFooter = () => {
    return render(
      <LanguageProvider>
        <LanguageToggler />
        <Footer />
      </LanguageProvider>
    );
  };

  it("renders Footer translations correctly in default zh mode", () => {
    renderFooter();
    expect(screen.getByText(/为下一代工程师打造/i)).toBeInTheDocument();
    expect(screen.getByText("文档")).toBeInTheDocument();
    expect(screen.getByText("API 引用")).toBeInTheDocument();
    expect(screen.getByText("系统状态")).toBeInTheDocument();
    expect(screen.getByText("隐私政策")).toBeInTheDocument();
    expect(screen.getByText("服务条款")).toBeInTheDocument();
  });

  it("renders Footer translations correctly when toggled to en mode", () => {
    renderFooter();

    // Toggle to English
    fireEvent.click(screen.getByText("To EN"));

    expect(screen.getByText(/Built for the next generation of engineers/i)).toBeInTheDocument();
    expect(screen.getByText("Documentation")).toBeInTheDocument();
    expect(screen.getByText("API Reference")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
    expect(screen.getByText("Terms of Service")).toBeInTheDocument();
  });
});
