'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiHeart, FiRepeat, FiEye, FiStar, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '@/lib/contexts/CartContext';
import { getInventoryByProductId } from '@/lib/modules/inventory';
import { toast } from 'sonner';

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
    slug: string;
  };
  viewMode: 'grid' | 'list';
  formatPrice: (price: number) => string;
  usingMock?: boolean;
}

export default function ProdutosCard({ product, viewMode, formatPrice, usingMock = false }: ProdutosCardProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [adding, setAdding] = useState(false);

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

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (usingMock) {
      toast.error('API offline. Não é possível adicionar ao carrinho');
      return;
    }

    setAdding(true);
    
    try {
      const inventory = await getInventoryByProductId(product.id);
      if (inventory && inventory.length > 0) {
        const firstItem = inventory[0];
        const success = await addItem(firstItem.id, 1);
        if (success) {
          setAdded(true);
          setTimeout(() => setAdded(false), 2000);
        }
      } else {
        toast.error('Produto indisponível no momento');
      }
    } catch (error) {
      toast.error('Erro ao adicionar ao carrinho');
    } finally {
      setAdding(false);
    }
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    if (usingMock) {
      e.preventDefault();
      e.stopPropagation();
      toast.error('API offline. Não é possível ver detalhes do produto', { duration: 3000 });
      // Volta para a página inicial
      router.push('/');
    }
  };

  // Modo lista
  if (viewMode === 'list') {
    return (
      <div className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex">
        <Link 
          href={usingMock ? '#' : `/produtos/${product.id}`} 
          onClick={handleViewDetails}
          className="relative w-48 bg-gray-50 aspect-square overflow-hidden block flex-shrink-0"
        >
          <Image
            src={product.image}
            alt={product.name}
            width={192}
            height={192}
            className="object-contain p-4 w-full h-full group-hover:scale-110 transition-transform duration-500"
          />
          {product.label && (
            <span className={`absolute top-3 left-3 px-2 py-1 text-xs font-bold rounded ${getLabelStyle(product.labelType)}`}>
              {product.label}
            </span>
          )}
        </Link>
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <div className="mb-1">
              <span className="text-xs text-gray-400">{product.gender}</span>
            </div>
            <Link 
              href={usingMock ? '#' : `/produtos/${product.id}`} 
              onClick={handleViewDetails}
              className="block"
            >
              <h3 className="font-bold text-black mb-1 hover:underline">{product.name}</h3>
            </Link>
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
              </div>
            </div>
          </div>
          <button 
            onClick={handleAddToCart}
            disabled={added || adding}
            className={`w-full mt-4 py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2 ${
              added ? 'bg-green-500 text-white' : 
              adding ? 'bg-gray-400 text-white' :
              'bg-black text-white hover:bg-gray-800'
            }`}
          >
            <FiShoppingBag size={14} />
            {added ? 'Adicionado!' : adding ? 'Adicionando...' : 'Adicionar'}
          </button>
        </div>
      </div>
    );
  }

  // Modo grid
  return (
    <div className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative bg-gray-50 aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="object-contain p-4 w-full h-full group-hover:scale-110 transition-transform duration-500"
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
          <Link 
            href={usingMock ? '#' : `/produtos/${product.id}`} 
            onClick={handleViewDetails}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition"
          >
            <FiEye className="text-black" />
          </Link>
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-1">
          <span className="text-xs text-gray-400">{product.gender}</span>
        </div>
        <Link href={usingMock ? '#' : `/produtos/${product.id}`} onClick={handleViewDetails} className="block">
          <h3 className="font-bold text-black mb-1 line-clamp-1 hover:underline">{product.name}</h3>
        </Link>
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
        
        <button 
          onClick={handleAddToCart}
          disabled={added || adding}
          className={`w-full py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2 ${
            added ? 'bg-green-500 text-white' : 
            adding ? 'bg-gray-400 text-white' :
            'bg-black text-white hover:bg-gray-800'
          }`}
        >
          <FiShoppingBag size={14} />
          {added ? 'Adicionado!' : adding ? 'Adicionando...' : 'Adicionar'}
        </button>
      </div>
    </div>
  );
}