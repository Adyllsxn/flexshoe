import { 
  FiTag,
  FiPackage,
  FiShoppingBag,
  FiDatabase,
  FiUser,
  FiLogOut,
} from 'react-icons/fi';

export interface QuickAccessItem {
  icon: any;
  label: string;
  href: string;
}

export const QUICK_ACCESS_ITEMS: QuickAccessItem[] = [
  { icon: FiTag, label: 'Marcas', href: '/admin/marcas' },
  { icon: FiPackage, label: 'Produtos', href: '/admin/produtos' },
  { icon: FiDatabase, label: 'Inventory', href: '/admin/inventory' },
  { icon: FiShoppingBag, label: 'Pedidos', href: '/admin/orders' },
];

export const USER_DROPDOWN_ITEMS = {
  profile: { icon: FiUser, label: 'Meu Perfil', href: '/admin/profile' },
  logout: { icon: FiLogOut, label: 'Sair', href: '/auth/logout' }
};

export const USER_LOGOUT = {
  logout: '/auth/logout'
};