'use client';

import { FiEdit2, FiCheck, FiX } from 'react-icons/fi';
import { PERMISSION_MODULES, getRoleBadge, getRoleLabel } from '../_constants/permissoes';
import type { UserPermission } from '@/lib/modules/permission';

interface PermissoesTableProps {
  users: UserPermission[];
  loading: boolean;
  onEdit: (user: UserPermission) => void;
}

export default function PermissoesTable({ users, loading, onEdit }: PermissoesTableProps) {
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="p-10 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black dark:border-white mx-auto"></div>
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="text-center py-20">
          <div className="text-6xl mb-4">👥</div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Nenhum usuário encontrado</h3>
          <p className="text-gray-500">Nenhum usuário cadastrado no sistema</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Usuário</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Email</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Função</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-5 py-3 text-sm font-medium text-gray-900 dark:text-white">{user.name}</td>
                <td className="px-5 py-3 text-sm text-gray-600 dark:text-gray-300">{user.email}</td>
                <td className="px-5 py-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRoleBadge(user.role)}`}>
                    {getRoleLabel(user.role)}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <button
                    onClick={() => onEdit(user)}
                    className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition"
                    title="Editar Permissões"
                  >
                    <FiEdit2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}