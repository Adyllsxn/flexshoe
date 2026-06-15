export const PRODUTOS_CONFIG = {
  title: 'Produtos',
  subtitle: 'Gerencie o catálogo de produtos',
  breadcrumb: {
    home: 'Início',
    current: 'Produtos'
  }
};

export const ITEMS_PER_PAGE = 5;

export const GENDER_OPTIONS = [
  { value: 'male', label: 'Masculino' },
  { value: 'female', label: 'Feminino' },
  { value: 'unisex', label: 'Unisex' },
  { value: 'kids', label: 'Infantil' },
];

export const getStatusBadge = (active: boolean, deletedAt: string | null) => {
  if (deletedAt) return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
  if (active) return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
  return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
};

export const getStatusText = (active: boolean, deletedAt: string | null) => {
  if (deletedAt) return 'Deletado';
  if (active) return 'Ativo';
  return 'Inativo';
};

export const formatPrice = (price: number) => {
  return price.toLocaleString('pt-AO') + ' Kz';
};