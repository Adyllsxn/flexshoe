'use client';

import React from 'react';
import Image from 'next/image';
import { FiHeart, FiRepeat, FiEye, FiStar, FiShoppingBag } from 'react-icons/fi';

interface ProdutosCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice: number | null;
    rating: number;
    label: string | null;
    labelType: string | null;
    image: string;
    colors: string[];
    colorValues: string[];
    gender: string;
  };
  viewMode: 'grid' | 'list';
  formatPrice: (price: number) => string;
}

export default function ProdutosCard({ product, viewMode, formatPrice }: ProdutosCardProps) {
  const getLabelStyle = (labelType: string | null) => {
    switch(labelType) {
      case 'sale': return 'bg-red-500 text-white';
      case 'new': return 'bg-green-500 text-white';
      case 'hot': return 'bg-orange-500 text-white';
      case 'sold': return 'bg-gray-500 text-white';
      default: return 'bg-black text-white';
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FiStar key={i} className="text-yellow-400 text-sm fill-current" />);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<FiStar key={`empty-${i}`} className="text-gray-300 text-sm" />);
    }
    return stars;
  };

  if (viewMode === 'list') {
    return (
      <div className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex">
        <div className="relative w-48 bg-gray-50 aspect-square overflow-hidden">
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
        </div>
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <div className="mb-1">
              <span className="text-xs text-gray-400">{product.gender}</span>
            </div>
            <h3 className="font-bold text-black mb-1">{product.name}</h3>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex gap-0.5">{renderStars(product.rating)}</div>
              <span className="text-xs text-gray-400">{product.rating}</span>
            </div>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-xl font-bold text-black">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
            {/* Cores vindo do inventory */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Cores:</span>
              <div className="flex gap-1.5">
                {product.colorValues?.slice(0, 4).map((color, idx) => (
                  <div
                    key={idx}
                    className="w-5 h-5 rounded-full border border-gray-200 cursor-pointer hover:scale-110 transition-transform duration-200"
                    style={{ backgroundColor: color }}
                    title={product.colors?.[idx]}
                  />
                ))}
                {(product.colors?.length || 0) > 4 && (
                  <span className="text-xs text-gray-400 flex items-center">+{(product.colors?.length || 0) - 4}</span>
                )}
              </div>
            </div>
          </div>
          <button className="w-full mt-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2">
            <FiShoppingBag size={14} />
            Adicionar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
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
      
      <div className="p-4">
        <div className="mb-1">
          <span className="text-xs text-gray-400">{product.gender}</span>
        </div>
        <h3 className="font-bold text-black mb-1 line-clamp-1">{product.name}</h3>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex gap-0.5">{renderStars(product.rating)}</div>
          <span className="text-xs text-gray-400">{product.rating}</span>
        </div>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-xl font-bold text-black">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        {/* Cores vindo do inventory */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-gray-400">Cores:</span>
          <div className="flex gap-1.5">
            {product.colorValues?.slice(0, 4).map((color, idx) => (
              <div
                key={idx}
                className="w-5 h-5 rounded-full border border-gray-200 cursor-pointer hover:scale-110 transition-transform duration-200"
                style={{ backgroundColor: color }}
                title={product.colors?.[idx]}
              />
            ))}
            {(product.colors?.length || 0) > 4 && (
              <span className="text-xs text-gray-400 flex items-center">+{(product.colors?.length || 0) - 4}</span>
            )}
          </div>
        </div>
        <button className="w-full mt-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2">
          <FiShoppingBag size={14} />
          Adicionar
        </button>
      </div>
    </div>
  );
}