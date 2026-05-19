import { useState } from 'react';
import type { Token } from '../types';

interface ExportDrawerProps {
  token: Token;
  onClose: () => void;
}

export default function ExportDrawer({ token, onClose }: ExportDrawerProps) {
  const [copied, setCopied] = useState(false);
  const code = `const theme = {\n  "${token.id}": "${token.$value}",\n};`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: select the text manually
    }
  };

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
        <div className="export-code-wrapper">
          <pre className="export-code-block">{code}</pre>
          <button className="copy-btn" onClick={handleCopy} aria-label="Copy code">
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <button className="btn-primary" style={{ width: '100%', marginTop: 'auto' }} onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  );
}
