"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ShortcutAction {
  key: string;
  meta?: boolean;
  ctrl?: boolean;
  shift?: boolean;
  action: () => void;
  description: string;
}

export function useKeyboardShortcuts(shortcuts: ShortcutAction[]) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const metaMatch = shortcut.meta ? e.metaKey : true;
        const ctrlMatch = shortcut.ctrl ? e.ctrlKey : !shortcut.meta && !shortcut.ctrl ? true : true;
        const shiftMatch = shortcut.shift ? e.shiftKey : !shortcut.shift;
        const keyMatch = e.key.toLowerCase() === shortcut.key.toLowerCase();

        const isModified = shortcut.meta || shortcut.ctrl;
        const modifierPressed = e.metaKey || e.ctrlKey;

        if (isModified && keyMatch && modifierPressed && shiftMatch) {
          const target = e.target as HTMLElement;
          const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA";
          
          // Allow ⌘+Enter even in textarea
          if (shortcut.key === "Enter" && isInput) {
            e.preventDefault();
            shortcut.action();
            return;
          }
          
          if (!isInput) {
            e.preventDefault();
            shortcut.action();
            return;
          }
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [shortcuts]);
}

export function useGlobalShortcuts() {
  const router = useRouter();

  useKeyboardShortcuts([
    {
      key: "g",
      meta: true,
      action: () => router.push("/dashboard/generate"),
      description: "Go to Generate",
    },
    {
      key: "t",
      meta: true,
      action: () => router.push("/dashboard/templates"),
      description: "Go to Templates",
    },
    {
      key: "h",
      meta: true,
      action: () => router.push("/dashboard/history"),
      description: "Go to History",
    },
    {
      key: "s",
      meta: true,
      action: () => router.push("/dashboard/saved"),
      description: "Go to Saved",
    },
  ]);
}
