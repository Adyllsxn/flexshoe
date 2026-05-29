'use client';

import { TopBar } from './_sections/TopBar';
import { MainHeader } from './_sections/MainHeader';
import { Navigation } from './_sections/Navigation';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <TopBar />
      <div className="border-b border-gray-100">
        <MainHeader />
        <div className="container mx-auto px-4 pb-3">
          <Navigation />
        </div>
      </div>
    </header>
  );
}