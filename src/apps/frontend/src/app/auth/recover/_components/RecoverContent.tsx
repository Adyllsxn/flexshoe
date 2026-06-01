'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import { toast } from 'sonner';
import { RECOVER_CONFIG, RECOVER_FORM_FIELDS, BRAND_PANEL_RECOVER } from '../_constants/recover';

export default function RecoverContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  // Garantir que não há dark mode
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Digite seu email');
      return;
    }
    
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      setSent(true);
      toast.success('Email enviado!', {
        duration: 4000,
        icon: '📧',
        description: 'Verifique sua caixa de entrada',
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-0" />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-12">
              <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center">
                <span className="text-black font-bold text-sm">F</span>
              </div>
              <span className="text-xl font-semibold text-white">{BRAND_PANEL_RECOVER.logoText}</span>
            </Link>
            
            <div className="max-w-md">
              <h2 className="text-3xl font-bold mb-4">{BRAND_PANEL_RECOVER.heading}</h2>
              <p className="text-gray-300 mb-8">{BRAND_PANEL_RECOVER.description}</p>
              
              <ul className="space-y-3">
                {BRAND_PANEL_RECOVER.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-200">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="text-gray-400 text-sm">
            {RECOVER_CONFIG.copyright}
          </div>
        </div>
      </div>

      {/* Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden text-center mb-8">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">{RECOVER_CONFIG.title}</h1>
            <p className="text-gray-500 text-sm mt-1">{RECOVER_CONFIG.subtitle}</p>
          </div>

          <div className="hidden lg:block mb-8">
            <h1 className="text-2xl font-bold text-gray-800">{RECOVER_CONFIG.title}</h1>
            <p className="text-gray-500 text-sm mt-1">{RECOVER_CONFIG.subtitle}</p>
          </div>

          <AnimatePresence mode="wait">
            {!sent ? (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <p className="text-gray-500 text-center mb-6">{RECOVER_CONFIG.description}</p>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm text-center">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {RECOVER_FORM_FIELDS.email.label}
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <FiMail size={18} />
                      </div>
                      <input
                        type={RECOVER_FORM_FIELDS.email.type}
                        name={RECOVER_FORM_FIELDS.email.name}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required={RECOVER_FORM_FIELDS.email.required}
                        placeholder={RECOVER_FORM_FIELDS.email.placeholder}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white text-gray-800"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative w-full py-3 bg-black text-white rounded-lg font-semibold overflow-hidden transition-all duration-300 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10">{isLoading ? RECOVER_CONFIG.loadingText : RECOVER_CONFIG.buttonText}</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></span>
                  </button>
                </form>

                <div className="text-center mt-6">
                  <Link href="/auth/login" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition">
                    <FiArrowLeft size={16} />
                    {RECOVER_CONFIG.backToLogin}
                  </Link>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
                  <FiCheckCircle className="w-8 h-8 text-emerald-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{RECOVER_CONFIG.successTitle}</h2>
                <p className="text-gray-500 mb-6">{RECOVER_CONFIG.successMessage}</p>
                <Link href="/auth/login" className="inline-flex items-center justify-center gap-2 w-full py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200">
                  Voltar para o login
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="lg:hidden mt-8 text-center text-xs text-gray-400">
            {RECOVER_CONFIG.copyright}
          </div>
        </motion.div>
      </div>
    </div>
  );
}