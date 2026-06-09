import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search") || "";

    const templates = await prisma.template.findMany({
      where: {
        ...(category && category !== "ALL" ? { category: category as any } : {}),
        ...(search
          ? {
              OR: [
                { title: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      orderBy: [{ isPremium: "asc" }, { usageCount: "desc" }],
    });

    return NextResponse.json({ success: true, templates });
  } catch (error) {
    console.error("[TEMPLATES_GET_ERROR]", error);
    return NextResponse.json({ success: false, error: "Failed to fetch templates" }, { status: 500 });
  }
}
