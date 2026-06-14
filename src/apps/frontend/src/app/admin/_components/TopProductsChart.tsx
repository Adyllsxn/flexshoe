'use client';

import { useEffect, useState } from 'react';
import { getAllOrders, type Order } from '@/lib/modules/order';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ProductStat {
  name: string;
  sales: number;
}

export function TopProductsChart() {
  const [data, setData] = useState<ProductStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const ordersData = await getAllOrders(1, 100);
      if (ordersData?.data) {
        const productMap: Record<string, number> = {};
        
        ordersData.data.forEach((order: Order) => {
          order.items.forEach((item) => {
            productMap[item.productName] = (productMap[item.productName] || 0) + item.quantity;
          });
        });
        
        const sorted = Object.entries(productMap)
          .map(([name, sales]) => ({ name, sales }))
          .sort((a, b) => b.sales - a.sales)
          .slice(0, 5);
        
        setData(sorted);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4"></div>
          <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  const isDark = document.documentElement.classList.contains('dark');
  const textColor = isDark ? '#9ca3af' : '#6b7280';
  const gridColor = isDark ? '#374151' : '#e5e7eb';
  const barColor = isDark ? '#ffffff' : '#000000';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Top 5 Produtos Mais Vendidos</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical" margin={{ left: 40, right: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis type="number" tick={{ fill: textColor, fontSize: 12 }} />
          <YAxis type="category" dataKey="name" width={120} tick={{ fill: textColor, fontSize: 12 }} />
          <Tooltip 
            formatter={(value) => [`${value} vendas`, 'Quantidade']}
            contentStyle={{ 
              backgroundColor: isDark ? '#1f2937' : 'white', 
              border: `1px solid ${gridColor}`,
              borderRadius: '8px',
              color: isDark ? '#f9fafb' : '#111827'
            }}
          />
          <Bar dataKey="sales" fill={barColor} radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}