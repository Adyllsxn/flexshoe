'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiShoppingBag, FiMinus, FiPlus, FiCheck, FiHome } from 'react-icons/fi';
import { useCart } from '@/lib/contexts/CartContext';
import { OptimizedImage } from '@/components/shared/OptimizedImage';
import { toast } from 'sonner';

interface ProductDetailProps {
  product: {
    id: string;
    name: string;
    price: number;
    description: string | null;
    mainImage: string;
    images: string[];
    sizes: number[];
    colors: { name: string; value: string; stock: number }[];
    stock: number;
    brand: string;
    slug: string;
  };
  usingMock?: boolean;
}

export default function ProductDetail({ product, usingMock = false }: ProductDetailProps) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.mainImage);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleSizeSelect = (size: number) => {
    if (usingMock) {
      toast.error('API offline. Não é possível selecionar tamanho', { duration: 3000 });
      return;
    }
    setSelectedSize(size);
  };

  const handleColorSelect = (color: string) => {
    if (usingMock) {
      toast.error('API offline. Não é possível selecionar cor', { duration: 3000 });
      return;
    }
    setSelectedColor(color);
  };

  const increaseQuantity = () => {
    if (!usingMock && quantity < product.stock) {
      setQuantity(prev => prev + 1);
    } else if (usingMock) {
      toast.error('API offline. Não é possível alterar quantidade', { duration: 3000 });
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (usingMock) {
      toast.error('API offline. Não é possível adicionar ao carrinho', { duration: 3000 });
      return;
    }

    if (!selectedSize) {
      toast.error('Selecione um tamanho');
      return;
    }
    if (!selectedColor) {
      toast.error('Selecione uma cor');
      return;
    }

    const colorObj = product.colors.find(c => c.name === selectedColor);
    const maxStock = colorObj?.stock || 0;
    
    if (quantity > maxStock) {
      toast.error(`Estoque insuficiente para ${selectedColor}. Disponível: ${maxStock}`);
      return;
    }

    addItem({
      id: `${product.id}-${selectedSize}-${selectedColor}`,
      productId: product.id,
      name: product.name,
      size: selectedSize,
      color: selectedColor,
      price: product.price,
      quantity,
    });

    setAddedToCart(true);
    toast.success(`${product.name} adicionado ao carrinho!`);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-AO') + ' Kz';
  };

  const selectedColorStock = product.colors.find(c => c.name === selectedColor)?.stock || 0;

  return (
    <div className="container mx-auto px-4 py-10">
      {usingMock && (
        <div className="mb-4 text-center">
          <span className="inline-block bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full">
            ⚠️ Modo demonstração - API offline. Não é possível interagir com o produto.
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Galeria de Imagens */}
        <div>
          <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-4">
            <OptimizedImage
              src={selectedImage}
              alt={product.name}
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="flex gap-2 overflow-auto">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border-2 transition ${
                  selectedImage === img ? 'border-black' : 'border-transparent'
                }`}
              >
                <OptimizedImage src={img} alt={`${product.name} ${idx + 1}`} fill className="object-contain p-1" />
              </button>
            ))}
          </div>
        </div>

        {/* Informações do Produto */}
        <div>
          <div className="mb-2">
            <Link href="/produtos" className="text-sm text-gray-400 hover:text-black transition flex items-center gap-1">
              <FiHome size={14} />
              Voltar para produtos
            </Link>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">{product.name}</h1>
          <p className="text-gray-500 text-sm mb-4">{product.brand}</p>
          
          <div className="text-2xl font-bold text-black mb-4">
            {formatPrice(product.price)}
          </div>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            {product.description || 'Tênis de alta qualidade com design moderno e confortável para o dia a dia.'}
          </p>

          {/* Cores */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-black">Cores</h3>
              {selectedColor && !usingMock && (
                <span className="text-xs text-gray-400">
                  Estoque: {selectedColorStock} unidades
                </span>
              )}
            </div>
            <div className="flex gap-3">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => handleColorSelect(color.name)}
                  disabled={usingMock}
                  className={`group relative w-10 h-10 rounded-full border-2 transition-all ${
                    selectedColor === color.name
                      ? 'border-black scale-110'
                      : 'border-gray-200 hover:scale-105'
                  } ${usingMock ? 'opacity-50 cursor-not-allowed' : ''}`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                >
                  {selectedColor === color.name && (
                    <FiCheck className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white rounded-full p-0.5" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tamanhos */}
          <div className="mb-6">
            <h3 className="font-bold text-black mb-2">Tamanhos</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeSelect(size)}
                  disabled={usingMock}
                  className={`w-14 h-12 rounded-lg border text-sm font-medium transition ${
                    selectedSize === size
                      ? 'bg-black text-white border-black'
                      : 'border-gray-200 text-gray-600 hover:border-black'
                  } ${usingMock ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantidade */}
          <div className="mb-6">
            <h3 className="font-bold text-black mb-2">Quantidade</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={decreaseQuantity}
                disabled={quantity <= 1 || usingMock}
                className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center hover:border-black transition disabled:opacity-50"
              >
                <FiMinus size={16} />
              </button>
              <span className="w-12 text-center text-lg font-medium">{quantity}</span>
              <button
                onClick={increaseQuantity}
                disabled={usingMock || (selectedColor ? quantity >= selectedColorStock : quantity >= product.stock)}
                className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center hover:border-black transition disabled:opacity-50"
              >
                <FiPlus size={16} />
              </button>
              {!usingMock && (
                <span className="text-sm text-gray-400 ml-2">
                  {selectedColor ? `${selectedColorStock} disponíveis` : `${product.stock} disponíveis`}
                </span>
              )}
            </div>
          </div>

          {/* Botão Comprar */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={addedToCart || usingMock}
              className={`flex-1 py-4 rounded-full font-medium transition flex items-center justify-center gap-2 ${
                addedToCart
                  ? 'bg-green-500 text-white'
                  : 'bg-black text-white hover:bg-gray-800'
              } ${usingMock ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <FiShoppingBag size={18} />
              {addedToCart ? 'Adicionado ao Carrinho!' : usingMock ? 'API offline' : 'Adicionar ao Carrinho'}
            </button>
          </div>

          {/* Informações adicionais */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Produto original com garantia</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Entrega em até 5 dias úteis para Luanda. Consulte prazo para outras províncias.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}