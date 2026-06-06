import { getProductById } from '@/lib/modules/product';
import { getImageUrl } from '@/lib/api.connection';
import ProductDetail from '../_components/ProductDetail';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    slug: string;
  };
}

// Função para buscar produto pelo slug (como não tem endpoint por slug, usamos ID)
// Por enquanto, como o slug é o ID, vamos usar assim
export default async function ProdutoDetalhePage({ params }: PageProps) {
  const { slug } = await params;
  
  // Como a rota usa ID, o slug é o ID do produto
  const product = await getProductById(slug);

  if (!product) {
    notFound();
  }

  // Buscar inventory para pegar tamanhos e cores
  const { getInventoryByProductId } = await import('@/lib/modules/inventory');
  const inventory = await getInventoryByProductId(slug);
  
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
    'Azul Marinho': '#1e3a8a',
  };
  
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
  
  const mainImageUrl = getImageUrl(product.mainImage);
  const imagesUrls = product.images.map(img => getImageUrl(img));

  const formattedProduct = {
    id: product.id,
    name: product.name,
    price: Math.floor(product.price),
    description: product.description,
    mainImage: mainImageUrl,
    images: imagesUrls,
    sizes,
    colors,
    stock: product.stock,
    brand: product.brand?.name || '',
    slug: product.slug,
  };

  return <ProductDetail product={formattedProduct} />;
}