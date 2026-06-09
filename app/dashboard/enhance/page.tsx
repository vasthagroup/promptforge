"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  Wand2,
  Loader2,
  ArrowRight,
  TrendingUp,
  Copy,
  Check,
  Lock,
} from "lucide-react";

export default function EnhancePage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    enhanced: string;
    improvements: string[];
    score: number;
  } | null>(null);
  const [copied, setCopied] = useState<"original" | "enhanced" | null>(null);
  const [isProUser] = useState(false); // In production, derive from user plan

  const enhance = async () => {
    if (!input.trim() || loading) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalPrompt: input.trim() }),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.error || "Failed to enhance prompt");
        return;
      }

      setResult({
        enhanced: data.enhanced,
        improvements: data.improvements,
        score: data.score,
      });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copy = async (text: string, which: "original" | "enhanced") => {
    await navigator.clipboard.writeText(text);
    setCopied(which);
    toast.success("Copied!");
    setTimeout(() => setCopied(null), 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#10B981";
    if (score >= 60) return "#F59E0B";
    return "#EF4444";
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1
            className="text-2xl font-bold"
            style={{
              fontFamily: "Syne, sans-serif",
              color: "#FAFAFA",
              letterSpacing: "-0.02em",
            }}
          >
            Prompt Enhancer
          </h1>
          <span
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
            style={{
              background: "rgba(245,158,11,0.12)",
              color: "#F59E0B",
              border: "1px solid rgba(245,158,11,0.25)",
            }}
          >
            <Lock size={11} /> Pro Feature
          </span>
        </div>
        <p className="text-sm" style={{ color: "#71717A" }}>
          Paste any prompt and AI will rewrite it to maximize output quality,
          clarity, and effectiveness.
        </p>
      </div>

      {/* Pro Gate */}
      {!isProUser && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-5 rounded-2xl border flex items-start gap-4"
          style={{
            background: "rgba(245,158,11,0.05)",
            borderColor: "rgba(245,158,11,0.2)",
          }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "rgba(245,158,11,0.15)" }}
          >
            <Lock size={18} style={{ color: "#F59E0B" }} />
          </div>
          <div className="flex-1">
            <p
              className="font-semibold mb-1"
              style={{ color: "#FAFAFA", fontFamily: "Syne, sans-serif" }}
            >
              Upgrade to Pro to use Prompt Enhancer
            </p>
            <p className="text-sm mb-3" style={{ color: "#71717A" }}>
              Pro users get access to the enhancer, unlimited generations,
              premium templates, and full history export.
            </p>
            <a
              href="/pricing"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
                color: "#FAFAFA",
              }}
            >
              Upgrade for $9/mo <ArrowRight size={15} />
            </a>
          </div>
        </motion.div>
      )}

      {/* Input */}
      <div
        className="mb-5 rounded-2xl border overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.02)",
          borderColor: "rgba(255,255,255,0.08)",
          opacity: isProUser ? 1 : 0.6,
          pointerEvents: isProUser ? "auto" : "none",
        }}
      >
        <div
          className="flex items-center gap-2 px-5 py-3 border-b"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <Wand2 size={14} style={{ color: "#7C3AED" }} />
          <span className="text-xs font-medium" style={{ color: "#52525B" }}>
            Original Prompt
          </span>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your existing prompt here... The AI will analyze and significantly improve it."
          rows={6}
          disabled={!isProUser}
          className="w-full bg-transparent p-5 text-sm resize-none focus:outline-none"
          style={{
            color: "#FAFAFA",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "13px",
            lineHeight: 1.8,
          }}
          maxLength={2000}
        />
        <div
          className="flex items-center justify-between px-5 py-3 border-t"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <span className="text-xs" style={{ color: "#3F3F46" }}>
            {input.length}/2000
          </span>
          <div className="flex items-center gap-3">
            {input && (
              <button
                onClick={() => copy(input, "original")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border transition-all"
                style={{
                  borderColor: "rgba(255,255,255,0.1)",
                  color: copied === "original" ? "#10B981" : "#71717A",
                }}
              >
                {copied === "original" ? <Check size={12} /> : <Copy size={12} />}
                Copy original
              </button>
            )}
            <button
              onClick={enhance}
              disabled={!input.trim() || loading || !isProUser}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-40"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
                color: "#FAFAFA",
              }}
            >
              {loading ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <Wand2 size={15} />
              )}
              {loading ? "Enhancing..." : "Enhance Prompt"}
            </button>
          </div>
        </div>
      </div>

      {/* Loading */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mb-5 p-6 rounded-2xl border text-center"
            style={{
              background: "rgba(124,58,237,0.05)",
              borderColor: "rgba(124,58,237,0.15)",
            }}
          >
            <Loader2
              size={24}
              className="animate-spin mx-auto mb-3"
              style={{ color: "#7C3AED" }}
            />
            <p className="text-sm font-medium" style={{ color: "#A78BFA" }}>
              Analyzing and enhancing your prompt...
            </p>
            <p className="text-xs mt-1" style={{ color: "#52525B" }}>
              Improving clarity, context, structure, and output quality
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {result && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Score + Improvements */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
              {/* Score */}
              <div
                className="p-5 rounded-2xl border flex flex-col items-center justify-center text-center"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  borderColor: "rgba(255,255,255,0.06)",
                }}
              >
                <p className="text-xs mb-2" style={{ color: "#52525B" }}>
                  Improvement Score
                </p>
                <div
                  className="text-4xl font-bold mb-1"
                  style={{
                    fontFamily: "Syne, sans-serif",
                    color: getScoreColor(result.score),
                  }}
                >
                  +{result.score}
                </div>
                <p className="text-xs" style={{ color: "#52525B" }}>
                  points better
                </p>
              </div>

              {/* Improvements */}
              <div
                className="md:col-span-2 p-5 rounded-2xl border"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  borderColor: "rgba(255,255,255,0.06)",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp size={14} style={{ color: "#7C3AED" }} />
                  <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#52525B" }}>
                    Improvements Made
                  </p>
                </div>
                <ul className="space-y-2">
                  {result.improvements.map((imp, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#A1A1AA" }}>
                      <span className="mt-0.5 shrink-0" style={{ color: "#7C3AED" }}>✓</span>
                      {imp}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Enhanced Output */}
            <div
              className="rounded-2xl border overflow-hidden"
              style={{
                background: "rgba(124,58,237,0.04)",
                borderColor: "rgba(124,58,237,0.2)",
              }}
            >
              <div
                className="flex items-center justify-between px-5 py-3 border-b"
                style={{ borderColor: "rgba(124,58,237,0.15)" }}
              >
                <div className="flex items-center gap-2">
                  <Wand2 size={14} style={{ color: "#7C3AED" }} />
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#FAFAFA", fontFamily: "Syne, sans-serif" }}
                  >
                    Enhanced Prompt
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: "rgba(16,185,129,0.15)",
                      color: "#10B981",
                      border: "1px solid rgba(16,185,129,0.25)",
                    }}
                  >
                    AI Optimized
                  </span>
                </div>
                <button
                  onClick={() => copy(result.enhanced, "enhanced")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border transition-all"
                  style={{
                    borderColor: copied === "enhanced" ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.1)",
                    color: copied === "enhanced" ? "#10B981" : "#A1A1AA",
                  }}
                >
                  {copied === "enhanced" ? <Check size={12} /> : <Copy size={12} />}
                  {copied === "enhanced" ? "Copied!" : "Copy"}
                </button>
              </div>
              <div
                className="p-5 whitespace-pre-wrap"
                style={{
                  color: "#D4D4D8",
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "13px",
                  lineHeight: 1.8,
                }}
              >
                {result.enhanced}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
