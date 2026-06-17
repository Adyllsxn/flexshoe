'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { NAVIGATION, type NavItem } from './sidebar.constants';
import { getMe } from '@/lib/modules/user';

export function useSidebar() {
  const pathname = usePathname();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);

  // Buscar dados do usuário
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getMe();
        if (user) {
          setUserRole(user.role);
          setUserName(user.name);
          setIsAdmin(user.role === 'admin');
          setIsEmployee(user.role === 'admin' || user.role === 'employee');
        }
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Filtra a navegação baseado no role
  const getFilteredNavigation = (): NavItem[] => {
    // Se for admin, mostra tudo
    if (isAdmin) return NAVIGATION;

    // Se não for admin, filtra
    return NAVIGATION.filter(item => {
      // Esconde completamente "Utilizadores" e "Permissões" para não-admin
      if (item.name === 'Utilizadores') return false;
      if (item.name === 'Permissões') return false;
      
      return true;
    });
  };

  // Verifica se o usuário tem permissão para acessar uma rota
  const hasPermission = (route: string): boolean => {
    // Admin tem acesso a tudo
    if (isAdmin) return true;
    
    // Rotas que employee pode acessar
    const employeeRoutes = [
      '/admin',
      '/admin/dashboard',
      '/admin/profile',
      '/admin/perfil',
      '/admin/orders',
      '/admin/produtos',
      '/admin/marcas',
      '/admin/inventory',
      '/admin/store',
    ];
    
    if (isEmployee) {
      return employeeRoutes.some(r => route.startsWith(r));
    }
    
    return false;
  };

  // Pega apenas o primeiro nome
  const getFirstName = (name: string) => {
    if (!name) return 'Admin';
    return name.split(' ')[0];
  };

  // Pega a inicial para o avatar
  const getInitial = (name: string) => {
    if (!name) return 'A';
    return name.charAt(0).toUpperCase();
  };

  const displayName = getFirstName(userName || '');
  const initial = getInitial(userName || 'Administrador');
  const filteredNavigation = getFilteredNavigation();

  return {
    userRole,
    userName,
    loading,
    isAdmin,
    isEmployee,
    displayName,
    initial,
    filteredNavigation,
    hasPermission,
    pathname,
    NAVIGATION,
  };
}