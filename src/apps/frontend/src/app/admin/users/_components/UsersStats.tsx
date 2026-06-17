'use client';

import { FiCheck, FiX, FiUser, FiUserX } from 'react-icons/fi';

interface UsersStatsProps {
  total: number;
  active: number;
  inactive: number;
}

export default function UsersStats({ total, active, inactive }: UsersStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <FiUser className="text-blue-600 dark:text-blue-400" size={18} />
          </div>
          <div>
            <p className="text-xs text-gray-400">Total de Usuários</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{total}</p>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
            <FiCheck className="text-green-600 dark:text-green-400" size={18} />
          </div>
          <div>
            <p className="text-xs text-gray-400">Ativos</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{active}</p>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
            <FiUserX className="text-red-600 dark:text-red-400" size={18} />
          </div>
          <div>
            <p className="text-xs text-gray-400">Inativos/Deletados</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{inactive}</p>
          </div>
        </div>
      </div>
    </div>
  );
}