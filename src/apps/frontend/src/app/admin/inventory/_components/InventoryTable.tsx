'use client';

import { FiEdit2, FiTrash2, FiRotateCcw, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { getStockBadge, getStatusBadge, getStatusText, ITEMS_PER_PAGE } from '../_constants/inventory';
import type { InventoryItem } from '@/lib/modules/inventory';

interface InventoryTableProps {
  inventory: InventoryItem[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  startIndex: number;
  loading: boolean;
  onPageChange: (page: number) => void;
  onEdit: (item: InventoryItem) => void;
  onDelete: (id: string, name: string) => void;
  onRestore: (id: string, name: string) => void;
  canEdit: boolean;
  canDelete: boolean;
}

export default function InventoryTable({
  inventory,
  currentPage,
  totalPages,
  totalItems,
  startIndex,
  loading,
  onPageChange,
  onEdit,
  onDelete,
  onRestore,
  canEdit,
  canDelete,
}: InventoryTableProps) {
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="p-10 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black dark:border-white mx-auto"></div>
        </div>
      </div>
    );
  }

  if (inventory.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Nenhum item no inventário</h3>
          <p className="text-gray-500">Adicione itens para começar a gerenciar seu estoque</p>
        </div>
      </div>
    );
  }

  const getProductName = (item: InventoryItem) => {
    if (item.product) {
      return item.product.name;
    }
    return `Produto ${item.productId.slice(0, 8)}...`;
  };

  const getBrandName = (item: InventoryItem) => {
    if (item.product?.brand) {
      return item.product.brand.name;
    }
    return 'N/A';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Produto</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Marca</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Tamanho</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Cor</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">SKU</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Estoque</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Reservado</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Disponível</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
              {(canEdit || canDelete) && (
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Ações</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {inventory.map((item) => {
              const available = item.stock - item.reserved;
              const productName = getProductName(item);
              const brandName = getBrandName(item);
              
              return (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-5 py-3 text-sm font-medium text-gray-900 dark:text-white">{productName}</td>
                  <td className="px-5 py-3 text-sm text-gray-600 dark:text-gray-300">{brandName}</td>
                  <td className="px-5 py-3 text-sm text-gray-600 dark:text-gray-300">{item.size}</td>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      <div className="w-2 h-2 rounded-full" style={{ 
                        backgroundColor: item.color === 'Preto' ? '#1a1a1a' : 
                                     item.color === 'Branco' ? '#ffffff' : 
                                     item.color === 'Vermelho' ? '#dc2626' :
                                     item.color === 'Azul' ? '#2563eb' :
                                     item.color === 'Verde' ? '#16a34a' :
                                     item.color === 'Amarelo' ? '#eab308' :
                                     item.color === 'Roxo' ? '#8b5cf6' :
                                     item.color === 'Rosa' ? '#ec4899' :
                                     item.color === 'Cinza' ? '#6b7280' :
                                     item.color === 'Marrom' ? '#78350f' :
                                     '#cccccc' 
                      }} />
                      {item.color}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm font-mono text-gray-500 dark:text-gray-400">{item.sku}</td>
                  <td className="px-5 py-3 text-sm font-medium text-gray-900 dark:text-white">{item.stock}</td>
                  <td className="px-5 py-3 text-sm text-gray-600 dark:text-gray-300">{item.reserved}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStockBadge(item.stock, item.reserved)}`}>
                      {available}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(item.active)}`}>
                      {getStatusText(item.active)}
                    </span>
                  </td>
                  {(canEdit || canDelete) && (
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        {canEdit && (
                          <button
                            onClick={() => onEdit(item)}
                            className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition"
                            title="Editar"
                          >
                            <FiEdit2 size={16} />
                          </button>
                        )}
                        {canDelete && item.active && (
                          <button
                            onClick={() => onDelete(item.id, productName)}
                            className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition"
                            title="Desativar"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        )}
                        {canDelete && !item.active && (
                          <button
                            onClick={() => onRestore(item.id, productName)}
                            className="p-1 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 transition"
                            title="Reativar"
                          >
                            <FiRotateCcw size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Mostrando {startIndex + 1} a {Math.min(startIndex + ITEMS_PER_PAGE, totalItems)} de {totalItems} itens
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
                if (totalPages <= 5) pageNum = i + 1;
                else if (currentPage <= 3) pageNum = i + 1;
                else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                else pageNum = currentPage - 2 + i;
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