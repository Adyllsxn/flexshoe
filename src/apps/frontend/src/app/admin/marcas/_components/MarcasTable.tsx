'use client';

import { FiEdit2, FiTrash2, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { getStatusBadge, getStatusText, ITEMS_PER_PAGE } from '../_constants/marcas';
import type { Brand } from '@/lib/modules/brand';

interface MarcasTableProps {
  marcas: Brand[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  startIndex: number;
  onPageChange: (page: number) => void;
  onEdit: (marca: Brand) => void;
  onDelete: (id: string, name: string, currentActive: boolean) => void;
  canEdit: boolean;
  canDelete: boolean;
}

export default function MarcasTable({ 
  marcas, 
  currentPage, 
  totalPages, 
  totalItems,
  startIndex,
  onPageChange,
  onEdit,
  onDelete,
  canEdit,
  canDelete
}: MarcasTableProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-AO');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Nome</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Slug</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Criado em</th>
              {(canEdit || canDelete) && (
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Ações</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {marcas.map((marca) => (
              <tr key={marca.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-5 py-3 text-sm font-medium text-gray-900 dark:text-white">{marca.name}</td>
                <td className="px-5 py-3 text-sm text-gray-500 dark:text-gray-400">{marca.slug}</td>
                <td className="px-5 py-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(marca.active)}`}>
                    {getStatusText(marca.active)}
                  </span>
                </td>
                <td className="px-5 py-3 text-sm text-gray-500 dark:text-gray-400">{formatDate(marca.createdAt)}</td>
                {(canEdit || canDelete) && (
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      {canEdit && (
                        <button
                          onClick={() => onEdit(marca)}
                          className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition"
                          title="Editar"
                        >
                          <FiEdit2 size={16} />
                        </button>
                      )}
                      {canDelete && (
                        <button
                          onClick={() => onDelete(marca.id, marca.name, marca.active)}
                          className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition"
                          title={marca.active ? 'Desativar' : 'Ativar'}
                        >
                          <FiTrash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Mostrando {startIndex + 1} a {Math.min(startIndex + ITEMS_PER_PAGE, totalItems)} de {totalItems} marcas
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <FiChevronLeft size={16} />
            </button>
            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => onPageChange(pageNum)}
                    className={`w-8 h-8 rounded-lg text-sm transition ${
                      currentPage === pageNum
                        ? 'bg-black dark:bg-white text-white dark:text-black'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <FiChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}