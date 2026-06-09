import React from "react";
import { render, screen } from "@testing-library/react";
import Badge from "@/components/ui/Badge";

describe("Badge Component", () => {
  it("renders children correctly", () => {
    render(<Badge>easy</Badge>);
    expect(screen.getByText("easy")).toBeInTheDocument();
  });

  it("applies correct variant styles", () => {
    const { rerender } = render(<Badge variant="neutral">Neutral Badge</Badge>);
    const badge = screen.getByText("Neutral Badge");
    expect(badge).toHaveClass("bg-[#020C1B]");
    expect(badge).toHaveClass("text-outline");

    rerender(<Badge variant="medium">Medium Badge</Badge>);
    const mediumBadge = screen.getByText("Medium Badge");
    expect(mediumBadge).toHaveClass("border-[#facc15]/20");
    expect(mediumBadge).toHaveClass("text-[#facc15]");
  });

  it("merges custom classNames cleanly", () => {
    render(<Badge variant="primary" className="my-custom-class">Custom Class</Badge>);
    const badge = screen.getByText("Custom Class");
    expect(badge).toHaveClass("my-custom-class");
    expect(badge).toHaveClass("font-label-caps");
  });
});
