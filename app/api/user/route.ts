import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        _count: {
          select: { history: true, prompts: true },
        },
        subscription: true,
      },
    });

    if (!user) {
      // Auto-create on first access
      const newUser = await prisma.user.create({
        data: {
          clerkId: userId,
          email: `${userId}@placeholder.com`,
          plan: "FREE",
        },
        include: {
          _count: { select: { history: true, prompts: true } },
          subscription: true,
        },
      });

      return NextResponse.json({
        success: true,
        user: {
          id: newUser.id,
          plan: newUser.plan,
          promptsToday: newUser.promptsToday,
          totalPrompts: newUser._count.history,
          savedPrompts: newUser._count.prompts,
          remaining: 20,
        },
      });
    }

    const now = new Date();
    const lastReset = new Date(user.lastResetDate);
    const isSameDay =
      now.getFullYear() === lastReset.getFullYear() &&
      now.getMonth() === lastReset.getMonth() &&
      now.getDate() === lastReset.getDate();

    const promptsToday = isSameDay ? user.promptsToday : 0;
    const remaining =
      user.plan === "FREE"
        ? Math.max(0, 20 - promptsToday)
        : Number.POSITIVE_INFINITY;

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        plan: user.plan,
        promptsToday,
        totalPrompts: user._count.history,
        savedPrompts: user._count.prompts,
        remaining,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    console.error("[USER_GET_ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
