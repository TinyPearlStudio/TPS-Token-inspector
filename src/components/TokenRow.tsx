import type { Token } from '../types';
import ColorSwatch from './ColorSwatch';
import TypePreview from './TypePreview';
import SpacingViz from './SpacingViz';
import DiffBadge from './DiffBadge';

interface TokenRowProps {
  token: Token;
  isSelected: boolean;
  onSelect: (token: Token) => void;
}

export default function TokenRow({ token, isSelected, onSelect }: TokenRowProps) {
  const renderPreview = () => {
    switch (token.$type) {
      case 'color':
        return <ColorSwatch color={token.$value} name={token.name} />;
      case 'typography':
        return <TypePreview fontFamily={token.$value} />;
      case 'spacing':
        return <SpacingViz width={token.$value} />;
    }
  };

  return (
    <tr
      className={`token-row${isSelected ? ' selected' : ''}`}
      onClick={() => onSelect(token)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(token); }}
    >
      <td className="token-cell"><span className="token-name">{token.name}</span></td>
      <td className="token-cell">{renderPreview()}</td>
      <td className="token-cell"><span className="token-value">{token.$value}</span></td>
      <td className="token-cell">{token.changed && <DiffBadge />}</td>
    </tr>
  );
}
