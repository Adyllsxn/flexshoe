'use client';

import { useState } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';

interface MarcasFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (status: string) => void;
}

export default function MarcasFilters({ searchTerm, onSearchChange, statusFilter, onStatusChange }: MarcasFiltersProps) {
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const getFilterLabel = () => {
    switch(statusFilter) {
      case 'active': return 'Ativos';
      case 'inactive': return 'Inativos';
      default: return 'Todos';
    }
  };

  return (
    <div className="flex gap-4">
      <div className="flex-1 relative">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        <input
          type="text"
          placeholder="Buscar marcas..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        />
      </div>
      <div className="relative">
        <button
          onClick={() => setShowFilterDropdown(!showFilterDropdown)}
          className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center gap-2"
        >
          <FiFilter size={16} />
          <span>{getFilterLabel()}</span>
        </button>
        {showFilterDropdown && (
          <div className="absolute right-0 top-full mt-2 w-36 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
            <button
              onClick={() => { onStatusChange('all'); setShowFilterDropdown(false); }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition rounded-t-lg ${statusFilter === 'all' ? 'text-black dark:text-white font-medium' : 'text-gray-600 dark:text-gray-400'}`}
            >
              Todos
            </button>
            <button
              onClick={() => { onStatusChange('active'); setShowFilterDropdown(false); }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition ${statusFilter === 'active' ? 'text-black dark:text-white font-medium' : 'text-gray-600 dark:text-gray-400'}`}
            >
              <span className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                Ativos
              </span>
            </button>
            <button
              onClick={() => { onStatusChange('inactive'); setShowFilterDropdown(false); }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition rounded-b-lg ${statusFilter === 'inactive' ? 'text-black dark:text-white font-medium' : 'text-gray-600 dark:text-gray-400'}`}
            >
              <span className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                Inativos
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}