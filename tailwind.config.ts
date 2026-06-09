import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Syne", "sans-serif"],
        sans: ["DM Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        background: "#09090B",
        primary: {
          DEFAULT: "#7C3AED",
          hover: "#6D28D9",
          foreground: "#FAFAFA",
        },
        secondary: {
          DEFAULT: "#8B5CF6",
          foreground: "#FAFAFA",
        },
        muted: {
          DEFAULT: "#A1A1AA",
          foreground: "#71717A",
        },
        border: "rgba(255,255,255,0.08)",
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
        "3xl": "24px",
      },
      animation: {
        "gradient-rotate": "gradient-rotate 4s ease infinite",
        shimmer: "shimmer 1.5s infinite",
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
