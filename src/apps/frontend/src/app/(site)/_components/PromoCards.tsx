'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PROMO_MAIN, PROMO_CARDS } from '../_constants/promoCards';

export default function PromoCards() {
  return (
    <section className="promo-cards section py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Card principal - esquerdo */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 p-8 md:p-12 animate-fade-in-right">
            <div className="relative z-10 max-w-md">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium mb-4">
                {PROMO_MAIN.tag}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {PROMO_MAIN.title}
              </h2>
              <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                {PROMO_MAIN.description}
              </p>
              <Link
                href={PROMO_MAIN.buttonLink}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-semibold hover:gap-3 transition-all duration-300 group/link"
              >
                {PROMO_MAIN.buttonText}
                <i className="bi bi-arrow-right text-sm group-hover/link:translate-x-1 transition-transform"></i>
              </Link>
            </div>
            {/* Imagem de fundo com efeito */}
            <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 group-hover:opacity-30 transition-opacity duration-500">
              <Image
                src={PROMO_MAIN.image}
                alt={PROMO_MAIN.imageAlt}
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Grid de cards - direito */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PROMO_CARDS.map((card, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl bg-white border border-gray-100 p-4 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${card.delay}s` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-black mb-1">{card.title}</h4>
                    <p className="text-gray-500 text-sm mb-3">{card.products}</p>
                    <Link
                      href={card.buttonLink}
                      className="inline-flex items-center gap-1 text-sm font-medium text-black hover:gap-2 transition-all duration-300 group/link"
                    >
                      {card.buttonText}
                      <i className="bi bi-arrow-right text-xs group-hover/link:translate-x-1 transition-transform"></i>
                    </Link>
                  </div>
                  <div className="relative w-20 h-20">
                    <Image
                      src={card.image}
                      alt={card.imageAlt}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
                {/* Efeito de overlay no hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-right {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-right {
          animation: fade-in-right 0.6s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}