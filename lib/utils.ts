import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function formatRelativeTime(date: Date | string): string {
  const now = Date.now();
  const then = new Date(date).getTime();
  const diff = Math.floor((now - then) / 1000);

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return formatDate(date);
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text);
  }
  // Fallback
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  return Promise.resolve();
}

export function downloadFile(
  content: string,
  filename: string,
  extension: "txt" | "md" | "json"
) {
  const mimeTypes = {
    txt: "text/plain",
    md: "text/markdown",
    json: "application/json",
  };
  const blob = new Blob([content], { type: mimeTypes[extension] });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.${extension}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function buildMarkdownExport(
  userInput: string,
  outputs: Record<string, string>
): string {
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const sections = Object.entries(outputs)
    .map(([model, prompt]) => {
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
      return `## ${labels[model] || model}\n\n${prompt}`;
    })
    .join("\n\n---\n\n");

  return `# PromptForge AI — Generated Prompts\n\n**Original idea:** ${userInput}\n\n**Generated:** ${date}\n\n---\n\n${sections}`;
}
