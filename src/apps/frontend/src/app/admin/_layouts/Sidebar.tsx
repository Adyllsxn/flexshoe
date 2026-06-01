'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { 
  FiGrid, 
  FiShoppingBag, 
  FiUsers, 
  FiPackage, 
  FiBox, 
  FiLogOut,
  FiUser,
  FiTag,
  FiHeart,
  FiPieChart,
  FiSettings,
  FiDatabase
} from 'react-icons/fi';

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  collapsed?: boolean;
}

interface NavItem {
  name: string;
  href?: string;
  icon: any;
  submenu?: NavItem[];
  isHeading?: boolean;
}

const NAVIGATION: NavItem[] = [
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
  { name: 'Utilizadores', href: '/admin/users', icon: FiUsers },
  { name: 'Produtos', href: '/admin/produtos', icon: FiPackage },
  { name: 'Catálogo', href: '#', icon: FiBox, isHeading: true },
  { name: 'Marcas', href: '/admin/marcas', icon: FiTag },
  { name: 'Gênero', href: '/admin/genero', icon: FiHeart },
  { name: 'Inventory', href: '/admin/inventory', icon: FiDatabase },
  { name: 'Configurações', href: '#', icon: FiSettings, isHeading: true },
  { name: 'Store', href: '/admin/store', icon: FiShoppingBag },
  { name: 'Settings', href: '/admin/settings', icon: FiSettings },
];

function SidebarNavItem({ item, depth = 0, collapsed = false, onClose }: { item: NavItem; depth?: number; collapsed?: boolean; onClose?: () => void }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const Icon = item.icon;
  const hasSubmenu = item.submenu && item.submenu.length > 0;
  const isActive = item.href ? pathname === item.href : false;

  useEffect(() => {
    if (hasSubmenu && !collapsed) {
      const hasActiveChild = item.submenu?.some(sub => {
        return sub.href === pathname;
      });
      if (hasActiveChild) setIsOpen(true);
    }
  }, [pathname, hasSubmenu, item.submenu, collapsed]);

  if (item.isHeading) {
    if (collapsed) return null;
    return (
      <li className="nav-heading mt-4 first:mt-0">
        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-3">
          {item.name}
        </span>
      </li>
    );
  }

  if (hasSubmenu) {
    if (collapsed) {
      return (
        <li className="relative group">
          <div className="flex justify-center py-2">
            <div className="relative">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 transition-all cursor-pointer">
                <Icon size={20} />
              </div>
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                {item.name}
              </div>
            </div>
          </div>
        </li>
      );
    }

    return (
      <li className={`${isOpen ? 'open' : ''}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all"
        >
          <div className="flex items-center gap-3">
            <Icon size={18} />
            <span className="text-sm font-medium">{item.name}</span>
          </div>
          <ChevronRight size={14} className={`transition-transform ${isOpen ? 'rotate-90' : ''}`} />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="ml-6 mt-1 space-y-1 overflow-hidden"
            >
              {item.submenu!.map((sub, idx) => (
                <SidebarNavItem key={idx} item={sub} depth={depth + 1} collapsed={collapsed} onClose={onClose} />
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </li>
    );
  }

  if (!item.href || item.href === '#') return null;

  if (collapsed) {
    return (
      <li className="relative group">
        <Link
          href={item.href}
          onClick={onClose}
          className={`flex justify-center py-2 rounded-lg transition-all ${
            isActive ? 'bg-gray-100 text-black' : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          <Icon size={20} />
        </Link>
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
          {item.name}
        </div>
      </li>
    );
  }

  return (
    <li>
      <Link
        href={item.href}
        onClick={onClose}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
          isActive ? 'bg-gray-100 text-black font-medium' : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <Icon size={18} />
        <span>{item.name}</span>
      </Link>
    </li>
  );
}

export function Sidebar({ mobileOpen, setMobileOpen, collapsed = false }: SidebarProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const SidebarContent = () => (
    <>
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 flex-shrink-0">
        {!collapsed ? (
          <a href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="font-semibold text-gray-800">FlexShoe</span>
          </a>
        ) : (
          <a href="/admin" className="flex justify-center w-full">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
          </a>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className={`space-y-1 ${collapsed ? 'px-2' : 'px-3'}`}>
          {NAVIGATION.map((item, idx) => (
            <SidebarNavItem key={idx} item={item} collapsed={collapsed} />
          ))}
        </ul>
      </nav>

      {!collapsed ? (
        <div className="p-3 border-t border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between">
            <a href="/admin/profile" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-medium">AD</span>
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-medium text-gray-800">Administrador</div>
                <div className="text-xs text-gray-400">Admin</div>
              </div>
            </a>
            <a href="/auth/logout" className="p-2 rounded-lg hover:bg-red-50 transition-all">
              <FiLogOut size={18} className="text-red-500" />
            </a>
          </div>
        </div>
      ) : (
        <div className="p-3 border-t border-gray-200 flex-shrink-0">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-sm font-medium">AD</span>
            </div>
            <a href="/auth/logout" className="p-2 rounded-lg hover:bg-red-50 transition-all">
              <FiLogOut size={18} className="text-red-500" />
            </a>
          </div>
        </div>
      )}
    </>
  );

  if (isMobile) {
    return (
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="fixed top-0 left-0 z-50 w-72 h-screen bg-white shadow-2xl flex flex-col"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    );
  }

  return (
    <aside
      className={`h-screen bg-white border-r border-gray-200 flex flex-col flex-shrink-0 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <SidebarContent />
    </aside>
  );
}