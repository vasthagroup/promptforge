import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { UserButton } from "@clerk/nextjs";
import { User, CreditCard, BarChart3, Shield } from "lucide-react";

export default async function SettingsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const clerkUser = await currentUser();
  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { _count: { select: { history: true } } },
  });

  const plan = user?.plan || "FREE";
  const remaining = Math.max(0, 20 - (user?.promptsToday || 0));

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "Syne, sans-serif", color: "#FAFAFA", letterSpacing: "-0.02em" }}>Settings</h1>
        <p className="text-sm" style={{ color: "#71717A" }}>Manage your account and preferences.</p>
      </div>

      <div className="space-y-4">
        {/* Profile */}
        <div className="p-6 rounded-2xl border" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-2 mb-5">
            <User size={16} style={{ color: "#7C3AED" }} />
            <h2 className="font-semibold" style={{ color: "#FAFAFA", fontFamily: "Syne, sans-serif" }}>Profile</h2>
          </div>
          <div className="flex items-center gap-4 mb-5">
            <UserButton />
            <div>
              <p className="font-medium" style={{ color: "#FAFAFA" }}>{clerkUser?.fullName || "User"}</p>
              <p className="text-sm" style={{ color: "#71717A" }}>{clerkUser?.emailAddresses[0]?.emailAddress}</p>
            </div>
          </div>
          <p className="text-xs" style={{ color: "#52525B" }}>Manage your name, email, and password via the profile button above.</p>
        </div>

        {/* Plan */}
        <div className="p-6 rounded-2xl border" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-2 mb-5">
            <CreditCard size={16} style={{ color: "#7C3AED" }} />
            <h2 className="font-semibold" style={{ color: "#FAFAFA", fontFamily: "Syne, sans-serif" }}>Subscription</h2>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-medium mb-0.5" style={{ color: "#FAFAFA" }}>{plan} Plan</p>
              <p className="text-sm" style={{ color: "#71717A" }}>
                {plan === "FREE" ? "20 prompts per day" : "Unlimited prompts"}
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-medium"
              style={plan === "PRO" ? { background: "rgba(124,58,237,0.15)", color: "#A78BFA", border: "1px solid rgba(124,58,237,0.3)" } : { background: "rgba(255,255,255,0.05)", color: "#71717A", border: "1px solid rgba(255,255,255,0.08)" }}>
              {plan}
            </span>
          </div>
          {plan === "FREE" && (
            <a href="/pricing" className="block text-center py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{ background: "linear-gradient(135deg, #7C3AED, #5B21B6)", color: "#FAFAFA" }}>
              Upgrade to Pro — $9/month
            </a>
          )}
        </div>

        {/* Usage */}
        <div className="p-6 rounded-2xl border" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-2 mb-5">
            <BarChart3 size={16} style={{ color: "#7C3AED" }} />
            <h2 className="font-semibold" style={{ color: "#FAFAFA", fontFamily: "Syne, sans-serif" }}>Usage</h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Today Used", value: user?.promptsToday || 0 },
              { label: "Today Remaining", value: plan === "FREE" ? remaining : "∞" },
              { label: "Total Generated", value: user?._count.history || 0 },
            ].map((stat) => (
              <div key={stat.label} className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
                <p className="text-xs mb-1" style={{ color: "#52525B" }}>{stat.label}</p>
                <p className="text-xl font-bold" style={{ color: "#FAFAFA", fontFamily: "Syne, sans-serif" }}>{stat.value}</p>
              </div>
            ))}
          </div>
          {plan === "FREE" && (
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1" style={{ color: "#52525B" }}>
                <span>Daily prompts</span>
                <span>{user?.promptsToday || 0} / 20</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                <div className="h-full rounded-full transition-all" style={{ width: `${((user?.promptsToday || 0) / 20) * 100}%`, background: "linear-gradient(90deg, #7C3AED, #8B5CF6)" }} />
              </div>
            </div>
          )}
        </div>

        {/* Security */}
        <div className="p-6 rounded-2xl border" style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-2 mb-3">
            <Shield size={16} style={{ color: "#7C3AED" }} />
            <h2 className="font-semibold" style={{ color: "#FAFAFA", fontFamily: "Syne, sans-serif" }}>Security</h2>
          </div>
          <p className="text-sm" style={{ color: "#71717A" }}>Your account is secured with Clerk authentication. Manage security settings via your profile.</p>
        </div>
      </div>
    </div>
  );
}
