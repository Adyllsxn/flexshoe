'use client';

import { useState, useEffect } from 'react';
import { getProductById } from '@/lib/modules/product';
import { getInventoryByProductId } from '@/lib/modules/inventory';
import { getImageUrl } from '@/lib/api.connection';

interface ProductDetail {
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
}

const colorMap: Record<string, string> = {
  'Branco': '#ffffff',
  'Preto': '#1a1a1a',
  'Azul': '#2563eb',
  'Vermelho': '#dc2626',
  'Verde': '#16a34a',
  'Amarelo': '#eab308',
  'Rosa': '#ec4899',
  'Marrom': '#78350f',
  'Cinza': '#6b7280',
  'Azul Marinho': '#1e3a8a',
  'Roxo': '#8b5cf6',
  'Laranja': '#f97316',
};

export function useProductDetail(id: string) {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [usingMock, setUsingMock] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productData = await getProductById(id);
        
        if (productData) {
          // Buscar inventory para pegar tamanhos e cores
          const inventory = await getInventoryByProductId(id);
          
          // Extrair tamanhos únicos
          const sizes = [...new Set(inventory.map(item => item.size))].sort((a, b) => a - b);
          
          // Extrair cores com estoque
          const colorMap_inv: Record<string, { name: string; value: string; stock: number }> = {};
          inventory.forEach(item => {
            if (!colorMap_inv[item.color]) {
              colorMap_inv[item.color] = {
                name: item.color,
                value: colorMap[item.color] || '#cccccc',
                stock: 0
              };
            }
            colorMap_inv[item.color].stock += item.stock;
          });
          const colors = Object.values(colorMap_inv);
          
          const mainImageUrl = getImageUrl(productData.mainImage);
          const imagesUrls = productData.images.map(img => getImageUrl(img));
          
          setProduct({
            id: productData.id,
            name: productData.name,
            price: Math.floor(productData.price),
            description: productData.description,
            mainImage: mainImageUrl,
            images: imagesUrls,
            sizes,
            colors,
            stock: productData.stock,
            brand: productData.brand?.name || '',
            slug: productData.slug,
          });
          
          setSelectedImage(mainImageUrl);
          setUsingMock(false);
        } else {
          // Fallback para dados estáticos
          setUsingMock(true);
          setProduct({
            id: '1',
            name: 'Tênis Exemplo',
            price: 89990,
            description: 'Tênis confortável e estiloso para o dia a dia',
            mainImage: '/images/nike_air_max_plus.png',
            images: ['/images/nike_air_max_plus.png'],
            sizes: [39, 40, 41, 42],
            colors: [
              { name: 'Preto', value: '#1a1a1a', stock: 10 },
              { name: 'Branco', value: '#ffffff', stock: 8 },
              { name: 'Azul', value: '#2563eb', stock: 5 }
            ],
            stock: 23,
            brand: 'Nike',
            slug: 'tenis-exemplo',
          });
          setSelectedImage('/images/nike_air_max_plus.png');
        }
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
        setUsingMock(true);
        setProduct({
          id: '1',
          name: 'Tênis Exemplo',
          price: 89990,
          description: 'Tênis confortável e estiloso para o dia a dia',
          mainImage: '/images/nike_air_max_plus.png',
          images: ['/images/nike_air_max_plus.png'],
          sizes: [39, 40, 41, 42],
          colors: [
            { name: 'Preto', value: '#1a1a1a', stock: 10 },
            { name: 'Branco', value: '#ffffff', stock: 8 },
            { name: 'Azul', value: '#2563eb', stock: 5 }
          ],
          stock: 23,
          brand: 'Nike',
          slug: 'tenis-exemplo',
        });
        setSelectedImage('/images/nike_air_max_plus.png');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleSizeSelect = (size: number) => {
    setSelectedSize(size);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-AO') + ' Kz';
  };

  return {
    product,
    loading,
    usingMock,
    selectedSize,
    selectedColor,
    quantity,
    selectedImage,
    setSelectedImage,
    handleSizeSelect,
    handleColorSelect,
    increaseQuantity,
    decreaseQuantity,
    setQuantity,
    formatPrice,
  };
}