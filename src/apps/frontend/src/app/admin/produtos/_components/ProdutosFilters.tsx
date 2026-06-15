'use client';

import { useState } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { getAllBrands, type Brand } from '@/lib/modules/brand';
import { useEffect } from 'react';

interface ProdutosFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  genderFilter: string;
  onGenderChange: (value: string) => void;
  brandFilter: string;
  onBrandChange: (value: string) => void;
}

export default function ProdutosFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  genderFilter,
  onGenderChange,
  brandFilter,
  onBrandChange,
}: ProdutosFiltersProps) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchBrands = async () => {
      const data = await getAllBrands();
      setBrands(data);
    };
    fetchBrands();
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center gap-2"
        >
          <FiFilter size={16} />
          Filtros
        </button>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          >
            <option value="all">Todos os Status</option>
            <option value="active">Ativos</option>
            <option value="inactive">Inativos</option>
            <option value="deleted">Deletados</option>
          </select>
          <select
            value={genderFilter}
            onChange={(e) => onGenderChange(e.target.value)}
            className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          >
            <option value="all">Todos os Gêneros</option>
            <option value="male">Masculino</option>
            <option value="female">Feminino</option>
            <option value="unisex">Unisex</option>
            <option value="kids">Infantil</option>
          </select>
          <select
            value={brandFilter}
            onChange={(e) => onBrandChange(e.target.value)}
            className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          >
            <option value="all">Todas as Marcas</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>{brand.name}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}