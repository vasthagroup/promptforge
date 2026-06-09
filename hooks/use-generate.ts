"use client";

import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import type { PromptOutput, GenerateResponse } from "@/types";

interface UseGenerateOptions {
  onSuccess?: (data: GenerateResponse) => void;
}

export function useGenerate({ onSuccess }: UseGenerateOptions = {}) {
  const [loading, setLoading] = useState(false);
  const [outputs, setOutputs] = useState<PromptOutput | null>(null);
  const [analysis, setAnalysis] = useState<GenerateResponse["analysis"] | null>(null);
  const [promptId, setPromptId] = useState<string | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async (userInput: string) => {
    if (!userInput.trim() || loading) return;

    setLoading(true);
    setOutputs(null);
    setAnalysis(null);
    setError(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput: userInput.trim() }),
      });

      const data: GenerateResponse = await res.json();

      if (!res.ok || !data.success) {
        const msg = data.error || "Failed to generate prompts";
        setError(msg);
        toast.error(msg);
        return;
      }

      setOutputs(data.outputs!);
      setAnalysis(data.analysis!);
      setPromptId(data.promptId || null);
      if (data.remaining !== undefined) setRemaining(data.remaining);

      toast.success("✦ Prompts generated!");
      onSuccess?.(data);
    } catch (err) {
      const msg = "Network error. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, [loading, onSuccess]);

  const reset = useCallback(() => {
    setOutputs(null);
    setAnalysis(null);
    setError(null);
    setPromptId(null);
  }, []);

  return {
    generate,
    reset,
    loading,
    outputs,
    analysis,
    promptId,
    remaining,
    error,
    hasOutput: outputs !== null,
  };
}
