'use client';

import { FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { STATS_DATA } from '../_constants/dashboard';

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {STATS_DATA.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
              </div>
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <Icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </div>
            </div>
            <div className={`mt-3 flex items-center gap-1 text-sm ${stat.positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {stat.positive ? <FiArrowUp size={14} /> : <FiArrowDown size={14} />}
              <span>{stat.change}</span>
              <span className="text-gray-400 dark:text-gray-500 text-xs">vs mês anterior</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}