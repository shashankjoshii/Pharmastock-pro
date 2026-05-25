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
        background: "#0D0F14",
        surface: "#13161E",
        accent: "#00C2A8",
        warning: "#F5A623",
        danger: "#E84040",
        success: "#2ECC71",
        "text-muted": "#6B7280",
        "text-primary": "#F0F2F6",
        
        // Stitch color mapping compatibility
        primary: {
          DEFAULT: "#00C2A8",
          container: "#00C2A8",
          "on-container": "#001D19",
        },
        secondary: {
          DEFAULT: "#c4c6d1",
          container: "#444650",
          "on-container": "#b3b4c0",
        },
        tertiary: {
          DEFAULT: "#c7c7ce",
          container: "#abacb3",
          "on-container": "#3f4046",
        },
        error: {
          DEFAULT: "#E84040",
          container: "#93000a",
          "on-container": "#ffdad6",
        },
        "surface-container": {
          DEFAULT: "#13161E",
          low: "#0F1117",
          lowest: "#080A0E",
          high: "#1F2430",
          highest: "#2D3345",
        },
        "surface-variant": "#1F2430",
        outline: {
          DEFAULT: "#232833",
          variant: "#343B4D",
        },
        "on-surface": {
          DEFAULT: "#F0F2F6",
          variant: "#A3AEC4",
        },
        "on-background": "#F0F2F6",
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
