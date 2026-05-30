'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAVIGATION_LINKS } from '../_constants/navigation';

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-1 py-4">
      {NAVIGATION_LINKS.map((link) => {
        const isActive = pathname === link.href;
        
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`
              relative px-4 py-2 text-sm font-medium transition-all duration-300 
              ${isActive 
                ? 'text-black' 
                : 'text-gray-600 hover:text-black'
              }
              group overflow-hidden
            `}
          >
            {/* Efeito de underline deslizante */}
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left" />
            
            {/* Efeito de brilho no hover */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
            
            {/* Texto com efeito de escala */}
            <span className="relative z-10 inline-block transition-transform duration-300 group-hover:scale-105">
              {link.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}