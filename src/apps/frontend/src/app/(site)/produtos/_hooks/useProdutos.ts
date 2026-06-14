'use client';

import { useState, useEffect, useMemo } from 'react';
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
  
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [genders, setGenders] = useState<GenderFilter[]>([]);
  const [brands, setBrands] = useState<BrandFilter[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingMock, setUsingMock] = useState(false);

  // Buscar marcas
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brandsData = await getAllBrands();
        if (brandsData && brandsData.length > 0) {
          setBrands(brandsData.map(b => ({ id: b.id, name: b.name, count: 0 })));
        }
      } catch (error) {
        console.error('Erro ao buscar marcas:', error);
      }
    };
    fetchBrands();
  }, []);

  // Buscar produtos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getAllProducts({ page: 1, limit: 100 });
        
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
              } catch (error) {}
              
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
          
          setAllProducts(productsWithColors);
          setUsingMock(false);
          
          // Atualizar contagem de gêneros baseado nos produtos reais
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
          
          // Atualizar contagem de marcas
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
          // Fallback estático
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
          setAllProducts(staticProducts);
          setGenders(STATIC_GENDER);
          setBrands(STATIC_BRANDS.map((b, index) => ({ id: String(index + 1), name: b.name, count: b.count })));
          setUsingMock(true);
        }
      } catch (error) {
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
        setAllProducts(staticProducts);
        setGenders(STATIC_GENDER);
        setBrands(STATIC_BRANDS.map((b, index) => ({ id: String(index + 1), name: b.name, count: b.count })));
        setUsingMock(true);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  // Aplicar TODOS os filtros
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Busca
    if (searchTerm) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Gênero
    if (selectedGender.length > 0) {
      result = result.filter(product => selectedGender.includes(product.gender));
    }

    // Marcas
    if (selectedBrandIds.length > 0) {
      result = result.filter(product => selectedBrandIds.includes(product.brandId));
    }

    // Cores
    if (selectedColors.length > 0) {
      result = result.filter(product =>
        product.colors.some(color => selectedColors.includes(color))
      );
    }

    // Preço
    const min = minPrice ? parseInt(minPrice) : 0;
    const max = maxPrice ? parseInt(maxPrice) : Infinity;
    result = result.filter(product => product.price >= min && product.price <= max);

    // Ordenação
    if (sortBy === 'price_asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [allProducts, searchTerm, selectedGender, selectedBrandIds, selectedColors, minPrice, maxPrice, sortBy]);

  // Paginação
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Resetar página quando filtros mudarem
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedGender, selectedBrandIds, selectedColors, minPrice, maxPrice, sortBy]);

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-AO') + ' Kz';
  };

  const handleGenderChange = (gender: string) => {
    setSelectedGender(prev => prev.includes(gender) ? prev.filter(g => g !== gender) : [...prev, gender]);
  };

  const handleBrandChange = (brandId: string) => {
    setSelectedBrandIds(prev => prev.includes(brandId) ? prev.filter(b => b !== brandId) : [...prev, brandId]);
  };

  const handleColorChange = (color: string) => {
    setSelectedColors(prev => prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]);
  };

  const clearFilters = () => {
    setSelectedGender([]);
    setSelectedBrandIds([]);
    setSelectedColors([]);
    setMinPrice('');
    setMaxPrice('');
    setSearchTerm('');
    setSortBy('featured');
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
    totalProducts,
    filteredCount: paginatedProducts.length,
    products: paginatedProducts,
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