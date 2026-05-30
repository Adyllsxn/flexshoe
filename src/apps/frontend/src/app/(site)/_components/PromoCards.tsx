'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PROMO_MAIN, PROMO_CARDS } from '../_constants/promoCards';

export default function PromoCards() {
  return (
    <section className="promo-cards py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card principal - esquerdo */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 min-h-[450px] flex flex-col justify-end p-8 group">
            <div className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity duration-500">
              <Image
                src={PROMO_MAIN.image}
                alt={PROMO_MAIN.imageAlt}
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">
              Destaque
            </div>
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full mb-4">
                {PROMO_MAIN.tag}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                {PROMO_MAIN.title}
              </h2>
              <p className="text-gray-300 mb-6 text-sm max-w-md">
                {PROMO_MAIN.description}
              </p>
              <Link
                href={PROMO_MAIN.buttonLink}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg font-medium hover:gap-3 transition-all duration-300 text-sm"
              >
                {PROMO_MAIN.buttonText}
                <i className="bi bi-arrow-right text-sm"></i>
              </Link>
            </div>
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/20 transition-all duration-500 pointer-events-none"></div>
          </div>

          {/* Grid de cards pequenos - lado direito */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PROMO_CARDS.map((card, index) => {
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
                  {/* Badge */}
                  <div className={`absolute top-3 right-3 ${badgeColors[index]} px-2 py-1 rounded-full text-white text-xs font-semibold shadow-sm`}>
                    {badges[index]}
                  </div>
                  
                  {/* Conteúdo */}
                  <div className="flex items-center gap-4">
                    {/* Imagem */}
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <Image
                        src={card.image}
                        alt={card.imageAlt}
                        fill
                        className="object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-md"
                      />
                    </div>
                    
                    {/* Informações */}
                    <div className="flex-1">
                      <h4 className="text-base font-bold text-gray-800 mb-1">
                        {card.title}
                      </h4>
                      <p className="text-gray-500 text-xs mb-2">{card.products}</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-gray-900">
                          {card.price}
                        </span>
                        <span className="text-xs text-gray-400 line-through">
                          {card.originalPrice}
                        </span>
                      </div>
                      {/* Barra de progresso de estoque */}
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
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Efeito de brilho suave */}
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