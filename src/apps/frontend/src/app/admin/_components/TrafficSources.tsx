'use client';

import { TRAFFIC_SOURCES } from '../_constants/dashboard';

export function TrafficSources() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
      <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-4">Fontes de Tráfego</h3>
      <div className="space-y-4">
        {TRAFFIC_SOURCES.map((source) => (
          <div key={source.name}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-400">{source.name}</span>
              <span className="font-medium text-gray-800 dark:text-white">{source.percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="h-2 rounded-full transition-all duration-500"
                style={{ width: `${source.percentage}%`, backgroundColor: source.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}