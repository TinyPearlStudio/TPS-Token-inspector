import type { Token } from '../types';
import TokenRow from './TokenRow';
import EmptyState from './EmptyState';

interface TokenTableProps {
  tokens: Token[];
  selectedToken: Token | null;
  searchQuery: string;
  onSearch: (q: string) => void;
  onSelectToken: (t: Token) => void;
  onClearSearch: () => void;
}

export default function TokenTable({
  tokens, selectedToken, searchQuery,
  onSearch, onSelectToken, onClearSearch,
}: TokenTableProps) {
  return (
    <div className="main-content">
      <div className="header">
        <div>
          <h1 className="page-title">Tokens</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '15px', marginTop: '8px' }}>
            Design system primitives and architectural constants.
          </p>
        </div>
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search tokens..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            aria-label="Search tokens"
          />
        </div>
      </div>

      {tokens.length > 0 ? (
        <table className="token-table">
          <thead>
            <tr>
              <th>Token</th>
              <th>Preview</th>
              <th>Value</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((token) => (
              <TokenRow
                key={token.id}
                token={token}
                isSelected={selectedToken?.id === token.id}
                onSelect={onSelectToken}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <EmptyState hasSearch={!!searchQuery} onClearSearch={onClearSearch} />
      )}
    </div>
  );
}
