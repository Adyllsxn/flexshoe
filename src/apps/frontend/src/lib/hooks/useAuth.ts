'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { checkAuth, getMe, logout as apiLogout, type User } from '@/lib/modules/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const authCheck = await checkAuth();
        
        if (authCheck?.authenticated) {
          const userData = await getMe();
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAuth();
  }, []);

  const logout = async () => {
    await apiLogout();
    // Remover token do cookie
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    // Remover dos storages
    localStorage.removeItem('flexshoe-admin-auth');
    sessionStorage.removeItem('flexshoe-admin-auth');
    
    setIsAuthenticated(false);
    setUser(null);
    router.push('/auth/login');
  };

  return { user, isAuthenticated, loading, logout };
}