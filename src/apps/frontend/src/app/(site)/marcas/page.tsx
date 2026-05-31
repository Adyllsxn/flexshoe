'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { 
  FiChevronRight, 
  FiHome, 
  FiShoppingBag
} from 'react-icons/fi';
import { BRANDS, PAGE_META } from './_constants/marcas';

export default function MarcasPage() {
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100 bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-black">{PAGE_META.title}</h1>
              <p className="text-gray-500 mt-2">{PAGE_META.subtitle}</p>
            </div>
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-black transition flex items-center gap-1">
                <FiHome className="text-xs" />
                {PAGE_META.breadcrumb.home}
              </Link>
              <FiChevronRight className="text-xs text-gray-400" />
              <span className="text-black font-medium">{PAGE_META.breadcrumb.current}</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Grid de Marcas */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {BRANDS.map((brand) => (
              <div
                key={brand.id}
                className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-500 hover:shadow-xl"
                onMouseEnter={() => setHoveredBrand(brand.id)}
                onMouseLeave={() => setHoveredBrand(null)}
              >
                {/* Background com imagem da marca */}
                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  <div className="relative w-full h-full">
                    <Image
                      src={brand.coverImage}
                      alt={brand.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="relative z-10 p-6 md:p-8">
                  {/* Header da marca */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      {/* Logo placeholder - ícone */}
                      <div className="w-16 h-16 bg-gray-900 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                        {brand.name.charAt(0)}
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-black">{brand.name}</h2>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-sm text-gray-500">{brand.products} produtos</span>
                          <span className="text-xs text-green-600 font-medium">{brand.discount}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Botão Ver produtos */}
                    <Link
                      href={`/produtos?marca=${brand.id}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-all duration-300 group/btn"
                    >
                      <span>Ver Produtos</span>
                      <FiShoppingBag className="text-sm transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>

                  {/* Descrição */}
                  <p className="text-gray-500 text-sm mb-6 max-w-2xl">
                    {brand.description}
                  </p>

                  {/* Cores da marca */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-xs text-gray-400">Cores icônicas:</span>
                    <div className="flex gap-2">
                      {brand.colors.map((color, idx) => (
                        <div
                          key={idx}
                          className="w-6 h-6 rounded-full border border-gray-200 shadow-sm"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Produtos em destaque */}
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-black uppercase tracking-wider">
                        Produtos em Destaque
                      </h3>
                      <div className="h-px flex-1 ml-4 bg-gradient-to-r from-gray-200 to-transparent" />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {brand.featured.map((product, idx) => (
                        <Link
                          key={idx}
                          href="/produtos"
                          className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 group/product"
                        >
                          <div className="relative w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-contain p-2 transition-transform duration-300 group-hover/product:scale-110"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-black text-sm">{product.name}</h4>
                            <div className="flex items-baseline gap-2 mt-1">
                              <span className="text-sm font-bold text-black">{product.price}</span>
                              {product.oldPrice && (
                                <span className="text-xs text-gray-400 line-through">{product.oldPrice}</span>
                              )}
                            </div>
                          </div>
                          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center opacity-0 group-hover/product:opacity-100 transition-all duration-300">
                            <FiShoppingBag className="text-white text-sm" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Popularidade bar */}
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Popularidade</span>
                      <span>{brand.popularity}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-black h-1.5 rounded-full transition-all duration-700"
                        style={{ width: hoveredBrand === brand.id ? `${brand.popularity}%` : '0%' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}