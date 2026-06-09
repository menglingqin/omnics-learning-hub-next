"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import Button from "@/components/ui/Button";

export interface JobCardProps {
  title: string;
  company: string;
  location: string;
  tech: string;
  onApply?: () => void;
}

export default function JobCard({ title, company, location, tech, onApply }: JobCardProps) {
  const { t } = useLanguage();

  return (
    <div
      onClick={onApply}
      className="bg-[#0A192F] p-4 rounded-lg border border-[#233554] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-secondary/50 hover:bg-[#0d1f3b] transition-all cursor-pointer group"
    >
      <div className="flex flex-col gap-1">
        <h3 className="text-body-base font-body-base font-semibold group-hover:text-secondary transition-colors">
          {title}
        </h3>
        <p className="text-code-sm font-code-sm text-on-surface-variant">
          {company} • {location} • {tech}
        </p>
      </div>
      <Button
        variant="primary"
        size="sm"
        className="w-full sm:w-auto hover:shadow-lg hover:shadow-secondary/20"
      >
        {t(d => d.careers.applyBtn)}
      </Button>
    </div>
  );
}
