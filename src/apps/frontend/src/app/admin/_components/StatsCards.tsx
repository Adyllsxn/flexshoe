'use client';

import { FiPackage, FiShoppingBag, FiDollarSign, FiTrendingUp } from 'react-icons/fi';
import { DASHBOARD_CONFIG } from '../_constants/dashboard';

interface StatsCardsProps {
  productsCount: number;
  ordersCount: number;
  totalRevenue: number;
  averageTicket: number;
  formatCurrency: (value: number) => string;
}

export function StatsCards({ productsCount, ordersCount, totalRevenue, averageTicket, formatCurrency }: StatsCardsProps) {
  const stats = [
    { icon: FiPackage, value: productsCount, label: DASHBOARD_CONFIG.messages.stats.products },
    { icon: FiShoppingBag, value: ordersCount, label: DASHBOARD_CONFIG.messages.stats.orders },
    { icon: FiDollarSign, value: formatCurrency(totalRevenue), label: DASHBOARD_CONFIG.messages.stats.revenue },
    { icon: FiTrendingUp, value: formatCurrency(averageTicket), label: DASHBOARD_CONFIG.messages.stats.averageTicket },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Icon className="text-black text-xl" />
              </div>
              <span className="text-2xl font-bold text-black">{stat.value}</span>
            </div>
            <p className="text-gray-500 text-sm">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}