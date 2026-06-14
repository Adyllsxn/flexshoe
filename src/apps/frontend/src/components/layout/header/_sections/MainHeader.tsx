'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, X, Menu } from 'lucide-react';
import { SITE_NAME } from '../_constants/site';
import { HEADER_SEARCH } from '../_constants/search';
import { NAVIGATION_LINKS } from '../_constants/navigation';
import { useCart } from '@/lib/contexts/CartContext';
import { useHeaderSearch } from '../_hooks/useHeaderSearch';

export function MainHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, loading } = useCart();
  const {
    searchTerm,
    setSearchTerm,
    isSearchOpen,
    setIsSearchOpen,
    handleSearch,
    handleMobileSearch,
  } = useHeaderSearch();

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="text-2xl font-bold text-black flex-shrink-0">
            {SITE_NAME}
          </Link>

          {/* Busca Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={HEADER_SEARCH.placeholder}
                className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-md focus:outline-none focus:border-black transition"
              />
              <button 
                type="submit"
                className="absolute right-0 top-0 h-full px-4 bg-black text-white rounded-r-md hover:opacity-80 transition-opacity flex items-center justify-center cursor-pointer"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>

          <div className="flex items-center gap-2">
            {/* Busca Mobile - ícone */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition cursor-pointer"
            >
              <Search className="h-5 w-5" />
            </button>

            <Link href="/carrinho" className="p-2 hover:bg-gray-100 rounded-full relative transition cursor-pointer">
              <ShoppingBag className="h-5 w-5" />
              {!loading && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition cursor-pointer"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Busca Mobile - input */}
      {isSearchOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white py-3 px-4">
          <div className="relative w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={HEADER_SEARCH.placeholder}
              className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-md focus:outline-none focus:border-black transition"
              autoFocus
            />
            <button 
              onClick={handleMobileSearch}
              className="absolute right-0 top-0 h-full px-4 bg-black text-white rounded-r-md hover:opacity-80 transition-opacity flex items-center justify-center cursor-pointer"
            >
              <Search className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute left-0 top-0 h-full px-2 text-gray-400 hover:text-black transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Menu Mobile */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="absolute inset-0 bg-black/90 transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          <div className="relative h-full flex flex-col pt-20 px-6">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-2 text-white hover:text-gray-300 transition cursor-pointer"
            >
              <X className="h-8 w-8" />
            </button>
            
            <div className="flex flex-col gap-4">
              {NAVIGATION_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-2xl font-medium text-white hover:text-gray-300 transition py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}