'use client';

import Link from 'next/link';
import { useState } from 'react';
import { 
  FiShield, 
  FiLock, 
  FiUserCheck, 
  FiDatabase, 
  FiBarChart2, 
  FiShare2,
  FiEye,
  FiEdit,
  FiTrash2,
  FiDownload,
  FiGlobe,
  FiUsers,
  FiBell,
  FiMail,
  FiChevronRight,
  FiHome,
  FiCheckCircle,
  FiCalendar,
  FiShieldOff,
  FiEyeOff,
  FiAward,
  FiShoppingBag,
  FiMessageCircle,
  FiTruck
} from 'react-icons/fi';
import { FaFingerprint } from 'react-icons/fa';

export default function PrivacidadePage() {
  const [activeTab, setActiveTab] = useState('collection');

  const tabs = [
    { id: 'collection', label: 'Coleta de Dados', icon: FiDatabase },
    { id: 'utilization', label: 'Uso de Dados', icon: FiBarChart2 },
    { id: 'distribution', label: 'Compartilhamento', icon: FiShare2 },
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
            <span className="text-black font-medium">Política de Privacidade</span>
          </div>
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-3">
                Política de Privacidade
              </h1>
              <p className="text-gray-500 max-w-2xl">
                Sua privacidade é importante para nós. Sem cadastro, sem complicações.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full">
                <FiCalendar className="text-gray-500 text-sm" />
                <span className="text-sm text-gray-600">Atualizado: 30/05/2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Diferenciais - Sem cadastro */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {[
            { icon: FiShoppingBag, text: 'Compra sem Cadastro', sub: 'Não precisa criar conta' },
            { icon: FiMessageCircle, text: 'Finalização via WhatsApp', sub: 'Pedido enviado diretamente' },
            { icon: FiTruck, text: 'Entrega Rápida', sub: 'Receba seus tênis em casa' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white rounded-xl p-4 border border-gray-100 flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Icon className="text-gray-700 text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{item.text}</h3>
                  <p className="text-sm text-gray-500">{item.sub}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="mb-10">
          <div className="flex flex-wrap gap-2 border-b border-gray-200">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-t-lg transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:text-black hover:bg-gray-100'
                  }`}
                >
                  <Icon className="text-sm" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="bg-white rounded-b-xl rounded-tr-xl p-6 border border-t-0 border-gray-100">
            {activeTab === 'collection' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <FiCheckCircle className="text-gray-500 text-sm" />
                    <span className="text-gray-600 text-sm">Nome e telefone (para contato via WhatsApp)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheckCircle className="text-gray-500 text-sm" />
                    <span className="text-gray-600 text-sm">Endereço de entrega</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheckCircle className="text-gray-500 text-sm" />
                    <span className="text-gray-600 text-sm">Produtos adicionados ao carrinho</span>
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <FiCheckCircle className="text-gray-500 text-sm" />
                    <span className="text-gray-600 text-sm">Dados de navegação (anônimos)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheckCircle className="text-gray-500 text-sm" />
                    <span className="text-gray-600 text-sm">Cookies para carrinho de compras</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheckCircle className="text-gray-500 text-sm" />
                    <span className="text-gray-600 text-sm">NÃO coletamos senhas (não há cadastro)</span>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === 'utilization' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <FiCheckCircle className="text-gray-500 text-sm" />
                    <span className="text-gray-600 text-sm">Processar seu pedido via WhatsApp</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheckCircle className="text-gray-500 text-sm" />
                    <span className="text-gray-600 text-sm">Coordenar a entrega dos produtos</span>
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <FiCheckCircle className="text-gray-500 text-sm" />
                    <span className="text-gray-600 text-sm">Melhorar nosso catálogo de produtos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheckCircle className="text-gray-500 text-sm" />
                    <span className="text-gray-600 text-sm">Nunca usamos seus dados para marketing sem consentimento</span>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === 'distribution' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <FiCheckCircle className="text-gray-500 text-sm" />
                    <span className="text-gray-600 text-sm">Compartilhado apenas com transportadoras para entrega</span>
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <FiCheckCircle className="text-gray-500 text-sm" />
                    <span className="text-gray-600 text-sm">Nunca vendemos ou alugamos seus dados</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Seus Direitos - simplificado */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Seus Direitos</h2>
              <p className="text-gray-500 text-sm mb-4">
                Como você não cria uma conta, seus dados são limitados ao seu pedido.
              </p>
            </div>
            <div className="lg:w-2/3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: FiEye, title: 'Acesso', desc: 'Solicite os dados do seu pedido' },
                  { icon: FiEdit, title: 'Correção', desc: 'Corrija dados de entrega' },
                  { icon: FiTrash2, title: 'Exclusão', desc: 'Solicite a remoção de seus dados após o pedido' },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="bg-white rounded-xl p-4 border border-gray-100 flex items-start gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="text-gray-700 text-sm" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{item.title}</h4>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Banner */}
        <div className="bg-black rounded-xl p-8 text-center">
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiMail className="text-xl text-white" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Dúvidas sobre Privacidade?</h2>
          <p className="text-gray-400 mb-6 max-w-md mx-auto text-sm">
            Entre em contato conosco para esclarecer qualquer dúvida sobre seus dados.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 px-5 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-all text-sm"
          >
            Falar com Suporte
            <FiChevronRight className="text-sm" />
          </Link>
        </div>
      </div>
    </main>
  );
}