'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCT_FILTERS, PRODUCTS } from '../_constants/productList';

export default function ProductList() {
  const [activeFilter, setActiveFilter] = useState('*');

  const filteredProducts = activeFilter === '*' 
    ? PRODUCTS 
    : PRODUCTS.filter(product => product.category === activeFilter);

  return (
    <section className="product-list py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {PRODUCT_FILTERS.map((filter) => (
            <button
              key={filter.filter}
              onClick={() => setActiveFilter(filter.filter)}
              className={`group relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden ${
                activeFilter === filter.filter
                  ? 'text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {activeFilter === filter.filter && (
                <span className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-700 rounded-full animate-fade-in"></span>
              )}
              <span className="relative z-10">{filter.label}</span>
            </button>
          ))}
        </div>

        {/* Grid de produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {filteredProducts.map((product, idx) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm transition-all duration-500"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Imagem */}
              <div className="relative bg-gradient-to-br from-gray-100 to-gray-50 aspect-square overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {product.isSale && product.oldPrice && (
                    <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                      -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                    </span>
                  )}
                  {product.isNew && (
                    <span className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                      Novo
                    </span>
                  )}
                </div>
                
                {/* Ícones flutuantes no hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
                  <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-all duration-300 hover:bg-gray-100 hover:scale-110">
                    <i className="bi bi-eye text-gray-800 text-xl"></i>
                  </button>
                  <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-all duration-300 delay-75 hover:bg-gray-100 hover:scale-110">
                    <i className="bi bi-bag text-gray-800 text-xl"></i>
                  </button>
                </div>
              </div>
              
              {/* Informações */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-gray-900 line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-0.5">
                    <i className="bi bi-star-fill text-yellow-400 text-xs"></i>
                    <span className="text-xs font-medium text-gray-600 ml-1">{product.rating}</span>
                  </div>
                </div>
                
                {/* Cores disponíveis */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-gray-400">Cores:</span>
                  <div className="flex gap-1.5">
                    {product.colorValues.map((color, i) => (
                      <div
                        key={i}
                        className="w-5 h-5 rounded-full border border-gray-200 cursor-pointer hover:scale-110 transition-transform duration-200"
                        style={{ backgroundColor: color }}
                        title={product.colors[i]}
                      ></div>
                    ))}
                  </div>
                </div>
                
                {/* Preço */}
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-gray-900">
                    {product.price.toLocaleString()} Kz
                  </span>
                  {product.oldPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {product.oldPrice.toLocaleString()} Kz
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botão Ver Mais */}
        <div className="text-center mt-14">
          <Link
            href="/produtos"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300 hover:gap-3 group shadow-lg hover:shadow-xl"
          >
            <span>Ver Todos os Produtos</span>
            <i className="bi bi-arrow-right text-sm transition-transform group-hover:translate-x-1"></i>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
}