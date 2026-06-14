'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiLogIn } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { logout as apiLogout } from '@/lib/modules/auth';
import { LOGOUT_CONFIG } from '../_constants/logout';

export default function LogoutContent() {
  const router = useRouter();
  const { title, message, buttonLogin, buttonBack } = LOGOUT_CONFIG;

  useEffect(() => {
    const performLogout = async () => {
      await apiLogout();
      
      // Remover cookie
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
      
      // Limpar localStorage e sessionStorage
      localStorage.removeItem('flexshoe-admin-auth');
      localStorage.removeItem('admin-theme');
      localStorage.removeItem('flexshoe-sidebar-collapsed');
      sessionStorage.removeItem('flexshoe-admin-auth');
      
      // Remover classe dark do html
      document.documentElement.classList.remove('dark');
      
      toast.success('Logout realizado com sucesso!');
      
      // NÃO USAR router.push aqui!
      // O middleware já vai redirecionar porque o token foi removido
    };
    
    performLogout();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md text-center"
      >
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="text-3xl md:text-4xl font-bold mb-3 text-black"
        >
          {title}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-gray-500 mb-10 max-w-md mx-auto"
        >
          {message}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href={buttonLogin.href}
            className="group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-black text-white overflow-hidden transition-all duration-300 hover:bg-transparent hover:text-black border-2 border-black text-sm font-medium rounded-lg"
          >
            <span className="relative z-10 flex items-center gap-2">
              <FiLogIn size={16} />
              {buttonLogin.text}
            </span>
            <span className="absolute inset-0 bg-white transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></span>
          </Link>

          <Link
            href={buttonBack.href}
            className="group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-transparent text-black overflow-hidden transition-all duration-300 hover:bg-black hover:text-white border-2 border-black text-sm font-medium rounded-lg"
          >
            <span className="relative z-10 flex items-center gap-2">
              <FiArrowLeft size={16} />
              {buttonBack.text}
            </span>
            <span className="absolute inset-0 bg-black transform skew-x-12 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}