import { 
  FiGrid, 
  FiShoppingBag, 
  FiUsers, 
  FiPackage, 
  FiBox, 
  FiTag,
  FiPieChart,
  FiSettings,
  FiDatabase,
  FiShield,
} from 'react-icons/fi';

export interface NavItem {
  name: string;
  href?: string;
  icon: any;
  submenu?: NavItem[];
  isHeading?: boolean;
}

export const NAVIGATION: NavItem[] = [
  { name: 'Dashboard', href: '/admin', icon: FiGrid },
  {
    name: 'Dashboards',
    icon: FiPieChart,
    submenu: [
      { name: 'Vendas', href: '/admin/dashboards/vendas', icon: FiPieChart },
      { name: 'Analytics', href: '/admin/dashboards/analytics', icon: FiPieChart },
      { name: 'CRM', href: '/admin/dashboards/crm', icon: FiPieChart },
    ]
  },
  {
    name: 'Utilizadores',
    icon: FiUsers,
    submenu: [
      { name: 'Usuários', href: '/admin/users', icon: FiUsers },
      { name: 'Permissões', href: '/admin/permissoes', icon: FiShield },
    ]
  },
  { name: 'Produtos', href: '/admin/produtos', icon: FiPackage },
  { name: 'Catálogo', href: '#', icon: FiBox, isHeading: true },
  { name: 'Marcas', href: '/admin/marcas', icon: FiTag },
  { name: 'Inventory', href: '/admin/inventory', icon: FiDatabase },
  { name: 'Configurações', href: '#', icon: FiSettings, isHeading: true },
  { name: 'Store', href: '/admin/store', icon: FiShoppingBag },
];