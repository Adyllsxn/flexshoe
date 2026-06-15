'use client';

import Link from 'next/link';
import { FiChevronLeft, FiChevronRight, FiEye } from 'react-icons/fi';
import { getStatusColor, getStatusLabel, formatPrice, formatDate, ITEMS_PER_PAGE } from '../_constants/orders';
import type { Order } from '@/lib/modules/order';

interface OrdersTableProps {
  orders: Order[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  startIndex: number;
  loading: boolean;
  onPageChange: (page: number) => void;
}

export default function OrdersTable({
  orders,
  currentPage,
  totalPages,
  totalItems,
  startIndex,
  loading,
  onPageChange,
}: OrdersTableProps) {
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="p-10 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black dark:border-white mx-auto"></div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Nenhum pedido encontrado</h3>
          <p className="text-gray-500">Tente ajustar os filtros de busca</p>
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
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Pedido</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Cliente</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Telefone</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Total</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Data</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-5 py-3 text-sm font-medium text-gray-900 dark:text-white">{order.orderNumber}</td>
                <td className="px-5 py-3 text-sm text-gray-600 dark:text-gray-300">{order.clientName}</td>
                <td className="px-5 py-3 text-sm text-gray-600 dark:text-gray-300">{order.clientPhone}</td>
                <td className="px-5 py-3 text-sm font-medium text-gray-900 dark:text-white">{formatPrice(order.total)}</td>
                <td className="px-5 py-3 text-sm text-gray-500 dark:text-gray-400">{formatDate(order.createdAt)}</td>
                <td className="px-5 py-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition inline-flex items-center gap-1"
                    title="Ver detalhes"
                  >
                    <FiEye size={16} />
                    <span className="text-xs hidden sm:inline">Detalhes</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Mostrando {startIndex + 1} a {Math.min(startIndex + ITEMS_PER_PAGE, totalItems)} de {totalItems} pedidos
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