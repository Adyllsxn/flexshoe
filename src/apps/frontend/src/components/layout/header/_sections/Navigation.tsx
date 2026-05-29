'use client';

import Link from 'next/link';
import { NAVIGATION_LINKS } from '../_constants/navigation';

export function Navigation() {
  return (
    <nav className="hidden md:flex items-center gap-8 py-4">
      {NAVIGATION_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-gray-700 hover:text-black transition-all duration-300 hover:scale-105 text-sm font-medium"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}