export const USERS_CONFIG = {
  title: 'Usuários',
  subtitle: 'Gerencie os usuários do sistema',
  breadcrumb: {
    home: 'Início',
    current: 'Usuários'
  }
};

export const ITEMS_PER_PAGE = 10;

export const ROLES = [
  { value: 'admin', label: 'Administrador' },
  { value: 'employee', label: 'Funcionário' },
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

export const getRoleLabel = (role: string) => {
  if (role === 'admin') return 'Administrador';
  if (role === 'employee') return 'Funcionário';
  return role;
};

export const getRoleBadge = (role: string) => {
  if (role === 'admin') {
    return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400';
  }
  return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
};