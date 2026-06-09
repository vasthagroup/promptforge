"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Search, Lock, ArrowRight, Sparkles } from "lucide-react";

const CATEGORIES = ["ALL", "MARKETING", "SEO", "CODING", "BUSINESS", "SOCIAL_MEDIA", "CONTENT_CREATION", "DESIGN", "AI_ART", "VIDEO_CREATION"];

const STATIC_TEMPLATES = [
  { id: "1", title: "Product Launch Campaign", description: "Generate a viral product launch strategy for social media", category: "MARKETING", userInput: "Create a viral product launch marketing campaign", isPremium: false, usageCount: 2341 },
  { id: "2", title: "YouTube Script Writer", description: "Script a compelling YouTube video with hook, story, and CTA", category: "CONTENT_CREATION", userInput: "Write a YouTube script about [topic] with strong hook and storytelling", isPremium: false, usageCount: 1890 },
  { id: "3", title: "SaaS Landing Page Copy", description: "Write high-converting landing page copy for a SaaS product", category: "MARKETING", userInput: "Write landing page copy for a SaaS product called [name] that solves [problem]", isPremium: false, usageCount: 1567 },
  { id: "4", title: "AI Portrait Photography", description: "Generate stunning portrait photography prompts for Midjourney", category: "AI_ART", userInput: "Create a professional portrait photography prompt", isPremium: false, usageCount: 3200 },
  { id: "5", title: "React Component Builder", description: "Generate a complete React component with TypeScript", category: "CODING", userInput: "Build a React TypeScript component for [description]", isPremium: false, usageCount: 2100 },
  { id: "6", title: "Startup Pitch Deck", description: "Create a compelling investor pitch deck narrative", category: "STARTUP", userInput: "Create a startup pitch for [company] solving [problem] in [market]", isPremium: true, usageCount: 980 },
  { id: "7", title: "SEO Blog Article", description: "Write a fully optimized, long-form SEO blog article", category: "SEO", userInput: "Write a 2000-word SEO blog article about [keyword]", isPremium: false, usageCount: 1450 },
  { id: "8", title: "Cinematic Video Ad", description: "Create cinematic video prompts for Veo or Kling", category: "VIDEO_CREATION", userInput: "Create a cinematic video advertisement for [brand/product]", isPremium: true, usageCount: 670 },
  { id: "9", title: "Brand Identity System", description: "Design a complete brand identity with logo, colors, typography", category: "DESIGN", userInput: "Design a brand identity system for [company type] targeting [audience]", isPremium: false, usageCount: 1120 },
  { id: "10", title: "Twitter/X Thread", description: "Write a viral Twitter thread on any topic", category: "SOCIAL_MEDIA", userInput: "Write a viral Twitter thread about [topic] with 10 tweets", isPremium: false, usageCount: 2800 },
  { id: "11", title: "Business Plan Writer", description: "Generate a comprehensive business plan outline", category: "BUSINESS", userInput: "Write a business plan for [business idea] targeting [market]", isPremium: true, usageCount: 540 },
  { id: "12", title: "Fantasy Landscape Art", description: "Create epic fantasy landscapes for Stable Diffusion", category: "AI_ART", userInput: "Create a fantasy landscape environment concept", isPremium: false, usageCount: 2670 },
];

const CATEGORY_LABELS: Record<string, string> = {
  ALL: "All Templates",
  MARKETING: "Marketing",
  SEO: "SEO",
  CODING: "Coding",
  BUSINESS: "Business",
  STARTUP: "Startup",
  SOCIAL_MEDIA: "Social Media",
  CONTENT_CREATION: "Content",
  DESIGN: "Design",
  PHOTOGRAPHY: "Photography",
  AI_ART: "AI Art",
  VIDEO_CREATION: "Video",
};

export default function TemplatesPage() {
  const router = useRouter();
  const [category, setCategory] = useState("ALL");
  const [search, setSearch] = useState("");

  const filtered = STATIC_TEMPLATES.filter((t) => {
    const matchCat = category === "ALL" || t.category === category;
    const matchSearch = !search || t.title.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const useTemplate = (template: typeof STATIC_TEMPLATES[0]) => {
    router.push(`/dashboard/generate?q=${encodeURIComponent(template.userInput)}`);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "Syne, sans-serif", color: "#FAFAFA", letterSpacing: "-0.02em" }}>
          Template Library
        </h1>
        <p className="text-sm" style={{ color: "#71717A" }}>Jump-start with proven prompt templates. Click any template to use it.</p>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "#52525B" }} />
        <input type="text" placeholder="Search templates..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border bg-transparent text-sm focus:outline-none"
          style={{ borderColor: "rgba(255,255,255,0.08)", color: "#FAFAFA" }} />
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap mb-7">
        {CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => setCategory(cat)}
            className="px-3 py-1.5 rounded-full text-xs font-medium border transition-all"
            style={category === cat
              ? { background: "rgba(124,58,237,0.15)", borderColor: "rgba(124,58,237,0.4)", color: "#A78BFA" }
              : { background: "transparent", borderColor: "rgba(255,255,255,0.06)", color: "#52525B" }}>
            {CATEGORY_LABELS[cat] || cat}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((template, i) => (
          <motion.div key={template.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            onClick={() => !template.isPremium && useTemplate(template)}
            className="group p-5 rounded-2xl border cursor-pointer transition-all hover:border-white/10 relative"
            style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)", cursor: template.isPremium ? "default" : "pointer" }}>
            {template.isPremium && (
              <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-1 rounded-full text-xs"
                style={{ background: "rgba(245,158,11,0.15)", color: "#F59E0B", border: "1px solid rgba(245,158,11,0.3)" }}>
                <Lock size={11} /> Pro
              </div>
            )}
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(124,58,237,0.1)", color: "#A78BFA" }}>
                {CATEGORY_LABELS[template.category] || template.category}
              </span>
            </div>
            <h3 className="font-semibold text-sm mb-1.5" style={{ color: "#FAFAFA", fontFamily: "Syne, sans-serif" }}>{template.title}</h3>
            <p className="text-xs leading-relaxed mb-3" style={{ color: "#71717A" }}>{template.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs" style={{ color: "#3F3F46" }}>{template.usageCount.toLocaleString()} uses</span>
              {!template.isPremium && (
                <span className="flex items-center gap-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#7C3AED" }}>
                  Use template <ArrowRight size={12} />
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
