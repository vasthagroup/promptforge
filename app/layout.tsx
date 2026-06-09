import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "PromptForge AI — Turn Ideas Into Expert AI Prompts",
    template: "%s | PromptForge AI",
  },
  description:
    "Generate optimized prompts for ChatGPT, Claude, Gemini, Midjourney, Flux, Veo, Kling and more. Transform simple ideas into professionally engineered AI prompts.",
  keywords: [
    "AI prompts",
    "prompt engineering",
    "ChatGPT prompts",
    "Midjourney prompts",
    "AI tools",
    "prompt generator",
  ],
  authors: [{ name: "PromptForge AI" }],
  creator: "PromptForge AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://promptforge.ai",
    title: "PromptForge AI — Turn Ideas Into Expert AI Prompts",
    description:
      "Generate optimized prompts for ChatGPT, Claude, Gemini, Midjourney, Flux, Veo, Kling and more.",
    siteName: "PromptForge AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PromptForge AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PromptForge AI",
    description: "Turn simple ideas into expert AI prompts",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=JetBrains+Mono:wght@400;500&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className="antialiased">
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#18181B",
                color: "#FAFAFA",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                fontFamily: "DM Sans, sans-serif",
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
