"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function CodeEditorPanel() {
  const { t } = useLanguage();

  return (
    <div className="flex-grow flex flex-col min-w-0 bg-[#020C1B]">
      {/* Code Editor Header */}
      <div className="h-10 flex items-center justify-between px-4 border-b border-outline-variant/30 bg-[#112240] flex-none">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-label-caps font-label-caps text-secondary bg-secondary/10 px-3 py-1 rounded-t border-t-2 border-secondary">
            <span className="material-symbols-outlined text-sm">code</span>
            solution.py
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
      <div className="flex-grow overflow-auto p-4 code-font text-code-sm leading-relaxed">
        <div className="flex">
          <div className="code-line-number select-none">
            1<br />2<br />3<br />4<br />5<br />6<br />7<br />8<br />9<br />10
            <br />11<br />12<br />13<br />14
          </div>
          <div className="flex-grow whitespace-pre pl-4 select-text">
            <span className="code-keyword">class</span>{" "}
            <span className="code-function">Solution</span>:
            {"\n"}    <span className="code-keyword">def</span>{" "}
            <span className="code-function">climbStairs</span>(
            <span className="code-keyword">self</span>, n:{" "}
            <span className="code-keyword">int</span>) -&gt;{" "}
            <span className="code-keyword">int</span>:
            {"\n"}        <span className="code-comment">
              {t(d => d.lab.codeCommentBaseCases)}
            </span>
            {"\n"}        <span className="code-keyword">if</span> n &lt;={" "}
            <span className="code-number">2</span>:
            {"\n"}            <span className="code-keyword">return</span> n
            {"\n"}            {"\n"}        <span className="code-comment">
              {t(d => d.lab.codeCommentInitializeDp)}
            </span>
            {"\n"}        prev1 = <span className="code-number">1</span>
            {"\n"}        prev2 = <span className="code-number">2</span>
            {"\n"}        <span className="code-keyword">for</span> i{" "}
            <span className="code-keyword">in</span>{" "}
            <span className="code-function">range</span>(
            <span className="code-number">3</span>, n +{" "}
            <span className="code-number">1</span>):
            {"\n"}            curr = prev1 + prev2
            {"\n"}            prev1 = prev2
            {"\n"}            prev2 = curr
            {"\n"}            {"\n"}        <span className="code-keyword">
              return
            </span>{" "}
            prev2
            <span className="animate-pulse border-r-2 border-secondary inline-block h-4 ml-1 align-middle"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
