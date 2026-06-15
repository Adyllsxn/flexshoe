'use client';

import { useState, useEffect, useCallback } from 'react';
import { getStore, updateStore, type Store } from '@/lib/modules/store';
import { getMe } from '@/lib/modules/user';
import { toast } from 'sonner';

export function useStore() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState<Store>({
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

  const fetchStore = useCallback(async () => {
    try {
      setLoading(true);
      const [storeData, userData] = await Promise.all([
        getStore(),
        getMe()
      ]);
      
      if (storeData) {
        setFormData(storeData);
        setSelectedColor(storeData.primaryColor || '#000000');
      }
      
      setIsAdmin(userData?.role === 'admin');
    } catch (error) {
      toast.error('Erro ao carregar dados da loja');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStore();
  }, [fetchStore]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAdmin) return;
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleColorChange = (color: string) => {
    if (!isAdmin) return;
    setSelectedColor(color);
    setFormData(prev => ({ ...prev, primaryColor: color }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;
    
    setSaving(true);
    
    try {
      const result = await updateStore({
        name: formData.name,
        whatsapp: formData.whatsapp,
        email: formData.email,
        address: formData.address,
        primaryColor: formData.primaryColor,
      });
      
      if (result) {
        setFormData(result);
        setSelectedColor(result.primaryColor || '#000000');
        toast.success('Configurações da loja salvas com sucesso!');
      } else {
        toast.error('Erro ao salvar configurações');
      }
    } catch (error) {
      toast.error('Erro ao salvar configurações');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!isAdmin) return;
    
    try {
      const data = await getStore();
      if (data) {
        setFormData(data);
        setSelectedColor(data.primaryColor || '#000000');
        toast.info('Dados resetados com sucesso');
      }
    } catch (error) {
      toast.error('Erro ao resetar dados');
    }
  };

  return {
    loading,
    saving,
    isAdmin,
    formData,
    selectedColor,
    handleChange,
    handleColorChange,
    handleSubmit,
    handleReset,
  };
}