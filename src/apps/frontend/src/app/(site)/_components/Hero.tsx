'use client';

import Image from 'next/image';
import Link from 'next/link';
import { HERO_CONTENT } from '../_constants/hero';

export default function Hero() {
  return (
    <section className="hero-section relative">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Conteúdo esquerdo */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 leading-tight animate-slide-up">
              {HERO_CONTENT.title.prefix}{' '}
              <span className="font-light text-gray-500">{HERO_CONTENT.title.light}</span>
              <br />
              <span className="font-black bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                {HERO_CONTENT.title.bold}
              </span>
            </h1>
            <p className="text-gray-500 mb-8 max-w-lg mx-auto lg:mx-0 animate-slide-up-delay">
              {HERO_CONTENT.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 animate-slide-up-delay-2">
              <Link
                href={HERO_CONTENT.buttons.primary.href}
                className="group relative inline-flex items-center justify-center px-6 md:px-8 py-3 bg-black text-white overflow-hidden transition-all duration-300 hover:bg-transparent hover:text-black border-2 border-black text-sm md:text-base"
              >
                <span className="relative z-10">{HERO_CONTENT.buttons.primary.text}</span>
                <span className="absolute inset-0 bg-white transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></span>
              </Link>

              <Link
                href={HERO_CONTENT.buttons.secondary.href}
                className="group relative inline-flex items-center justify-center px-6 md:px-8 py-3 bg-transparent text-black overflow-hidden transition-all duration-300 hover:bg-black hover:text-white border-2 border-black text-sm md:text-base"
              >
                <span className="relative z-10">{HERO_CONTENT.buttons.secondary.text}</span>
                <span className="absolute inset-0 bg-black transform skew-x-12 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></span>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 animate-slide-up-delay-3">
              {HERO_CONTENT.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <i className={`${feature.icon} text-black text-lg`}></i>
                  <span className="text-sm text-gray-600">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Imagem direita */}
          <div className="lg:w-1/2 animate-fade-in w-full">
            <div className="relative flex justify-center w-full">
              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
                {/* Imagem principal com floating */}
                <div className="relative w-full aspect-square animate-float">
                  <Image
                    src={HERO_CONTENT.image}
                    alt="Produto"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Cards flutuantes com animação suave */}
                {HERO_CONTENT.cards.map((card, index) => (
                  <div
                    key={index}
                    className={`absolute ${card.position === 'left' ? 'top-0 -left-4 md:-left-8 animate-slide-in-left' : 'bottom-0 -right-4 md:-right-8 animate-slide-in-right'} bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-2 flex items-center gap-2 animate-float-card`}
                    style={{ animationDelay: `${card.delay}s` }}
                  >
                    <div className="relative w-8 h-8 md:w-10 md:h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Image
                        src={HERO_CONTENT.subimage}
                        alt={card.title}
                        width={30}
                        height={30}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-black">{card.title}</h4>
                      <span className="text-xs text-gray-500">{card.price}</span>
                    </div>
                  </div>
                ))}

                {/* Badge de desconto com floating */}
                <div className="absolute top-1/2 -right-2 -translate-y-1/2 bg-red-500 rounded-full w-12 h-12 md:w-14 md:h-14 flex flex-col items-center justify-center text-white shadow-lg animate-pulse-slow">
                  <span className="text-base md:text-lg font-bold">{HERO_CONTENT.badge.discount}</span>
                  <span className="text-xs">{HERO_CONTENT.badge.text}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-card {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1) translateY(-50%); }
          50% { transform: scale(1.05) translateY(-50%); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-card {
          animation: float-card 3s ease-in-out infinite;
        }
        .animate-slide-up { animation: slide-up 0.6s ease-out forwards; }
        .animate-slide-up-delay { animation: slide-up 0.6s ease-out 0.2s forwards; opacity: 0; }
        .animate-slide-up-delay-2 { animation: slide-up 0.6s ease-out 0.4s forwards; opacity: 0; }
        .animate-slide-up-delay-3 { animation: slide-up 0.6s ease-out 0.6s forwards; opacity: 0; }
        .animate-slide-in-left { animation: slide-in-left 0.6s ease-out 0.8s forwards; opacity: 0; }
        .animate-slide-in-right { animation: slide-in-right 0.6s ease-out 1s forwards; opacity: 0; }
        .animate-fade-in { animation: fade-in 0.8s ease-out 0.4s forwards; opacity: 0; }
        .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite; transform-origin: center; }
      `}</style>
    </section>
  );
}