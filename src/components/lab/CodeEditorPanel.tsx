"use client";

import React, { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

export interface CodeEditorPanelProps {
  code: string;
  onChange: (val: string) => void;
  fileName?: string;
}

export default function CodeEditorPanel({
  code,
  onChange,
  fileName = "solution.py",
}: CodeEditorPanelProps) {
  const { t } = useLanguage();
  const lineCount = code.split("\n").length;
  const lineNumbers = Array.from({ length: Math.max(lineCount, 1) }, (_, i) => i + 1);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  // Sync scroll of line numbers with textarea scroll
  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  // Handle Tab key insertion of spaces
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      
      const newCode = code.substring(0, start) + "    " + code.substring(end);
      onChange(newCode);

      // Re-position caret
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
        }
      }, 0);
    }
  };

  return (
    <div className="flex-grow flex flex-col min-w-0 bg-[#020C1B]">
      {/* Code Editor Header */}
      <div className="h-10 flex items-center justify-between px-4 border-b border-outline-variant/30 bg-[#112240] flex-none">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-label-caps font-label-caps text-secondary bg-secondary/10 px-3 py-1 rounded-t border-t-2 border-secondary">
            <span className="material-symbols-outlined text-sm">code</span>
            {fileName}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-on-surface-variant hover:text-on-surface p-1 rounded hover:bg-surface-variant/30 transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-sm">history</span>
          </button>
          <button className="text-on-surface-variant hover:text-on-surface p-1 rounded hover:bg-surface-variant/30 transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-sm">settings</span>
          </button>
        </div>
      </div>
      
      {/* Code Editor Area */}
      <div className="flex-grow flex overflow-hidden p-4 font-mono text-code-sm leading-6">
        {/* Line Numbers Column */}
        <div
          ref={lineNumbersRef}
          className="w-10 text-right pr-4 text-outline-variant/40 select-none overflow-hidden text-xs flex flex-col pt-[3px]"
        >
          {lineNumbers.map((num) => (
            <div key={num} className="h-6 flex items-center justify-end">
              {num}
            </div>
          ))}
        </div>

        {/* Textarea Area */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          className="flex-grow bg-transparent text-on-surface font-mono text-code-sm outline-none resize-none overflow-auto border-none focus:ring-0 p-0 m-0 leading-6 h-full placeholder:text-outline-variant/30 selection:bg-secondary/20"
        />
      </div>
    </div>
  );
}
