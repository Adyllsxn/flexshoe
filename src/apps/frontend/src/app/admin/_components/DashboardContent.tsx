'use client';

import { DASHBOARD_CONFIG } from '../_constants/dashboard';
import { StatsCards } from './StatsCards';
import { PedidosRecentesTable } from './PedidosRecentesTable';

const statsData = {
  products: 24,
  orders: 156,
  revenue: 1899990,
  averageTicket: 75990
};

const recentOrders = [
  { id: '#ORD001', customer: 'João Silva', total: 89990, status: 'Entregue', date: '2024-05-30' },
  { id: '#ORD002', customer: 'Maria Santos', total: 139990, status: 'Processando', date: '2024-05-29' },
  { id: '#ORD003', customer: 'Carlos Mendes', total: 59990, status: 'Pendente', date: '2024-05-28' },
  { id: '#ORD004', customer: 'Ana Oliveira', total: 189990, status: 'Entregue', date: '2024-05-27' },
  { id: '#ORD005', customer: 'Pedro Costa', total: 74990, status: 'Processando', date: '2024-05-26' },
];

const formatCurrency = (value: number) => {
  return value.toLocaleString('pt-AO') + ' Kz';
};

export function DashboardContent() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{DASHBOARD_CONFIG.title}</h1>
          <p className="text-gray-400 mt-1">{DASHBOARD_CONFIG.subtitle}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards
        productsCount={statsData.products}
        ordersCount={statsData.orders}
        totalRevenue={statsData.revenue}
        averageTicket={statsData.averageTicket}
        formatCurrency={formatCurrency}
      />

      {/* Recent Orders */}
      <PedidosRecentesTable orders={recentOrders} formatCurrency={formatCurrency} />
    </div>
  );
}