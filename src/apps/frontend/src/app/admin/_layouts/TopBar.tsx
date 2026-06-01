'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Grid, ChevronDown, Menu, X, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { 
  FiMessageCircle, 
  FiMail, 
  FiCalendar, 
  FiLayout, 
  FiCheckSquare, 
  FiFolder,
  FiUser,
  FiSettings,
  FiLogOut
} from 'react-icons/fi';

interface TopBarProps {
  onMenuClick: () => void;
  onSidebarToggle: () => void;
}

export function TopBar({ onMenuClick, onSidebarToggle }: TopBarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const quickRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

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

  const quickAccessItems = [
    { icon: FiMessageCircle, label: 'Chat', href: '/admin/chat' },
    { icon: FiMail, label: 'Email', href: '/admin/email' },
    { icon: FiCalendar, label: 'Calendar', href: '/admin/calendar' },
    { icon: FiLayout, label: 'Kanban', href: '/admin/kanban' },
    { icon: FiCheckSquare, label: 'Tasks', href: '/admin/todo' },
    { icon: FiFolder, label: 'Files', href: '/admin/files' },
  ];

  return (
    <header className="header bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 h-16">
        {/* Header Left - Apenas os botões de menu */}
        <div className="header-left flex items-center gap-4">
          {/* Botão para desktop - colapsar sidebar */}
          <button 
            onClick={onSidebarToggle}
            className="hidden lg:flex p-2 rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
            title="Colapsar Sidebar"
          >
            <Menu size={20} />
          </button>
          {/* Botão para mobile - abrir menu */}
          <button 
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
            title="Menu"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Header Center - Search */}
        <div className="header-search hidden md:block flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="search"
              placeholder="Buscar..."
              className="w-full pl-10 pr-20 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
            />
            <kbd className="search-shortcut absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 bg-white px-1.5 py-0.5 rounded border border-gray-200">
              <span>⌘</span>K
            </kbd>
          </div>
        </div>

        {/* Header Right */}
        <div className="header-right flex items-center gap-2">
          {/* Desktop Actions */}
          <div className="header-actions-desktop hidden lg:flex items-center gap-1">
            {/* Quick Access */}
            <div className="relative" ref={quickRef}>
              <button 
                onClick={() => setQuickOpen(!quickOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
                title="Acesso Rápido"
              >
                <Grid size={18} />
              </button>
              {quickOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-800">Acesso Rápido</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-1 p-2">
                    {quickAccessItems.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={idx}
                          href={item.href}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all"
                          onClick={() => setQuickOpen(false)}
                        >
                          <Icon size={18} className="text-gray-600" />
                          <span className="text-sm text-gray-700">{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Dark/Light Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
              title={theme === 'light' ? 'Modo Escuro' : 'Modo Claro'}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* Divider */}
            <span className="w-px h-6 bg-gray-200 mx-1"></span>

            {/* User Dropdown */}
            <div className="relative" ref={userRef}>
              <button 
                onClick={() => setUserOpen(!userOpen)}
                className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white text-sm font-medium">
                  AD
                </div>
                <div className="hidden xl:block text-left">
                  <span className="block text-sm font-medium text-gray-800">Administrador</span>
                  <span className="block text-xs text-gray-400">Admin</span>
                </div>
                <ChevronDown size={14} className="text-gray-400" />
              </button>
              {userOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-medium">
                        AD
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">Administrador</p>
                        <p className="text-xs text-gray-400">admin@flexshoe.ao</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <Link href="/admin/perfil" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-all">
                      <FiUser size={18} className="text-gray-600" />
                      <span className="text-sm text-gray-700">Meu Perfil</span>
                    </Link>
                    <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-all">
                      <FiSettings size={18} className="text-gray-600" />
                      <span className="text-sm text-gray-700">Definições</span>
                    </Link>
                  </div>
                  <div className="border-t border-gray-100 pt-2">
                    <Link href="/auth/logout" className="flex items-center gap-3 px-4 py-2 hover:bg-red-50 transition-all text-red-600">
                      <FiLogOut size={18} />
                      <span className="text-sm">Sair</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-1">
            <button 
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
              title="Buscar"
            >
              <Search size={18} />
            </button>
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
              title={theme === 'light' ? 'Modo Escuro' : 'Modo Claro'}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-white lg:hidden">
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                autoFocus
                type="search"
                placeholder="Buscar..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm"
              />
              <button 
                type="button"
                onClick={() => setSearchOpen(false)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}