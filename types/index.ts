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

export interface GenerateRequest {
  userInput: string;
}

export interface GenerateResponse {
  success: boolean;
  promptId?: string;
  outputs?: PromptOutput;
  analysis?: {
    objective: string;
    audience: string;
    style: string;
    tone: string;
    constraints: string;
    platform: string;
  };
  error?: string;
  remaining?: number;
}

export interface EnhanceRequest {
  originalPrompt: string;
}

export interface EnhanceResponse {
  success: boolean;
  enhanced?: string;
  improvements?: string[];
  score?: number;
  error?: string;
}

export interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  userInput: string;
  isPremium: boolean;
  usageCount: number;
}

export interface PromptHistoryItem {
  id: string;
  userInput: string;
  outputs: PromptOutput;
  modelCount: number;
  createdAt: string;
}

export type ModelTab =
  | "chatgpt"
  | "claude"
  | "gemini"
  | "flux"
  | "midjourney"
  | "stableDiffusion"
  | "veo"
  | "kling";

export interface ModelConfig {
  id: ModelTab;
  label: string;
  description: string;
  color: string;
  icon: string;
  type: "text" | "image" | "video";
}

export const MODEL_CONFIGS: ModelConfig[] = [
  {
    id: "chatgpt",
    label: "ChatGPT",
    description: "OpenAI GPT-4o",
    color: "#10A37F",
    icon: "💬",
    type: "text",
  },
  {
    id: "claude",
    label: "Claude",
    description: "Anthropic Claude",
    color: "#CC785C",
    icon: "🤖",
    type: "text",
  },
  {
    id: "gemini",
    label: "Gemini",
    description: "Google Gemini",
    color: "#4285F4",
    icon: "✨",
    type: "text",
  },
  {
    id: "flux",
    label: "Flux",
    description: "Black Forest Labs",
    color: "#FF6B35",
    icon: "🎨",
    type: "image",
  },
  {
    id: "midjourney",
    label: "Midjourney",
    description: "Midjourney v6",
    color: "#7C3AED",
    icon: "🖼️",
    type: "image",
  },
  {
    id: "stableDiffusion",
    label: "Stable Diffusion",
    description: "SDXL / SD3",
    color: "#F59E0B",
    icon: "🌊",
    type: "image",
  },
  {
    id: "veo",
    label: "Veo",
    description: "Google Veo 2",
    color: "#EF4444",
    icon: "🎬",
    type: "video",
  },
  {
    id: "kling",
    label: "Kling",
    description: "Kling AI Video",
    color: "#8B5CF6",
    icon: "🎥",
    type: "video",
  },
];
