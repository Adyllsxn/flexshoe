'use client';

import { MONTHLY_REVENUE, MAX_REVENUE } from '../_constants/dashboard';

export function RevenueChart() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-100 dark:border-gray-700">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white">Visão Geral da Receita</h3>
      </div>
      <div className="p-5">
        <div className="space-y-4">
          {MONTHLY_REVENUE.map((item) => (
            <div key={item.month} className="flex items-center gap-3">
              <div className="w-10 text-sm text-gray-600 dark:text-gray-400">{item.month}</div>
              <div className="flex-1">
                <div 
                  className="h-8 bg-black dark:bg-white rounded-md transition-all duration-500"
                  style={{ width: `${(item.value / MAX_REVENUE) * 100}%` }}
                />
              </div>
              <div className="w-20 text-right text-sm font-medium text-gray-800 dark:text-white">
                {item.value} Kz
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}