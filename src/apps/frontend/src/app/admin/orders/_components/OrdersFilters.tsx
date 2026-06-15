'use client';

import { FiSearch, FiFilter, FiX } from 'react-icons/fi';
import { STATUS_OPTIONS } from '../_constants/orders';

interface OrdersFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

export default function OrdersFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  showFilters,
  onToggleFilters,
}: OrdersFiltersProps) {
  const getStatusLabel = (value: string) => {
    const option = STATUS_OPTIONS.find(opt => opt.value === value);
    return option?.label || 'Todos';
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Buscar por número do pedido, cliente ou telefone..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          />
        </div>
        <button
          onClick={onToggleFilters}
          className={`px-4 py-2 border rounded-lg transition-all flex items-center gap-2 ${
            showFilters 
              ? 'bg-black text-white border-black dark:bg-white dark:text-black' 
              : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          <FiFilter size={16} />
          <span className="hidden sm:inline">Filtros</span>
          {statusFilter !== 'all' && (
            <span className="w-5 h-5 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs flex items-center justify-center">
              1
            </span>
          )}
        </button>
      </div>

      {/* Filtros expandidos */}
      {showFilters && (
        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-gray-500">Status:</span>
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onStatusChange(option.value)}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-all ${
                    statusFilter === option.value
                      ? 'bg-black text-white dark:bg-white dark:text-black'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {statusFilter !== 'all' && (
              <button
                onClick={() => onStatusChange('all')}
                className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1"
              >
                <FiX size={12} />
                Limpar
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}