'use client';

import { FiSearch } from 'react-icons/fi';

interface ProdutosSidebarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedGender: string[];
  onGenderChange: (gender: string) => void;
  selectedBrandIds: string[];
  onBrandChange: (brandId: string) => void;
  selectedColors: string[];
  onColorChange: (color: string) => void;
  minPrice: string;
  maxPrice: string;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onApplyPrice: () => void;
  onClearFilters: () => void;
  genders: { name: string; count: number }[];
  colors: { name: string; code: string }[];
  brands: { id: string; name: string; count: number }[];
}

export default function ProdutosSidebar({
  searchTerm,
  onSearchChange,
  selectedGender,
  onGenderChange,
  selectedBrandIds,
  onBrandChange,
  selectedColors,
  onColorChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  onApplyPrice,
  onClearFilters,
  genders,
  colors,
  brands,
}: ProdutosSidebarProps) {
  return (
    <aside className="lg:w-1/4">
      <div className="space-y-6">
        
        {/* Busca */}
        <div className="border border-gray-100 rounded-xl p-4">
          <h3 className="font-bold text-black mb-3">Buscar</h3>
          <div className="relative">
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar produtos..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          </div>
        </div>

        {/* Gênero - Vindo da API */}
        <div className="border border-gray-100 rounded-xl p-4">
          <h3 className="font-bold text-black mb-3">Gênero</h3>
          <div className="space-y-2">
            {genders.map((gender) => (
              <label key={gender.name} className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    checked={selectedGender.includes(gender.name)}
                    onChange={() => onGenderChange(gender.name)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-gray-600 text-sm">{gender.name}</span>
                </div>
                <span className="text-gray-400 text-xs">({gender.count})</span>
              </label>
            ))}
          </div>
        </div>

        {/* Preço */}
        <div className="border border-gray-100 rounded-xl p-4">
          <h3 className="font-bold text-black mb-3">Preço (Kz)</h3>
          <div className="space-y-3">
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="text-xs text-gray-400">Mínimo</label>
                <div className="flex items-center border border-gray-200 rounded-lg px-2 py-1">
                  <span className="text-gray-500 text-sm">Kz</span>
                  <input 
                    type="number" 
                    value={minPrice}
                    onChange={(e) => onMinPriceChange(e.target.value)}
                    className="w-full outline-none text-sm" 
                    placeholder="0" 
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-400">Máximo</label>
                <div className="flex items-center border border-gray-200 rounded-lg px-2 py-1">
                  <span className="text-gray-500 text-sm">Kz</span>
                  <input 
                    type="number" 
                    value={maxPrice}
                    onChange={(e) => onMaxPriceChange(e.target.value)}
                    className="w-full outline-none text-sm" 
                    placeholder="500000" 
                  />
                </div>
              </div>
            </div>
            <button 
              onClick={onApplyPrice}
              className="w-full bg-black text-white rounded-lg py-2 text-sm font-medium hover:bg-gray-800 transition"
            >
              Aplicar Filtro
            </button>
          </div>
        </div>

        {/* Cores - Estáticas por enquanto */}
        <div className="border border-gray-100 rounded-xl p-4">
          <h3 className="font-bold text-black mb-3">Cores</h3>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <div 
                key={color.name} 
                className={`group relative cursor-pointer transition ${selectedColors.includes(color.name) ? 'ring-2 ring-black ring-offset-2' : ''}`}
                onClick={() => onColorChange(color.name)}
              >
                <div 
                  className="w-8 h-8 rounded-full border border-gray-200 hover:scale-110 transition"
                  style={{ backgroundColor: color.code }}
                />
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-0.5 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                  {color.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Marcas - Vindo da API */}
        <div className="border border-gray-100 rounded-xl p-4">
          <h3 className="font-bold text-black mb-3">Marcas</h3>
          <div className="space-y-2">
            {brands.map((brand) => (
              <label key={brand.id} className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    checked={selectedBrandIds.includes(brand.id)}
                    onChange={() => onBrandChange(brand.id)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-gray-600 text-sm">{brand.name}</span>
                </div>
                <span className="text-gray-400 text-xs">({brand.count})</span>
              </label>
            ))}
          </div>
        </div>

        {/* Limpar Filtros */}
        <button 
          onClick={onClearFilters}
          className="w-full py-2 border border-gray-200 rounded-lg text-gray-600 text-sm font-medium hover:border-black hover:text-black transition"
        >
          Limpar Filtros
        </button>

      </div>
    </aside>
  );
}