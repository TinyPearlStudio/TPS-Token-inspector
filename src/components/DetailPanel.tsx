import type { Token } from '../types';
import ColorSwatch from './ColorSwatch';

interface DetailPanelProps {
  token: Token | null;
  onExport: () => void;
}

export default function DetailPanel({ token, onExport }: DetailPanelProps) {
  if (!token) {
    return (
      <div className="details-panel">
        <div className="empty-state" style={{ height: '100%', justifyContent: 'center' }}>
          <p style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>
            Select a token to view its architectural details.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="details-panel">
      <div className="details-header">
        <h2 className="details-title">{token.name}</h2>
        <p className="details-desc">{token.description}</p>
        {token.$type === 'typography' && !token.$value.endsWith('px') && (
          <div className="font-sample" style={{ fontFamily: token.$value }}>
            The quick brown fox jumps over the lazy dog.
          </div>
        )}
      </div>

      <div className="meta-section">
        <span className="meta-label">Token ID</span>
        <span className="meta-value">{token.id}</span>
      </div>

      <div className="meta-section">
        <span className="meta-label">Type</span>
        <span className="meta-value" style={{ textTransform: 'capitalize' }}>{token.$type}</span>
      </div>

      <div className="meta-section">
        <span className="meta-label">Current Value</span>
        <span className="meta-value" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {token.$type === 'color' && <ColorSwatch color={token.$value} name={token.name} />}
          {token.$value}
        </span>
      </div>

      <div className="meta-section">
        <span className="meta-label">Category</span>
        <span className="meta-value">{token.category}</span>
      </div>

      <button className="btn-primary" style={{ width: '100%', marginTop: 'auto' }} onClick={onExport}>
        Export Code
      </button>
    </div>
  );
}
