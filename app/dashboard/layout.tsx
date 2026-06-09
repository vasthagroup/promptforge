"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Sparkles,
  BookOpen,
  Bookmark,
  History,
  Settings,
  Menu,
  X,
  Zap,
  ChevronRight,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/generate", label: "Generate Prompt", icon: Sparkles },
  { href: "/dashboard/templates", label: "Templates", icon: BookOpen },
  { href: "/dashboard/saved", label: "Saved Prompts", icon: Bookmark },
  { href: "/dashboard/history", label: "History", icon: History },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#09090B" }}>
      {/* Desktop Sidebar */}
      <aside
        className="hidden md:flex flex-col w-64 shrink-0 border-r"
        style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.01)" }}
      >
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: "rgba(0,0,0,0.7)" }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-64 z-50 flex flex-col border-r md:hidden"
              style={{ borderColor: "rgba(255,255,255,0.08)", background: "#0E0E11" }}
            >
              <SidebarContent pathname={pathname} onClose={() => setSidebarOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header
          className="flex items-center justify-between h-14 px-6 border-b shrink-0"
          style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(9,9,11,0.95)" }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <Menu size={20} style={{ color: "#A1A1AA" }} />
          </button>
          <div className="flex-1 md:flex-none" />
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/generate"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #7C3AED, #5B21B6)", color: "#FAFAFA" }}
            >
              <Sparkles size={15} />
              New Prompt
            </Link>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                },
              }}
            />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-6 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

function SidebarContent({
  pathname,
  onClose,
}: {
  pathname: string;
  onClose?: () => void;
}) {
  return (
    <>
      {/* Logo */}
      <div
        className="flex items-center justify-between h-14 px-5 border-b shrink-0"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <Link href="/" className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs"
            style={{ background: "linear-gradient(135deg, #7C3AED, #5B21B6)" }}
          >
            ⚡
          </div>
          <span
            className="font-bold text-base"
            style={{ fontFamily: "Syne, sans-serif", color: "#FAFAFA" }}
          >
            PromptForge
          </span>
        </Link>
        {onClose && (
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/5">
            <X size={16} style={{ color: "#71717A" }} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group"
              style={{
                background: isActive ? "rgba(124,58,237,0.12)" : "transparent",
                color: isActive ? "#A78BFA" : "#71717A",
                border: isActive
                  ? "1px solid rgba(124,58,237,0.2)"
                  : "1px solid transparent",
              }}
            >
              <item.icon size={17} />
              <span className="flex-1">{item.label}</span>
              {isActive && <ChevronRight size={14} style={{ opacity: 0.5 }} />}
            </Link>
          );
        })}
      </nav>

      {/* Pro Banner */}
      <div className="px-3 pb-4">
        <div
          className="p-4 rounded-xl border"
          style={{
            background: "rgba(124,58,237,0.08)",
            borderColor: "rgba(124,58,237,0.2)",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Zap size={15} style={{ color: "#A78BFA" }} />
            <span
              className="text-xs font-semibold"
              style={{ color: "#A78BFA", fontFamily: "Syne, sans-serif" }}
            >
              Upgrade to Pro
            </span>
          </div>
          <p className="text-xs mb-3" style={{ color: "#52525B", lineHeight: 1.5 }}>
            Unlimited prompts, enhancer, and premium templates.
          </p>
          <Link
            href="/pricing"
            className="block text-center py-2 rounded-lg text-xs font-semibold transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #7C3AED, #5B21B6)", color: "#FAFAFA" }}
          >
            Upgrade for $9/mo
          </Link>
        </div>
      </div>
    </>
  );
}
