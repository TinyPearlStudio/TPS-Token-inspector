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
