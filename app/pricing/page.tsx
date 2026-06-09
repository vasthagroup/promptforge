import type { Metadata } from "next";
import Link from "next/link";
import { Check, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing — PromptForge AI",
  description:
    "Simple, transparent pricing. Start free, upgrade when you need unlimited prompts and advanced features.",
};

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    desc: "Perfect for trying out PromptForge AI",
    features: [
      "20 prompts per day",
      "All 8 AI model outputs",
      "Basic template library",
      "Copy & download prompts",
      "Prompt history (7 days)",
    ],
    notIncluded: [
      "Prompt enhancer",
      "Unlimited history",
      "Premium templates",
      "Export all formats",
    ],
    cta: "Get Started Free",
    href: "/sign-up",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "/month",
    desc: "For creators, marketers, and power users",
    features: [
      "Unlimited prompts",
      "All 8 AI model outputs",
      "Prompt Enhancer (AI)",
      "Full template library (200+)",
      "Unlimited history",
      "Export as TXT, MD, JSON",
      "Priority generation",
      "Early access to new models",
    ],
    notIncluded: [],
    cta: "Upgrade to Pro",
    href: "/sign-up?plan=pro",
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For teams and organizations at scale",
    features: [
      "Everything in Pro",
      "Team workspace & sharing",
      "REST API access",
      "Custom prompt templates",
      "SSO / SAML",
      "SLA & dedicated support",
      "Usage analytics dashboard",
      "Custom model fine-tuning",
    ],
    notIncluded: [],
    cta: "Contact Sales",
    href: "mailto:enterprise@promptforge.ai",
    highlight: false,
  },
];

const faq = [
  {
    q: "How does the free plan work?",
    a: "Free users get 20 prompt generations per day, resetting at midnight. Each generation produces optimized prompts for all 8 AI platforms simultaneously.",
  },
  {
    q: "What AI model does PromptForge use?",
    a: "PromptForge uses Groq's ultra-fast inference with Llama 3.3 70B to analyze your ideas and engineer platform-specific prompts in seconds.",
  },
  {
    q: "Can I cancel my Pro subscription anytime?",
    a: "Yes, absolutely. Cancel from your Settings page at any time. You'll retain Pro access until the end of your billing period.",
  },
  {
    q: "What's the Prompt Enhancer?",
    a: "The Prompt Enhancer is a Pro feature that takes any existing prompt you've written and rewrites it to maximize output quality, adding missing context, structure, and specificity.",
  },
  {
    q: "Do you offer refunds?",
    a: "We offer a 7-day money-back guarantee on Pro subscriptions, no questions asked.",
  },
  {
    q: "Is there an API for Enterprise?",
    a: "Yes. Enterprise customers get full REST API access to integrate PromptForge directly into their internal tools and workflows.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen" style={{ background: "#09090B" }}>
      {/* Nav */}
      <nav
        className="border-b"
        style={{
          borderColor: "rgba(255,255,255,0.06)",
          background: "rgba(9,9,11,0.9)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-xs"
              style={{ background: "linear-gradient(135deg, #7C3AED, #5B21B6)" }}
            >
              ⚡
            </div>
            <span
              className="font-bold"
              style={{ fontFamily: "Syne, sans-serif", color: "#FAFAFA" }}
            >
              PromptForge AI
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/sign-in"
              className="text-sm px-4 py-2"
              style={{ color: "#A1A1AA" }}
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="text-sm px-4 py-2 rounded-lg font-medium"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
                color: "#FAFAFA",
              }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs mb-6 border"
            style={{
              background: "rgba(124,58,237,0.1)",
              borderColor: "rgba(124,58,237,0.3)",
              color: "#A78BFA",
            }}
          >
            <Zap size={12} />
            Simple, transparent pricing
          </div>
          <h1
            className="text-4xl md:text-6xl font-extrabold mb-4"
            style={{
              fontFamily: "Syne, sans-serif",
              color: "#FAFAFA",
              letterSpacing: "-0.03em",
            }}
          >
            Start free.{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Scale when ready.
            </span>
          </h1>
          <p
            className="text-lg max-w-xl mx-auto"
            style={{ color: "#A1A1AA" }}
          >
            No hidden fees. Cancel any time. 7-day money-back guarantee on Pro.
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="p-8 rounded-2xl border relative"
              style={{
                background: plan.highlight
                  ? "rgba(124,58,237,0.08)"
                  : "rgba(255,255,255,0.02)",
                borderColor: plan.highlight
                  ? "rgba(124,58,237,0.4)"
                  : "rgba(255,255,255,0.07)",
              }}
            >
              {plan.badge && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
                    color: "#FAFAFA",
                  }}
                >
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <p
                  className="font-bold text-lg mb-1"
                  style={{
                    fontFamily: "Syne, sans-serif",
                    color: "#FAFAFA",
                  }}
                >
                  {plan.name}
                </p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span
                    className="text-4xl font-extrabold"
                    style={{
                      fontFamily: "Syne, sans-serif",
                      color: "#FAFAFA",
                    }}
                  >
                    {plan.price}
                  </span>
                  <span className="text-sm" style={{ color: "#71717A" }}>
                    {plan.period}
                  </span>
                </div>
                <p className="text-sm" style={{ color: "#71717A" }}>
                  {plan.desc}
                </p>
              </div>

              <Link
                href={plan.href}
                className="block text-center py-3 rounded-xl text-sm font-semibold mb-8 transition-all hover:opacity-90"
                style={
                  plan.highlight
                    ? {
                        background:
                          "linear-gradient(135deg, #7C3AED, #5B21B6)",
                        color: "#FAFAFA",
                      }
                    : {
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "#A1A1AA",
                      }
                }
              >
                {plan.cta}
              </Link>

              <ul className="space-y-3">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-sm"
                    style={{ color: "#A1A1AA" }}
                  >
                    <Check
                      size={15}
                      className="mt-0.5 shrink-0"
                      style={{ color: plan.highlight ? "#7C3AED" : "#52525B" }}
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-2xl font-bold text-center mb-10"
            style={{ fontFamily: "Syne, sans-serif", color: "#FAFAFA" }}
          >
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            {faq.map((item) => (
              <div
                key={item.q}
                className="pb-6 border-b"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
              >
                <p
                  className="font-semibold mb-2"
                  style={{ color: "#FAFAFA", fontFamily: "Syne, sans-serif" }}
                >
                  {item.q}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "#71717A" }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
