"use client";

import { useState } from "react";
import { Copy, Check, Download, ChevronDown } from "lucide-react";
import { useCopy } from "@/hooks/use-copy";
import { downloadFile } from "@/lib/utils";
import type { ModelConfig } from "@/types";

interface PromptCardProps {
  model: ModelConfig;
  prompt: string;
}

export function PromptCard({ model, prompt }: PromptCardProps) {
  const { copy, isCopied } = useCopy();
  const [showExport, setShowExport] = useState(false);

  const handleDownload = (format: "txt" | "md") => {
    const content =
      format === "md"
        ? `# ${model.label} Prompt\n\n${prompt}`
        : prompt;
    downloadFile(content, `${model.label.toLowerCase().replace(/\s+/g, "-")}-prompt`, format);
    setShowExport(false);
  };

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.02)",
        borderColor: "rgba(255,255,255,0.07)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-3 border-b"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-2.5">
          <span className="text-base leading-none">{model.icon}</span>
          <span
            className="text-sm font-semibold"
            style={{ color: "#FAFAFA", fontFamily: "Syne, sans-serif" }}
          >
            {model.label}
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded-md"
            style={{ background: "rgba(255,255,255,0.05)", color: "#71717A" }}
          >
            {model.type === "video" ? "Video AI" : model.type === "image" ? "Image AI" : "Text AI"}
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded-md"
            style={{ background: `${model.color}15`, color: model.color }}
          >
            {model.description}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Copy */}
          <button
            onClick={() => copy(prompt, model.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border transition-all hover:bg-white/5"
            style={{
              borderColor: isCopied(model.id)
                ? "rgba(16,185,129,0.3)"
                : "rgba(255,255,255,0.1)",
              color: isCopied(model.id) ? "#10B981" : "#A1A1AA",
            }}
          >
            {isCopied(model.id) ? <Check size={12} /> : <Copy size={12} />}
            {isCopied(model.id) ? "Copied!" : "Copy"}
          </button>

          {/* Export dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowExport((v) => !v)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border transition-all hover:bg-white/5"
              style={{
                borderColor: "rgba(255,255,255,0.1)",
                color: "#A1A1AA",
              }}
            >
              <Download size={12} />
              Export
              <ChevronDown size={11} />
            </button>

            {showExport && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowExport(false)}
                />
                <div
                  className="absolute right-0 top-full mt-1.5 rounded-xl border overflow-hidden z-20 min-w-[130px]"
                  style={{
                    background: "#18181B",
                    borderColor: "rgba(255,255,255,0.1)",
                  }}
                >
                  <button
                    onClick={() => handleDownload("txt")}
                    className="block w-full text-left px-4 py-2.5 text-xs hover:bg-white/5 transition-colors"
                    style={{ color: "#A1A1AA" }}
                  >
                    Download .txt
                  </button>
                  <button
                    onClick={() => handleDownload("md")}
                    className="block w-full text-left px-4 py-2.5 text-xs hover:bg-white/5 transition-colors"
                    style={{ color: "#A1A1AA" }}
                  >
                    Download .md
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Prompt content */}
      <div
        className="p-5 whitespace-pre-wrap"
        style={{
          color: "#D4D4D8",
          fontFamily: "JetBrains Mono, monospace",
          fontSize: "13px",
          lineHeight: 1.85,
        }}
      >
        {prompt}
      </div>
    </div>
  );
}
