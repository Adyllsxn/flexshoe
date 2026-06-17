export const ORDERS_CONFIG = {
  title: 'Pedidos',
  subtitle: 'Gerencie todos os pedidos da loja',
  breadcrumb: {
    home: 'Início',
    current: 'Pedidos'
  }
};

export const ITEMS_PER_PAGE = 5;

// Status compatíveis com o backend
export const STATUS_OPTIONS = [
  { value: 'all', label: 'Todos os Status' },
  { value: 'pending', label: 'Pendente', color: 'yellow' },
  { value: 'approved', label: 'Aprovado', color: 'blue' },
  { value: 'delivered', label: 'Entregue', color: 'green' },
  { value: 'cancelled', label: 'Cancelado', color: 'red' },
];

// Regras: quais status podem ser alterados a partir de cada status
export const STATUS_TRANSITIONS: Record<string, string[]> = {
  'pending': ['approved', 'cancelled'],
  'approved': ['delivered', 'cancelled'],
  'delivered': ['cancelled'],
  'cancelled': [],
};

export const getStatusColor = (status: string) => {
  switch(status) {
    case 'delivered': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
    case 'approved': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
    case 'pending': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
    case 'cancelled': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
    default: return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400';
  }
};

export const getStatusLabel = (status: string) => {
  switch(status) {
    case 'delivered': return 'Entregue';
    case 'approved': return 'Aprovado';
    case 'pending': return 'Pendente';
    case 'cancelled': return 'Cancelado';
    default: return status;
  }
};

export const formatPrice = (price: number) => {
  if (!price && price !== 0) return '0 Kz';
  return Math.round(price).toLocaleString('pt-AO') + ' Kz';
};

export const formatDate = (date: string) => {
  if (!date) return 'Data não disponível';
  try {
    return new Date(date).toLocaleDateString('pt-AO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return 'Data inválida';
  }
};