'use client';

import React from 'react';
import ProdutosCard from './ProdutosCard';

interface ProdutosGridProps {
  products: any[];
  viewMode: 'grid' | 'list';
  formatPrice: (price: number) => string;
  onClearFilters: () => void;
}

export default function ProdutosGrid({ products, viewMode, formatPrice, onClearFilters }: ProdutosGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Nenhum produto encontrado</p>
        <button 
          onClick={onClearFilters}
          className="mt-4 px-6 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition"
        >
          Limpar Filtros
        </button>
      </div>
    );
  }

  return (
    <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'grid-cols-1 gap-4'}`}>
      {products.map((product) => (
        <ProdutosCard
          key={product.id}
          product={product}
          viewMode={viewMode}
          formatPrice={formatPrice}
        />
      ))}
    </div>
  );
}