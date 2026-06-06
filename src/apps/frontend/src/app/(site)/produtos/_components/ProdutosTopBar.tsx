'use client';

import { FiGrid, FiList } from 'react-icons/fi';

interface ProdutosTopBarProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  totalProducts: number;
  filteredCount: number;
}

export default function ProdutosTopBar({
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
  totalProducts,
  filteredCount,
}: ProdutosTopBarProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="text-sm text-gray-500">
        Mostrando {filteredCount} de {totalProducts} produtos
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex gap-1 border border-gray-200 rounded-lg p-1">
          <button 
            onClick={() => onViewModeChange('grid')}
            className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-black text-white' : 'text-gray-400 hover:text-black'}`}
          >
            <FiGrid size={18} />
          </button>
          <button 
            onClick={() => onViewModeChange('list')}
            className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-black text-white' : 'text-gray-400 hover:text-black'}`}
          >
            <FiList size={18} />
          </button>
        </div>
        
        <select 
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-black"
        >
          <option value="featured">Destaques</option>
          <option value="price_asc">Menor preço</option>
          <option value="price_desc">Maior preço</option>
          <option value="rating">Melhor avaliação</option>
        </select>
      </div>
    </div>
  );
}