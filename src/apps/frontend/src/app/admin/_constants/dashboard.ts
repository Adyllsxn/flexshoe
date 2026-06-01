import { FiDollarSign, FiShoppingBag, FiPackage, FiTrendingUp } from 'react-icons/fi';

export const STATS_DATA = [
  {
    label: 'Receita Total',
    value: '1.899.990 Kz',
    change: '+12.5%',
    positive: true,
    icon: FiDollarSign,
  },
  {
    label: 'Pedidos',
    value: '156',
    change: '+5.8%',
    positive: true,
    icon: FiShoppingBag,
  },
  {
    label: 'Produtos',
    value: '24',
    change: '-3.1%',
    positive: false,
    icon: FiPackage,
  },
  {
    label: 'Ticket Médio',
    value: '75.990 Kz',
    change: '+1.2%',
    positive: true,
    icon: FiTrendingUp,
  },
];

export const RECENT_ORDERS = [
  { id: '#ORD001', customer: 'João Silva', total: 89990, status: 'Entregue' },
  { id: '#ORD002', customer: 'Maria Santos', total: 139990, status: 'Processando' },
  { id: '#ORD003', customer: 'Carlos Mendes', total: 59990, status: 'Pendente' },
  { id: '#ORD004', customer: 'Ana Oliveira', total: 189990, status: 'Entregue' },
  { id: '#ORD005', customer: 'Pedro Costa', total: 74990, status: 'Processando' },
];

export const TOP_PRODUCTS = [
  { name: 'Nike Air Max', sales: 2456, revenue: '24.500 Kz' },
  { name: 'Adidas Ultraboost', sales: 1842, revenue: '18.420 Kz' },
  { name: 'Puma Suede', sales: 1567, revenue: '12.536 Kz' },
  { name: 'Vans Old Skool', sales: 1203, revenue: '9.624 Kz' },
  { name: 'Nike Dunk Low', sales: 986, revenue: '7.888 Kz' },
];

// Gênero Mais Vendido
export const TOP_GENDER = [
  { name: 'Masculino', percentage: 52, color: '#3b82f6' },
  { name: 'Feminino', percentage: 28, color: '#ec4899' },
  { name: 'Unisex', percentage: 15, color: '#10b981' },
  { name: 'Kid', percentage: 5, color: '#f59e0b' },
];

export const MONTHLY_REVENUE = [
  { month: 'Jan', value: 4200 },
  { month: 'Fev', value: 5800 },
  { month: 'Mar', value: 4900 },
  { month: 'Abr', value: 6200 },
  { month: 'Mai', value: 5100 },
  { month: 'Jun', value: 7400 },
  { month: 'Jul', value: 6800 },
  { month: 'Ago', value: 8100 },
  { month: 'Set', value: 7200 },
  { month: 'Out', value: 9500 },
  { month: 'Nov', value: 8900 },
  { month: 'Dez', value: 10200 },
];

export const MAX_REVENUE = Math.max(...MONTHLY_REVENUE.map(d => d.value));

export const getStatusColor = (status: string) => {
  switch(status) {
    case 'Entregue': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
    case 'Processando': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
    case 'Pendente': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
    default: return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400';
  }
};