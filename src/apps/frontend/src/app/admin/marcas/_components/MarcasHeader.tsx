'use client';

import Link from 'next/link';
import { FiPlus } from 'react-icons/fi';
import { MARCAS_CONFIG } from '../_constants/marcas';

interface MarcasHeaderProps {
  onAddClick: () => void;
  canCreate: boolean;
}

export default function MarcasHeader({ onAddClick, canCreate }: MarcasHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{MARCAS_CONFIG.title}</h1>
        <nav className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          <Link href="/admin" className="hover:text-black dark:hover:text-white transition">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 dark:text-gray-200 font-medium">{MARCAS_CONFIG.breadcrumb.current}</span>
        </nav>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{MARCAS_CONFIG.subtitle}</p>
      </div>
      {canCreate && (
        <button
          onClick={onAddClick}
          className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all flex items-center gap-2"
        >
          <FiPlus size={16} />
          Nova Marca
        </button>
      )}
    </div>
  );
}