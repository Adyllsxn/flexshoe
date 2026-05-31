'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { 
  FiInfo,
  FiAlertTriangle,
  FiChevronRight,
  FiHome,
  FiCheck,
  FiMail,
  FiCheckCircle,
  FiShoppingBag,
  FiTruck,
  FiCreditCard,
  FiRepeat,
  FiShield,
  FiEdit
} from 'react-icons/fi';
import { 
  SECTIONS, 
  PAGE_META, 
  ACEITACAO, 
  PRODUTOS, 
  PEDIDOS, 
  ENTREGA, 
  TROCAS, 
  RESPONSABILIDADE, 
  ALTERACOES, 
  CONTATO_SECTION 
} from './_constants/termos';

export default function TermosPage() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute('id') || '';
        }
      });
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-black transition flex items-center gap-1">
              <FiHome className="text-xs" />
              {PAGE_META.breadcrumb.home}
            </Link>
            <FiChevronRight className="text-xs" />
            <span className="text-black font-medium">{PAGE_META.breadcrumb.current}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-3">
            {PAGE_META.title}
          </h1>
          <p className="text-gray-500 max-w-2xl">
            {PAGE_META.description}
          </p>
          <div className="mt-4">
            <span className="text-sm text-gray-400">Última atualização: {PAGE_META.lastUpdated}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className="lg:w-1/4">
            <div className="sticky top-24 bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4 px-2">Índice</h3>
              <nav className="space-y-1">
                {SECTIONS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 text-sm ${
                        activeSection === item.id
                          ? 'bg-gray-100 text-black font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="text-sm" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Conteúdo */}
          <div className="lg:w-3/4 space-y-6">
            
            {/* 1. Aceitação */}
            <section id="aceitacao" className="bg-white rounded-xl p-6 border border-gray-100 scroll-mt-24">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiCheckCircle className="text-gray-700 text-lg" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{ACEITACAO.title}</h2>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    {ACEITACAO.content}
                  </p>
                  <div className="bg-gray-50 rounded-lg p-3 flex gap-2 border border-gray-100">
                    <FiInfo className="text-gray-500 text-lg flex-shrink-0 mt-0.5" />
                    <p className="text-gray-600 text-sm">{ACEITACAO.note}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Produtos */}
            <section id="produtos" className="bg-white rounded-xl p-6 border border-gray-100 scroll-mt-24">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiShoppingBag className="text-gray-700 text-lg" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{PRODUTOS.title}</h2>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    {PRODUTOS.content}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
                    {PRODUTOS.features.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                          <Icon className="text-gray-500 text-sm" />
                          <span className="text-sm text-gray-700">{item.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Pedidos */}
            <section id="pedidos" className="bg-white rounded-xl p-6 border border-gray-100 scroll-mt-24">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiCreditCard className="text-gray-700 text-lg" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{PEDIDOS.title}</h2>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    {PEDIDOS.content}
                  </p>
                  <div className="space-y-1">
                    {PEDIDOS.steps.map((text, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <FiCheck className="text-gray-500 text-sm" />
                        <span className="text-gray-600 text-sm">{text}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 flex gap-2 mt-3 border border-gray-100">
                    <FiAlertTriangle className="text-gray-500 text-lg flex-shrink-0 mt-0.5" />
                    <p className="text-gray-600 text-sm">{PEDIDOS.note}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. Entrega */}
            <section id="entrega" className="bg-white rounded-xl p-6 border border-gray-100 scroll-mt-24">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiTruck className="text-gray-700 text-lg" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{ENTREGA.title}</h2>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    {ENTREGA.content}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ENTREGA.locations.map((loc, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-lg p-3 text-center">
                        <span className="font-medium text-gray-800 block">{loc.name}</span>
                        <p className="text-sm text-gray-500">{loc.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 5. Trocas */}
            <section id="trocas" className="bg-white rounded-xl p-6 border border-gray-100 scroll-mt-24">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiRepeat className="text-gray-700 text-lg" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{TROCAS.title}</h2>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    {TROCAS.content}
                  </p>
                  <div className="space-y-1">
                    {TROCAS.conditions.map((text, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <FiCheck className="text-gray-500 text-sm" />
                        <span className="text-gray-600 text-sm">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 6. Responsabilidade */}
            <section id="responsabilidade" className="bg-white rounded-xl p-6 border border-gray-100 scroll-mt-24">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiShield className="text-gray-700 text-lg" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{RESPONSABILIDADE.title}</h2>
                  <p className="text-gray-600 leading-relaxed">
                    {RESPONSABILIDADE.content}
                  </p>
                </div>
              </div>
            </section>

            {/* 7. Alterações */}
            <section id="alteracoes" className="bg-white rounded-xl p-6 border border-gray-100 scroll-mt-24">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiEdit className="text-gray-700 text-lg" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{ALTERACOES.title}</h2>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    {ALTERACOES.content}
                  </p>
                  <div className="bg-gray-50 rounded-lg p-3 flex gap-2 border border-gray-100">
                    <FiInfo className="text-gray-500 text-lg flex-shrink-0 mt-0.5" />
                    <p className="text-gray-600 text-sm">{ALTERACOES.note}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 8. Contato */}
            <section id="contato" className="bg-black rounded-xl p-8 text-center">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMail className="text-xl text-white" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">{CONTATO_SECTION.title}</h2>
              <p className="text-gray-400 mb-6 max-w-md mx-auto text-sm">
                {CONTATO_SECTION.description}
              </p>
              <Link
                href={CONTATO_SECTION.buttonLink}
                className="inline-flex items-center gap-2 px-5 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-all text-sm"
              >
                {CONTATO_SECTION.buttonText}
                <FiChevronRight className="text-sm" />
              </Link>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}