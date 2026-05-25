---
name: PharmaStock Pro
colors:
  surface: '#0e1513'
  surface-dim: '#0e1513'
  surface-bright: '#333b38'
  surface-container-lowest: '#09100e'
  surface-container-low: '#161d1b'
  surface-container: '#1a211f'
  surface-container-high: '#242b29'
  surface-container-highest: '#2f3634'
  on-surface: '#dde4e1'
  on-surface-variant: '#bbcac4'
  inverse-surface: '#dde4e1'
  inverse-on-surface: '#2b3230'
  outline: '#85948f'
  outline-variant: '#3c4a46'
  surface-tint: '#41ddc2'
  primary: '#42dec3'
  on-primary: '#00382f'
  primary-container: '#00c2a8'
  on-primary-container: '#00493e'
  inverse-primary: '#006b5c'
  secondary: '#c4c6d1'
  on-secondary: '#2d3039'
  secondary-container: '#444650'
  on-secondary-container: '#b3b4c0'
  tertiary: '#c7c7ce'
  on-tertiary: '#2e3036'
  tertiary-container: '#abacb3'
  on-tertiary-container: '#3f4046'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#65fade'
  primary-fixed-dim: '#41ddc2'
  on-primary-fixed: '#00201b'
  on-primary-fixed-variant: '#005045'
  secondary-fixed: '#e0e2ed'
  secondary-fixed-dim: '#c4c6d1'
  on-secondary-fixed: '#181b24'
  on-secondary-fixed-variant: '#444650'
  tertiary-fixed: '#e2e2e9'
  tertiary-fixed-dim: '#c6c6cd'
  on-tertiary-fixed: '#1a1b21'
  on-tertiary-fixed-variant: '#45474d'
  background: '#0e1513'
  on-background: '#dde4e1'
  surface-variant: '#2f3634'
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  kpi-numeric:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '500'
    lineHeight: 44px
    letterSpacing: 0.02em
  body-lg:
    fontFamily: IBM Plex Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: IBM Plex Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: IBM Plex Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: IBM Plex Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.06em
  mono-data:
    fontFamily: IBM Plex Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
  container-max: 1440px
---

## Brand & Style

The design system is engineered for high-stakes pharmaceutical logistics, where precision and rapid data processing are paramount. It adopts a **Dark Industrial-Clinical** aesthetic—a hybrid of high-tech laboratory interfaces and robust industrial management tools.

The brand personality is authoritative, sterile, and hyper-efficient. It prioritizes information density without sacrificing legibility, utilizing a sophisticated dark palette to reduce eye strain during long shifts in warehouse or office environments. The visual language avoids decorative flourishes, favoring structural integrity, technical accents, and a disciplined "utilitarian-premium" feel that inspires confidence in inventory accuracy.

## Colors

This color palette is optimized for high-contrast scanning within a deep-space environment. 

- **Primary Accent (#00C2A8):** Used exclusively for primary actions, active states, and critical success indicators. Its teal-green hue evokes both medical sterility and modern technology.
- **Surface Hierarchy:** The background uses `#0D0F14` to provide a bottomless depth, while surfaces and cards use `#13161E`. Borders should use a subtle 5-10% lighter tint of the surface color to define boundaries without adding visual noise.
- **Functional Semantic Colors:** Warning (Amber), Danger (Red), and Safe (Green) are reserved for stock levels, expiration alerts, and system status. These must maintain high saturation to pop against the dark background.

## Typography

The typography strategy balances technical character with utilitarian readability.

- **Space Grotesk** is used for headings and KPI dashboards. Its geometric quirks and "tech" apertures reinforce the industrial-clinical theme. It should be used for large data points and section titles.
- **IBM Plex Sans** handles all functional data, body text, and UI labels. As a typeface designed for enterprise clarity, it ensures that long lists of chemical names and SKU numbers remain legible at small sizes.
- **Numeric Data:** For inventory counts and batch numbers, ensure `tnum` (tabular figures) is enabled to allow for easy vertical scanning of columns.

## Layout & Spacing

The layout follows a **Rigid Grid System** based on a 4px base unit to ensure clinical precision. 

- **Desktop:** A 12-column fluid grid with 16px gutters. Dashboards should utilize a "bento-box" style layout where modules are clearly demarcated by subtle borders.
- **Density:** The design system prioritizes a "Comfortable-Compact" density. Padding within cards should be a consistent 24px, while list items should use 12px vertical padding to maximize data visibility.
- **Grid Texture:** Subtle 1px dotted or solid grid lines may be used in the background of large data visualizations to reinforce the "technical blueprint" feel.

## Elevation & Depth

This system avoids traditional soft shadows, opting instead for **Tonal Layering** and **Subtle Outlines**.

- **Surface Tiers:** Background is the lowest level. Cards and Modals sit on top, distinguished by a slightly lighter fill (`#13161E`) and a 1px border (`#232833`).
- **Active Elevation:** When a card or element is hovered or active, do not use a shadow. Instead, change the border color to the Primary Accent or a muted version of it.
- **Glass Effects:** Use sparingly for global navigation overlays or dropdowns, with a high-strength blur (20px+) and low opacity (approx. 60%) to maintain the clinical, clean feel.

## Shapes

The shape language is **Strict and Functional**. 

Roundedness is kept to a minimum (4px - 6px) to maintain a serious, industrial tone. Elements like buttons, input fields, and cards should feel like "components" in a machine. Avoid full-pill shapes (except for status badges) to ensure the UI feels architectural rather than consumer-soft.

## Components

- **Buttons:** Rectangular with a 4px radius. Primary buttons use the teal-green background with black text for maximum contrast. Ghost buttons use a 1px border and the teal-green for text.
- **Data Tables:** The core of the system. Use a "Zebra" stripe pattern with a very subtle difference in background hex (e.g., `#0D0F14` and `#13161E`). Header rows should be pinned and use `label-caps` styling.
- **Inventory Chips:** Small, rectangular tags with semi-transparent backgrounds of the semantic colors (e.g., 15% opacity Red for "Out of Stock").
- **Input Fields:** Dark fills (`#0D0F14`) with a 1px border. The focus state must clearly highlight the border in the Primary Accent color.
- **KPI Cards:** Large `kpi-numeric` figures with a small Sparkline graph in the background to show stock trends.
- **Status Indicators:** Use a "Glow" effect for status dots (e.g., a green dot with a small 4px blur of the same color) to simulate hardware LEDs.