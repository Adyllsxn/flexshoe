'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';
import { toast } from 'sonner';
import { login } from '@/lib/modules/auth';
import { LOGIN_CONFIG, LOGIN_FORM_FIELDS, BRAND_PANEL } from '../_constants/login';

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Preencha todos os campos');
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      const response = await login({ email: formData.email, password: formData.password });
      
      if (response && response.data) {
        // Criar cookie para o middleware
        document.cookie = `token=${response.data.id}; path=/; max-age=86400; SameSite=Lax`;
        
        if (formData.remember) {
          localStorage.setItem('flexshoe-admin-auth', 'true');
        } else {
          sessionStorage.setItem('flexshoe-admin-auth', 'true');
        }
        
        toast.success('Login realizado com sucesso!');
        router.push('/admin');
      } else {
        setError('E-mail ou senha inválidos');
        toast.error('Credenciais inválidas');
      }
    } catch (error) {
      setError('Erro ao fazer login. Tente novamente.');
      toast.error('Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-0" />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-12">
              <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center">
                <span className="text-black font-bold text-sm">F</span>
              </div>
              <span className="text-xl font-semibold text-white">{BRAND_PANEL.logoText}</span>
            </Link>
            
            <div className="max-w-md">
              <h2 className="text-3xl font-bold mb-4">{BRAND_PANEL.heading}</h2>
              <p className="text-gray-300 mb-8">{BRAND_PANEL.description}</p>
              
              <ul className="space-y-3">
                {BRAND_PANEL.features.map((feature, idx) => (
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
            {LOGIN_CONFIG.copyright}
          </div>
        </div>
      </div>

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
            <h1 className="text-2xl font-bold text-gray-800">{LOGIN_CONFIG.title}</h1>
            <p className="text-gray-500 text-sm mt-1">{LOGIN_CONFIG.subtitle}</p>
          </div>

          <div className="hidden lg:block mb-8">
            <h1 className="text-2xl font-bold text-gray-800">{LOGIN_CONFIG.title}</h1>
            <p className="text-gray-500 text-sm mt-1">{LOGIN_CONFIG.subtitle}</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {LOGIN_FORM_FIELDS.email.label}
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FiMail size={18} />
                </div>
                <input
                  type={LOGIN_FORM_FIELDS.email.type}
                  name={LOGIN_FORM_FIELDS.email.name}
                  value={formData.email}
                  onChange={handleChange}
                  required={LOGIN_FORM_FIELDS.email.required}
                  placeholder={LOGIN_FORM_FIELDS.email.placeholder}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white text-gray-800"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  {LOGIN_FORM_FIELDS.password.label}
                </label>
                <Link 
                  href={LOGIN_CONFIG.forgotPasswordLink} 
                  className="group flex items-center gap-1.5 text-xs font-medium text-amber-600 hover:text-amber-700 transition-all duration-200"
                >
                  <FiAlertCircle size={12} className="group-hover:scale-110 transition-transform" />
                  <span>{LOGIN_CONFIG.forgotPassword}</span>
                </Link>
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FiLock size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name={LOGIN_FORM_FIELDS.password.name}
                  value={formData.password}
                  onChange={handleChange}
                  required={LOGIN_FORM_FIELDS.password.required}
                  placeholder={LOGIN_FORM_FIELDS.password.placeholder}
                  className="w-full pl-10 pr-12 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white text-gray-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name={LOGIN_FORM_FIELDS.remember.name}
                  checked={formData.remember}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                />
                <span className="text-sm text-gray-600">{LOGIN_FORM_FIELDS.remember.label}</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full py-3 bg-black text-white rounded-lg font-semibold overflow-hidden transition-all duration-300 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10">{isLoading ? LOGIN_CONFIG.loadingText : LOGIN_CONFIG.buttonText}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></span>
            </button>
          </form>

          <div className="lg:hidden mt-8 text-center text-xs text-gray-400">
            {LOGIN_CONFIG.copyright}
          </div>
        </motion.div>
      </div>
    </div>
  );
}