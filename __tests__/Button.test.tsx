import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "@/components/ui/Button";

describe("Button Component", () => {
  it("renders children correctly", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("triggers onClick callback when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByRole("button", { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies correct variant and size classes", () => {
    const { rerender } = render(<Button variant="primary" size="sm">Primary SM</Button>);
    const primarySmBtn = screen.getByRole("button", { name: /primary sm/i });
    expect(primarySmBtn).toHaveClass("bg-secondary");
    expect(primarySmBtn).toHaveClass("px-4");

    rerender(<Button variant="secondary" size="lg">Secondary LG</Button>);
    const secondaryLgBtn = screen.getByRole("button", { name: /secondary lg/i });
    expect(secondaryLgBtn).toHaveClass("border-secondary");
    expect(secondaryLgBtn).toHaveClass("px-8");
  });

  it("renders as a Link if href prop is provided", () => {
    render(<Button href="/courses">Go to Courses</Button>);
    const linkElement = screen.getByRole("link", { name: /go to courses/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/courses");
  });

  it("renders icon in correct position", () => {
    const { rerender } = render(<Button icon="arrow_forward" iconPosition="right">Next</Button>);
    expect(screen.getByText("arrow_forward")).toBeInTheDocument();

    rerender(<Button icon="play_arrow" iconPosition="left">Play</Button>);
    expect(screen.getByText("play_arrow")).toBeInTheDocument();
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled Button</Button>);
    const btn = screen.getByRole("button", { name: /disabled button/i });
    expect(btn).toBeDisabled();
    expect(btn).toHaveClass("disabled:opacity-50");
  });
});
