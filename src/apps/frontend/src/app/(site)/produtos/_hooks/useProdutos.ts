'use client';

import { useState, useEffect, useCallback } from 'react';
import { getAllProducts } from '@/lib/modules/product';
import { getInventoryByProductId } from '@/lib/modules/inventory';
import { getAllBrands } from '@/lib/modules/brand';
import { getImageUrl } from '@/lib/api.connection';
import { GENDER as STATIC_GENDER, COLORS as STATIC_COLORS, BRANDS as STATIC_BRANDS, PRODUCTS as STATIC_PRODUCTS, ITEMS_PER_PAGE } from '../_constants/produtos';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  label: string | null;
  labelType: string | null;
  image: string;
  images: string[];
  colors: string[];
  colorValues: string[];
  gender: string;
  brand: string;
  brandId: string;
  slug: string;
  stock: number;
}

interface GenderFilter {
  name: string;
  count: number;
}

interface ColorFilter {
  name: string;
  code: string;
}

interface BrandFilter {
  id: string;
  name: string;
  count: number;
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

export function useProdutos() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGender, setSelectedGender] = useState<string[]>([]);
  const [selectedBrandIds, setSelectedBrandIds] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  
  const [products, setProducts] = useState<Product[]>([]);
  const [genders, setGenders] = useState<GenderFilter[]>(STATIC_GENDER);
  const [colors, setColors] = useState<ColorFilter[]>(STATIC_COLORS);
  const [brands, setBrands] = useState<BrandFilter[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingMock, setUsingMock] = useState(false);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Buscar marcas da API
  const fetchBrands = useCallback(async () => {
    try {
      const brandsData = await getAllBrands();
      if (brandsData && brandsData.length > 0) {
        setBrands(brandsData.map(b => ({ id: b.id, name: b.name, count: 0 })));
      } else {
        setBrands(STATIC_BRANDS.map((b, index) => ({ id: String(index + 1), name: b.name, count: b.count })));
      }
    } catch (error) {
      console.error('Erro ao buscar marcas:', error);
      setBrands(STATIC_BRANDS.map((b, index) => ({ id: String(index + 1), name: b.name, count: b.count })));
    }
  }, []);

  // Buscar produtos da API
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      
      const genderParam = selectedGender.length === 1 ? selectedGender[0].toLowerCase() : undefined;
      const brandParam = selectedBrandIds.length === 1 ? selectedBrandIds[0] : undefined;
      
      const response = await getAllProducts({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        brand: brandParam,
        gender: genderParam,
        search: searchTerm || undefined,
      });
      
      if (response.data && response.data.length > 0) {
        const productsWithColors = await Promise.all(
          response.data.map(async (product) => {
            let colorsList: string[] = [];
            let colorValuesList: string[] = [];
            
            try {
              const inventory = await getInventoryByProductId(product.id);
              if (inventory && inventory.length > 0) {
                colorsList = [...new Set(inventory.map((item) => item.color))];
                colorValuesList = colorsList.map((c) => colorMap[c] || '#cccccc');
              }
            } catch (error) {
              console.error(`Erro ao buscar inventory:`, error);
            }
            
            if (colorsList.length === 0) {
              colorsList = ['Preto', 'Branco'];
              colorValuesList = ['#1a1a1a', '#ffffff'];
            }
            
            const imageUrl = getImageUrl(product.mainImage);
            
            let genderDisplay = 'Unisex';
            if (product.gender === 'male') genderDisplay = 'Masculino';
            if (product.gender === 'female') genderDisplay = 'Feminino';
            if (product.gender === 'kids') genderDisplay = 'Infantil';
            
            return {
              id: product.id,
              name: product.name,
              price: Math.floor(product.price),
              originalPrice: null,
              rating: 4.5,
              label: product.featured ? 'Destaque' : null,
              labelType: product.featured ? 'hot' : null,
              image: imageUrl,
              images: product.images || [],
              colors: colorsList,
              colorValues: colorValuesList,
              gender: genderDisplay,
              brand: product.brand?.name || '',
              brandId: product.brandId,
              slug: product.slug,
              stock: product.stock,
            };
          })
        );
        
        setProducts(productsWithColors);
        setTotal(response.total);
        setTotalPages(response.totalPages);
        setUsingMock(false);
        
        const genderCount: Record<string, number> = {};
        productsWithColors.forEach(p => {
          genderCount[p.gender] = (genderCount[p.gender] || 0) + 1;
        });
        setGenders([
          { name: 'Unisex', count: genderCount['Unisex'] || 0 },
          { name: 'Masculino', count: genderCount['Masculino'] || 0 },
          { name: 'Feminino', count: genderCount['Feminino'] || 0 },
          { name: 'Infantil', count: genderCount['Infantil'] || 0 },
        ]);
        
        const brandCount: Record<string, number> = {};
        productsWithColors.forEach(p => {
          if (p.brandId) {
            brandCount[p.brandId] = (brandCount[p.brandId] || 0) + 1;
          }
        });
        setBrands(prev => prev.map(b => ({
          ...b,
          count: brandCount[b.id] || 0
        })));
        
      } else {
        const staticProducts = STATIC_PRODUCTS.map(p => ({
          id: String(p.id),
          name: p.name,
          price: p.price,
          originalPrice: p.originalPrice,
          rating: p.rating,
          label: p.label,
          labelType: p.labelType,
          image: p.image,
          images: [],
          colors: p.colors,
          colorValues: p.colors,
          gender: p.gender,
          brand: p.name.split(' ')[0],
          brandId: String(p.id),
          slug: p.name.toLowerCase().replace(/ /g, '-'),
          stock: 10,
        }));
        
        setProducts(staticProducts);
        setTotal(staticProducts.length);
        setTotalPages(Math.ceil(staticProducts.length / ITEMS_PER_PAGE));
        setUsingMock(true);
      }
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      const staticProducts = STATIC_PRODUCTS.map(p => ({
        id: String(p.id),
        name: p.name,
        price: p.price,
        originalPrice: p.originalPrice,
        rating: p.rating,
        label: p.label,
        labelType: p.labelType,
        image: p.image,
        images: [],
        colors: p.colors,
        colorValues: p.colors,
        gender: p.gender,
        brand: p.name.split(' ')[0],
        brandId: String(p.id),
        slug: p.name.toLowerCase().replace(/ /g, '-'),
        stock: 10,
      }));
      
      setProducts(staticProducts);
      setTotal(staticProducts.length);
      setTotalPages(Math.ceil(staticProducts.length / ITEMS_PER_PAGE));
      setUsingMock(true);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, selectedGender, selectedBrandIds]);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredByPriceAndColor = products.filter(product => {
    const min = minPrice ? parseInt(minPrice) : 0;
    const max = maxPrice ? parseInt(maxPrice) : Infinity;
    if (product.price < min || product.price > max) {
      return false;
    }
    
    if (selectedColors.length > 0) {
      const hasColor = product.colors.some(color => selectedColors.includes(color));
      if (!hasColor) return false;
    }
    
    return true;
  });

  let finalProducts = [...filteredByPriceAndColor];
  if (sortBy === 'price_asc') {
    finalProducts = finalProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price_desc') {
    finalProducts = finalProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    finalProducts = finalProducts.sort((a, b) => b.rating - a.rating);
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-AO') + ' Kz';
  };

  const handleGenderChange = (gender: string) => {
    setSelectedGender(prev => prev.includes(gender) ? prev.filter(g => g !== gender) : [...prev, gender]);
    setCurrentPage(1);
  };

  const handleBrandChange = (brandId: string) => {
    setSelectedBrandIds(prev => prev.includes(brandId) ? prev.filter(b => b !== brandId) : [...prev, brandId]);
    setCurrentPage(1);
  };

  const handleColorChange = (color: string) => {
    setSelectedColors(prev => prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedGender([]);
    setSelectedBrandIds([]);
    setSelectedColors([]);
    setMinPrice('');
    setMaxPrice('');
    setSearchTerm('');
    setCurrentPage(1);
  };

  return {
    viewMode,
    setViewMode,
    currentPage,
    setCurrentPage,
    selectedGender,
    selectedBrandIds,
    selectedColors,
    minPrice,
    maxPrice,
    searchTerm,
    sortBy,
    setSortBy,
    loading,
    usingMock,
    totalProducts: total,
    filteredCount: finalProducts.length,
    products: finalProducts,
    totalPages,
    genders,
    colors: STATIC_COLORS,
    brands,
    formatPrice,
    handleGenderChange,
    handleBrandChange,
    handleColorChange,
    setMinPrice,
    setMaxPrice,
    setSearchTerm,
    clearFilters,
  };
}