'use client';

import Link from 'next/link';
import { FiHome } from 'react-icons/fi';
import { produtosData } from '../_constants/produtos';

export default function ProdutosHeader() {
  return (
    <div className="border-b border-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-black">
            {produtosData.title}
          </h1>
          <nav className="flex items-center gap-2 text-sm">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="text-gray-500 hover:text-black transition flex items-center gap-1">
                  <FiHome className="text-xs" />
                  {produtosData.breadcrumb.home}
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-black font-medium">{produtosData.breadcrumb.current}</li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
}