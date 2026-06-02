import { FiUser, FiMail, FiPhone, FiCalendar, FiShield } from 'react-icons/fi';

export const USERS_CONFIG = {
  title: 'Usuários',
  subtitle: 'Gerencie os usuários do sistema',
  breadcrumb: {
    home: 'Início',
    current: 'Usuários'
  }
};

export const USERS_DATA = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao@flexshoe.ao',
    phone: '+244 900 000 001',
    role: 'Administrador',
    status: 'active',
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria@flexshoe.ao',
    phone: '+244 900 000 002',
    role: 'Funcionário',
    status: 'active',
    createdAt: '2024-02-20'
  },
  {
    id: 3,
    name: 'Carlos Mendes',
    email: 'carlos@flexshoe.ao',
    phone: '+244 900 000 003',
    role: 'Funcionário',
    status: 'inactive',
    createdAt: '2024-03-10'
  },
  {
    id: 4,
    name: 'Ana Oliveira',
    email: 'ana@flexshoe.ao',
    phone: '+244 900 000 004',
    role: 'Administrador',
    status: 'active',
    createdAt: '2024-04-05'
  },
  {
    id: 5,
    name: 'Pedro Costa',
    email: 'pedro@flexshoe.ao',
    phone: '+244 900 000 005',
    role: 'Funcionário',
    status: 'active',
    createdAt: '2024-05-12'
  },
];

export const ROLES = [
  { value: 'admin', label: 'Administrador' },
  { value: 'employee', label: 'Funcionário' },
];

export const getStatusBadge = (status: string) => {
  if (status === 'active') {
    return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
  }
  return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
};

export const getStatusText = (status: string) => {
  return status === 'active' ? 'Ativo' : 'Inativo';
};