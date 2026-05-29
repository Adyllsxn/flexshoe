'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { SITE_NAME } from './_constants/site';
import { TOP_BAR_MESSAGE, NAVIGATION_LINKS } from './_constants/header';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="bg-black text-white text-center py-2 text-sm">
        <div className="container mx-auto px-4">
          {TOP_BAR_MESSAGE}
        </div>
      </div>

      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-black">
            {SITE_NAME}
          </Link>

          <nav className="hidden md:flex gap-6">
            {NAVIGATION_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-black transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link href="/carrinho" className="p-2 hover:bg-gray-100 rounded-full">
            <ShoppingBag className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}