import React from "react";

export interface BadgeProps {
  variant?: "primary" | "secondary" | "neutral" | "active" | "in-progress" | "completed" | "hard" | "medium" | "easy";
  className?: string;
  children: React.ReactNode;
}

export default function Badge({ variant = "primary", className = "", children }: BadgeProps) {
  const baseStyles = "px-2 py-1 rounded font-label-caps text-[10px] uppercase tracking-wider border font-medium w-fit inline-flex items-center justify-center";

  const variants = {
    primary: "bg-secondary/10 border-secondary text-secondary",
    secondary: "bg-tertiary-container/20 border-tertiary/30 text-tertiary",
    neutral: "bg-[#020C1B] border-[#233554] text-outline",
    active: "bg-secondary/20 border-secondary text-secondary",
    "in-progress": "bg-secondary/10 border-secondary text-secondary",
    completed: "bg-secondary/10 border-secondary text-secondary",
    hard: "bg-secondary/5 border-secondary/20 text-secondary",
    medium: "bg-[#facc15]/5 border-[#facc15]/20 text-[#facc15]",
    easy: "bg-secondary/10 border-secondary text-secondary",
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
