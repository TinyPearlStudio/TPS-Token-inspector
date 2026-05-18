interface EmptyStateProps {
  hasSearch: boolean;
  onClearSearch: () => void;
}

export default function EmptyState({ hasSearch, onClearSearch }: EmptyStateProps) {
  if (hasSearch) {
    return (
      <div className="empty-state">
        <h3>No tokens found</h3>
        <p>We couldn't find any tokens matching your search criteria.</p>
        <button className="btn-primary" onClick={onClearSearch}>Clear Search</button>
      </div>
    );
  }
  return null;
}
