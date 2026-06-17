export const PERMISSOES_CONFIG = {
  title: 'Permissões',
  subtitle: 'Gerencie as permissões dos usuários',
  breadcrumb: {
    home: 'Início',
    current: 'Permissões'
  }
};

export const PERMISSION_MODULES = [
  { id: 'products', label: 'Produtos', description: 'Ver, criar, editar e excluir produtos' },
  { id: 'orders', label: 'Pedidos', description: 'Ver, gerenciar e atualizar pedidos' },
  { id: 'users', label: 'Usuários', description: 'Gerenciar usuários do sistema' },
  { id: 'reports', label: 'Relatórios', description: 'Acessar relatórios e análises' },
  { id: 'settings', label: 'Configurações', description: 'Alterar configurações do sistema' },
];

export const getRoleBadge = (role: string) => {
  if (role === 'admin') {
    return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400';
  }
  if (role === 'employee') {
    return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
  }
  return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400';
};

export const getRoleLabel = (role: string) => {
  if (role === 'admin') return 'Administrador';
  if (role === 'employee') return 'Funcionário';
  return role;
};