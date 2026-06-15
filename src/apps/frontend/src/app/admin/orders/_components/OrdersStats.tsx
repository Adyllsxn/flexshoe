'use client';

import { FiPackage, FiDollarSign, FiClock, FiCheckCircle } from 'react-icons/fi';
import { formatPrice } from '../_constants/orders';

interface OrdersStatsProps {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  deliveredOrders: number;
}

export default function OrdersStats({ totalOrders, totalRevenue, pendingOrders, deliveredOrders }: OrdersStatsProps) {
  const stats = [
    { label: 'Total de Pedidos', value: totalOrders, icon: FiPackage, color: 'blue' },
    { label: 'Receita Total', value: formatPrice(totalRevenue), icon: FiDollarSign, color: 'green' },
    { label: 'Pendentes', value: pendingOrders, icon: FiClock, color: 'yellow' },
    { label: 'Entregues', value: deliveredOrders, icon: FiCheckCircle, color: 'purple' },
  ];

  const colorClasses = {
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    yellow: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                <Icon size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}