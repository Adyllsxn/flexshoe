'use client';

import { useEffect, useState } from 'react';
import { FiArrowUp, FiArrowDown, FiDollarSign, FiShoppingBag, FiPackage, FiTrendingUp } from 'react-icons/fi';
import { getAllOrders } from '@/lib/modules/order';
import { getAllProducts } from '@/lib/modules/product';

export function StatsCards() {
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    products: 0,
    averageTicket: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [ordersData, productsData] = await Promise.all([
        getAllOrders(1, 100),
        getAllProducts({ limit: 100 })
      ]);
      
      if (ordersData?.data) {
        const totalRevenue = ordersData.data.reduce((sum, order) => sum + order.total, 0);
        const totalOrders = ordersData.data.length;
        const avgTicket = totalOrders > 0 ? totalRevenue / totalOrders : 0;
        
        setStats({
          revenue: totalRevenue,
          orders: totalOrders,
          products: productsData?.total || 0,
          averageTicket: avgTicket,
        });
      }
      setLoading(false);
    };
    fetchStats();
  }, []);

  const cards = [
    { label: 'Receita Total', value: stats.revenue, change: '+12.5%', positive: true, icon: FiDollarSign },
    { label: 'Pedidos', value: stats.orders, change: '+5.8%', positive: true, icon: FiShoppingBag },
    { label: 'Produtos', value: stats.products, change: '0%', positive: false, icon: FiPackage },
    { label: 'Ticket Médio', value: stats.averageTicket, change: '+1.2%', positive: true, icon: FiTrendingUp },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1,2,3,4].map(i => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((stat, idx) => {
        const Icon = stat.icon;
        const value = stat.label === 'Ticket Médio' || stat.label === 'Receita Total'
          ? `${Math.round(stat.value).toLocaleString('pt-AO')} Kz`
          : stat.value.toLocaleString('pt-AO');
        
        return (
          <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
              </div>
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <Icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </div>
            </div>
            <div className={`mt-3 flex items-center gap-1 text-sm ${stat.positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {stat.positive ? <FiArrowUp size={14} /> : <FiArrowDown size={14} />}
              <span>{stat.change}</span>
              <span className="text-gray-400 dark:text-gray-500 text-xs">vs mês anterior</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}