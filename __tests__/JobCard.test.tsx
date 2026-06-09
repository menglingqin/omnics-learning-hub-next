import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import JobCard from "@/components/JobCard";
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

describe("JobCard Component", () => {
  it("renders JobCard details correctly", () => {
    render(
      <LanguageProvider>
        <JobCard
          title="Senior Backend Engineer"
          company="Stripe"
          location="Remote"
          tech="Python, Go"
        />
      </LanguageProvider>
    );

    expect(screen.getByText("Senior Backend Engineer")).toBeInTheDocument();
    expect(screen.getByText(/Stripe/)).toBeInTheDocument();
    expect(screen.getByText(/Remote/)).toBeInTheDocument();
    expect(screen.getByText(/Python, Go/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "申请" })).toBeInTheDocument(); // translated in default zh
  });

  it("handles apply clicks and language switches", () => {
    const handleApply = jest.fn();
    render(
      <LanguageProvider>
        <LanguageToggler />
        <JobCard
          title="Frontend Developer"
          company="Vercel"
          location="San Francisco"
          tech="React"
          onApply={handleApply}
        />
      </LanguageProvider>
    );

    // Apply button text in EN
    fireEvent.click(screen.getByText("To EN"));
    const applyButton = screen.getByRole("button", { name: "APPLY" });
    expect(applyButton).toBeInTheDocument();

    // Click on Card triggers onApply callback
    const cardContainer = screen.getByText("Frontend Developer").closest("div");
    if (cardContainer) {
      fireEvent.click(cardContainer);
      expect(handleApply).toHaveBeenCalledTimes(1);
    }
  });
});
