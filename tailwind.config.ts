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
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        "label-caps": ["var(--font-sans)", "sans-serif"],
        "body-lg": ["var(--font-sans)", "sans-serif"],
        "kpi-numeric": ["var(--font-heading)", "sans-serif"],
        "mono-data": ["var(--font-mono)", "ui-monospace", "monospace"],
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
      boxShadow: {
        clinical: "0 1px 2px rgba(15, 30, 46, 0.04), 0 1px 3px rgba(15, 30, 46, 0.06)",
        "clinical-md": "0 4px 12px rgba(15, 30, 46, 0.06), 0 2px 4px rgba(15, 30, 46, 0.04)",
        "clinical-lg": "0 10px 30px rgba(15, 30, 46, 0.08), 0 4px 8px rgba(15, 30, 46, 0.04)",
        "accent-glow": "0 6px 20px rgba(13, 148, 136, 0.25)",
        "accent-ring": "0 0 0 3px rgba(13, 148, 136, 0.12)",
      },
      backgroundImage: {
        "accent-gradient": "linear-gradient(135deg, #0D9488 0%, #0F766E 100%)",
        "accent-soft": "linear-gradient(135deg, rgba(13,148,136,0.10) 0%, rgba(14,165,233,0.08) 100%)",
        "surface-sheen": "linear-gradient(180deg, #FFFFFF 0%, #FBFDFE 100%)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.96)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out both",
        "fade-in-up": "fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
        "scale-in": "scale-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) both",
        "pulse-soft": "pulse-soft 2.5s ease-in-out infinite",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
