import Groq from "groq-sdk";

if (!process.env.GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY environment variable is required");
}

export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const GROQ_MODEL = "llama-3.3-70b-versatile";

export interface PromptOutput {
  chatgpt: string;
  claude: string;
  gemini: string;
  flux: string;
  midjourney: string;
  stableDiffusion: string;
  veo: string;
  kling: string;
}

export interface AnalysisResult {
  objective: string;
  audience: string;
  style: string;
  tone: string;
  constraints: string;
  platform: string;
}

const SYSTEM_PROMPT = `You are PromptForge AI, an expert AI prompt engineer with deep knowledge of how to craft optimal prompts for different AI platforms and models. You understand the nuances of each AI system and what makes prompts work best for each.

Your task is to analyze a user's idea and generate highly optimized, professional-grade prompts for 8 different AI platforms. Each prompt should be tailored specifically to that platform's strengths, syntax, and best practices.

Platform-specific guidelines:
- ChatGPT: Conversational, clear instructions, use system/user roles mentally, specify format and length
- Claude: Structured with XML tags where helpful, explicit about reasoning, nuanced and contextual
- Gemini: Google-style, multimodal considerations, factual grounding, structured queries
- Flux: Image generation, photographic style, lighting details, technical specs, negative prompts
- Midjourney: Use :: separators, aspect ratios (--ar), style parameters (--style), version flags (--v 6), quality settings
- Stable Diffusion: Detailed tags, LoRA considerations, CFG guidance, steps, sampler hints, negative prompts
- Veo (Video): Scene descriptions, motion, camera movements, duration, mood, transitions
- Kling (Video): Dynamic motion, cinematic style, subject movement, camera angles, temporal flow

Always return valid JSON. Make each prompt significantly better than the original input - more detailed, specific, and optimized for the platform.`;

export async function analyzeIntent(userInput: string): Promise<AnalysisResult> {
  const response = await groq.chat.completions.create({
    model: GROQ_MODEL,
    messages: [
      {
        role: "system",
        content: `You are an expert at analyzing creative and technical requests. Extract key details from the user's input. Return ONLY valid JSON, no markdown, no explanation.`,
      },
      {
        role: "user",
        content: `Analyze this request and extract: objective, audience, style, tone, constraints, platform.

User input: "${userInput}"

Return JSON with this exact structure:
{
  "objective": "main goal in one sentence",
  "audience": "target audience",
  "style": "visual/tonal style",
  "tone": "tone of voice",
  "constraints": "any limitations or requirements",
  "platform": "best platform for this type of content"
}`,
      },
    ],
    temperature: 0.3,
    max_tokens: 500,
  });

  const content = response.choices[0]?.message?.content || "{}";
  try {
    return JSON.parse(content.replace(/```json\n?|\n?```/g, "").trim());
  } catch {
    return {
      objective: userInput,
      audience: "general",
      style: "modern",
      tone: "professional",
      constraints: "none",
      platform: "multi-platform",
    };
  }
}

export async function generatePrompts(
  userInput: string,
  analysis: AnalysisResult
): Promise<PromptOutput> {
  const response = await groq.chat.completions.create({
    model: GROQ_MODEL,
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: `Generate optimized prompts for all 8 platforms based on:

Original idea: "${userInput}"

Analysis:
- Objective: ${analysis.objective}
- Audience: ${analysis.audience}
- Style: ${analysis.style}
- Tone: ${analysis.tone}
- Constraints: ${analysis.constraints}
- Platform: ${analysis.platform}

Return ONLY valid JSON with this exact structure (no markdown, no explanation):
{
  "chatgpt": "detailed ChatGPT prompt here",
  "claude": "detailed Claude prompt here",
  "gemini": "detailed Gemini prompt here",
  "flux": "detailed Flux image generation prompt here",
  "midjourney": "detailed Midjourney prompt here",
  "stableDiffusion": "detailed Stable Diffusion prompt here",
  "veo": "detailed Veo video prompt here",
  "kling": "detailed Kling video prompt here"
}

Make each prompt at least 3-5x more detailed and optimized than the original input.`,
      },
    ],
    temperature: 0.7,
    max_tokens: 4000,
  });

  const content = response.choices[0]?.message?.content || "{}";
  try {
    const cleaned = content.replace(/```json\n?|\n?```/g, "").trim();
    return JSON.parse(cleaned);
  } catch {
    const fallback = `Enhanced prompt for: ${userInput}. Please provide more specific details for better results.`;
    return {
      chatgpt: fallback,
      claude: fallback,
      gemini: fallback,
      flux: fallback,
      midjourney: fallback,
      stableDiffusion: fallback,
      veo: fallback,
      kling: fallback,
    };
  }
}

export async function enhancePrompt(
  originalPrompt: string
): Promise<{ enhanced: string; improvements: string[]; score: number }> {
  const response = await groq.chat.completions.create({
    model: GROQ_MODEL,
    messages: [
      {
        role: "system",
        content: `You are an expert prompt engineer. Analyze and enhance prompts to maximize their effectiveness. Return ONLY valid JSON.`,
      },
      {
        role: "user",
        content: `Enhance this prompt and return a JSON object:

Original prompt: "${originalPrompt}"

Return JSON with this structure:
{
  "enhanced": "the improved prompt",
  "improvements": ["improvement 1", "improvement 2", "improvement 3"],
  "score": 85
}

The score should reflect how much better the enhanced prompt is vs the original (0-100).`,
      },
    ],
    temperature: 0.5,
    max_tokens: 1500,
  });

  const content = response.choices[0]?.message?.content || "{}";
  try {
    const cleaned = content.replace(/```json\n?|\n?```/g, "").trim();
    return JSON.parse(cleaned);
  } catch {
    return {
      enhanced: originalPrompt,
      improvements: ["Could not process improvements"],
      score: 0,
    };
  }
}
