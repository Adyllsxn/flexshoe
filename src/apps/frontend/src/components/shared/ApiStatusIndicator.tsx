'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api.connection';

export function ApiStatusIndicator() {
  const [isApiAvailable, setIsApiAvailable] = useState<boolean | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const checkApi = async () => {
      try {
        await api.get('/product?limit=1');
        setIsApiAvailable(true);
      } catch {
        setIsApiAvailable(false);
      }
    };
    
    checkApi();
    
    // Desaparece após 10 segundos
    const timer = setTimeout(() => {
      setVisible(false);
    }, 10000);
    
    return () => clearTimeout(timer);
  }, []);

  if (!visible || isApiAvailable === null) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className={`text-white text-xs px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2 ${
        isApiAvailable ? 'bg-green-500' : 'bg-red-500'
      }`}>
        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
        {isApiAvailable ? '✅ Dados da API' : '⚠️ Dados estáticos'}
      </div>
    </div>
  );
}