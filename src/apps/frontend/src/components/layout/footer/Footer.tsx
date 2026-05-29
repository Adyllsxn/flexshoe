'use client';

import Link from 'next/link';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import Waves from './_sections/Waves';
import { SITE_NAME, FOOTER_NAVIGATION, FOOTER_SOCIAL, FOOTER_LEGAL } from './_constants/footer';

export function Footer() {
  return (
    <footer className="relative bg-black text-white mt-auto overflow-hidden">
      <Waves />

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold hover:opacity-80 transition">
            {SITE_NAME}
          </Link>
        </div>

        {/* Links de navegação */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {FOOTER_NAVIGATION.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-400 hover:text-white transition text-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Redes sociais */}
        <div className="flex justify-center gap-4 mb-12">
          {FOOTER_SOCIAL.map((social) => {
            const Icon = social.icon === 'FaInstagram' ? FaInstagram : FaWhatsapp;
            return (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <Icon className="h-5 w-5" />
              </a>
            );
          })}
        </div>

        {/* Footer bottom */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm order-2 md:order-1">
              © {new Date().getFullYear()} {SITE_NAME}. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 order-1 md:order-2">
              {FOOTER_LEGAL.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-500 hover:text-white transition text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}