'use client';

import Link from 'next/link';
import { useState } from 'react';
import { 
  FiChevronRight,
  FiHome,
  FiCheckCircle,
  FiCalendar,
  FiMail
} from 'react-icons/fi';
import { 
  TABS, 
  DIFFERENTIALS, 
  COLLECTION_DATA, 
  UTILIZATION_DATA, 
  DISTRIBUTION_DATA, 
  RIGHTS_DATA, 
  PAGE_META, 
  CONTACT_BANNER 
} from './_constants/privacidade';

export default function PrivacidadePage() {
  const [activeTab, setActiveTab] = useState('collection');

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
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-3">
                {PAGE_META.title}
              </h1>
              <p className="text-gray-500 max-w-2xl">
                {PAGE_META.description}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full">
                <FiCalendar className="text-gray-500 text-sm" />
                <span className="text-sm text-gray-600">Atualizado: {PAGE_META.lastUpdated}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Diferenciais - Sem cadastro */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {DIFFERENTIALS.map((item, idx) => {
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
            {TABS.map((tab) => {
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
                  {COLLECTION_DATA.left.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <FiCheckCircle className="text-gray-500 text-sm" />
                      <span className="text-gray-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-3">
                  {COLLECTION_DATA.right.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <FiCheckCircle className="text-gray-500 text-sm" />
                      <span className="text-gray-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'utilization' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ul className="space-y-3">
                  {UTILIZATION_DATA.left.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <FiCheckCircle className="text-gray-500 text-sm" />
                      <span className="text-gray-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-3">
                  {UTILIZATION_DATA.right.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <FiCheckCircle className="text-gray-500 text-sm" />
                      <span className="text-gray-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'distribution' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ul className="space-y-3">
                  {DISTRIBUTION_DATA.left.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <FiCheckCircle className="text-gray-500 text-sm" />
                      <span className="text-gray-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-3">
                  {DISTRIBUTION_DATA.right.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <FiCheckCircle className="text-gray-500 text-sm" />
                      <span className="text-gray-600 text-sm">{item}</span>
                    </li>
                  ))}
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
                {RIGHTS_DATA.map((item, idx) => {
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
          <h2 className="text-xl font-bold text-white mb-2">{CONTACT_BANNER.title}</h2>
          <p className="text-gray-400 mb-6 max-w-md mx-auto text-sm">
            {CONTACT_BANNER.description}
          </p>
          <Link
            href={CONTACT_BANNER.buttonLink}
            className="inline-flex items-center gap-2 px-5 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-all text-sm"
          >
            {CONTACT_BANNER.buttonText}
            <FiChevronRight className="text-sm" />
          </Link>
        </div>
      </div>
    </main>
  );
}