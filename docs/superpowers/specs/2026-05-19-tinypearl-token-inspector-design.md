# Tiny Pearl Studio — Design Token Inspector

- **Version:** v1
- **Date:** 2026-05-19
- **Status:** Draft
- **Project Root:** `E:\Titan\AI\Opencode Projects\tinypearl-token-inspector\`

---

## Overview

A luxury design-token inspector for Tiny Pearl Studio, built for design-to-code handoff. Provides a restrained, editorial-grade interface for browsing color, typography, and spacing tokens with live previews, metadata, diff tracking, and code export.

---

## Brand Identity

| Token | Value |
|---|---|
| **Main Color** | `#CA8D82` |
| **Main Color** | `#4E443C` |
| **Secondary Color** | `#EBC2B7` |
| **Background Fill** | `#FCF7F3` |
| **Display Font** | Playfair Display (700) |
| **Heading Font** | Cormorant Garamond (400, 500, 600) |
| **Mono Font** | JetBrains Mono (400, 500) |
| **Aesthetic** | Luxury, premium, clean minimalist, editorial |

**Design Principles:**
- Heavy letter-spacing for uppercase labels in Cormorant Garamond
- Thin borders (1px) in soft colors
- Max border-radius 12px (sharp, architectural)
- No bright "SaaS Blue" or generic "Inter" for decorative elements
- High use of whitespace
- Subtle transitions, backdrop blurs for overlays, high-contrast focus states

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Vite + React 18 |
| Language | TypeScript |
| Styling | Vanilla CSS (single `global.css` with custom properties) |
| Data | Static TypeScript module (`src/tokens.ts`) in Style Dictionary-like format |
| Routing | None (single page) |
| External assets | Google Fonts only (3 typefaces via `<link>`) |

---

## File Structure

```
tinypearl-token-inspector/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── tokens.ts
│   ├── types.ts
│   ├── components/
│   │   ├── Sidebar.tsx
│   │   ├── TokenTable.tsx
│   │   ├── TokenRow.tsx
│   │   ├── ColorSwatch.tsx
│   │   ├── TypePreview.tsx
│   │   ├── SpacingViz.tsx
│   │   ├── DiffBadge.tsx
│   │   ├── DetailPanel.tsx
│   │   ├── ExportDrawer.tsx
│   │   └── EmptyState.tsx
│   └── styles/
│       └── global.css
```

---

## Token Data Schema

```ts
interface Token {
  id: string;
  name: string;
  $value: string;
  $type: 'color' | 'typography' | 'spacing';
  category: string;
  description: string;
  changed: boolean;
}

type TokenCategory = 'Colors' | 'Typography' | 'Spacing';
type TokenStore = Record<TokenCategory, Token[]>;
```

---

## Layout

### Three-Column Grid

| Column | Width | Content |
|---|---|---|
| Sidebar | 220px fixed | Logo + category nav |
| Main Content | 1fr | Header, search, token table |
| Detail Panel | 320px fixed | Token metadata, export button |

### Responsive Breakpoints

| Viewport | Sidebar | Table | Detail Panel |
|---|---|---|---|
| >1024px | Fixed 220px | `1fr` | Fixed 320px |
| 768–1024px | Collapsed 60px (icons) | `1fr` | Slide-in overlay |
| <768px | Hidden (toggle) | `1fr` | Full-screen overlay |

---

## Component Details

### Sidebar
- Logo: "TP" monogram in square border + "Tiny Pearl Studio" wordmark
- Nav: uppercase Cormorant Garamond 11px, 0.15em spacing, accent left border on active

### TokenTable
- Search: bottom-border input, Cormorant Garamond 14px, focus → accent border
- Table: Token | Preview | Value | Status columns
- Row hover: `rgba(202,141,130,0.03)`, selected: `rgba(202,141,130,0.07)`

### Visual Previews
- **ColorSwatch:** 24x24px square, 2px radius
- **TypePreview:** "Aa" in token font
- **SpacingViz:** Horizontal accent bar at token width
- **DiffBadge:** "Updated" pill, accent-soft bg

### DetailPanel
- Token name: Playfair Display 28px
- Description: Cormorant Garamond 15px
- Metadata: uppercase 11px labels + mono 14px code blocks
- Export button: accent bg, full-width, sticks to bottom

### ExportDrawer
- Backdrop blur overlay, 400px slide-in from right
- Dark code block with JS object export
- Close top-right, Done button bottom

### EmptyState
- No results: "No tokens found" + description + "Clear Search" button
- No selection: "Select a token to view its architectural details."

---

## Accessibility

- All interactive elements are `<button>` or `<input>` (no div-click without roles)
- Color swatches have `aria-label` with hex value
- Token table uses proper `<table>` semantics
- Export drawer has `role="dialog"` and `aria-modal="true"`
- Contrast: text (#4E443C) on bg (#FCF7F3) = ~10:1

---

## Edge Cases

| Case | Behavior |
|---|---|
| Empty search | Show "No tokens found" + Clear Search |
| No selection | Placeholder text in detail panel |
| No changed tokens | No diff badges shown |
| Narrow viewport | Sidebar hidden, detail as overlay |
