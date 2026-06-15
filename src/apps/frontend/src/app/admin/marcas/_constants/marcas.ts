export const MARCAS_CONFIG = {
  title: 'Marcas',
  subtitle: 'Gerencie as marcas de tênis',
  breadcrumb: {
    home: 'Início',
    current: 'Marcas'
  }
};

export const ITEMS_PER_PAGE = 5;

export const getStatusBadge = (active: boolean) => {
  return active 
    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
    : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
};

export const getStatusText = (active: boolean) => {
  return active ? 'Ativo' : 'Inativo';
};