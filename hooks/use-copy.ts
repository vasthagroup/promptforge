"use client";

import { useState, useCallback } from "react";
import toast from "react-hot-toast";

export function useCopy(timeout = 2000) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copy = useCallback(
    async (text: string, id: string = "default") => {
      try {
        await navigator.clipboard.writeText(text);
        setCopiedId(id);
        toast.success("Copied to clipboard!");
        setTimeout(() => setCopiedId(null), timeout);
      } catch {
        // Fallback for older browsers
        const el = document.createElement("textarea");
        el.value = text;
        el.style.position = "fixed";
        el.style.opacity = "0";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        setCopiedId(id);
        toast.success("Copied!");
        setTimeout(() => setCopiedId(null), timeout);
      }
    },
    [timeout]
  );

  const isCopied = useCallback(
    (id: string = "default") => copiedId === id,
    [copiedId]
  );

  return { copy, isCopied, copiedId };
}
