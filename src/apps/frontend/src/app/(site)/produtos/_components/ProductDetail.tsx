'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiShoppingBag, FiMinus, FiPlus, FiCheck, FiHome } from 'react-icons/fi';
import { useCart } from '@/lib/contexts/CartContext';
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
    colors: { name: string; value: string; stock: number; inventoryId?: string }[];
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
  const [selectedInventoryId, setSelectedInventoryId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.mainImage);
  const [addedToCart, setAddedToCart] = useState(false);
  const [adding, setAdding] = useState(false);

  const handleSizeSelect = (size: number) => {
    if (usingMock) {
      toast.error('API offline. Não é possível selecionar tamanho');
      return;
    }
    setSelectedSize(size);
  };

  const handleColorSelect = (colorName: string, inventoryId?: string) => {
    if (usingMock) {
      toast.error('API offline. Não é possível selecionar cor');
      return;
    }
    setSelectedColor(colorName);
    setSelectedInventoryId(inventoryId || null);
  };

  const increaseQuantity = () => {
    if (!usingMock && quantity < (selectedColor ? product.colors.find(c => c.name === selectedColor)?.stock || 0 : product.stock)) {
      setQuantity(prev => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = async () => {
    if (usingMock) {
      toast.error('API offline. Não é possível adicionar ao carrinho');
      return;
    }

    if (!selectedSize) {
      toast.error('Selecione um tamanho');
      return;
    }
    if (!selectedColor || !selectedInventoryId) {
      toast.error('Selecione uma cor');
      return;
    }

    const colorObj = product.colors.find(c => c.name === selectedColor);
    const maxStock = colorObj?.stock || 0;
    
    if (quantity > maxStock) {
      toast.error(`Estoque insuficiente para ${selectedColor}. Disponível: ${maxStock}`);
      return;
    }

    setAdding(true);

    try {
      const success = await addItem(selectedInventoryId, quantity);
      if (success) {
        setAddedToCart(true);
        toast.success(`${product.name} adicionado ao carrinho!`);
        setTimeout(() => setAddedToCart(false), 3000);
      }
    } catch (error) {
      toast.error('Erro ao adicionar ao carrinho');
    } finally {
      setAdding(false);
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-AO') + ' Kz';
  };

  const selectedColorStock = product.colors.find(c => c.name === selectedColor)?.stock || 0;

  if (usingMock) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-4">🔌</div>
          <h2 className="text-2xl font-bold text-black mb-2">API Offline</h2>
          <p className="text-gray-500 mb-6">Não é possível carregar detalhes do produto no momento.</p>
          <Link href="/produtos" className="inline-flex px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition">
            Voltar para produtos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Galeria de Imagens */}
        <div>
          <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-4">
            <Image
              src={selectedImage}
              alt={product.name}
              width={600}
              height={600}
              className="object-contain p-4 w-full h-full"
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
                <Image src={img} alt={`${product.name} ${idx + 1}`} width={80} height={80} className="object-contain p-1 w-full h-full" />
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
              {selectedColor && (
                <span className="text-xs text-gray-400">
                  Estoque: {selectedColorStock} unidades
                </span>
              )}
            </div>
            <div className="flex gap-3">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => handleColorSelect(color.name, color.inventoryId)}
                  className={`group relative w-10 h-10 rounded-full border-2 transition-all ${
                    selectedColor === color.name
                      ? 'border-black scale-110'
                      : 'border-gray-200 hover:scale-105'
                  }`}
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
                  className={`w-14 h-12 rounded-lg border text-sm font-medium transition ${
                    selectedSize === size
                      ? 'bg-black text-white border-black'
                      : 'border-gray-200 text-gray-600 hover:border-black'
                  }`}
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
                disabled={quantity <= 1}
                className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center hover:border-black transition disabled:opacity-50"
              >
                <FiMinus size={16} />
              </button>
              <span className="w-12 text-center text-lg font-medium">{quantity}</span>
              <button
                onClick={increaseQuantity}
                disabled={selectedColor ? quantity >= selectedColorStock : quantity >= product.stock}
                className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center hover:border-black transition disabled:opacity-50"
              >
                <FiPlus size={16} />
              </button>
              <span className="text-sm text-gray-400 ml-2">
                {selectedColor ? `${selectedColorStock} disponíveis` : `${product.stock} disponíveis`}
              </span>
            </div>
          </div>

          {/* Botão Comprar */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={addedToCart || adding}
              className={`flex-1 py-4 rounded-full font-medium transition flex items-center justify-center gap-2 ${
                addedToCart
                  ? 'bg-green-500 text-white'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              <FiShoppingBag size={18} />
              {addedToCart ? 'Adicionado ao Carrinho!' : adding ? 'Adicionando...' : 'Adicionar ao Carrinho'}
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