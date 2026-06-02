import { 
  FiTag,
  FiPackage,
  FiShoppingBag,
  FiSettings,
  FiDatabase,
  FiUser,
  FiLogOut
} from 'react-icons/fi';

export interface QuickAccessItem {
  icon: any;
  label: string;
  href: string;
}

export const QUICK_ACCESS_ITEMS: QuickAccessItem[] = [
  { icon: FiTag, label: 'Marcas', href: '/admin/marcas' },
  { icon: FiPackage, label: 'Produtos', href: '/admin/produtos' },
  { icon: FiShoppingBag, label: 'Store', href: '/admin/store' },
  { icon: FiSettings, label: 'Settings', href: '/admin/settings' },
  { icon: FiDatabase, label: 'Inventory', href: '/admin/inventory' },
];

export const USER_DROPDOWN_ITEMS = {
  profile: { icon: FiUser, label: 'Meu Perfil', href: '/admin/perfil' },
  logout: { icon: FiLogOut, label: 'Sair', href: '/auth/logout' }
};