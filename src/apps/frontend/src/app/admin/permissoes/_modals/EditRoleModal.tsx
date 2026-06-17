'use client';

import { FiX, FiSave } from 'react-icons/fi';
import { getRoleLabel } from '../_constants/permissoes';
import type { UserPermission } from '@/lib/modules/permission';

interface EditRoleModalProps {
  isOpen: boolean;
  user: UserPermission | null;
  selectedRole: string;
  roles: string[];
  saving: boolean;
  onClose: () => void;
  onRoleChange: (role: string) => void;
  onSave: () => void;
}

export default function EditRoleModal({
  isOpen,
  user,
  selectedRole,
  roles,
  saving,
  onClose,
  onRoleChange,
  onSave,
}: EditRoleModalProps) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Editar Função - {user.name}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <FiX size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Função do Usuário
            </label>
            <select
              value={selectedRole}
              onChange={(e) => onRoleChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {getRoleLabel(role)}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-400 mt-1">
              {selectedRole === 'admin' && 'Administrador: Acesso total ao sistema'}
              {selectedRole === 'employee' && 'Funcionário: Acesso limitado ao sistema'}
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Permissões</h4>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">Produtos</span>
                <span className={selectedRole === 'admin' ? 'text-green-600' : 'text-yellow-600'}>
                  {selectedRole === 'admin' ? '✅ Completo' : '⚠️ Limitado'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">Pedidos</span>
                <span className={selectedRole === 'admin' ? 'text-green-600' : 'text-yellow-600'}>
                  {selectedRole === 'admin' ? '✅ Completo' : '⚠️ Limitado'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">Usuários</span>
                <span className={selectedRole === 'admin' ? 'text-green-600' : 'text-red-600'}>
                  {selectedRole === 'admin' ? '✅ Completo' : '❌ Sem acesso'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">Relatórios</span>
                <span className={selectedRole === 'admin' ? 'text-green-600' : 'text-red-600'}>
                  {selectedRole === 'admin' ? '✅ Completo' : '❌ Sem acesso'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">Configurações</span>
                <span className={selectedRole === 'admin' ? 'text-green-600' : 'text-red-600'}>
                  {selectedRole === 'admin' ? '✅ Completo' : '❌ Sem acesso'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Cancelar
          </button>
          <button
            onClick={onSave}
            disabled={saving || selectedRole === user.role}
            className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 flex items-center gap-2 disabled:opacity-50"
          >
            <FiSave size={14} />
            {saving ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </div>
    </div>
  );
}