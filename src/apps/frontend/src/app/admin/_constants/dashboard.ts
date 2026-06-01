export const DASHBOARD_CONFIG = {
  title: 'Dashboard',
  subtitle: 'Visão geral da sua loja',
  messages: {
    loading: 'Carregando dados...',
    updatedNow: 'Atualizado agora',
    noData: 'Nenhum dado disponível',
    recentOrders: 'Pedidos Recentes',
    stats: {
      products: 'Produtos',
      orders: 'Pedidos',
      revenue: 'Receita Total',
      averageTicket: 'Ticket Médio'
    }
  }
};

export const SIDEBAR_STORE = {
  name: 'FlexShoe',
  description: 'Admin'
};

export const SIDEBAR_CATEGORIES = {
  principal: [
    { name: 'Dashboard', href: '/admin', icon: 'FiHome' },
    { name: 'Produtos', href: '/admin/produtos', icon: 'FiPackage' },
    { name: 'Pedidos', href: '/admin/pedidos', icon: 'FiShoppingBag' },
    { name: 'Clientes', href: '/admin/clientes', icon: 'FiUsers' },
  ],
  definicoes: [
    { name: 'Perfil', href: '/admin/perfil', icon: 'FiUser' },
    { name: 'Configurações', href: '/admin/configuracoes', icon: 'FiSettings' },
  ],
  logout: { name: 'Sair', href: '#', icon: 'FiLogOut' }
};

export const TOPBAR_CONFIG = {
  searchPlaceholder: 'Buscar produtos, pedidos...'
};