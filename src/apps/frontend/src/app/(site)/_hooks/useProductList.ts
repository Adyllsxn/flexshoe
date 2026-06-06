'use client';

import { useState, useEffect } from 'react';
import { getAllProducts } from '@/lib/modules/product';
import { getInventoryByProductId } from '@/lib/modules/inventory';
import { getImageUrl } from '@/lib/api.connection';
import { PRODUCT_FILTERS, PRODUCTS as MOCK_PRODUCTS } from '../_constants/productList';

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice: number | null;
  rating: number;
  reviews: number;
  image: string;
  hoverImage: string;
  brand: string;
  isNew: boolean;
  isSale: boolean;
  category: string;
  colors: string[];
  colorValues: string[];
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
};

export function useProductList(initialFilter: string = '*') {
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [usingMock, setUsingMock] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        const brandMap: Record<string, string> = {
          '.filter-nike': 'nike',
          '.filter-adidas': 'adidas',
          '.filter-puma': 'puma',
          '.filter-vans': 'vans',
        };
        
        const brand = brandMap[activeFilter];
        const response = await getAllProducts({ brand, limit: 8 });
        
        if (response.data && response.data.length > 0) {
          const apiProducts = await Promise.all(
            response.data.map(async (product, index) => {
              const inventory = await getInventoryByProductId(product.id);
              
              let colors: string[] = ['Preto', 'Branco'];
              let colorValues: string[] = ['#1a1a1a', '#ffffff'];
              
              if (inventory && inventory.length > 0) {
                const uniqueColors = [...new Set(inventory.map((item) => item.color))];
                if (uniqueColors.length > 0) {
                  colors = uniqueColors;
                  colorValues = colors.map((c) => colorMap[c] || '#cccccc');
                }
              }
              
              const imageUrl = getImageUrl(product.mainImage);
              
              return {
                id: index + 1,
                name: product.name,
                price: Math.floor(product.price),
                oldPrice: null,
                rating: 4.5,
                reviews: 24,
                image: imageUrl,
                hoverImage: imageUrl,
                brand: product.brand?.name?.toLowerCase() || 'nike',
                isNew: false,
                isSale: false,
                category: `.filter-${product.brand?.name?.toLowerCase() || 'nike'}`,
                colors: colors,
                colorValues: colorValues,
              };
            })
          );
          
          setProducts(apiProducts);
          setUsingMock(false);
        } else {
          setProducts(MOCK_PRODUCTS);
          setUsingMock(true);
        }
      } catch (error) {
        setProducts(MOCK_PRODUCTS);
        setUsingMock(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeFilter]);

  const filteredProducts = activeFilter === '*'
    ? products
    : products.filter(product => product.category === activeFilter);

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-AO');
  };

  return {
    activeFilter,
    setActiveFilter,
    filteredProducts,
    loading,
    usingMock,
    isMounted,
    formatPrice,
    filters: PRODUCT_FILTERS,
  };
}