'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getProductById } from '@/lib/modules/product';
import { getInventoryByProductId } from '@/lib/modules/inventory';
import { getImageUrl } from '@/lib/api.connection';
import ProductDetail from '../_components/ProductDetail';
import { toast } from 'sonner';

export default function ProdutoDetalhePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [usingMock, setUsingMock] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        
        // Tentar buscar da API
        const productData = await getProductById(id);
        
        if (productData) {
          // Buscar inventory
          const inventory = await getInventoryByProductId(id);
          
          const sizes = [...new Set(inventory.map(item => item.size))].sort((a, b) => a - b);
          
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
          };
          
          const colorMapInv: Record<string, any> = {};
          inventory.forEach(item => {
            if (!colorMapInv[item.color]) {
              colorMapInv[item.color] = {
                name: item.color,
                value: colorMap[item.color] || '#cccccc',
                stock: 0
              };
            }
            colorMapInv[item.color].stock += item.stock;
          });
          const colors = Object.values(colorMapInv);
          
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
          setUsingMock(false);
        } else {
          // Fallback: produto não encontrado
          toast.error('Produto não encontrado');
          router.push('/produtos');
        }
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
        // Se API offline, redireciona com mensagem
        toast.error('API offline. Não é possível carregar detalhes do produto');
        router.push('/produtos');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-20">
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return null;
  }

  return <ProductDetail product={product} usingMock={usingMock} />;
}