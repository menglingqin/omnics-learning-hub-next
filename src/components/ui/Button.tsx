import Link from "next/link";
import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "transparent";
  size?: "sm" | "md" | "lg";
  href?: string;
  icon?: string;
  iconPosition?: "left" | "right";
  glow?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  href,
  icon,
  iconPosition = "left",
  glow = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-bold transition-all active:scale-95 duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none group";

  const variants = {
    primary: "bg-secondary text-primary-container hover:bg-secondary-container",
    secondary: "bg-transparent border border-secondary text-secondary hover:bg-secondary/10",
    outline: "bg-transparent border border-outline text-on-surface hover:border-secondary hover:text-secondary",
    ghost: "text-on-surface-variant hover:text-secondary hover:bg-surface-variant/50",
    transparent: "bg-transparent text-secondary hover:bg-secondary/10",
  };

  const sizes = {
    sm: "px-4 py-1.5 rounded-DEFAULT text-label-caps font-label-caps text-[10px]",
    md: "px-6 py-2.5 rounded-DEFAULT text-label-caps font-label-caps text-xs",
    lg: "px-8 py-4 rounded-DEFAULT font-headline-md text-headline-md",
  };

  const glowStyle = glow ? "glow-effect hover:shadow-[0_0_25px_rgba(65,228,192,0.4)]" : "";

  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${glowStyle} ${className}`;

  const iconElement = icon && (
    <span
      className={`material-symbols-outlined transition-transform duration-200 ${
        iconPosition === "right" ? "group-hover:translate-x-1" : "group-hover:-translate-x-0.5"
      }`}
      style={{ fontVariationSettings: "'FILL' 0" }}
    >
      {icon}
    </span>
  );

  const buttonContent = (
    <>
      {icon && iconPosition === "left" && <span className="mr-2 flex items-center">{iconElement}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="ml-2 flex items-center">{iconElement}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {buttonContent}
      </Link>
    );
  }

  // Cast standard attributes to fit standard HTML button element
  const { ref, ...buttonProps } = props as any;

  return (
    <button className={combinedClassName} {...buttonProps}>
      {buttonContent}
    </button>
  );
}
