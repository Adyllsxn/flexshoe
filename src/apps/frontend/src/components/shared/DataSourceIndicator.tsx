'use client';

import { useEffect, useState } from 'react';

interface DataSourceIndicatorProps {
  usingMock: boolean;
}

export function DataSourceIndicator({ usingMock }: DataSourceIndicatorProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`text-white text-xs px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2 ${
        usingMock ? 'bg-red-500' : 'bg-green-500'
      }`}>
        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
        {usingMock ? '⚠️ Dados estáticos (API offline)' : '✅ Dados da API'}
      </div>
    </div>
  );
}