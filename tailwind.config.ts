import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Light "medical / clinical" theme
        background: "#F0F4F8",
        surface: "#FFFFFF",
        accent: "#0D9488",
        warning: "#D97706",
        danger: "#DC2626",
        success: "#16A34A",
        "text-muted": "#64748B",
        "text-primary": "#0F1E2E",

        // Stitch color mapping compatibility
        primary: {
          DEFAULT: "#0D9488",
          container: "#0D9488",
          "on-container": "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#475569",
          container: "#E2E8F0",
          "on-container": "#334155",
        },
        tertiary: {
          DEFAULT: "#64748B",
          container: "#CBD5E1",
          "on-container": "#334155",
        },
        error: {
          DEFAULT: "#DC2626",
          container: "#FEE2E2",
          "on-container": "#991B1B",
        },
        // Resolve `on-*` text tokens used throughout the UI
        "on-primary-container": "#FFFFFF",
        "on-secondary-container": "#334155",
        "surface-container": {
          DEFAULT: "#FFFFFF",
          low: "#F6F9FC",
          lowest: "#EEF3F8",
          high: "#EEF3F8",
          highest: "#E2E8F0",
        },
        "surface-variant": "#EEF2F7",
        outline: {
          DEFAULT: "#E2E8F0",
          variant: "#CBD5E1",
        },
        "on-surface": {
          DEFAULT: "#0F1E2E",
          variant: "#475569",
        },
        "on-background": "#0F1E2E",
      },
      borderRadius: {
        DEFAULT: "6px",
        clinical: "6px",
        sm: "4px",
        md: "6px",
        lg: "8px",
        xl: "12px",
        full: "9999px",
      },
      spacing: {
        unit: "4px",
        gutter: "16px",
        "margin-mobile": "16px",
        "margin-desktop": "32px",
        "container-max": "1440px",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        heading: ["var(--font-heading)", "sans-serif"],
        "label-caps": ["var(--font-sans)", "sans-serif"],
        "body-lg": ["var(--font-sans)", "sans-serif"],
        "kpi-numeric": ["var(--font-heading)", "sans-serif"],
        "mono-data": ["var(--font-sans)", "sans-serif"],
        "display-lg": ["var(--font-heading)", "sans-serif"],
        "body-md": ["var(--font-sans)", "sans-serif"],
        "headline-lg": ["var(--font-heading)", "sans-serif"],
        "body-sm": ["var(--font-sans)", "sans-serif"],
        "headline-md": ["var(--font-heading)", "sans-serif"],
      },
      fontSize: {
        "label-caps": ["12px", { lineHeight: "16px", letterSpacing: "0.06em", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "kpi-numeric": ["36px", { lineHeight: "44px", letterSpacing: "0.02em", fontWeight: "500" }],
        "mono-data": ["14px", { lineHeight: "20px", letterSpacing: "0px", fontWeight: "500" }],
        "display-lg": ["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "headline-lg": ["32px", { lineHeight: "40px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-sm": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "headline-md": ["24px", { lineHeight: "32px", fontWeight: "600" }],
      },
    },
  },
  plugins: [],
};

export default config;
