export const PERMISSOES_CONFIG = {
  title: 'Permissões',
  subtitle: 'Gerencie as permissões dos usuários',
  breadcrumb: {
    home: 'Início',
    current: 'Permissões'
  }
};

export const PERMISSOES_DATA = [
  {
    id: 1,
    user: 'João Silva',
    email: 'joao@flexshoe.ao',
    role: 'Administrador',
    permissions: {
      products: true,
      orders: true,
      users: true,
      reports: true,
      settings: true,
    }
  },
  {
    id: 2,
    user: 'Maria Santos',
    email: 'maria@flexshoe.ao',
    role: 'Funcionário',
    permissions: {
      products: true,
      orders: true,
      users: false,
      reports: false,
      settings: false,
    }
  },
  {
    id: 3,
    user: 'Carlos Mendes',
    email: 'carlos@flexshoe.ao',
    role: 'Funcionário',
    permissions: {
      products: true,
      orders: false,
      users: false,
      reports: false,
      settings: false,
    }
  },
  {
    id: 4,
    user: 'Ana Oliveira',
    email: 'ana@flexshoe.ao',
    role: 'Administrador',
    permissions: {
      products: true,
      orders: true,
      users: true,
      reports: true,
      settings: true,
    }
  },
];

export const PERMISSION_MODULES = [
  { id: 'products', label: 'Produtos', description: 'Ver, criar, editar e excluir produtos' },
  { id: 'orders', label: 'Pedidos', description: 'Ver, gerenciar e atualizar pedidos' },
  { id: 'users', label: 'Usuários', description: 'Gerenciar usuários do sistema' },
  { id: 'reports', label: 'Relatórios', description: 'Acessar relatórios e análises' },
  { id: 'settings', label: 'Configurações', description: 'Alterar configurações do sistema' },
];

export const getRoleBadge = (role: string) => {
  if (role === 'Administrador') {
    return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400';
  }
  return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
};