'use client';

import Link from 'next/link';
import { PERMISSOES_CONFIG } from '../_constants/permissoes';

export default function PermissoesHeader() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{PERMISSOES_CONFIG.title}</h1>
      <nav className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        <Link href="/admin" className="hover:text-black dark:hover:text-white transition">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800 dark:text-gray-200 font-medium">{PERMISSOES_CONFIG.breadcrumb.current}</span>
      </nav>
      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{PERMISSOES_CONFIG.subtitle}</p>
    </div>
  );
}