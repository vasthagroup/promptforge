import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const format = searchParams.get("format") || "json";
    const promptId = searchParams.get("id");

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    if (promptId) {
      // Export single prompt
      const prompt = await prisma.prompt.findFirst({
        where: { id: promptId, userId: user.id },
      });

      if (!prompt) return NextResponse.json({ error: "Not found" }, { status: 404 });

      if (format === "md") {
        const outputs = prompt.outputs as Record<string, string>;
        const md = buildMarkdown(prompt.userInput, outputs);
        return new NextResponse(md, {
          headers: {
            "Content-Type": "text/markdown",
            "Content-Disposition": `attachment; filename="prompt-${prompt.id}.md"`,
          },
        });
      }

      if (format === "txt") {
        const outputs = prompt.outputs as Record<string, string>;
        const txt = buildText(prompt.userInput, outputs);
        return new NextResponse(txt, {
          headers: {
            "Content-Type": "text/plain",
            "Content-Disposition": `attachment; filename="prompt-${prompt.id}.txt"`,
          },
        });
      }

      return NextResponse.json({ prompt });
    }

    // Export all history
    const history = await prisma.promptHistory.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 500,
    });

    if (format === "json") {
      const data = JSON.stringify(history, null, 2);
      return new NextResponse(data, {
        headers: {
          "Content-Type": "application/json",
          "Content-Disposition": 'attachment; filename="promptforge-history.json"',
        },
      });
    }

    return NextResponse.json({ history });
  } catch (error) {
    console.error("[EXPORT_ERROR]", error);
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}

function buildMarkdown(userInput: string, outputs: Record<string, string>): string {
  const labels: Record<string, string> = {
    chatgpt: "ChatGPT",
    claude: "Claude",
    gemini: "Gemini",
    flux: "Flux",
    midjourney: "Midjourney",
    stableDiffusion: "Stable Diffusion",
    veo: "Veo (Video)",
    kling: "Kling (Video)",
  };

  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const sections = Object.entries(outputs)
    .map(([key, value]) => `## ${labels[key] || key}\n\n${value}`)
    .join("\n\n---\n\n");

  return `# PromptForge AI — Generated Prompts\n\n**Original idea:** ${userInput}\n\n**Generated:** ${date}\n\n---\n\n${sections}`;
}

function buildText(userInput: string, outputs: Record<string, string>): string {
  const labels: Record<string, string> = {
    chatgpt: "CHATGPT",
    claude: "CLAUDE",
    gemini: "GEMINI",
    flux: "FLUX",
    midjourney: "MIDJOURNEY",
    stableDiffusion: "STABLE DIFFUSION",
    veo: "VEO (VIDEO)",
    kling: "KLING (VIDEO)",
  };

  const date = new Date().toLocaleDateString();
  const divider = "=".repeat(60);

  const sections = Object.entries(outputs)
    .map(([key, value]) => `${labels[key] || key}\n${divider}\n${value}`)
    .join("\n\n");

  return `PROMPTFORGE AI — GENERATED PROMPTS\nOriginal: ${userInput}\nDate: ${date}\n\n${sections}`;
}
