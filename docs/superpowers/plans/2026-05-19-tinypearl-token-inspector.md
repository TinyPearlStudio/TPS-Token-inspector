# Tiny Pearl Token Inspector Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a luxury design-token inspector with category sidebar, searchable token table, visual previews, detail panel, and code export drawer.

**Architecture:** Single-page React 18 app using Vite + TypeScript. Three-column CSS Grid layout (sidebar | table | detail panel). Token data lives in a static TypeScript module. No routing, no external assets beyond Google Fonts.

**Tech Stack:** Vite 5, React 18, TypeScript, vanilla CSS with custom properties, Google Fonts (Playfair Display, Cormorant Garamond, JetBrains Mono).

**Project root:** `E:\Titan\AI\Opencode Projects\tinypearl-token-inspector`

---

## File Structure

```
tinypearl-token-inspector/
├── index.html                        # Entry HTML — Google Fonts link + mount div
├── package.json                      # Vite + React + TypeScript deps
├── tsconfig.json                     # TypeScript config
├── vite.config.ts                    # Vite config (React plugin)
├── src/
│   ├── main.tsx                      # ReactDOM.createRoot entry
│   ├── App.tsx                       # State holder + three-column layout
│   ├── tokens.ts                     # Token data (Style Dictionary format)
│   ├── types.ts                      # Token, TokenCategory, TokenStore
│   ├── components/
│   │   ├── Sidebar.tsx               # Logo + category navigation
│   │   ├── TokenTable.tsx            # Search bar + table of TokenRows
│   │   ├── TokenRow.tsx              # Single table row — name + preview + value + status
│   │   ├── ColorSwatch.tsx           # 24x24 color square
│   │   ├── TypePreview.tsx           # "Aa" in the token font
│   │   ├── SpacingViz.tsx            # Horizontal bar at token width
│   │   ├── DiffBadge.tsx             # "Updated" pill
│   │   ├── DetailPanel.tsx           # Right panel — token metadata + export button
│   │   ├── ExportDrawer.tsx          # Slide-in overlay with code block
│   │   └── EmptyState.tsx            # No results / no selection
│   └── styles/
│       └── global.css                # CSS custom properties, reset, layout, all styles
```

---

### Task 1: Scaffold Vite + React + TypeScript Project

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `vite.config.ts`
- Create: `index.html`
- Create: `src/main.tsx`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "tinypearl-token-inspector",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.4",
    "typescript": "^5.6.3",
    "vite": "^5.4.11"
  }
}
```

- [ ] **Step 2: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"]
}
```

- [ ] **Step 3: Create `vite.config.ts`**

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

- [ ] **Step 4: Create `index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tiny Pearl Studio — Token Inspector</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Cormorant+Garamond:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

- [ ] **Step 5: Create `src/main.tsx`**

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- [ ] **Step 6: Install dependencies and verify**

Run: `npm install`
Run: `npx tsc --noEmit`
Expected: exit code 0, no errors

---

### Task 2: Define Types and Token Data

**Files:**
- Create: `src/types.ts`
- Create: `src/tokens.ts`

- [ ] **Step 1: Create `src/types.ts`**

```ts
export interface Token {
  id: string;
  name: string;
  $value: string;
  $type: 'color' | 'typography' | 'spacing';
  category: string;
  description: string;
  changed: boolean;
}

export type TokenCategory = 'Colors' | 'Typography' | 'Spacing';

export type TokenStore = Record<TokenCategory, Token[]>;
```

- [ ] **Step 2: Create `src/tokens.ts`**

```ts
import type { TokenStore } from './types';

const tokens: TokenStore = {
  Colors: [
    { id: 'color-bg',         name: 'Background',     $value: '#FCF7F3', $type: 'color', category: 'Base',       description: 'Primary luxury canvas',                    changed: false },
    { id: 'color-surface',    name: 'Surface',        $value: '#FFFFFF', $type: 'color', category: 'Base',       description: 'Clean elevate surface',                    changed: false },
    { id: 'color-text',       name: 'Text Main',      $value: '#4E443C', $type: 'color', category: 'Typography', description: 'High contrast editorial text',               changed: true  },
    { id: 'color-text-muted', name: 'Text Muted',     $value: '#8C837C', $type: 'color', category: 'Typography', description: 'Secondary subtle information',                 changed: false },
    { id: 'color-accent',     name: 'Accent',         $value: '#CA8D82', $type: 'color', category: 'Brand',      description: 'Primary brand identifier',                  changed: true  },
    { id: 'color-accent-soft',name: 'Accent Soft',    $value: '#EBC2B7', $type: 'color', category: 'Brand',      description: 'Tertiary soft accent',                      changed: false },
    { id: 'color-border',     name: 'Border',         $value: '#E5D9D4', $type: 'color', category: 'Base',       description: 'Subtle structural separation',              changed: false },
  ],
  Typography: [
    { id: 'font-display',   name: 'Display',      $value: 'Playfair Display',     $type: 'typography', category: 'Brand',     description: 'High-impact luxury headings',         changed: false },
    { id: 'font-heading',   name: 'Heading',      $value: 'Cormorant Garamond',  $type: 'typography', category: 'Brand',     description: 'Editorial narrative headers',         changed: false },
    { id: 'font-mono',      name: 'Mono',         $value: 'JetBrains Mono',       $type: 'typography', category: 'Technical', description: 'Technical precision for values',      changed: false },
    { id: 'font-size-xs',   name: 'Text XS',      $value: '11px',                  $type: 'typography', category: 'Scale',     description: 'Utility labels',                      changed: false },
    { id: 'font-size-sm',   name: 'Text SM',      $value: '13px',                  $type: 'typography', category: 'Scale',     description: 'Standard body copy',                  changed: true  },
    { id: 'font-size-md',   name: 'Text MD',      $value: '16px',                  $type: 'typography', category: 'Scale',     description: 'Featured text',                       changed: false },
  ],
  Spacing: [
    { id: 'space-xs', name: 'Spacing XS', $value: '4px',  $type: 'spacing', category: 'Scale', description: 'Tight structural gap',        changed: false },
    { id: 'space-sm', name: 'Spacing SM', $value: '8px',  $type: 'spacing', category: 'Scale', description: 'Standard small gap',        changed: false },
    { id: 'space-md', name: 'Spacing MD', $value: '16px', $type: 'spacing', category: 'Scale', description: 'Primary layout gap',        changed: true  },
    { id: 'space-lg', name: 'Spacing LG', $value: '32px', $type: 'spacing', category: 'Scale', description: 'Sectional breathing room',   changed: false },
    { id: 'space-xl', name: 'Spacing XL', $value: '64px', $type: 'spacing', category: 'Scale', description: 'Major architectural void',   changed: false },
  ],
};

export default tokens;
```

- [ ] **Step 3: Verify TypeScript**

Run: `npx tsc --noEmit`
Expected: clean exit

---

### Task 3: Create Global CSS

**Files:**
- Create: `src/styles/global.css`

Full file containing:
- CSS reset
- `:root` custom properties for all brand colors, fonts, spacing, radii
- Body styles
- `.app-container` grid layout
- `.sidebar`, `.nav-item` styles
- `.main-content`, `.search-input` styles
- `.token-table`, `.token-row`, `.token-cell`, `.token-name`, `.token-value`
- `.swatch`, `.type-preview`, `.spacing-viz`, `.diff-badge`
- `.details-panel`, `.details-header`, `.details-title`, `.details-desc`, `.meta-section`, `.meta-label`, `.meta-value`
- `.export-overlay`, `.export-drawer`, `.drawer-close`, `.export-code-block`
- `.empty-state`, `.btn-primary`, `.btn-primary:disabled`
- `.logo`, `.logo-mark`, `.logo-text`
- Media queries for 1024px and 768px

---

### Task 4: Build App Shell

**Files:**
- Create: `src/App.tsx`

See complete code in the plan above. Manages four pieces of state: selectedCategory, selectedToken, searchQuery, isExportOpen. Renders three-column layout.

---

### Task 5: Build Sidebar Component

**Files:**
- Create: `src/components/Sidebar.tsx`

Props: selectedCategory, onSelectCategory. Renders logo + category nav list.

---

### Task 6: Build Preview Components

**Files:**
- Create: `src/components/ColorSwatch.tsx`
- Create: `src/components/TypePreview.tsx`
- Create: `src/components/SpacingViz.tsx`
- Create: `src/components/DiffBadge.tsx`

Each is a small presentational component. See plan above for exact code.

---

### Task 7: Build TokenRow and TokenTable

**Files:**
- Create: `src/components/TokenRow.tsx`
- Create: `src/components/TokenTable.tsx`
- Create: `src/components/EmptyState.tsx`

See plan above for exact code.

---

### Task 8: Build DetailPanel and ExportDrawer

**Files:**
- Create: `src/components/DetailPanel.tsx`
- Create: `src/components/ExportDrawer.tsx`

See plan above for exact code.

---

### Task 9: Write Design Spec & Plan Docs

Write `docs\superpowers\specs\2026-05-19-tinypearl-token-inspector-design.md` and `docs\superpowers\plans\2026-05-19-tinypearl-token-inspector.md` to disk.

---

### Task 10: Final Build Verification

- Full TypeScript check (`npx tsc --noEmit`)
- Production build (`npx vite build`)
- Visual review checklist
