'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FiSave,
  FiRefreshCw,
  FiMapPin,
  FiPhone,
  FiMail,
  FiFlag
} from 'react-icons/fi';
import { toast } from 'sonner';
import { STORE_CONFIG, COLOR_PRESETS } from './_constants/store';

interface StoreData {
  id: string;
  name: string;
  whatsapp: string;
  email: string;
  address: string;
  logo: string | null;
  primaryColor: string;
  createdAt: string;
  updatedAt: string;
}

export default function StorePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<StoreData>({
    id: '',
    name: '',
    whatsapp: '',
    email: '',
    address: '',
    logo: null,
    primaryColor: '#000000',
    createdAt: '',
    updatedAt: ''
  });
  const [selectedColor, setSelectedColor] = useState('#000000');

  // Simular GET
  useEffect(() => {
    const fetchStoreData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData = {
        id: '693a2446-a439-4fb7-afcb-845431153561',
        name: 'FlexShoe',
        whatsapp: '244900000000',
        email: 'contato@flexshoe.ao',
        address: 'Luanda, Angola',
        logo: null,
        primaryColor: '#000000',
        createdAt: '2026-05-28T15:33:24.977Z',
        updatedAt: new Date().toISOString()
      };
      
      setFormData(mockData);
      setSelectedColor(mockData.primaryColor);
      setLoading(false);
    };
    
    fetchStoreData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setFormData(prev => ({ ...prev, primaryColor: color }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Configurações da loja salvas com sucesso!', {
      duration: 3000,
      icon: '✅'
    });
    
    setSaving(false);
  };

  const handleReset = () => {
    setFormData(prev => ({
      ...prev,
      name: 'FlexShoe',
      whatsapp: '244900000000',
      email: 'contato@flexshoe.ao',
      address: 'Luanda, Angola',
      primaryColor: '#000000'
    }));
    setSelectedColor('#000000');
    toast.info('Formulário resetado', { duration: 2000 });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white mx-auto"></div>
          <p className="mt-4 text-gray-500 dark:text-gray-400">Carregando configurações...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header - sem ícone */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{STORE_CONFIG.title}</h1>
          <nav className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            <Link href="/admin" className="hover:text-black dark:hover:text-white transition">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800 dark:text-gray-200 font-medium">Loja</span>
          </nav>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{STORE_CONFIG.subtitle}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center gap-2"
          >
            <FiRefreshCw size={14} />
            Resetar
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiSave size={14} />
            {saving ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </div>

      {/* Cards de Informação */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center">
              <FiFlag className="text-white dark:text-black" size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Nome da Loja</p>
              <p className="text-sm font-medium text-gray-800 dark:text-white">{formData.name}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <FiPhone className="text-green-600 dark:text-green-400" size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-400">WhatsApp</p>
              <p className="text-sm font-medium text-gray-800 dark:text-white">{formData.whatsapp}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <FiMail className="text-blue-600 dark:text-blue-400" size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Email</p>
              <p className="text-sm font-medium text-gray-800 dark:text-white">{formData.email}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <FiMapPin className="text-purple-600 dark:text-purple-400" size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Endereço</p>
              <p className="text-sm font-medium text-gray-800 dark:text-white truncate">{formData.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Formulário Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Informações da Loja */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 dark:border-gray-700">
            <h3 className="text-base font-semibold text-gray-800 dark:text-white">Informações da Loja</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Dados básicos da sua loja</p>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome da Loja</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">WhatsApp (sem +)</label>
              <input
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="244900000000"
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Endereço</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Aparência e Preview */}
        <div className="space-y-6">
          {/* Cores */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 dark:border-gray-700">
              <h3 className="text-base font-semibold text-gray-800 dark:text-white">Aparência</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Personalize as cores da sua loja</p>
            </div>
            <div className="p-5">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Cor Primária
              </label>
              <div className="flex flex-wrap gap-3">
                {COLOR_PRESETS.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => handleColorChange(color.value)}
                    className={`w-10 h-10 rounded-full transition-all duration-200 ${
                      selectedColor === color.value
                        ? 'ring-2 ring-offset-2 ring-black dark:ring-white scale-110'
                        : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
                <div className="relative">
                  <input
                    type="color"
                    value={selectedColor}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="w-10 h-10 rounded-full cursor-pointer border border-gray-200 dark:border-gray-700"
                  />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: selectedColor }} />
                <span className="text-sm text-gray-500 dark:text-gray-400">{selectedColor}</span>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 dark:border-gray-700">
              <h3 className="text-base font-semibold text-gray-800 dark:text-white">Preview</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Visualize como ficará sua loja</p>
            </div>
            <div className="p-5">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: selectedColor }}>
                    <span className="text-white font-bold text-sm">F</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">{formData.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{formData.email}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <FiPhone size={14} className="text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-300">{formData.whatsapp}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiMapPin size={14} className="text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-300">{formData.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}