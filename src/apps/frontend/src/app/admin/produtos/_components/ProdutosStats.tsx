'use client';

import { FiPackage, FiBox, FiDollarSign, FiTag } from 'react-icons/fi';
import { formatPrice } from '../_constants/produtos';
import type { Product } from '@/lib/modules/product';

interface ProdutosStatsProps {
  products: Product[];
}

export default function ProdutosStats({ products }: ProdutosStatsProps) {
  const activeProducts = products.filter(p => p.active && !p.deletedAt);
  const totalValue = activeProducts.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const totalStock = activeProducts.reduce((sum, p) => sum + p.stock, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <FiPackage className="text-blue-600 dark:text-blue-400" size={18} />
          </div>
          <div>
            <p className="text-xs text-gray-400">Total de Produtos</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{activeProducts.length}</p>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
            <FiBox className="text-green-600 dark:text-green-400" size={18} />
          </div>
          <div>
            <p className="text-xs text-gray-400">Estoque Total</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{totalStock}</p>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
            <FiDollarSign className="text-purple-600 dark:text-purple-400" size={18} />
          </div>
          <div>
            <p className="text-xs text-gray-400">Valor em Estoque</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{formatPrice(totalValue)}</p>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
            <FiTag className="text-orange-600 dark:text-orange-400" size={18} />
          </div>
          <div>
            <p className="text-xs text-gray-400">Marcas</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">
              {new Set(products.filter(p => !p.deletedAt).map(p => p.brandId)).size}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}