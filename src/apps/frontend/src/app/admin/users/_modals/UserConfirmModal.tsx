'use client';

import { FiX } from 'react-icons/fi';

interface UserConfirmModalProps {
  isOpen: boolean;
  userName: string;
  action: 'delete' | 'restore';
  onConfirm: () => void;
  onCancel: () => void;
}

export default function UserConfirmModal({ isOpen, userName, action, onConfirm, onCancel }: UserConfirmModalProps) {
  if (!isOpen) return null;

  const isDelete = action === 'delete';
  const title = isDelete ? 'Desativar Usuário' : 'Restaurar Usuário';
  const message = isDelete 
    ? `Tem certeza que deseja desativar o usuário "${userName}"?`
    : `Tem certeza que deseja restaurar o usuário "${userName}"?`;
  const confirmText = isDelete ? 'Desativar' : 'Restaurar';
  const confirmClass = isDelete 
    ? 'bg-red-600 hover:bg-red-700' 
    : 'bg-green-600 hover:bg-green-700';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <FiX size={20} />
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 ${confirmClass} text-white rounded-lg text-sm font-medium`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}