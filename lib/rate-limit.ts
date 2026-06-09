import { prisma } from "@/lib/prisma";

const FREE_DAILY_LIMIT = 20;

export async function checkRateLimit(
  userId: string,
  plan: string
): Promise<{ allowed: boolean; remaining: number; resetAt: Date }> {
  if (plan === "PRO" || plan === "ENTERPRISE") {
    return { allowed: true, remaining: Infinity, resetAt: new Date() };
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { promptsToday: true, lastResetDate: true },
  });

  if (!user) {
    return { allowed: false, remaining: 0, resetAt: new Date() };
  }

  const now = new Date();
  const lastReset = new Date(user.lastResetDate);
  const isSameDay =
    now.getFullYear() === lastReset.getFullYear() &&
    now.getMonth() === lastReset.getMonth() &&
    now.getDate() === lastReset.getDate();

  if (!isSameDay) {
    await prisma.user.update({
      where: { clerkId: userId },
      data: { promptsToday: 0, lastResetDate: now },
    });
    return {
      allowed: true,
      remaining: FREE_DAILY_LIMIT - 1,
      resetAt: getNextMidnight(),
    };
  }

  const remaining = FREE_DAILY_LIMIT - user.promptsToday;
  return {
    allowed: remaining > 0,
    remaining: Math.max(0, remaining),
    resetAt: getNextMidnight(),
  };
}

export async function incrementUsage(userId: string): Promise<void> {
  await prisma.user.update({
    where: { clerkId: userId },
    data: { promptsToday: { increment: 1 } },
  });
}

function getNextMidnight(): Date {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
}
