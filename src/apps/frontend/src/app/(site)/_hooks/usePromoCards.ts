'use client';

import { useState, useEffect } from 'react';
import { getAllProducts } from '@/lib/modules/product';
import { getImageUrl } from '@/lib/api.connection';
import { PROMO_MAIN, PROMO_CARDS as MOCK_PROMO_CARDS } from '../_constants/promoCards';
import { toast } from 'sonner';

interface PromoCard {
  title: string;
  products: string;
  price: string;
  originalPrice: string | null;
  stock: number;
  buttonLink: string;
  image: string;
  imageAlt: string;
}

export function usePromoCards() {
  const [promoMain, setPromoMain] = useState(PROMO_MAIN);
  const [promoCards, setPromoCards] = useState<PromoCard[]>(MOCK_PROMO_CARDS);
  const [loading, setLoading] = useState(true);
  const [usingMock, setUsingMock] = useState(false);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const response = await getAllProducts({ limit: 4 });
        
        if (response.data && response.data.length > 0) {
          const apiCards: PromoCard[] = response.data.map((product) => {
            let imageUrl = getImageUrl(product.mainImage);
            
            if ((!imageUrl || imageUrl === '/images/placeholder.svg') && product.images && product.images.length > 0) {
              imageUrl = getImageUrl(product.images[0]);
            }
            
            return {
              title: product.name,
              products: `${product.brand?.name || 'Marca'}`,
              price: Math.floor(product.price).toLocaleString('pt-AO') + ' Kz',
              originalPrice: null,
              stock: Math.floor(Math.random() * 100),
              buttonLink: `/produtos/${product.slug}`,
              image: imageUrl,
              imageAlt: product.name,
            };
          });
          setPromoCards(apiCards);
          setUsingMock(false);
          toast.success('✅ Promoções carregadas da API', { duration: 2000 });
        } else {
          setPromoCards(MOCK_PROMO_CARDS);
          setUsingMock(true);
          toast.warning('⚠️ Usando dados estáticos (API offline)', { duration: 3000 });
        }
      } catch (error) {
        setPromoCards(MOCK_PROMO_CARDS);
        setUsingMock(true);
        toast.warning('⚠️ Modo offline - usando dados locais', { duration: 3000 });
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return { promoMain, promoCards, loading, usingMock };
}