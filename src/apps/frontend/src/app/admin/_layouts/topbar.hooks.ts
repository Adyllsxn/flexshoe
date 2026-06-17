'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logout as apiLogout } from '@/lib/modules/auth';
import { getMe } from '@/lib/modules/user';

export function useTopbar() {
  const router = useRouter();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [userName, setUserName] = useState<string>('');
  const [userRole, setUserRole] = useState<string>('');
  const [loading, setLoading] = useState(true);

  // Buscar dados do usuário
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getMe();
        if (user) {
          setUserName(user.name);
          setUserRole(user.role);
        }
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Carregar tema salvo
  useEffect(() => {
    const savedTheme = localStorage.getItem('admin-theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('admin-theme', newTheme);
  };

  const handleLogout = async () => {
    await apiLogout();
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    localStorage.removeItem('flexshoe-admin-auth');
    sessionStorage.removeItem('flexshoe-admin-auth');
    router.push('/auth/logout');
  };

  const getFirstName = (name: string) => {
    if (!name) return 'Admin';
    return name.split(' ')[0];
  };

  const getInitial = (name: string) => {
    if (!name) return 'A';
    return name.charAt(0).toUpperCase();
  };

  const displayName = getFirstName(userName || 'Administrador');
  const initial = getInitial(userName || 'Administrador');

  return {
    theme,
    userName,
    userRole,
    loading,
    displayName,
    initial,
    toggleTheme,
    handleLogout,
    getFirstName,
    getInitial,
  };
}