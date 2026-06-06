'use client';

import { useState, useEffect } from 'react';
import { getAllProducts } from '@/lib/modules/product';
import { getImageUrl } from '@/lib/api.connection';
import { PRODUCT_FILTERS, PRODUCTS as MOCK_PRODUCTS } from '../_constants/productList';
import { toast } from 'sonner';

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
          const apiProducts = response.data.map((product, index) => {
            const imageUrl = getImageUrl(product.mainImage);
            const fallbackImage = MOCK_PRODUCTS[index % MOCK_PRODUCTS.length]?.image;
            
            return {
              id: index + 1,
              name: product.name,
              price: product.price,
              oldPrice: null,
              rating: 4.5,
              reviews: Math.floor(Math.random() * 50),
              image: imageUrl !== '/images/placeholder.svg' ? imageUrl : fallbackImage,
              hoverImage: imageUrl !== '/images/placeholder.svg' ? imageUrl : fallbackImage,
              brand: product.brand?.name?.toLowerCase() || 'nike',
              isNew: false,
              isSale: false,
              category: `.filter-${product.brand?.name?.toLowerCase() || 'nike'}`,
              colors: ['Preto', 'Branco'],
              colorValues: ['#1a1a1a', '#f5f5f5'],
            };
          });
          setProducts(apiProducts);
          setUsingMock(false);
          toast.success('✅ Produtos carregados da API', { duration: 2000 });
        } else {
          setProducts(MOCK_PRODUCTS);
          setUsingMock(true);
          toast.warning('⚠️ Usando dados estáticos (API offline)', { duration: 3000 });
        }
      } catch (error) {
        // Não mostrar erro no console, apenas usar mock silenciosamente
        setProducts(MOCK_PRODUCTS);
        setUsingMock(true);
        // Mostrar apenas um toast sucinto
        toast.warning('⚠️ Modo offline - usando dados locais', { duration: 3000 });
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