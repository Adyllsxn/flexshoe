'use client';

import { StatsCards } from './StatsCards';
import { RevenueChart } from './RevenueChart';
import { TrafficSources } from './TrafficSources';
import { TopProducts } from './TopProducts';
import { RecentOrders } from './RecentOrders';

export function DashboardContent() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
          <nav className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            <span className="text-gray-400 dark:text-gray-500">Home</span> /{' '}
            <span className="text-gray-800 dark:text-gray-200 font-medium">Dashboard</span>
          </nav>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Gráfico de Receita + Fontes de Tráfego */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <TrafficSources />
        </div>
      </div>

      {/* Top Products + Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopProducts />
        <RecentOrders />
      </div>
    </div>
  );
}