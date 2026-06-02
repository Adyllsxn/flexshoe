'use client';

import { useState } from 'react';
import { 
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiEdit2,
  FiSave,
  FiLock,
  FiEye,
  FiEyeOff
} from 'react-icons/fi';
import { toast } from 'sonner';
import { PROFILE_CONFIG, USER_DATA, SIDEBAR_INFO } from './_constants/perfil';

export default function PerfilPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: USER_DATA.fullName,
    email: USER_DATA.email,
    phone: USER_DATA.phone,
    location: USER_DATA.location,
    about: USER_DATA.about
  });
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSaveProfile = () => {
    toast.success('Perfil atualizado com sucesso!', {
      duration: 3000,
      icon: '✅'
    });
    setIsEditing(false);
  };

  const handleSavePassword = () => {
    if (!passwordData.current || !passwordData.new || !passwordData.confirm) {
      toast.error('Preencha todos os campos', { duration: 3000 });
      return;
    }
    if (passwordData.new !== passwordData.confirm) {
      toast.error('As senhas não coincidem', { duration: 3000 });
      return;
    }
    if (passwordData.new.length < 6) {
      toast.error('A nova senha deve ter pelo menos 6 caracteres', { duration: 3000 });
      return;
    }
    toast.success('Senha alterada com sucesso!', { duration: 3000 });
    setPasswordData({ current: '', new: '', confirm: '' });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{PROFILE_CONFIG.title}</h1>
          <nav className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            <span className="text-gray-400 dark:text-gray-500">Home</span> /{' '}
            <span className="text-gray-800 dark:text-gray-200 font-medium">{PROFILE_CONFIG.breadcrumb.current}</span>
          </nav>
        </div>
      </div>

      {/* Profile Banner */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="relative h-28 bg-gradient-to-r from-gray-900 to-gray-700" />
        <div className="relative px-6 pb-6">
          <div className="flex flex-col md:flex-row items-start md:items-end -mt-12 mb-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-xl bg-gray-200 dark:bg-gray-700 flex items-center justify-center shadow-lg border-4 border-white dark:border-gray-800">
                <span className="text-3xl font-bold text-gray-600 dark:text-gray-400">AD</span>
              </div>
            </div>
            <div className="flex-1 mt-4 md:mt-0 md:ml-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">{USER_DATA.fullName}</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{USER_DATA.role}</p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="mt-4 md:mt-0 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all flex items-center gap-2"
            >
              <FiEdit2 size={14} />
              {isEditing ? 'Cancelar' : 'Editar Perfil'}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs and Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
            {SIDEBAR_INFO.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <Icon className="text-gray-600 dark:text-gray-400" size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">{item.label}</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
            {/* Tabs */}
            <div className="border-b border-gray-100 dark:border-gray-700 px-6">
              <div className="flex gap-6">
                <button
                  onClick={() => { setActiveTab('overview'); setIsEditing(false); }}
                  className={`py-3 text-sm font-medium transition-all relative ${
                    activeTab === 'overview' 
                      ? 'text-black dark:text-white' 
                      : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                  }`}
                >
                  Visão Geral
                  {activeTab === 'overview' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black dark:bg-white" />
                  )}
                </button>
                <button
                  onClick={() => { setActiveTab('edit'); setIsEditing(true); }}
                  className={`py-3 text-sm font-medium transition-all relative ${
                    activeTab === 'edit' 
                      ? 'text-black dark:text-white' 
                      : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                  }`}
                >
                  Editar Perfil
                  {activeTab === 'edit' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black dark:bg-white" />
                  )}
                </button>
                <button
                  onClick={() => { setActiveTab('password'); setIsEditing(false); }}
                  className={`py-3 text-sm font-medium transition-all relative ${
                    activeTab === 'password' 
                      ? 'text-black dark:text-white' 
                      : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                  }`}
                >
                  Alterar Senha
                  {activeTab === 'password' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black dark:bg-white" />
                  )}
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">Sobre</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {isEditing ? formData.about : USER_DATA.about}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">Informações Pessoais</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <FiUser className="text-gray-400" size={16} />
                        <div>
                          <p className="text-xs text-gray-400">Nome</p>
                          <p className="text-sm text-gray-800 dark:text-white">{USER_DATA.fullName}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <FiMail className="text-gray-400" size={16} />
                        <div>
                          <p className="text-xs text-gray-400">Email</p>
                          <p className="text-sm text-gray-800 dark:text-white">{USER_DATA.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <FiPhone className="text-gray-400" size={16} />
                        <div>
                          <p className="text-xs text-gray-400">Telefone</p>
                          <p className="text-sm text-gray-800 dark:text-white">{USER_DATA.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <FiMapPin className="text-gray-400" size={16} />
                        <div>
                          <p className="text-xs text-gray-400">Localização</p>
                          <p className="text-sm text-gray-800 dark:text-white">{USER_DATA.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Edit Profile Tab */}
              {activeTab === 'edit' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Telefone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Localização</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sobre</label>
                    <textarea
                      name="about"
                      rows={4}
                      value={formData.about}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white resize-none"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={handleSaveProfile}
                      className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all flex items-center gap-2"
                    >
                      <FiSave size={14} />
                      Salvar Alterações
                    </button>
                  </div>
                </div>
              )}

              {/* Change Password Tab */}
              {activeTab === 'password' && (
                <div className="space-y-4 max-w-md">
                  {/* Senha Atual */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Senha Atual</label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        name="current"
                        value={passwordData.current}
                        onChange={handlePasswordChange}
                        className="w-full px-3 py-2 pr-10 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        {showCurrentPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Nova Senha */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nova Senha</label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        name="new"
                        value={passwordData.new}
                        onChange={handlePasswordChange}
                        className="w-full px-3 py-2 pr-10 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        {showNewPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirmar Nova Senha */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirmar Nova Senha</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirm"
                        value={passwordData.confirm}
                        onChange={handlePasswordChange}
                        className="w-full px-3 py-2 pr-10 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        {showConfirmPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleSavePassword}
                      className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all flex items-center gap-2"
                    >
                      <FiLock size={14} />
                      Alterar Senha
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}