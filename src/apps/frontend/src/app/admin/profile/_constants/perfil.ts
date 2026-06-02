import { FiUser, FiMail, FiPhone, FiMapPin, FiShield } from 'react-icons/fi';

export const PROFILE_CONFIG = {
  title: 'Perfil',
  subtitle: 'Gerencie suas informações pessoais',
  breadcrumb: {
    home: 'Início',
    current: 'Perfil'
  }
};

export const USER_DATA = {
  name: 'Administrador',
  fullName: 'Admin FlexShoe',
  email: 'admin@flexshoe.ao',
  phone: '+244 900 000 000',
  role: 'Administrador',
  location: 'Luanda, Angola',
  about: 'Administrador do sistema FlexShoe, responsável pela gestão da loja, produtos e pedidos.'
};

export const PROFILE_TABS = [
  { id: 'overview', label: 'Visão Geral', icon: FiUser },
  { id: 'edit', label: 'Editar Perfil', icon: FiUser },
  { id: 'password', label: 'Alterar Senha', icon: FiUser }
];

export const SIDEBAR_INFO = [
  { icon: FiShield, label: 'Função', value: 'Administrador' }
];