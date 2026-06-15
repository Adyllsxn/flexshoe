'use client';

import Image from 'next/image';
import { FiEdit2, FiTrash2, FiChevronLeft, FiChevronRight, FiPackage, FiRotateCcw } from 'react-icons/fi';
import { getStatusBadge, getStatusText, formatPrice, ITEMS_PER_PAGE } from '../_constants/produtos';
import { getImageUrl } from '@/lib/api.connection';
import type { Product } from '@/lib/modules/product';

interface ProdutosTableProps {
  produtos: Product[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  startIndex: number;
  loading: boolean;
  onPageChange: (page: number) => void;
  onEdit: (produto: Product) => void;
  onDelete: (id: string, name: string) => void;
  onRestore: (id: string, name: string) => void;
  canEdit: boolean;
  canDelete: boolean;
}

export default function ProdutosTable({
  produtos,
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
}: ProdutosTableProps) {
  const getGenderLabel = (gender: string) => {
    switch(gender) {
      case 'male': return 'Masculino';
      case 'female': return 'Feminino';
      case 'unisex': return 'Unisex';
      case 'kids': return 'Infantil';
      default: return gender;
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="p-10 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black dark:border-white mx-auto"></div>
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
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Imagem</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Nome</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Marca</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Gênero</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Preço</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Estoque</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
              {(canEdit || canDelete) && (
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Ações</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {produtos.map((produto) => {
              const imageUrl = getImageUrl(produto.mainImage);
              return (
                <tr key={produto.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-5 py-3">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                      {imageUrl && imageUrl !== '/images/placeholder.svg' ? (
                        <img 
                          src={imageUrl} 
                          alt={produto.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      ) : null}
                      <FiPackage className="text-gray-400 hidden" size={20} />
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm font-medium text-gray-900 dark:text-white">{produto.name}</td>
                  <td className="px-5 py-3 text-sm text-gray-600 dark:text-gray-300">{produto.brand?.name || '-'}</td>
                  <td className="px-5 py-3 text-sm text-gray-600 dark:text-gray-300">{getGenderLabel(produto.gender)}</td>
                  <td className="px-5 py-3 text-sm font-medium text-gray-900 dark:text-white">{formatPrice(produto.price)}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${produto.stock < 10 ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
                      {produto.stock} unidades
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(produto.active, produto.deletedAt)}`}>
                      {getStatusText(produto.active, produto.deletedAt)}
                    </span>
                  </td>
                  {(canEdit || canDelete) && (
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        {canEdit && (
                          <button onClick={() => onEdit(produto)} className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition" title="Editar">
                            <FiEdit2 size={16} />
                          </button>
                        )}
                        {canDelete && !produto.deletedAt && (
                          <button onClick={() => onDelete(produto.id, produto.name)} className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition" title="Desativar">
                            <FiTrash2 size={16} />
                          </button>
                        )}
                        {canDelete && produto.deletedAt && (
                          <button onClick={() => onRestore(produto.id, produto.name)} className="p-1 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 transition" title="Restaurar">
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
            Mostrando {startIndex + 1} a {Math.min(startIndex + ITEMS_PER_PAGE, totalItems)} de {totalItems} produtos
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition">
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
                  <button key={pageNum} onClick={() => onPageChange(pageNum)} className={`w-8 h-8 rounded-lg text-sm transition ${currentPage === pageNum ? 'bg-black dark:bg-white text-white dark:text-black' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition">
              <FiChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}