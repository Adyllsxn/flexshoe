'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { 
  FiHome, 
  FiGrid,
  FiList,
  FiSearch,
  FiHeart,
  FiRepeat,
  FiEye,
  FiStar,
  FiShoppingBag
} from 'react-icons/fi';
import { 
  produtosData, 
  GENDER, 
  COLORS, 
  BRANDS, 
  PRODUCTS,
  ITEMS_PER_PAGE
} from './_constants/produtos';

export default function ProdutosPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGender, setSelectedGender] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // Filtrar produtos
  let filteredProducts = PRODUCTS.filter(product => {
    // Busca
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    // Gênero
    if (selectedGender.length > 0 && !selectedGender.includes(product.gender)) {
      return false;
    }
    // Marca
    if (selectedBrands.length > 0 && !selectedBrands.some(brand => product.name.toLowerCase().includes(brand.toLowerCase()))) {
      return false;
    }
    // Preço
    const min = minPrice ? parseInt(minPrice) : 0;
    const max = maxPrice ? parseInt(maxPrice) : Infinity;
    if (product.price < min || product.price > max) {
      return false;
    }
    return true;
  });

  // Ordenar
  if (sortBy === 'price_asc') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price_desc') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
  }

  // Paginação
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-AO') + ' Kz';
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FiStar key={i} className="text-yellow-400 text-sm fill-current" />);
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FiStar key={`empty-${i}`} className="text-gray-300 text-sm" />);
    }
    return stars;
  };

  const getLabelStyle = (labelType: string | null) => {
    switch(labelType) {
      case 'sale': return 'bg-red-500 text-white';
      case 'new': return 'bg-green-500 text-white';
      case 'hot': return 'bg-orange-500 text-white';
      case 'sold': return 'bg-gray-500 text-white';
      default: return 'bg-black text-white';
    }
  };

  const handleGenderChange = (gender: string) => {
    setSelectedGender(prev =>
      prev.includes(gender)
        ? prev.filter(g => g !== gender)
        : [...prev, gender]
    );
    setCurrentPage(1);
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
    setCurrentPage(1);
  };

  const handleColorChange = (colorName: string) => {
    setSelectedColors(prev =>
      prev.includes(colorName)
        ? prev.filter(c => c !== colorName)
        : [...prev, colorName]
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedGender([]);
    setSelectedBrands([]);
    setSelectedColors([]);
    setMinPrice('');
    setMaxPrice('');
    setSearchTerm('');
    setCurrentPage(1);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Page Title */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-black">
              {produtosData.title}
            </h1>
            <nav className="flex items-center gap-2 text-sm">
              <ol className="flex items-center gap-2">
                <li>
                  <Link href="/" className="text-gray-500 hover:text-black transition flex items-center gap-1">
                    <FiHome className="text-xs" />
                    {produtosData.breadcrumb.home}
                  </Link>
                </li>
                <li className="text-gray-400">/</li>
                <li className="text-black font-medium">{produtosData.breadcrumb.current}</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar - Filtros */}
          <aside className="lg:w-1/4">
            <div className="space-y-6">
              
              {/* Busca */}
              <div className="border border-gray-100 rounded-xl p-4">
                <h3 className="font-bold text-black mb-3">Buscar</h3>
                <div className="relative">
                  <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar produtos..." 
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition"
                  />
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                </div>
              </div>

              {/* Gênero */}
              <div className="border border-gray-100 rounded-xl p-4">
                <h3 className="font-bold text-black mb-3">Gênero</h3>
                <div className="space-y-2">
                  {GENDER.map((gender) => (
                    <label key={gender.name} className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          checked={selectedGender.includes(gender.name)}
                          onChange={() => handleGenderChange(gender.name)}
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
                          onChange={(e) => setMinPrice(e.target.value)}
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
                          onChange={(e) => setMaxPrice(e.target.value)}
                          className="w-full outline-none text-sm" 
                          placeholder="500000" 
                        />
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setCurrentPage(1)}
                    className="w-full bg-black text-white rounded-lg py-2 text-sm font-medium hover:bg-gray-800 transition"
                  >
                    Aplicar Filtro
                  </button>
                </div>
              </div>

              {/* Cores */}
              <div className="border border-gray-100 rounded-xl p-4">
                <h3 className="font-bold text-black mb-3">Cores</h3>
                <div className="flex flex-wrap gap-2">
                  {COLORS.map((color) => (
                    <div 
                      key={color.name} 
                      className={`group relative cursor-pointer transition ${selectedColors.includes(color.name) ? 'ring-2 ring-black ring-offset-2' : ''}`}
                      onClick={() => handleColorChange(color.name)}
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

              {/* Marcas */}
              <div className="border border-gray-100 rounded-xl p-4">
                <h3 className="font-bold text-black mb-3">Marcas</h3>
                <div className="space-y-2">
                  {BRANDS.map((brand) => (
                    <label key={brand.name} className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          checked={selectedBrands.includes(brand.name)}
                          onChange={() => handleBrandChange(brand.name)}
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
                onClick={clearFilters}
                className="w-full py-2 border border-gray-200 rounded-lg text-gray-600 text-sm font-medium hover:border-black hover:text-black transition"
              >
                Limpar Filtros
              </button>

            </div>
          </aside>

          {/* Conteúdo Principal */}
          <div className="lg:w-3/4">
            
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="text-sm text-gray-500">
                Mostrando {paginatedProducts.length} de {filteredProducts.length} produtos
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex gap-1 border border-gray-200 rounded-lg p-1">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-black text-white' : 'text-gray-400 hover:text-black'}`}
                  >
                    <FiGrid size={18} />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-black text-white' : 'text-gray-400 hover:text-black'}`}
                  >
                    <FiList size={18} />
                  </button>
                </div>
                
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-black"
                >
                  <option value="featured">Destaques</option>
                  <option value="price_asc">Menor preço</option>
                  <option value="price_desc">Maior preço</option>
                  <option value="rating">Melhor avaliação</option>
                </select>
              </div>
            </div>

            {/* Grid de Produtos */}
            {paginatedProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500">Nenhum produto encontrado</p>
                <button 
                  onClick={clearFilters}
                  className="mt-4 px-6 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition"
                >
                  Limpar Filtros
                </button>
              </div>
            ) : (
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'grid-cols-1 gap-4'}`}>
                {paginatedProducts.map((product) => (
                  <div key={product.id} className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
                    {/* Imagem */}
                    <div className="relative bg-gray-50 aspect-square overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                      />
                      {product.label && (
                        <span className={`absolute top-3 left-3 px-2 py-1 text-xs font-bold rounded ${getLabelStyle(product.labelType)}`}>
                          {product.label}
                        </span>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
                        <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition">
                          <FiHeart className="text-black" />
                        </button>
                        <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition">
                          <FiRepeat className="text-black" />
                        </button>
                        <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition">
                          <FiEye className="text-black" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Informações */}
                    <div className="p-4">
                      <div className="mb-1">
                        <span className="text-xs text-gray-400">{product.gender}</span>
                      </div>
                      <h3 className="font-bold text-black mb-1 line-clamp-1">{product.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex gap-0.5">
                          {renderStars(product.rating)}
                        </div>
                        <span className="text-xs text-gray-400">{product.rating}</span>
                      </div>
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-xl font-bold text-black">{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                        )}
                      </div>
                      <div className="flex gap-1.5">
                        {product.colors.slice(0, 4).map((color, idx) => (
                          <div 
                            key={idx}
                            className="w-6 h-6 rounded-full border border-gray-200 cursor-pointer hover:scale-110 transition"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                        {product.colors.length > 4 && (
                          <span className="text-xs text-gray-400 flex items-center">+{product.colors.length - 4}</span>
                        )}
                      </div>
                      <button className="w-full mt-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2">
                        <FiShoppingBag size={14} />
                        Adicionar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Paginação */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-10">
                <nav className="flex items-center gap-1">
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-gray-400 hover:border-black hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Anterior</span>
                  </button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-2 border rounded-lg transition ${
                          currentPage === pageNum
                            ? 'bg-black text-white border-black'
                            : 'border-gray-200 text-gray-600 hover:border-black hover:text-black'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-gray-400 hover:border-black hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Próximo</span>
                  </button>
                </nav>
              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  );
}