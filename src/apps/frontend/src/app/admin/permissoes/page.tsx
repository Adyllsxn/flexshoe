'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  FiSave,
  FiCheck,
  FiX,
  FiEdit2
} from 'react-icons/fi';
import { toast } from 'sonner';
import { PERMISSOES_CONFIG, PERMISSOES_DATA, PERMISSION_MODULES, getRoleBadge } from './_constants/permissoes';

interface Permissao {
  id: number;
  user: string;
  email: string;
  role: string;
  permissions: {
    products: boolean;
    orders: boolean;
    users: boolean;
    reports: boolean;
    settings: boolean;
  };
}

export default function PermissoesPage() {
  const [permissoes, setPermissoes] = useState<Permissao[]>(PERMISSOES_DATA);
  const [editingUser, setEditingUser] = useState<Permissao | null>(null);
  const [tempPermissions, setTempPermissions] = useState<Permissao['permissions'] | null>(null);

  const openEditModal = (user: Permissao) => {
    setEditingUser(user);
    setTempPermissions({ ...user.permissions });
  };

  const handleTogglePermission = (moduleId: string) => {
    if (tempPermissions) {
      setTempPermissions({
        ...tempPermissions,
        [moduleId]: !tempPermissions[moduleId as keyof typeof tempPermissions]
      });
    }
  };

  const handleSavePermissions = () => {
    if (editingUser && tempPermissions) {
      setPermissoes(permissoes.map(p => 
        p.id === editingUser.id 
          ? { ...p, permissions: tempPermissions }
          : p
      ));
      setEditingUser(null);
      setTempPermissions(null);
      toast.success('Permissões atualizadas com sucesso!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{PERMISSOES_CONFIG.title}</h1>
          <nav className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            <Link href="/admin" className="hover:text-black dark:hover:text-white transition">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800 dark:text-gray-200 font-medium">{PERMISSOES_CONFIG.breadcrumb.current}</span>
          </nav>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{PERMISSOES_CONFIG.subtitle}</p>
        </div>
      </div>

      {/* Tabela de Permissões */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Usuário</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Email</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Função</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Permissões</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {permissoes.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-5 py-3 text-sm font-medium text-gray-900 dark:text-white">{user.user}</td>
                  <td className="px-5 py-3 text-sm text-gray-600 dark:text-gray-300">{user.email}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRoleBadge(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex flex-wrap gap-2">
                      {PERMISSION_MODULES.map((module) => (
                        <span
                          key={module.id}
                          className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${
                            user.permissions[module.id as keyof typeof user.permissions]
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                          }`}
                        >
                          {user.permissions[module.id as keyof typeof user.permissions] ? (
                            <FiCheck size={10} />
                          ) : (
                            <FiX size={10} />
                          )}
                          {module.label}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => openEditModal(user)}
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

      {/* Modal Editar Permissões */}
      {editingUser && tempPermissions && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Editar Permissões - {editingUser.user}
            </h2>
            <div className="space-y-3">
              {PERMISSION_MODULES.map((module) => (
                <div key={module.id} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">{module.label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{module.description}</p>
                  </div>
                  <button
                    onClick={() => handleTogglePermission(module.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      tempPermissions[module.id as keyof typeof tempPermissions]
                        ? 'bg-black dark:bg-white'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      tempPermissions[module.id as keyof typeof tempPermissions] ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setEditingUser(null);
                  setTempPermissions(null);
                }}
                className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={handleSavePermissions}
                className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 flex items-center gap-2"
              >
                <FiSave size={14} />
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}