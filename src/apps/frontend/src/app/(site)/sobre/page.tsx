'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { 
  FiHome
} from 'react-icons/fi';
import { sobreData } from './_constants/sobre';

export default function SobrePage() {
  const [counters, setCounters] = useState(sobreData.stats.map(() => 0));
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            sobreData.stats.forEach((stat, idx) => {
              let start = 0;
              const end = stat.finalValue;
              const duration = 2000;
              const increment = end / (duration / 16);
              
              const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                  setCounters(prev => {
                    const newCounters = [...prev];
                    newCounters[idx] = end;
                    return newCounters;
                  });
                  clearInterval(timer);
                } else {
                  setCounters(prev => {
                    const newCounters = [...prev];
                    newCounters[idx] = Math.floor(start);
                    return newCounters;
                  });
                }
              }, 16);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Page Title - fundo branco */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-black">
              {sobreData.title}
            </h1>
            <nav className="flex items-center gap-2 text-sm">
              <ol className="flex items-center gap-2">
                <li>
                  <Link href="/" className="text-gray-500 hover:text-black transition flex items-center gap-1">
                    <FiHome className="text-xs" />
                    Home
                  </Link>
                </li>
                <li className="text-gray-400">/</li>
                <li className="text-black font-medium">{sobreData.title}</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <span className="text-sm uppercase tracking-wider text-gray-400 mb-2 block">
              {sobreData.about.smallTitle}
            </span>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="lg:pr-8">
                <h2 className="text-3xl md:text-4xl font-bold text-black leading-tight">
                  {sobreData.about.title}
                </h2>
              </div>
              <div>
                <p className="text-gray-500 leading-relaxed">
                  {sobreData.about.description}
                </p>
              </div>
            </div>
          </div>

          {/* Cards Grid - estilo igual ao InfoCards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {sobreData.cards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl p-6 transition-all duration-500 hover:-translateY-2 hover:shadow-xl overflow-hidden cursor-pointer"
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
                    {/* Ícone pequeno */}
                    <div className="mb-4">
                      <Icon className="text-3xl text-black" />
                    </div>
                    
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
      </div>

      {/* Stats Section */}
      <div ref={statsRef} className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {sobreData.stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full mb-4 shadow-sm">
                    <Icon className="text-black text-xl" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-black mb-2">
                    {counters[idx]}+
                  </div>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              O que nossos clientes dizem
            </h2>
            <div className="w-16 h-0.5 bg-black mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sobreData.testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-all duration-300">
                <div className="mb-4">
                  <svg className="w-8 h-8 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <h4 className="font-bold text-black">{testimonial.name}</h4>
                  <p className="text-gray-400 text-xs">{testimonial.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}