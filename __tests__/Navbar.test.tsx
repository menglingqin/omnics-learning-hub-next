import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "@/components/Navbar";
import { LanguageProvider } from "@/context/LanguageContext";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  usePathname: () => "/courses",
}));

describe("Navbar Component", () => {
  const renderNavbar = () => {
    return render(
      <LanguageProvider>
        <Navbar />
      </LanguageProvider>
    );
  };

  it("renders Navbar correctly with default language (zh)", () => {
    renderNavbar();
    // Default language is Chinese, so links should be in Chinese
    expect(screen.getByText("课程")).toBeInTheDocument();
    expect(screen.getByText("练习")).toBeInTheDocument();
    expect(screen.getByText("社区")).toBeInTheDocument();
    expect(screen.getByText("职业")).toBeInTheDocument();
  });

  it("switches languages when EN/中文 buttons are clicked", () => {
    renderNavbar();

    // Click EN button
    const enButton = screen.getByRole("button", { name: "EN" });
    fireEvent.click(enButton);

    // Links should now display in English
    expect(screen.getByText("Courses")).toBeInTheDocument();
    expect(screen.getByText("Practice")).toBeInTheDocument();
    expect(screen.getByText("Community")).toBeInTheDocument();
    expect(screen.getByText("Career")).toBeInTheDocument();

    // Click 中文 button
    const zhButton = screen.getByRole("button", { name: "中文" });
    fireEvent.click(zhButton);

    // Links should be back in Chinese
    expect(screen.getByText("课程")).toBeInTheDocument();
  });

  it("highlights the active link matching the pathname", () => {
    renderNavbar();
    const coursesLink = screen.getByRole("link", { name: "课程" });
    expect(coursesLink).toHaveClass("text-secondary");
    expect(coursesLink).toHaveClass("border-secondary");
  });
});
