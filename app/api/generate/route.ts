import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { groq as groqClient, analyzeIntent, generatePrompts } from "@/lib/groq";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, incrementUsage } from "@/lib/rate-limit";

const generateSchema = z.object({
  userInput: z
    .string()
    .min(3, "Input must be at least 3 characters")
    .max(500, "Input must be under 500 characters"),
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

    const body = await req.json();
    const validation = generateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error.errors[0]?.message || "Invalid input",
        },
        { status: 400 }
      );
    }

    const { userInput } = validation.data;

    // Ensure user exists in DB
    const user = await prisma.user.upsert({
      where: { clerkId: userId },
      update: {},
      create: {
        clerkId: userId,
        email: `${userId}@placeholder.com`,
        plan: "FREE",
      },
    });

    // Check rate limit
    const rateLimit = await checkRateLimit(userId, user.plan);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Daily limit reached. Upgrade to Pro for unlimited prompts. Resets at midnight.`,
          remaining: 0,
        },
        { status: 429 }
      );
    }

    // Step 1: Analyze intent
    const analysis = await analyzeIntent(userInput);

    // Step 2: Generate prompts
    const outputs = await generatePrompts(userInput, analysis);

    // Step 3: Save to DB
    const [prompt] = await Promise.all([
      prisma.prompt.create({
        data: {
          userId: user.id,
          title: userInput.slice(0, 80),
          userInput,
          outputs: outputs as any,
        },
      }),
      prisma.promptHistory.create({
        data: {
          userId: user.id,
          userInput,
          outputs: outputs as any,
          modelCount: 8,
        },
      }),
      incrementUsage(userId),
    ]);

    return NextResponse.json({
      success: true,
      promptId: prompt.id,
      outputs,
      analysis,
      remaining: rateLimit.remaining - 1,
    });
  } catch (error) {
    console.error("[GENERATE_ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate prompts. Please try again." },
      { status: 500 }
    );
  }
}
