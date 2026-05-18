import { useState, useMemo } from 'react';
import tokens from './tokens';
import type { Token, TokenCategory } from './types';
import Sidebar from './components/Sidebar';
import TokenTable from './components/TokenTable';
import DetailPanel from './components/DetailPanel';
import ExportDrawer from './components/ExportDrawer';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<TokenCategory>('Colors');
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isExportOpen, setIsExportOpen] = useState(false);

  const filteredTokens = useMemo(() => {
    const list = tokens[selectedCategory];
    if (!searchQuery) return list;
    const q = searchQuery.toLowerCase();
    return list.filter(
      (t) => t.name.toLowerCase().includes(q) || t.$value.toLowerCase().includes(q)
    );
  }, [selectedCategory, searchQuery]);

  const handleSelectCategory = (cat: TokenCategory) => {
    setSelectedCategory(cat);
    setSelectedToken(null);
    setSearchQuery('');
  };

  return (
    <div className="app-container">
      <Sidebar
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />
      <TokenTable
        tokens={filteredTokens}
        selectedToken={selectedToken}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        onSelectToken={setSelectedToken}
        onClearSearch={() => setSearchQuery('')}
      />
      <DetailPanel
        token={selectedToken}
        onExport={() => setIsExportOpen(true)}
      />
      {isExportOpen && selectedToken && (
        <ExportDrawer
          token={selectedToken}
          onClose={() => setIsExportOpen(false)}
        />
      )}
    </div>
  );
}
