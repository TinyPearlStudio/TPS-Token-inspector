import type { TokenCategory } from '../types';

interface SidebarProps {
  selectedCategory: TokenCategory;
  onSelectCategory: (cat: TokenCategory) => void;
}

const categories: TokenCategory[] = ['Colors', 'Typography', 'Spacing'];

export default function Sidebar({ selectedCategory, onSelectCategory }: SidebarProps) {
  return (
    <div className="sidebar">
      <div className="sidebar-inner">
        <div className="logo">
          <div className="logo-mark">TP</div>
          <span className="logo-text">Tiny Pearl Studio</span>
        </div>
        <ul className="nav-list">
          {categories.map((cat) => (
            <li
              key={cat}
              className={`nav-item${selectedCategory === cat ? ' active' : ''}`}
              onClick={() => onSelectCategory(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
