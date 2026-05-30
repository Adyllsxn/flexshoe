'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaInstagram, FaWhatsapp, FaTwitter } from 'react-icons/fa';
import { Mail, Phone, MapPin, Clock, CreditCard, Shield, Truck, ChevronUp } from 'lucide-react';
import Waves from './_sections/Waves';
import { 
  SITE_NAME, 
  SITE_DESCRIPTION,
  FOOTER_NAVIGATION, 
  FOOTER_SOCIAL, 
  FOOTER_LEGAL, 
  FOOTER_CONTACT,
  FOOTER_NEWSLETTER,
  FOOTER_BENEFITS
} from './_constants/footer';

const iconMap = {
  FaInstagram: FaInstagram,
  FaWhatsapp: FaWhatsapp,
  FaTwitter: FaTwitter,
};

const benefitIcons = {
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
              {SITE_NAME}
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              {SITE_DESCRIPTION}
            </p>
            <div className="flex gap-3">
              {FOOTER_SOCIAL.map((social) => {
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

          {/* Coluna 2 - Links Rápidos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Links Rápidos</h3>
            <ul className="space-y-2">
              {FOOTER_NAVIGATION.map((link) => (
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
            <h3 className="text-lg font-semibold">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 group">
                <MapPin className="h-4 w-4 text-gray-400 group-hover:text-white transition mt-0.5" />
                <span className="text-gray-400 group-hover:text-white transition text-sm">{FOOTER_CONTACT.address}</span>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone className="h-4 w-4 text-gray-400 group-hover:text-white transition" />
                <a href={`tel:${FOOTER_CONTACT.phone}`} className="text-gray-400 group-hover:text-white transition text-sm">
                  {FOOTER_CONTACT.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail className="h-4 w-4 text-gray-400 group-hover:text-white transition" />
                <a href={`mailto:${FOOTER_CONTACT.email}`} className="text-gray-400 group-hover:text-white transition text-sm">
                  {FOOTER_CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <Clock className="h-4 w-4 text-gray-400 group-hover:text-white transition" />
                <span className="text-gray-400 group-hover:text-white transition text-sm">{FOOTER_CONTACT.hours}</span>
              </li>
            </ul>
          </div>

          {/* Coluna 4 - Newsletter e Benefícios */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{FOOTER_NEWSLETTER.title}</h3>
            <p className="text-gray-400 text-sm">{FOOTER_NEWSLETTER.description}</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder={FOOTER_NEWSLETTER.placeholder}
                className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-white transition"
              />
              <button className="px-4 py-2 bg-white text-black rounded-lg text-sm font-semibold hover:bg-gray-200 transition cursor-pointer">
                {FOOTER_NEWSLETTER.buttonText}
              </button>
            </div>
            <div className="pt-4 space-y-2">
              {FOOTER_BENEFITS.map((benefit, index) => {
                const Icon = benefitIcons[benefit.icon as keyof typeof benefitIcons];
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
            © {new Date().getFullYear()} {SITE_NAME}. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
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