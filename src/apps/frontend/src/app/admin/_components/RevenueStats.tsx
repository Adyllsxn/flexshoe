'use client';

import { useEffect, useState } from 'react';
import { getAllOrders, type Order } from '@/lib/modules/order';

export function RevenueStats() {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRevenue = async () => {
      const ordersData = await getAllOrders(1, 100);
      if (ordersData?.data) {
        const revenue = ordersData.data.reduce((sum: number, order: Order) => sum + order.total, 0);
        setTotalRevenue(revenue);
      }
      setLoading(false);
    };
    fetchRevenue();
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-40"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Receita Total</h3>
      <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalRevenue.toLocaleString('pt-AO')} Kz</p>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Baseado em todos os pedidos</p>
    </div>
  );
}