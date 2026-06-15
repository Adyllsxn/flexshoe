'use client';

import { useState, useEffect } from 'react';
import { getMe } from '@/lib/modules/user';

export function usePermissions() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getMe();
        setUser(userData);
        setIsAdmin(userData?.role === 'admin');
        setIsEmployee(userData?.role === 'admin' || userData?.role === 'employee');
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return {
    user,
    loading,
    isAdmin,
    isEmployee,
    canCreate: isAdmin,
    canEdit: isAdmin,
    canDelete: isAdmin,
    canView: isEmployee,
  };
}