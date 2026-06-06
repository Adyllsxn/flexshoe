'use client';

import Link from 'next/link';
import { usePromoCards } from '../_hooks/usePromoCards';
import { DataSourceIndicator } from '@/components/shared/DataSourceIndicator';
import { OptimizedImage } from '@/components/shared/OptimizedImage';

export default function PromoCards() {
  const { promoMain, promoCards, loading, usingMock } = usePromoCards();

  if (loading) {
    return (
      <section className="promo-cards py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="promo-cards py-16 bg-white">
      <div className="container mx-auto px-4">
        <DataSourceIndicator usingMock={usingMock} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card principal */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 min-h-[450px] flex flex-col justify-end p-8 group">
            <div className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity duration-500">
              <OptimizedImage
                src={promoMain.image}
                alt={promoMain.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold z-10">
              Destaque
            </div>
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full mb-4">
                {promoMain.tag}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                {promoMain.title}
              </h2>
              <p className="text-gray-300 mb-6 text-sm max-w-md">
                {promoMain.description}
              </p>
              <Link
                href={promoMain.buttonLink}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg font-medium hover:gap-3 transition-all duration-300 text-sm"
              >
                {promoMain.buttonText}
                <i className="bi bi-arrow-right text-sm"></i>
              </Link>
            </div>
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/20 transition-all duration-500 pointer-events-none"></div>
          </div>

          {/* Grid de cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {promoCards.map((card, index) => {
              const bgColors = [
                'from-blue-50 to-blue-100 border-blue-200',
                'from-red-50 to-red-100 border-red-200',
                'from-green-50 to-green-100 border-green-200',
                'from-purple-50 to-purple-100 border-purple-200'
              ];
              const badges = ['Mais Vendido', 'Oferta', 'Novo', 'Premium'];
              const badgeColors = [
                'bg-blue-600',
                'bg-red-600',
                'bg-green-600',
                'bg-purple-600'
              ];
              return (
                <Link
                  key={index}
                  href={card.buttonLink}
                  className={`group relative bg-gradient-to-br ${bgColors[index]} border rounded-2xl p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 overflow-hidden`}
                >
                  <div className={`absolute top-3 right-3 ${badgeColors[index]} px-2 py-1 rounded-full text-white text-xs font-semibold shadow-sm z-10`}>
                    {badges[index]}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {/* SEM BG BRANCO - DEIXA TRANSPARENTE */}
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                      <OptimizedImage
                        src={card.image}
                        alt={card.imageAlt}
                        fill
                        sizes="96px"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-base font-bold text-gray-800 mb-1">
                        {card.title}
                      </h4>
                      <p className="text-gray-500 text-xs mb-2">{card.products}</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-gray-900">
                          {card.price}
                        </span>
                        {card.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            {card.originalPrice}
                          </span>
                        )}
                      </div>
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Estoque</span>
                          <span>{card.stock}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={`h-1.5 rounded-full transition-all duration-500 group-hover:w-full ${
                              index === 0 ? 'bg-blue-500' :
                              index === 1 ? 'bg-red-500' :
                              index === 2 ? 'bg-green-500' : 'bg-purple-500'
                            }`}
                            style={{ width: `${card.stock}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}