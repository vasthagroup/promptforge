"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Search, Trash2, RotateCcw, Calendar, Loader2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import type { PromptHistoryItem } from "@/types";

export default function HistoryPage() {
  const router = useRouter();
  const [history, setHistory] = useState<PromptHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchHistory = async (q = "") => {
    setLoading(true);
    const res = await fetch(`/api/history?search=${encodeURIComponent(q)}&limit=50`);
    const data = await res.json();
    setHistory(data.history || []);
    setLoading(false);
  };

  useEffect(() => { fetchHistory(); }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    const timeout = setTimeout(() => fetchHistory(e.target.value), 400);
    return () => clearTimeout(timeout);
  };

  const deleteItem = async (id: string) => {
    setDeleting(id);
    const res = await fetch("/api/history", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setHistory((prev) => prev.filter((h) => h.id !== id));
      toast.success("Deleted");
    } else {
      toast.error("Failed to delete");
    }
    setDeleting(null);
  };

  const reuse = (input: string) => {
    router.push(`/dashboard/generate?q=${encodeURIComponent(input)}`);
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "Syne, sans-serif", color: "#FAFAFA", letterSpacing: "-0.02em" }}>
          Prompt History
        </h1>
        <p className="text-sm" style={{ color: "#71717A" }}>All your generated prompts. Search, reuse, or delete.</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "#52525B" }} />
        <input
          type="text"
          placeholder="Search your history..."
          value={search}
          onChange={handleSearch}
          className="w-full pl-10 pr-4 py-3 rounded-xl border bg-transparent text-sm focus:outline-none"
          style={{ borderColor: "rgba(255,255,255,0.08)", color: "#FAFAFA", fontFamily: "DM Sans, sans-serif" }}
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={24} className="animate-spin" style={{ color: "#52525B" }} />
        </div>
      ) : history.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(124,58,237,0.1)" }}>
            <Sparkles size={20} style={{ color: "#7C3AED" }} />
          </div>
          <p className="font-medium mb-1" style={{ color: "#FAFAFA" }}>No history yet</p>
          <p className="text-sm" style={{ color: "#52525B" }}>Generate your first prompt to see it here.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {history.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className="flex items-center gap-4 p-4 rounded-xl border group transition-all hover:border-white/10"
              style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(124,58,237,0.1)" }}>
                <Sparkles size={15} style={{ color: "#7C3AED" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate mb-0.5" style={{ color: "#E4E4E7" }}>{item.userInput}</p>
                <div className="flex items-center gap-3">
                  <span className="text-xs" style={{ color: "#52525B" }}>
                    <Calendar size={11} className="inline mr-1" />
                    {new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-md" style={{ background: "rgba(124,58,237,0.1)", color: "#A78BFA" }}>
                    {item.modelCount} models
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => reuse(item.userInput)} className="p-2 rounded-lg hover:bg-white/5 transition-colors" title="Reuse">
                  <RotateCcw size={15} style={{ color: "#71717A" }} />
                </button>
                <button onClick={() => deleteItem(item.id)} disabled={deleting === item.id} className="p-2 rounded-lg hover:bg-red-500/10 transition-colors" title="Delete">
                  {deleting === item.id ? <Loader2 size={15} className="animate-spin" style={{ color: "#71717A" }} /> : <Trash2 size={15} style={{ color: "#71717A" }} />}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
