'use client';

import { INFO_CARDS } from '../_constants/infoCards';

export default function InfoCards() {
  return (
    <section className="info-cards py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INFO_CARDS.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-6 transition-all duration-500 hover:-translateY-2 hover:shadow-xl overflow-hidden"
              >
                {/* Ícone gigante no fundo - canto inferior direito */}
                <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  <Icon className="text-9xl text-gray-900" />
                </div>
                
                {/* Número decorativo no canto superior esquerdo */}
                <div className="absolute top-4 left-4 text-4xl font-black text-gray-100 group-hover:text-gray-200 transition-colors duration-500 select-none">
                  {(index + 1).toString().padStart(2, '0')}
                </div>
                
                {/* Conteúdo - com padding left para não sobrepor o número */}
                <div className="relative z-10 pl-8">
                  {/* Título */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {card.title}
                  </h3>
                  
                  {/* Descrição */}
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {card.description}
                  </p>
                  
                  {/* Linha decorativa animada */}
                  <div className="w-12 h-0.5 bg-gray-300 mt-4 group-hover:w-20 transition-all duration-500"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}