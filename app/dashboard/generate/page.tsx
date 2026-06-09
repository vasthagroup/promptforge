"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { Sparkles, Copy, Download, Check, Loader2, Wand2, ChevronDown } from "lucide-react";
import { MODEL_CONFIGS, type PromptOutput, type ModelTab } from "@/types";

const EXAMPLES = [
  "Create a luxury coffee brand logo",
  "Write a YouTube script about AI trends in 2025",
  "Design a mobile app for fitness tracking",
  "Create a viral social media campaign for a vegan restaurant",
  "Build a meditation app with calming UI",
];

export default function GeneratePage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [outputs, setOutputs] = useState<PromptOutput | null>(null);
  const [activeTab, setActiveTab] = useState<ModelTab>("chatgpt");
  const [analysis, setAnalysis] = useState<any>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);

  const generate = async () => {
    if (!input.trim() || loading) return;

    setLoading(true);
    setOutputs(null);
    setAnalysis(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput: input.trim() }),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.error || "Failed to generate prompts");
        return;
      }

      setOutputs(data.outputs);
      setAnalysis(data.analysis);
      setActiveTab("chatgpt");
      if (data.remaining !== undefined) setRemaining(data.remaining);
      toast.success("Prompts generated successfully!");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      generate();
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(null), 2000);
  };

  const downloadPrompt = (text: string, filename: string, format: "txt" | "md") => {
    const content = format === "md" ? `# ${filename}\n\n${text}` : text;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Downloaded as .${format}`);
  };

  const activeOutput = outputs ? outputs[activeTab] : null;
  const activeModel = MODEL_CONFIGS.find((m) => m.id === activeTab);

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "Syne, sans-serif", color: "#FAFAFA", letterSpacing: "-0.02em" }}>
          Generate Prompts
        </h1>
        <p className="text-sm" style={{ color: "#71717A" }}>
          Describe your idea and get 8 platform-optimized prompts instantly.
          {remaining !== null && (
            <span style={{ color: "#52525B" }}> · {remaining} prompts remaining today</span>
          )}
        </p>
      </div>

      {/* Input Area */}
      <div className="mb-6 rounded-2xl border overflow-hidden" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.08)" }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe what you want to create..."
          rows={4}
          className="w-full bg-transparent p-5 text-sm resize-none focus:outline-none"
          style={{ color: "#FAFAFA", fontFamily: "DM Sans, sans-serif", fontSize: "15px", lineHeight: 1.7 }}
          
          maxLength={500}
        />
        <div className="flex items-center justify-between px-5 py-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="flex gap-2 flex-wrap">
            {EXAMPLES.slice(0, 3).map((ex) => (
              <button key={ex} onClick={() => setInput(ex)} className="text-xs px-3 py-1 rounded-full border transition-colors hover:text-white"
                style={{ borderColor: "rgba(255,255,255,0.08)", color: "#52525B" }}>
                {ex.length > 30 ? ex.slice(0, 30) + "..." : ex}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs" style={{ color: "#3F3F46" }}>{input.length}/500</span>
            <button
              onClick={generate}
              disabled={!input.trim() || loading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-40"
              style={{ background: "linear-gradient(135deg, #7C3AED, #5B21B6)", color: "#FAFAFA" }}
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
              {loading ? "Generating..." : "Generate"}
              {!loading && <span className="text-xs opacity-50 hidden md:inline">⌘↵</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      <AnimatePresence>
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="mb-6 p-8 rounded-2xl border text-center"
            style={{ background: "rgba(124,58,237,0.05)", borderColor: "rgba(124,58,237,0.15)" }}>
            <div className="flex justify-center mb-4">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border-2 border-purple-900/30 animate-spin border-t-purple-500" />
                <Wand2 size={20} className="absolute inset-0 m-auto" style={{ color: "#7C3AED" }} />
              </div>
            </div>
            <p className="text-sm font-medium mb-1" style={{ color: "#A78BFA" }}>Analyzing your idea...</p>
            <p className="text-xs" style={{ color: "#52525B" }}>Generating optimized prompts for 8 AI platforms</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analysis & Output */}
      <AnimatePresence>
        {outputs && !loading && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            {/* Analysis */}
            {analysis && (
              <div className="mb-6 p-5 rounded-2xl border" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-2 mb-3">
                  <Wand2 size={14} style={{ color: "#7C3AED" }} />
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#52525B" }}>Intent Analysis</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries(analysis).map(([key, val]) => (
                    <div key={key}>
                      <p className="text-xs mb-0.5" style={{ color: "#3F3F46", textTransform: "capitalize" }}>{key}</p>
                      <p className="text-xs" style={{ color: "#A1A1AA" }}>{String(val)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Model Tabs */}
            <div className="flex gap-1.5 flex-wrap mb-4">
              {MODEL_CONFIGS.map((model) => (
                <button
                  key={model.id}
                  onClick={() => setActiveTab(model.id)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium border transition-all"
                  style={
                    activeTab === model.id
                      ? { background: `${model.color}15`, borderColor: `${model.color}40`, color: model.color }
                      : { background: "transparent", borderColor: "rgba(255,255,255,0.06)", color: "#52525B" }
                  }
                >
                  <span>{model.icon}</span>
                  {model.label}
                </button>
              ))}
            </div>

            {/* Active Prompt */}
            {activeOutput && (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl border overflow-hidden"
                style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <div className="flex items-center gap-2">
                    <span>{activeModel?.icon}</span>
                    <span className="text-sm font-medium" style={{ color: "#FAFAFA", fontFamily: "Syne, sans-serif" }}>{activeModel?.label}</span>
                    <span className="text-xs px-2 py-0.5 rounded-md" style={{ background: "rgba(255,255,255,0.05)", color: "#71717A" }}>
                      {activeModel?.type === "video" ? "Video" : activeModel?.type === "image" ? "Image" : "Text"} AI
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => copyToClipboard(activeOutput, activeTab)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border transition-all hover:bg-white/5"
                      style={{ borderColor: "rgba(255,255,255,0.1)", color: copied === activeTab ? "#10B981" : "#A1A1AA" }}>
                      {copied === activeTab ? <Check size={13} /> : <Copy size={13} />}
                      {copied === activeTab ? "Copied!" : "Copy"}
                    </button>
                    <div className="relative group">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border transition-all hover:bg-white/5"
                        style={{ borderColor: "rgba(255,255,255,0.1)", color: "#A1A1AA" }}>
                        <Download size={13} />
                        Export
                        <ChevronDown size={12} />
                      </button>
                      <div className="absolute right-0 top-full mt-1 rounded-xl border overflow-hidden z-10 hidden group-hover:block"
                        style={{ background: "#18181B", borderColor: "rgba(255,255,255,0.1)", minWidth: "120px" }}>
                        <button onClick={() => downloadPrompt(activeOutput, `${activeModel?.label}-prompt`, "txt")}
                          className="block w-full text-left px-4 py-2.5 text-xs hover:bg-white/5 transition-colors" style={{ color: "#A1A1AA" }}>
                          Download .txt
                        </button>
                        <button onClick={() => downloadPrompt(activeOutput, `${activeModel?.label}-prompt`, "md")}
                          className="block w-full text-left px-4 py-2.5 text-xs hover:bg-white/5 transition-colors" style={{ color: "#A1A1AA" }}>
                          Download .md
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <p className="leading-relaxed whitespace-pre-wrap" style={{ color: "#D4D4D8", fontFamily: "JetBrains Mono, monospace", fontSize: "13px", lineHeight: 1.8 }}>
                    {activeOutput}
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
