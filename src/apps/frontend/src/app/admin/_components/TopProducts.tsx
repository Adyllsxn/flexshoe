'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllOrders, type Order } from '@/lib/modules/order';

interface ProductStat {
  name: string;
  sales: number;
}

export function TopProducts() {
  const [products, setProducts] = useState<ProductStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllOrders(1, 100);
      if (data?.data) {
        const productMap: Record<string, number> = {};
        
        data.data.forEach((order: Order) => {
          order.items.forEach((item) => {
            productMap[item.productName] = (productMap[item.productName] || 0) + item.quantity;
          });
        });
        
        const sorted = Object.entries(productMap)
          .map(([name, sales]) => ({ name, sales }))
          .sort((a, b) => b.sales - a.sales)
          .slice(0, 5);
        
        setProducts(sorted);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const maxSales = products[0]?.sales || 1;

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Produtos Mais Vendidos</h3>
        </div>
        <div className="p-10 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black dark:border-white mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">Produtos Mais Vendidos</h3>
        <Link href="/admin/produtos" className="text-xs text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition">
          Ver todos →
        </Link>
      </div>
      <div className="p-5">
        <div className="space-y-4">
          {products.map((product, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-6 text-sm font-medium text-gray-500 dark:text-gray-400">{idx + 1}º</div>
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-800 dark:text-white font-medium">{product.name}</span>
                  <span className="text-gray-600 dark:text-gray-400">{product.sales} vendas</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                  <div 
                    className="h-1.5 rounded-full bg-black dark:bg-white transition-all duration-500"
                    style={{ width: `${(product.sales / maxSales) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
          {products.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400 py-4">
              Nenhum produto vendido ainda
            </div>
          )}
        </div>
      </div>
    </div>
  );
}