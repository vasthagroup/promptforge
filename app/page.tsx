"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap, Copy, Download, History, BookOpen, Sparkles, Star } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";

const FEATURES = [
  { icon: Zap, title: "Multi-Model Generation", desc: "One input, 8 platform-optimized prompts instantly generated.", color: "#7C3AED" },
  { icon: Sparkles, title: "Prompt Enhancement", desc: "Paste any prompt and watch AI transform it into something extraordinary.", color: "#8B5CF6" },
  { icon: BookOpen, title: "Template Library", desc: "Hundreds of proven templates across 11 categories ready to use.", color: "#6D28D9" },
  { icon: History, title: "Prompt History", desc: "Every prompt saved. Search, reuse, and build on your best work.", color: "#5B21B6" },
  { icon: Copy, title: "One-Click Copy", desc: "Copy any prompt to clipboard instantly. No friction.", color: "#7C3AED" },
  { icon: Download, title: "Export Prompts", desc: "Download as TXT or Markdown. Use your prompts anywhere.", color: "#8B5CF6" },
];

const MODELS = [
  { name: "ChatGPT", color: "#10A37F", desc: "OpenAI GPT-4o" },
  { name: "Claude", color: "#CC785C", desc: "Anthropic" },
  { name: "Gemini", color: "#4285F4", desc: "Google" },
  { name: "Flux", color: "#FF6B35", desc: "Image Gen" },
  { name: "Midjourney", color: "#7C3AED", desc: "Image Gen" },
  { name: "Stable Diffusion", color: "#F59E0B", desc: "Image Gen" },
  { name: "Veo", color: "#EF4444", desc: "Video Gen" },
  { name: "Kling", color: "#8B5CF6", desc: "Video Gen" },
];

const PRICING = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    desc: "Perfect for trying out PromptForge",
    features: ["20 prompts per day", "Basic templates", "Copy & download", "All 8 models"],
    cta: "Get Started Free",
    href: "/sign-up",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "/month",
    desc: "For power users and creators",
    features: [
      "Unlimited prompts",
      "Premium templates",
      "Prompt enhancer",
      "Full history",
      "Export all formats",
      "Priority generation",
    ],
    cta: "Upgrade to Pro",
    href: "/sign-up",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For teams and organizations",
    features: [
      "Everything in Pro",
      "Team workspace",
      "API access",
      "Custom templates",
      "SSO",
      "Dedicated support",
    ],
    cta: "Contact Sales",
    href: "mailto:enterprise@promptforge.ai",
    highlight: false,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: "#09090B" }}>
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(9,9,11,0.8)", backdropFilter: "blur(20px)" }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ background: "linear-gradient(135deg, #7C3AED, #5B21B6)" }}>⚡</div>
            <span className="font-bold text-lg" style={{ fontFamily: "Syne, sans-serif", color: "#FAFAFA" }}>PromptForge</span>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(124,58,237,0.15)", color: "#A78BFA", border: "1px solid rgba(124,58,237,0.3)" }}>AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: "#A1A1AA" }}>
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          </div>
          <div className="flex items-center gap-3">
            <SignedOut>
              <Link href="/sign-in" className="text-sm px-4 py-2 rounded-lg transition-colors" style={{ color: "#A1A1AA" }}>Sign in</Link>
              <Link href="/sign-up" className="text-sm px-4 py-2 rounded-lg font-medium transition-all" style={{ background: "linear-gradient(135deg, #7C3AED, #5B21B6)", color: "#FAFAFA" }}>Get Started</Link>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard" className="text-sm px-4 py-2 rounded-lg font-medium" style={{ background: "linear-gradient(135deg, #7C3AED, #5B21B6)", color: "#FAFAFA" }}>Open Dashboard</Link>
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(124,58,237,0.15) 0%, transparent 60%)" }} />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs mb-8 border" style={{ background: "rgba(124,58,237,0.1)", borderColor: "rgba(124,58,237,0.3)", color: "#A78BFA" }}>
              <Star size={12} />
              <span>8 AI models. One unified workspace.</span>
            </div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold leading-tight mb-6"
            style={{ fontFamily: "Syne, sans-serif", letterSpacing: "-0.03em" }}>
            <span style={{ color: "#FAFAFA" }}>Turn Simple Ideas</span><br />
            <span style={{ background: "linear-gradient(135deg, #A78BFA 0%, #7C3AED 60%, #5B21B6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Into Expert AI Prompts
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed" style={{ color: "#A1A1AA" }}>
            Generate optimized prompts for ChatGPT, Claude, Gemini, Midjourney, Flux, Veo, Kling and more. Instantly.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard/generate" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: "linear-gradient(135deg, #7C3AED, #5B21B6)", color: "#FAFAFA", boxShadow: "0 0 40px rgba(124,58,237,0.3)" }}>
              Start Generating <ArrowRight size={18} />
            </Link>
            <Link href="#features" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base border transition-all"
              style={{ borderColor: "rgba(255,255,255,0.1)", color: "#A1A1AA" }}>
              Explore Features
            </Link>
          </motion.div>

          {/* Model badges */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-2 justify-center mt-12">
            {MODELS.map((m) => (
              <span key={m.name} className="px-3 py-1.5 rounded-full text-xs font-medium border"
                style={{ borderColor: `${m.color}30`, background: `${m.color}10`, color: m.color }}>
                {m.name}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Mock UI Preview */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto mt-20 rounded-2xl overflow-hidden border"
          style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", boxShadow: "0 0 80px rgba(124,58,237,0.1)" }}>
          <div className="flex items-center gap-2 px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
            <div className="w-3 h-3 rounded-full" style={{ background: "#EF4444" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "#F59E0B" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "#10B981" }} />
            <span className="ml-3 text-xs" style={{ color: "#52525B" }}>PromptForge AI — Dashboard</span>
          </div>
          <div className="p-6 md:p-8">
            <div className="rounded-xl p-4 mb-5 border" style={{ background: "rgba(124,58,237,0.05)", borderColor: "rgba(124,58,237,0.2)" }}>
              <p className="text-sm mb-1" style={{ color: "#71717A" }}>Your idea</p>
              <p style={{ color: "#FAFAFA", fontFamily: "DM Sans, sans-serif" }}>Create a luxury coffee brand logo</p>
            </div>
            <div className="flex gap-2 mb-4 overflow-x-auto">
              {MODELS.slice(0, 5).map((m, i) => (
                <button key={m.name} className="text-xs px-3 py-1.5 rounded-lg whitespace-nowrap border transition-all"
                  style={i === 0 ? { background: `${m.color}20`, borderColor: `${m.color}50`, color: m.color } : { borderColor: "rgba(255,255,255,0.08)", color: "#71717A" }}>
                  {m.name}
                </button>
              ))}
              <span className="text-xs px-3 py-1.5" style={{ color: "#52525B" }}>+3</span>
            </div>
            <div className="rounded-xl p-4 border" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}>
              <p className="text-xs mb-3" style={{ color: "#52525B", fontFamily: "JetBrains Mono, monospace" }}>// ChatGPT Optimized Prompt</p>
              <p className="text-sm leading-relaxed" style={{ color: "#A1A1AA", fontFamily: "JetBrains Mono, monospace" }}>
                "You are a world-class brand identity designer specializing in luxury goods. Create a comprehensive logo concept for a premium artisanal coffee brand targeting affluent millennials aged 28-42. The logo should evoke sophistication through clean geometric forms, use a dark earth-tone palette anchored by deep espresso brown (#2C1A0E) accented with brushed gold (#C9A84C)..."
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Syne, sans-serif", color: "#FAFAFA", letterSpacing: "-0.02em" }}>
              Everything you need to craft<br />
              <span style={{ color: "#7C3AED" }}>perfect prompts</span>
            </h2>
            <p style={{ color: "#A1A1AA" }}>Professional tools built for AI power users.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                className="p-6 rounded-2xl border group hover:border-purple-900/50 transition-all"
                style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${f.color}20` }}>
                  <f.icon size={20} style={{ color: f.color }} />
                </div>
                <h3 className="font-semibold text-base mb-2" style={{ color: "#FAFAFA", fontFamily: "Syne, sans-serif" }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#71717A" }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(124,58,237,0.06) 0%, transparent 70%)" }} />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Syne, sans-serif", color: "#FAFAFA", letterSpacing: "-0.02em" }}>Simple, transparent pricing</h2>
            <p style={{ color: "#A1A1AA" }}>Start free. Upgrade when you're ready.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {PRICING.map((plan, i) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="p-7 rounded-2xl border relative"
                style={{ background: plan.highlight ? "rgba(124,58,237,0.08)" : "rgba(255,255,255,0.02)", borderColor: plan.highlight ? "rgba(124,58,237,0.4)" : "rgba(255,255,255,0.06)" }}>
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "linear-gradient(135deg, #7C3AED, #5B21B6)", color: "#FAFAFA" }}>
                    Most Popular
                  </div>
                )}
                <p className="font-semibold mb-1" style={{ color: "#FAFAFA", fontFamily: "Syne, sans-serif" }}>{plan.name}</p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl font-bold" style={{ color: "#FAFAFA", fontFamily: "Syne, sans-serif" }}>{plan.price}</span>
                  <span className="text-sm" style={{ color: "#71717A" }}>{plan.period}</span>
                </div>
                <p className="text-sm mb-6" style={{ color: "#71717A" }}>{plan.desc}</p>
                <ul className="space-y-2 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm" style={{ color: "#A1A1AA" }}>
                      <span style={{ color: "#7C3AED" }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href={plan.href} className="block text-center py-3 rounded-xl font-medium text-sm transition-all hover:scale-[1.02]"
                  style={plan.highlight ? { background: "linear-gradient(135deg, #7C3AED, #5B21B6)", color: "#FAFAFA" } : { border: "1px solid rgba(255,255,255,0.1)", color: "#A1A1AA" }}>
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded flex items-center justify-center text-xs" style={{ background: "linear-gradient(135deg, #7C3AED, #5B21B6)" }}>⚡</div>
            <span className="font-bold" style={{ fontFamily: "Syne, sans-serif", color: "#FAFAFA" }}>PromptForge AI</span>
          </div>
          <p className="text-sm" style={{ color: "#52525B" }}>© 2024 PromptForge AI. All rights reserved.</p>
          <div className="flex gap-6 text-sm" style={{ color: "#52525B" }}>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
