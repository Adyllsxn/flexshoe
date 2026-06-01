'use client';

import Link from 'next/link';
import { TOP_PRODUCTS } from '../_constants/dashboard';

export function TopProducts() {
  const maxSales = TOP_PRODUCTS[0].sales;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white">Produtos Mais Vendidos</h3>
        <Link href="/admin/produtos" className="text-xs text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition">
          Ver todos →
        </Link>
      </div>
      <div className="p-5">
        <div className="space-y-4">
          {TOP_PRODUCTS.map((product, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-6 text-sm font-medium text-gray-500 dark:text-gray-400">{idx + 1}º</div>
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-800 dark:text-white font-medium">{product.name}</span>
                  <span className="text-gray-600 dark:text-gray-400">{product.sales} vendas</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                  <div 
                    className="h-1.5 rounded-full bg-black dark:bg-white transition-all duration-500"
                    style={{ width: `${(product.sales / maxSales) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}