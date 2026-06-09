import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { enhancePrompt } from "@/lib/groq";
import { prisma } from "@/lib/prisma";

const enhanceSchema = z.object({
  originalPrompt: z
    .string()
    .min(10, "Prompt must be at least 10 characters")
    .max(2000, "Prompt must be under 2000 characters"),
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check if user has Pro plan
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { plan: true },
    });

    if (!user || user.plan === "FREE") {
      return NextResponse.json(
        {
          success: false,
          error: "Prompt Enhancer requires a Pro plan. Upgrade to access this feature.",
        },
        { status: 403 }
      );
    }

    const body = await req.json();
    const validation = enhanceSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error.errors[0]?.message || "Invalid input",
        },
        { status: 400 }
      );
    }

    const { originalPrompt } = validation.data;
    const result = await enhancePrompt(originalPrompt);

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("[ENHANCE_ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Failed to enhance prompt. Please try again." },
      { status: 500 }
    );
  }
}
