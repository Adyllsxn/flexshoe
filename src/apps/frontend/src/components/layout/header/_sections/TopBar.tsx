'use client';

import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { TOP_BAR_MESSAGES, TOP_BAR_CONTACT } from '../_constants/topbar';

export function TopBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % TOP_BAR_MESSAGES.length);
        setIsVisible(true);
      }, 300);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-100 text-gray-700 py-2 text-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Contato - esconde no mobile */}
          <div className="hidden md:flex items-center gap-2">
            <span className="text-gray-500">{TOP_BAR_CONTACT.text}</span>
            <a href={`tel:${TOP_BAR_CONTACT.phone}`} className="flex items-center gap-1 hover:text-black transition">
              <Phone className="h-3 w-3" />
              <span>{TOP_BAR_CONTACT.phone}</span>
            </a>
          </div>

          {/* Mensagem - centraliza no mobile */}
          <div className="w-full md:w-auto text-center md:text-right font-medium">
            <div className={`transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
              {TOP_BAR_MESSAGES[currentIndex]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}