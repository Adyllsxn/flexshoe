'use client';

import { FiUser, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import type { User } from '@/lib/modules/user';

interface ProfileOverviewProps {
  user: User | null;
}

export default function ProfileOverview({ user }: ProfileOverviewProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">Sobre</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          Administrador do sistema FlexShoe, responsável pela gestão da loja, produtos e pedidos.
        </p>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">Informações Pessoais</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <FiUser className="text-gray-400" size={16} />
            <div>
              <p className="text-xs text-gray-400">Nome</p>
              <p className="text-sm text-gray-800 dark:text-white">{user?.name || '-'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FiMail className="text-gray-400" size={16} />
            <div>
              <p className="text-xs text-gray-400">Email</p>
              <p className="text-sm text-gray-800 dark:text-white">{user?.email || '-'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FiPhone className="text-gray-400" size={16} />
            <div>
              <p className="text-xs text-gray-400">Telefone</p>
              <p className="text-sm text-gray-800 dark:text-white">+244 900 000 000</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FiMapPin className="text-gray-400" size={16} />
            <div>
              <p className="text-xs text-gray-400">Localização</p>
              <p className="text-sm text-gray-800 dark:text-white">Luanda, Angola</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}