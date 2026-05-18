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
