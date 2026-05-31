'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaInstagram, FaWhatsapp, FaTwitter } from 'react-icons/fa';
import { Mail, Phone, MapPin, Clock, CreditCard, Shield, Truck, ChevronUp } from 'lucide-react';
import Waves from './_sections/Waves';
import { FOOTER_COLUMNS } from './_constants/footer';

const iconMap = {
  FaInstagram: FaInstagram,
  FaWhatsapp: FaWhatsapp,
  FaTwitter: FaTwitter,
};

const contactIconMap = {
  MapPin: MapPin,
  Phone: Phone,
  Mail: Mail,
  Clock: Clock,
};

const benefitIconMap = {
  Truck: Truck,
  Shield: Shield,
  CreditCard: CreditCard,
};

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-black text-white mt-auto overflow-hidden">
      <Waves />

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Grid principal - 4 colunas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Coluna 1 - Logo e descrição */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold hover:opacity-80 transition inline-block">
              {FOOTER_COLUMNS.logo.title}
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              {FOOTER_COLUMNS.logo.description}
            </p>
            <div className="flex gap-3">
              {FOOTER_COLUMNS.social.map((social) => {
                const Icon = iconMap[social.icon as keyof typeof iconMap];
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110 group"
                  >
                    <Icon className="h-4 w-4 text-gray-400 group-hover:text-white transition" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Coluna 2 - Navegação */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{FOOTER_COLUMNS.navigation.title}</h3>
            <ul className="space-y-2">
              {FOOTER_COLUMNS.navigation.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition text-sm group inline-flex items-center gap-1">
                    <span className="w-0 group-hover:w-2 h-px bg-white transition-all duration-300"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3 - Contato */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{FOOTER_COLUMNS.contact.title}</h3>
            <ul className="space-y-3">
              {FOOTER_COLUMNS.contact.items.map((item, idx) => {
                const Icon = contactIconMap[item.icon as keyof typeof contactIconMap];
                const content = (
                  <>
                    <Icon className="h-4 w-4 text-gray-400 group-hover:text-white transition" />
                    <span className="text-gray-400 group-hover:text-white transition text-sm">{item.text}</span>
                  </>
                );
                return (
                  <li key={idx} className="flex items-start gap-3 group">
                    {item.href ? (
                      <a href={item.href} className="flex items-center gap-3">
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-center gap-3">
                        {content}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Coluna 4 - Newsletter e Benefícios */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{FOOTER_COLUMNS.newsletter.title}</h3>
            <p className="text-gray-400 text-sm">{FOOTER_COLUMNS.newsletter.description}</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder={FOOTER_COLUMNS.newsletter.placeholder}
                className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-white transition"
              />
              <button className="px-4 py-2 bg-white text-black rounded-lg text-sm font-semibold hover:bg-gray-200 transition cursor-pointer">
                {FOOTER_COLUMNS.newsletter.buttonText}
              </button>
            </div>
            <div className="pt-4 space-y-2">
              {FOOTER_COLUMNS.benefits.map((benefit, index) => {
                const Icon = benefitIconMap[benefit.icon as keyof typeof benefitIconMap];
                return (
                  <div key={index} className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-400 text-xs">{benefit.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-8" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} {FOOTER_COLUMNS.logo.title}. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            {FOOTER_COLUMNS.legal.map((link) => (
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

      {/* Botão de scroll to top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-10 h-10 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gray-800 transition-all duration-300 hover:scale-110 group z-50 cursor-pointer border border-white/20 shadow-lg"
          aria-label="Voltar ao topo"
        >
          <ChevronUp className="h-5 w-5 text-white group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}
    </footer>
  );
}