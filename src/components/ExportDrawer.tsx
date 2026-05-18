import type { Token } from '../types';

interface ExportDrawerProps {
  token: Token;
  onClose: () => void;
}

export default function ExportDrawer({ token, onClose }: ExportDrawerProps) {
  const code = `const theme = {\n  "${token.id}": "${token.$value}",\n};`;

  return (
    <div className="export-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="export-drawer" onClick={(e) => e.stopPropagation()}>
        <button className="drawer-close" onClick={onClose}>Close</button>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', marginBottom: '24px' }}>
          Code Export
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '32px' }}>
          Copy the raw token value for implementation in your production environment.
        </p>
        <div className="export-code-block">{code}</div>
        <button className="btn-primary" style={{ width: '100%', marginTop: 'auto' }} onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  );
}
