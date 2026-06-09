import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const templates = [
  // Marketing
  {
    title: "Viral Product Launch Campaign",
    description: "Generate a complete viral product launch strategy with hooks, copy, and channel tactics",
    category: "MARKETING" as const,
    userInput: "Create a viral product launch marketing campaign for [product name] targeting [audience]. Include hook ideas, platform strategy, and conversion copy.",
    isPremium: false,
  },
  {
    title: "Email Marketing Sequence",
    description: "Write a 7-email drip campaign that converts subscribers to customers",
    category: "MARKETING" as const,
    userInput: "Write a 7-email marketing automation sequence for [product/service] targeting [audience]. Include subject lines, preview text, and body copy for welcome, education, social proof, objection handling, and closing emails.",
    isPremium: true,
  },
  // Content
  {
    title: "YouTube Script Writer",
    description: "Script a compelling YouTube video with hook, story, and strong CTA",
    category: "CONTENT_CREATION" as const,
    userInput: "Write a YouTube script about [topic] targeting [audience]. Include: attention-grabbing hook (first 30 seconds), story arc, key points with transitions, and strong call-to-action. Aim for 8-12 minutes.",
    isPremium: false,
  },
  {
    title: "Twitter/X Thread Creator",
    description: "Write a viral 10-tweet thread that drives engagement and follows",
    category: "SOCIAL_MEDIA" as const,
    userInput: "Write a viral Twitter/X thread about [topic]. 10 tweets. Start with a bold hook tweet, deliver value in tweets 2-8, include one personal story tweet, end with a strong CTA tweet. Use line breaks for readability.",
    isPremium: false,
  },
  // SEO
  {
    title: "Long-Form SEO Article",
    description: "Write a fully optimized 2000-word blog article that ranks on Google",
    category: "SEO" as const,
    userInput: "Write a 2000-word SEO-optimized blog article targeting the keyword '[keyword]'. Include: meta title, meta description, H1, H2/H3 structure, internal link opportunities, FAQ section, and conclusion with CTA. Tone: [authoritative/conversational/educational].",
    isPremium: false,
  },
  {
    title: "Product Description Writer",
    description: "Write conversion-focused product descriptions with SEO keywords",
    category: "SEO" as const,
    userInput: "Write SEO-optimized product descriptions for [product name]. Target keyword: [keyword]. Include: headline, short description (50 words), long description (200 words), bullet points of features/benefits, and meta description (155 chars).",
    isPremium: false,
  },
  // Coding
  {
    title: "React Component Builder",
    description: "Generate a complete, typed React component with hooks and styling",
    category: "CODING" as const,
    userInput: "Build a React TypeScript component for [description]. Requirements: functional component with hooks, TypeScript interfaces, Tailwind CSS styling, accessibility attributes (aria-*), error states, loading states, and JSDoc comments. Follow Next.js 14 App Router conventions.",
    isPremium: false,
  },
  {
    title: "API Architecture Designer",
    description: "Design a RESTful API with routes, schemas, and error handling",
    category: "CODING" as const,
    userInput: "Design a production-ready REST API for [application]. Include: route structure, HTTP methods, request/response schemas (TypeScript), authentication approach, error codes, rate limiting strategy, and example curl commands.",
    isPremium: true,
  },
  // Business
  {
    title: "Startup Pitch Deck Narrative",
    description: "Write a compelling investor pitch deck story for fundraising",
    category: "STARTUP" as const,
    userInput: "Write a compelling investor pitch deck for [startup name], a [description] for [target market]. Cover: problem (with data), solution, market size (TAM/SAM/SOM), business model, traction, team, ask. Tone: confident, data-driven.",
    isPremium: true,
  },
  {
    title: "Business Plan Writer",
    description: "Generate a comprehensive business plan with financials framework",
    category: "BUSINESS" as const,
    userInput: "Write a business plan for [business idea] targeting [market]. Include: executive summary, market analysis, competitive landscape, go-to-market strategy, operations plan, financial projections (Year 1-3 revenue model), and funding requirements.",
    isPremium: true,
  },
  // Design
  {
    title: "Brand Identity System",
    description: "Design a complete visual brand identity with guidelines",
    category: "DESIGN" as const,
    userInput: "Design a brand identity system for a [type of company] targeting [audience]. Include: logo concept directions (3 options), color palette with hex codes and psychology, typography pairing with rationale, brand voice guidelines, and do/don't usage examples.",
    isPremium: false,
  },
  {
    title: "UI/UX App Design Brief",
    description: "Generate a complete design brief for a mobile or web app",
    category: "DESIGN" as const,
    userInput: "Create a UI/UX design brief for [app name], a [platform: iOS/Android/web] app for [audience]. Include: design principles, component library selections, user flow (onboarding + core feature), accessibility requirements, and success metrics.",
    isPremium: false,
  },
  // AI Art
  {
    title: "Luxury Brand Photography",
    description: "Generate stunning product/lifestyle photography prompts",
    category: "AI_ART" as const,
    userInput: "Create AI image generation prompts for luxury brand photography showcasing [product/service]. Style: editorial, aspirational, [aesthetic: minimalist/opulent/natural]. Include lighting setup, composition, mood, and post-processing aesthetic.",
    isPremium: false,
  },
  {
    title: "Character Portrait Series",
    description: "Create detailed character art prompts for consistent portrait series",
    category: "AI_ART" as const,
    userInput: "Generate AI portrait prompts for a [genre: fantasy/sci-fi/realistic/anime] character who is [brief description]. Create 4 variations: standard portrait, action pose, close-up emotion, environment establishing shot. Maintain consistency in appearance.",
    isPremium: false,
  },
  // Video
  {
    title: "Cinematic Brand Commercial",
    description: "Create video prompts for 30-second cinematic brand ads",
    category: "VIDEO_CREATION" as const,
    userInput: "Create a 30-second cinematic brand commercial video prompt for [brand/product] targeting [audience]. Include: scene breakdown (5-6 shots), camera movements, lighting style, color grade, music mood, voiceover script, and end card CTA.",
    isPremium: true,
  },
  {
    title: "Social Media Video Series",
    description: "Generate short-form video concepts for Instagram/TikTok",
    category: "VIDEO_CREATION" as const,
    userInput: "Create 5 short-form video concepts (15-30 seconds) for [brand/creator] on [platform: Instagram Reels/TikTok]. Each concept: hook (1-2 sec), content arc, trending audio suggestion, text overlay copy, and engagement hook at end.",
    isPremium: false,
  },
];

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing templates
  await prisma.template.deleteMany();

  // Insert templates
  const created = await Promise.all(
    templates.map((template) =>
      prisma.template.create({
        data: {
          ...template,
          usageCount: Math.floor(Math.random() * 3000) + 200,
        },
      })
    )
  );

  console.log(`✅ Created ${created.length} templates`);
  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
