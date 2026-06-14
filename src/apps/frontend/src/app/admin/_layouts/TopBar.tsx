'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, Menu, X, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { FiUser, FiLogOut, FiGrid } from 'react-icons/fi';
import { QUICK_ACCESS_ITEMS, USER_LOGOUT } from './topbar.constants';
import { logout as apiLogout } from '@/lib/modules/auth';

interface TopBarProps {
  onMenuClick: () => void;
  onSidebarToggle: () => void;
  userName?: string;
  userRole?: string;
}

export function TopBar({ onMenuClick, onSidebarToggle, userName, userRole }: TopBarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const quickRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Pega apenas o primeiro nome
  const getFirstName = (name: string) => {
    if (!name) return 'Admin';
    return name.split(' ')[0];
  };

  const displayName = getFirstName(userName || 'Administrador');
  const initial = displayName.charAt(0).toUpperCase();

  // Detectar mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (quickRef.current && !quickRef.current.contains(event.target as Node)) {
        setQuickOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setUserOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('admin-theme', newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('admin-theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const handleLogout = async () => {
    await apiLogout();
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    localStorage.removeItem('flexshoe-admin-auth');
    sessionStorage.removeItem('flexshoe-admin-auth');
    window.location.href = USER_LOGOUT.logout;
  };

  // Mobile: clicar no avatar vai direto para o perfil
  const handleMobileAvatarClick = () => {
    window.location.href = '/admin/profile';
  };

  return (
    <header className="header bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 h-16">
        <div className="header-left flex items-center gap-4">
          <button 
            onClick={onSidebarToggle}
            className="hidden lg:flex p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer"
            title="Colapsar Sidebar"
          >
            <Menu size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
          <button 
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer"
            title="Menu"
          >
            <Menu size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <div className="header-search hidden md:block flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
            <input
              type="search"
              placeholder="Buscar..."
              className="w-full pl-10 pr-20 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
            <kbd className="search-shortcut absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-800 px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-700">
              <span>⌘</span>K
            </kbd>
          </div>
        </div>

        <div className="header-right flex items-center gap-2">
          <div className="header-actions-desktop hidden lg:flex items-center gap-1">
            <div className="relative" ref={quickRef}>
              <button 
                onClick={() => setQuickOpen(!quickOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer"
                title="Acesso Rápido"
              >
                <FiGrid size={18} className="text-gray-600 dark:text-gray-400" />
              </button>
              {quickOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white">Acesso Rápido</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-1 p-2">
                    {QUICK_ACCESS_ITEMS.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={idx}
                          href={item.href}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                          onClick={() => setQuickOpen(false)}
                        >
                          <Icon size={18} className="text-gray-600 dark:text-gray-400" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer"
              title={theme === 'light' ? 'Modo Escuro' : 'Modo Claro'}
            >
              {theme === 'light' ? <Moon size={18} className="text-gray-600 dark:text-gray-400" /> : <Sun size={18} className="text-gray-600 dark:text-gray-400" />}
            </button>

            <span className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1"></span>

            {/* Desktop: Dropdown */}
            <div className="relative" ref={userRef}>
              <button 
                onClick={() => setUserOpen(!userOpen)}
                className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black text-sm font-medium">
                  {initial}
                </div>
                <div className="hidden xl:block text-left">
                  <span className="block text-sm font-medium text-gray-800 dark:text-white">{displayName}</span>
                  <span className="block text-xs text-gray-400 dark:text-gray-500 capitalize">{userRole || 'Admin'}</span>
                </div>
                <ChevronDown size={14} className="text-gray-400 dark:text-gray-500" />
              </button>
              {userOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black font-medium">
                        {initial}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800 dark:text-white">{displayName}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 capitalize">{userRole || 'Admin'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <Link href="/admin/profile" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                      <FiUser size={18} className="text-gray-600 dark:text-gray-400" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Meu Perfil</span>
                    </Link>
                  </div>
                  <div className="border-t border-gray-100 dark:border-gray-700 pt-2">
                    <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all text-red-600 dark:text-red-400 w-full">
                      <FiLogOut size={18} />
                      <span className="text-sm">Sair</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile: Apenas botões de busca, tema e avatar sem dropdown */}
          <div className="flex lg:hidden items-center gap-1">
            <button 
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer"
              title="Buscar"
            >
              <Search size={18} className="text-gray-600 dark:text-gray-400" />
            </button>
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer"
              title={theme === 'light' ? 'Modo Escuro' : 'Modo Claro'}
            >
              {theme === 'light' ? <Moon size={18} className="text-gray-600 dark:text-gray-400" /> : <Sun size={18} className="text-gray-600 dark:text-gray-400" />}
            </button>
            {/* Mobile: Avatar clicável que vai direto para o perfil */}
            <button 
              onClick={handleMobileAvatarClick}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer"
              title="Perfil"
            >
              <div className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black text-sm font-medium">
                {initial}
              </div>
            </button>
          </div>
        </div>
      </div>

      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 lg:hidden">
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
              <input
                autoFocus
                type="search"
                placeholder="Buscar..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white"
              />
              <button 
                type="button"
                onClick={() => setSearchOpen(false)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 cursor-pointer"
              >
                <X size={18} className="text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}