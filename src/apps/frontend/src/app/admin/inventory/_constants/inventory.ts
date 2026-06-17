export const INVENTORY_CONFIG = {
  title: 'Inventário',
  subtitle: 'Gerencie o estoque de produtos (tamanhos e cores)',
  breadcrumb: {
    home: 'Início',
    current: 'Inventory'
  }
};

export const ITEMS_PER_PAGE = 10;

export const SIZES = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46];
export const COLORS = ['Preto', 'Branco', 'Vermelho', 'Azul', 'Verde', 'Amarelo', 'Roxo', 'Rosa', 'Cinza', 'Marrom'];

export const getStockBadge = (stock: number, reserved: number) => {
  const available = stock - reserved;
  if (available <= 0) return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
  if (available < 5) return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
  return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
};

export const getStatusBadge = (active: boolean) => {
  return active 
    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
    : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
};

export const getStatusText = (active: boolean) => {
  return active ? 'Ativo' : 'Inativo';
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('pt-AO');
};