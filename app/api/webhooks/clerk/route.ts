import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("Missing CLERK_WEBHOOK_SECRET");
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: "Missing svix headers" }, { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const { type, data } = evt;

  try {
    switch (type) {
      case "user.created": {
        const { id, email_addresses, first_name, last_name, image_url } = data;
        const email = email_addresses[0]?.email_address ?? "";
        const name = [first_name, last_name].filter(Boolean).join(" ");

        await prisma.user.upsert({
          where: { clerkId: id },
          update: { email, name, imageUrl: image_url },
          create: {
            clerkId: id,
            email,
            name,
            imageUrl: image_url,
            plan: "FREE",
          },
        });

        console.log(`[WEBHOOK] Created user: ${id}`);
        break;
      }

      case "user.updated": {
        const { id, email_addresses, first_name, last_name, image_url } = data;
        const email = email_addresses[0]?.email_address ?? "";
        const name = [first_name, last_name].filter(Boolean).join(" ");

        await prisma.user.upsert({
          where: { clerkId: id },
          update: { email, name, imageUrl: image_url },
          create: {
            clerkId: id,
            email,
            name,
            imageUrl: image_url,
            plan: "FREE",
          },
        });

        console.log(`[WEBHOOK] Updated user: ${id}`);
        break;
      }

      case "user.deleted": {
        const { id } = data;
        if (id) {
          await prisma.user.delete({ where: { clerkId: id } }).catch(() => {
            // User may not exist in DB yet, ignore
          });
          console.log(`[WEBHOOK] Deleted user: ${id}`);
        }
        break;
      }

      default:
        console.log(`[WEBHOOK] Unhandled event: ${type}`);
    }
  } catch (err) {
    console.error(`[WEBHOOK] Error processing ${type}:`, err);
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
