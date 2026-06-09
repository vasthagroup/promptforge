import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Sparkles, History, Bookmark, ArrowRight, TrendingUp, Zap } from "lucide-react";

async function getDashboardData(clerkId: string) {
  const user = await prisma.user.findUnique({
    where: { clerkId },
    include: {
      _count: { select: { history: true, prompts: true } },
    },
  });

  const recentHistory = await prisma.promptHistory.findMany({
    where: { userId: user?.id },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return { user, recentHistory };
}

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  // Upsert user
  const user = await prisma.user.upsert({
    where: { clerkId: userId },
    update: {},
    create: { clerkId: userId, email: `${userId}@placeholder.com`, plan: "FREE" },
    include: { _count: { select: { history: true, prompts: true } } },
  });

  const recentHistory = await prisma.promptHistory.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const remaining = Math.max(0, 20 - user.promptsToday);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "Syne, sans-serif", color: "#FAFAFA", letterSpacing: "-0.02em" }}>
          Welcome back 👋
        </h1>
        <p className="text-sm" style={{ color: "#71717A" }}>
          {user.plan === "FREE" ? `${remaining} free prompts remaining today` : "Unlimited prompts on Pro plan"}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Prompts", value: user._count.history, icon: Sparkles, color: "#7C3AED" },
          { label: "Saved Prompts", value: user._count.prompts, icon: Bookmark, color: "#8B5CF6" },
          { label: "Today Used", value: user.promptsToday, icon: TrendingUp, color: "#10A37F" },
          { label: "Plan", value: user.plan, icon: Zap, color: "#F59E0B" },
        ].map((stat) => (
          <div key={stat.label} className="p-5 rounded-2xl border" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-2 mb-3">
              <stat.icon size={16} style={{ color: stat.color }} />
              <span className="text-xs" style={{ color: "#52525B" }}>{stat.label}</span>
            </div>
            <p className="text-2xl font-bold" style={{ fontFamily: "Syne, sans-serif", color: "#FAFAFA" }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <Link href="/dashboard/generate" className="group p-6 rounded-2xl border transition-all hover:border-purple-900/50" style={{ background: "rgba(124,58,237,0.06)", borderColor: "rgba(124,58,237,0.2)" }}>
          <Sparkles size={24} className="mb-3" style={{ color: "#7C3AED" }} />
          <h3 className="font-semibold mb-1" style={{ color: "#FAFAFA", fontFamily: "Syne, sans-serif" }}>Generate Prompts</h3>
          <p className="text-sm" style={{ color: "#52525B" }}>Transform your idea into 8 optimized prompts</p>
          <ArrowRight size={16} className="mt-3 group-hover:translate-x-1 transition-transform" style={{ color: "#7C3AED" }} />
        </Link>
        <Link href="/dashboard/templates" className="group p-6 rounded-2xl border transition-all hover:border-white/10" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}>
          <History size={24} className="mb-3" style={{ color: "#A1A1AA" }} />
          <h3 className="font-semibold mb-1" style={{ color: "#FAFAFA", fontFamily: "Syne, sans-serif" }}>Browse Templates</h3>
          <p className="text-sm" style={{ color: "#52525B" }}>Start from proven prompt templates</p>
          <ArrowRight size={16} className="mt-3 group-hover:translate-x-1 transition-transform" style={{ color: "#71717A" }} />
        </Link>
        <Link href="/dashboard/history" className="group p-6 rounded-2xl border transition-all hover:border-white/10" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}>
          <Bookmark size={24} className="mb-3" style={{ color: "#A1A1AA" }} />
          <h3 className="font-semibold mb-1" style={{ color: "#FAFAFA", fontFamily: "Syne, sans-serif" }}>Prompt History</h3>
          <p className="text-sm" style={{ color: "#52525B" }}>Review and reuse your past prompts</p>
          <ArrowRight size={16} className="mt-3 group-hover:translate-x-1 transition-transform" style={{ color: "#71717A" }} />
        </Link>
      </div>

      {/* Recent History */}
      {recentHistory.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold" style={{ color: "#FAFAFA", fontFamily: "Syne, sans-serif" }}>Recent Prompts</h2>
            <Link href="/dashboard/history" className="text-xs" style={{ color: "#7C3AED" }}>View all →</Link>
          </div>
          <div className="space-y-2">
            {recentHistory.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl border" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(124,58,237,0.1)" }}>
                  <Sparkles size={14} style={{ color: "#7C3AED" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate" style={{ color: "#E4E4E7" }}>{item.userInput}</p>
                  <p className="text-xs" style={{ color: "#52525B" }}>{new Date(item.createdAt).toLocaleDateString()}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-md" style={{ background: "rgba(124,58,237,0.1)", color: "#A78BFA" }}>
                  {item.modelCount} models
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
