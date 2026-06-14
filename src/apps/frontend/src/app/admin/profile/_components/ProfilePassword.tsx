'use client';

import { useState } from 'react';
import { FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { toast } from 'sonner';

interface ProfilePasswordProps {
  onChangePassword: (data: { currentPassword: string; newPassword: string; confirmNewPassword: string }) => Promise<void>;
}

export default function ProfilePassword({ onChangePassword }: ProfilePasswordProps) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.currentPassword || !formData.newPassword || !formData.confirmNewPassword) {
      toast.error('Preencha todos os campos');
      return;
    }

    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error('As senhas não coincidem');
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error('A nova senha deve ter pelo menos 6 caracteres');
      return;
    }

    setLoading(true);
    await onChangePassword(formData);
    setFormData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Senha Atual</label>
        <div className="relative">
          <input
            type={showCurrentPassword ? 'text' : 'password'}
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
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

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nova Senha</label>
        <div className="relative">
          <input
            type={showNewPassword ? 'text' : 'password'}
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
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

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirmar Nova Senha</label>
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmNewPassword"
            value={formData.confirmNewPassword}
            onChange={handleChange}
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
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          <FiLock size={14} />
          {loading ? 'Alterando...' : 'Alterar Senha'}
        </button>
      </div>
    </form>
  );
}