"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bookmark, Search, Loader2, Sparkles, ArrowRight, Trash2 } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

interface SavedPrompt {
  id: string;
  title: string;
  userInput: string;
  createdAt: string;
  outputs: Record<string, string>;
}

export default function SavedPromptsPage() {
  const [prompts, setPrompts] = useState<SavedPrompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchSaved() {
      const res = await fetch("/api/prompts/saved");
      const data = await res.json();
      setPrompts(data.prompts || []);
      setLoading(false);
    }
    fetchSaved();
  }, []);

  const filtered = prompts.filter((p) =>
    !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.userInput.toLowerCase().includes(search.toLowerCase())
  );

  const remove = async (id: string) => {
    const res = await fetch("/api/prompts/saved", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setPrompts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Removed from saved");
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "Syne, sans-serif", color: "#FAFAFA", letterSpacing: "-0.02em" }}>
          Saved Prompts
        </h1>
        <p className="text-sm" style={{ color: "#71717A" }}>Your bookmarked and saved prompt collections.</p>
      </div>

      <div className="relative mb-6">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "#52525B" }} />
        <input type="text" placeholder="Search saved prompts..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border bg-transparent text-sm focus:outline-none"
          style={{ borderColor: "rgba(255,255,255,0.08)", color: "#FAFAFA" }} />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={24} className="animate-spin" style={{ color: "#52525B" }} />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(124,58,237,0.1)" }}>
            <Bookmark size={20} style={{ color: "#7C3AED" }} />
          </div>
          <p className="font-medium mb-1" style={{ color: "#FAFAFA" }}>No saved prompts</p>
          <p className="text-sm mb-4" style={{ color: "#52525B" }}>Generate prompts and save your favorites here.</p>
          <Link href="/dashboard/generate" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
            style={{ background: "rgba(124,58,237,0.15)", color: "#A78BFA", border: "1px solid rgba(124,58,237,0.3)" }}>
            <Sparkles size={15} /> Generate a prompt
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((prompt, i) => (
            <motion.div key={prompt.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className="flex items-center gap-4 p-4 rounded-xl border group transition-all hover:border-white/10"
              style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(124,58,237,0.1)" }}>
                <Bookmark size={15} style={{ color: "#7C3AED" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate mb-0.5" style={{ color: "#E4E4E7" }}>{prompt.title}</p>
                <p className="text-xs" style={{ color: "#52525B" }}>{new Date(prompt.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link href={`/dashboard/generate?q=${encodeURIComponent(prompt.userInput)}`}
                  className="p-2 rounded-lg hover:bg-white/5 transition-colors" title="Reuse">
                  <ArrowRight size={15} style={{ color: "#71717A" }} />
                </Link>
                <button onClick={() => remove(prompt.id)} className="p-2 rounded-lg hover:bg-red-500/10 transition-colors" title="Remove">
                  <Trash2 size={15} style={{ color: "#71717A" }} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
