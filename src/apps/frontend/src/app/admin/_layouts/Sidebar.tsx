'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { 
  FiLogOut
} from 'react-icons/fi';
import { NAVIGATION, type NavItem } from './sidebar.constants';

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  collapsed?: boolean;
}

function SidebarNavItem({ item, depth = 0, collapsed = false, onClose }: { item: NavItem; depth?: number; collapsed?: boolean; onClose?: () => void }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const Icon = item.icon;
  const hasSubmenu = item.submenu && item.submenu.length > 0;
  const isActive = item.href ? pathname === item.href : false;

  useEffect(() => {
    if (hasSubmenu && !collapsed) {
      const hasActiveChild = item.submenu?.some(sub => sub.href === pathname);
      if (hasActiveChild) setIsOpen(true);
    }
  }, [pathname, hasSubmenu, item.submenu, collapsed]);

  const handleMouseEnter = () => {
    if (collapsed && hasSubmenu) {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      setShowDropdown(true);
    }
  };

  const handleMouseLeave = () => {
    if (collapsed && hasSubmenu) {
      hoverTimeoutRef.current = setTimeout(() => setShowDropdown(false), 200);
    }
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

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

  // Se tem submenu e NÃO está colapsado -> renderiza como button (expansível)
  if (hasSubmenu && !collapsed) {
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
          <ChevronRight size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
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

  // Se tem submenu e está colapsado -> renderiza com dropdown lateral
  if (hasSubmenu && collapsed) {
    return (
      <li className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className="flex justify-center py-2">
          <div className="relative">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 transition-all cursor-pointer">
              <Icon size={20} />
            </div>
            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, x: -10, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -10, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="fixed left-16 ml-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-[100]"
                  style={{ 
                    boxShadow: '0 20px 25px -12px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <div className="px-4 py-2.5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white rounded-t-xl">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{item.name}</span>
                  </div>
                  <div className="py-1">
                    {item.submenu!.map((sub, idx) => {
                      const SubIcon = sub.icon;
                      const isSubActive = sub.href === pathname;
                      return (
                        <Link
                          key={idx}
                          href={sub.href!}
                          onClick={() => {
                            setShowDropdown(false);
                            onClose?.();
                          }}
                          className={`flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                            isSubActive 
                              ? 'bg-gray-100 text-black font-medium shadow-sm' 
                              : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                          }`}
                        >
                          <SubIcon size={16} className={isSubActive ? 'text-black' : 'text-gray-400'} />
                          <span className="text-sm">{sub.name}</span>
                          {isSubActive && <div className="ml-auto w-1.5 h-1.5 bg-black rounded-full" />}
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </li>
    );
  }

  // Sem submenu (item normal)
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
        <div className="fixed left-16 ml-2 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 shadow-lg">
          {item.name}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-1 w-1.5 h-1.5 bg-gray-900 rotate-45" />
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
            <div className="w-8 h-8 bg-gradient-to-br from-gray-900 to-black rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="font-semibold text-gray-800">FlexShoe</span>
          </a>
        ) : (
          <a href="/admin" className="flex justify-center w-full">
            <div className="w-8 h-8 bg-gradient-to-br from-gray-900 to-black rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">F</span>
            </div>
          </a>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto overflow-x-visible py-4">
        <ul className={`space-y-1 ${collapsed ? 'px-2' : 'px-3'}`}>
          {NAVIGATION.map((item, idx) => (
            <SidebarNavItem key={idx} item={item} collapsed={collapsed} />
          ))}
        </ul>
      </nav>

      {!collapsed ? (
        <div className="p-3 border-t border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between">
            <a href="/admin/profile" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                <span className="text-sm font-medium text-gray-700">AD</span>
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-medium text-gray-800">Administrador</div>
                <div className="text-xs text-gray-400">Admin</div>
              </div>
            </a>
            <a href="/auth/logout" className="p-2 rounded-lg hover:bg-red-50 transition-all group">
              <FiLogOut size={18} className="text-gray-400 group-hover:text-red-500 transition-colors" />
            </a>
          </div>
        </div>
      ) : (
        <div className="p-3 border-t border-gray-200 flex-shrink-0">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center shadow-sm">
              <span className="text-sm font-medium text-gray-700">AD</span>
            </div>
            <a href="/auth/logout" className="p-2 rounded-lg hover:bg-red-50 transition-all group">
              <FiLogOut size={18} className="text-gray-400 group-hover:text-red-500 transition-colors" />
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
      className={`h-screen bg-white border-r border-gray-200 flex flex-col flex-shrink-0 transition-all duration-300 overflow-x-visible ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <SidebarContent />
    </aside>
  );
}