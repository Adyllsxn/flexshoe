'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function useHeaderSearch() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/produtos?busca=${encodeURIComponent(searchTerm.trim())}`);
      setIsSearchOpen(false);
      setSearchTerm('');
    }
  };

  const handleMobileSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/produtos?busca=${encodeURIComponent(searchTerm.trim())}`);
      setIsSearchOpen(false);
      setSearchTerm('');
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    isSearchOpen,
    setIsSearchOpen,
    handleSearch,
    handleMobileSearch,
  };
}