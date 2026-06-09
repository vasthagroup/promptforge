# ⚡ PromptForge AI

> Production-ready AI SaaS that transforms simple ideas into expert, platform-optimized prompts for 8 AI models simultaneously.

![Next.js](https://img.shields.io/badge/Next.js-15-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8) ![Groq](https://img.shields.io/badge/Groq-Llama_3.3_70B-orange)

---

## 🚀 Quick Start (5 minutes)

### 1. Clone & install
```bash
git clone <your-repo>
cd promptforge
npm install
```

### 2. Set up environment
```bash
cp .env.example .env.local
# Fill in all values (see below)
```

### 3. Set up database
```bash
npm run db:push      # Push schema to DB
npm run db:seed      # Seed template library
```

### 4. Run dev server
```bash
npm run dev
# → http://localhost:3000
```

---

## 🔑 Environment Variables

| Variable | Source | Required |
|----------|--------|----------|
| `DATABASE_URL` | [Neon](https://neon.tech) or [Supabase](https://supabase.com) | ✅ |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | [Clerk dashboard](https://clerk.com) | ✅ |
| `CLERK_SECRET_KEY` | Clerk dashboard | ✅ |
| `CLERK_WEBHOOK_SECRET` | Clerk → Webhooks | ✅ |
| `GROQ_API_KEY` | [console.groq.com](https://console.groq.com) | ✅ |
| `NEXT_PUBLIC_APP_URL` | Your domain | ✅ |

---

## 📁 Project Structure

```
promptforge/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/[[...sign-in]]/page.tsx
│   │   └── sign-up/[[...sign-up]]/page.tsx
│   ├── api/
│   │   ├── generate/route.ts          ← Core prompt generation
│   │   ├── enhance/route.ts           ← Prompt enhancement (Pro)
│   │   ├── history/route.ts           ← History CRUD
│   │   ├── templates/route.ts         ← Template library
│   │   ├── prompts/saved/route.ts     ← Saved prompts
│   │   ├── export/route.ts            ← Export TXT/MD/JSON
│   │   ├── user/route.ts              ← User info & usage
│   │   └── webhooks/clerk/route.ts    ← Clerk user sync
│   ├── dashboard/
│   │   ├── layout.tsx                 ← Sidebar navigation
│   │   ├── page.tsx                   ← Dashboard home
│   │   ├── loading.tsx                ← Skeleton loaders
│   │   ├── generate/page.tsx          ← Main generator UI ★
│   │   ├── enhance/page.tsx           ← Prompt enhancer (Pro)
│   │   ├── templates/page.tsx         ← Template browser
│   │   ├── saved/page.tsx             ← Saved prompts
│   │   ├── history/page.tsx           ← Prompt history
│   │   └── settings/page.tsx          ← Account settings
│   ├── pricing/page.tsx               ← Pricing page
│   ├── layout.tsx                     ← Root (Clerk + fonts)
│   ├── page.tsx                       ← Landing page
│   ├── not-found.tsx
│   ├── global-error.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── ui/
│   │   ├── button.tsx                 ← Reusable button (CVA variants)
│   │   └── skeleton.tsx               ← Loading skeletons
│   └── dashboard/
│       └── prompt-card.tsx            ← Prompt output card
├── hooks/
│   ├── use-generate.ts                ← Prompt generation hook
│   ├── use-copy.ts                    ← Clipboard with feedback
│   └── use-keyboard-shortcuts.ts      ← ⌘G, ⌘T, ⌘H shortcuts
├── lib/
│   ├── groq.ts                        ← Groq AI service + prompt chain
│   ├── prisma.ts                      ← Prisma singleton
│   ├── rate-limit.ts                  ← Rate limiting logic
│   └── utils.ts                       ← cn, formatDate, downloadFile
├── types/
│   └── index.ts                       ← Types + MODEL_CONFIGS
├── prisma/
│   ├── schema.prisma                  ← DB schema
│   └── seed.ts                        ← 16 starter templates
└── middleware.ts                      ← Clerk auth protection
```

---

## 🤖 Groq Prompt Engineering Chain

```
User Input: "Create a luxury coffee logo"
     ↓
Step 1 — analyzeIntent()
  Extracts: objective, audience, style, tone, constraints, platform

Step 2 — generatePrompts()
  Uses analysis context to generate 8 platform-specific prompts
  Each prompt is optimized for its target AI's syntax & strengths

Step 3 — Save to DB + Return
  Saves to Prompt + PromptHistory tables
  Returns structured JSON to client
```

**Platform-specific optimizations:**
- **ChatGPT** — Role prompting, explicit format instructions, step-by-step guidance
- **Claude** — XML tags, explicit reasoning requests, nuanced context
- **Gemini** — Factual grounding, structured queries, multimodal considerations
- **Flux** — Photographic style, lighting specs, technical parameters
- **Midjourney** — `::` separators, `--ar`, `--style`, `--v 6`, `--q 2` flags
- **Stable Diffusion** — Tag-based, CFG hints, negative prompts, sampler guidance
- **Veo** — Scene descriptions, camera movements, duration, color grade
- **Kling** — Dynamic motion, temporal flow, cinematic camera angles

---

## 🗄️ Database Schema

```prisma
User          id, clerkId, email, name, plan, promptsToday, lastResetDate
Prompt        id, userId, title, userInput, outputs(JSON), isSaved, tags
PromptHistory id, userId, userInput, outputs(JSON), modelCount, createdAt
Template      id, title, description, category, userInput, isPremium, usageCount
Subscription  id, userId, stripeCustomerId, plan, status, currentPeriodEnd
```

---

## 🚢 Deployment (Vercel)

### Option A — Vercel CLI
```bash
vercel --prod
```

### Option B — GitHub integration
1. Push to GitHub
2. Import repo at [vercel.com/new](https://vercel.com/new)
3. Add all env vars in Vercel project settings
4. Deploy

### Post-deploy setup
```bash
# Run migrations on production DB
DATABASE_URL="your-prod-url" npx prisma migrate deploy
DATABASE_URL="your-prod-url" npx prisma db seed
```

### Clerk Webhook Setup
1. Vercel dashboard → note your production URL
2. Clerk dashboard → Webhooks → Add endpoint
3. URL: `https://your-domain.com/api/webhooks/clerk`
4. Events: `user.created`, `user.updated`, `user.deleted`
5. Copy signing secret → add as `CLERK_WEBHOOK_SECRET`

---

## 📈 Rate Limiting

| Plan | Daily Limit | Enhancer | Templates |
|------|-------------|----------|-----------|
| Free | 20/day | ❌ | Basic |
| Pro | Unlimited | ✅ | All 200+ |
| Enterprise | Unlimited | ✅ | Custom |

Rate limit resets at midnight (UTC). Tracked server-side in PostgreSQL.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `⌘ + Enter` | Generate prompts (in textarea) |
| `⌘ + G` | Navigate to Generate |
| `⌘ + T` | Navigate to Templates |
| `⌘ + H` | Navigate to History |
| `⌘ + S` | Navigate to Saved |

---

## 🔧 Adding Stripe Payments

1. Create a Pro product + monthly price in [Stripe dashboard](https://stripe.com)
2. Add env vars: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_PRO_PRICE_ID`
3. Create `/app/api/stripe/checkout/route.ts` — creates a Stripe checkout session
4. Create `/app/api/stripe/webhook/route.ts` — handles `customer.subscription.created/updated/deleted`
5. On subscription created → update `user.plan = "PRO"` and create `Subscription` record

---

## 📄 License

MIT — Build whatever you want with this.
