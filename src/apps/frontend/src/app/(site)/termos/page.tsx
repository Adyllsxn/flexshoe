'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { 
  FiCheckCircle, 
  FiShoppingBag, 
  FiCreditCard, 
  FiTruck, 
  FiRepeat, 
  FiShield, 
  FiEdit, 
  FiMail,
  FiInfo,
  FiAlertTriangle,
  FiChevronRight,
  FiHome,
  FiCheck,
  FiPackage,
  FiFileText
} from 'react-icons/fi';

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

  const sections = [
    { id: 'aceitacao', label: '1. Aceitação dos Termos', icon: FiCheckCircle },
    { id: 'produtos', label: '2. Produtos e Serviços', icon: FiShoppingBag },
    { id: 'pedidos', label: '3. Pedidos e Pagamentos', icon: FiCreditCard },
    { id: 'entrega', label: '4. Política de Entrega', icon: FiTruck },
    { id: 'trocas', label: '5. Trocas e Devoluções', icon: FiRepeat },
    { id: 'responsabilidade', label: '6. Limitação de Responsabilidade', icon: FiShield },
    { id: 'alteracoes', label: '7. Alterações nos Termos', icon: FiEdit },
    { id: 'contato', label: '8. Contato', icon: FiMail },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-black transition flex items-center gap-1">
              <FiHome className="text-xs" />
              Início
            </Link>
            <FiChevronRight className="text-xs" />
            <span className="text-black font-medium">Termos de Uso</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-3">
            Termos de Uso
          </h1>
          <p className="text-gray-500 max-w-2xl">
            Por favor, leia estes termos atentamente antes de usar nossos serviços
          </p>
          <div className="mt-4">
            <span className="text-sm text-gray-400">Última atualização: 30 de Maio, 2025</span>
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
                {sections.map((item) => {
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
                  <h2 className="text-xl font-bold text-gray-900 mb-2">1. Aceitação dos Termos</h2>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    Ao acessar e usar o site da FlexShoe, você concorda em cumprir estes Termos de Serviço e todas as leis e regulamentos aplicáveis. Se você não concordar com qualquer um destes termos, está proibido de usar ou acessar nossos serviços.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-3 flex gap-2 border border-gray-100">
                    <FiInfo className="text-gray-500 text-lg flex-shrink-0 mt-0.5" />
                    <p className="text-gray-600 text-sm">Estes termos se aplicam a todos os usuários, visitantes e outros que acessam ou usam nossos serviços.</p>
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
                  <h2 className="text-xl font-bold text-gray-900 mb-2">2. Produtos e Serviços</h2>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    A FlexShoe comercializa tênis originais das melhores marcas. Nossos produtos são:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
                    {[
                      { icon: FiPackage, text: '100% originais' },
                      { icon: FiFileText, text: 'Nota fiscal inclusa' },
                      { icon: FiPackage, text: 'Embalagem original' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                        <item.icon className="text-gray-500 text-sm" />
                        <span className="text-sm text-gray-700">{item.text}</span>
                      </div>
                    ))}
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
                  <h2 className="text-xl font-bold text-gray-900 mb-2">3. Pedidos e Pagamentos</h2>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    Ao realizar um pedido, você concorda em fornecer informações verdadeiras. O processo de compra é finalizado via WhatsApp.
                  </p>
                  <div className="space-y-1">
                    {['Confirmação imediata do pedido', 'Cálculo do valor total com frete', 'Previsão de entrega e rastreio'].map((text, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <FiCheck className="text-gray-500 text-sm" />
                        <span className="text-gray-600 text-sm">{text}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 flex gap-2 mt-3 border border-gray-100">
                    <FiAlertTriangle className="text-gray-500 text-lg flex-shrink-0 mt-0.5" />
                    <p className="text-gray-600 text-sm">Os preços estão sujeitos a alteração. O valor final será confirmado no momento da finalização do pedido.</p>
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
                  <h2 className="text-xl font-bold text-gray-900 mb-2">4. Política de Entrega</h2>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    Entregamos para todo o território de Angola. Prazos estimados:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <span className="font-medium text-gray-800 block">Luanda</span>
                      <p className="text-sm text-gray-500">1 a 3 dias úteis</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <span className="font-medium text-gray-800 block">Outras províncias</span>
                      <p className="text-sm text-gray-500">3 a 7 dias úteis</p>
                    </div>
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
                  <h2 className="text-xl font-bold text-gray-900 mb-2">5. Trocas e Devoluções</h2>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    Oferecemos 7 dias após o recebimento para troca ou devolução.
                  </p>
                  <div className="space-y-1">
                    {['Produto sem uso e na embalagem original', 'Etiquetas e lacres intactos', 'Nota fiscal acompanhando o produto'].map((text, idx) => (
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
                  <h2 className="text-xl font-bold text-gray-900 mb-2">6. Limitação de Responsabilidade</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Em nenhum caso a FlexShoe será responsável por quaisquer danos indiretos, incidentais, especiais, consequenciais ou punitivos decorrentes do uso de nossos serviços ou produtos.
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
                  <h2 className="text-xl font-bold text-gray-900 mb-2">7. Alterações nos Termos</h2>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    Reservamos o direito de modificar estes Termos a qualquer momento.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-3 flex gap-2 border border-gray-100">
                    <FiInfo className="text-gray-500 text-lg flex-shrink-0 mt-0.5" />
                    <p className="text-gray-600 text-sm">Ao continuar a usar nossos serviços após as alterações, você concorda em cumprir os termos revisados.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 8. Contato - Preto */}
            <section id="contato" className="bg-black rounded-xl p-8 text-center">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMail className="text-xl text-white" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Dúvidas sobre os Termos?</h2>
              <p className="text-gray-400 mb-6 max-w-md mx-auto text-sm">
                Se você tiver alguma dúvida sobre estes Termos, nossa equipe está disponível para ajudar.
              </p>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 px-5 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-all text-sm"
              >
                Falar com Suporte
                <FiChevronRight className="text-sm" />
              </Link>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}