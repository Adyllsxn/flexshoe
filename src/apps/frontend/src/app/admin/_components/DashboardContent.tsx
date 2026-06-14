'use client';

import { StatsCards } from './StatsCards';
import { TopProducts } from './TopProducts';
import { RecentOrders } from './RecentOrders';
import { TopProductsChart } from './TopProductsChart';
import { RevenueStats } from './RevenueStats';

export function DashboardContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Visão geral da sua loja</p>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TopProductsChart />
        </div>
        <div>
          <RevenueStats />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopProducts />
        <RecentOrders />
      </div>
    </div>
  );
}