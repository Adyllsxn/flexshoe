'use client';

import { useState, useEffect } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { toast } from 'sonner';
import { getMe, updateUser, changePassword, type User } from '@/lib/modules/user';
import { PROFILE_CONFIG, SIDEBAR_INFO } from './_constants/profile';
import ProfileOverview from './_components/ProfileOverview';
import ProfileEdit from './_components/ProfileEdit';
import ProfilePassword from './_components/ProfilePassword';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'edit' | 'password'>('overview');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getMe();
      setUser(data);
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleUpdateProfile = async (data: { name: string; email: string }) => {
    if (!user) return;
    
    const result = await updateUser(user.id, data);
    if (result) {
      setUser(result);
      toast.success('Perfil atualizado com sucesso!');
      setActiveTab('overview');
      setIsEditing(false);
    } else {
      toast.error('Erro ao atualizar perfil');
    }
  };

  const handleChangePassword = async (data: { currentPassword: string; newPassword: string; confirmNewPassword: string }) => {
    const result = await changePassword(data);
    if (result) {
      toast.success('Senha alterada com sucesso!');
      setActiveTab('overview');
    } else {
      toast.error('Erro ao alterar senha');
    }
  };

  const getInitials = () => {
    if (!user?.name) return 'AD';
    return user.name.charAt(0).toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
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
                <span className="text-3xl font-bold text-gray-600 dark:text-gray-400">{getInitials()}</span>
              </div>
            </div>
            <div className="flex-1 mt-4 md:mt-0 md:ml-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">{user?.name}</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm capitalize">{user?.role === 'admin' ? 'Administrador' : user?.role}</p>
            </div>
            <button
              onClick={() => {
                setActiveTab('edit');
                setIsEditing(true);
              }}
              className="mt-4 md:mt-0 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all flex items-center gap-2"
            >
              <FiEdit2 size={14} />
              Editar Perfil
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
                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                      {user?.role === 'admin' ? 'Administrador' : user?.role || 'Usuário'}
                    </p>
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
              {activeTab === 'overview' && <ProfileOverview user={user} />}
              {activeTab === 'edit' && <ProfileEdit user={user} onUpdate={handleUpdateProfile} />}
              {activeTab === 'password' && <ProfilePassword onChangePassword={handleChangePassword} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}