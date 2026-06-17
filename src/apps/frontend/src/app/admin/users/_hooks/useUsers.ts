'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  getAllUsers, 
  createUser, 
  updateUser, 
  deleteUser, 
  restoreUser,
  searchUsers,
  getMe,
  type User 
} from '@/lib/modules/user';
import { toast } from 'sonner';
import { ITEMS_PER_PAGE } from '../_constants/users';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [saving, setSaving] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'delete' | 'restore'>('delete');
  const [confirmUserId, setConfirmUserId] = useState<string | null>(null);
  const [confirmUserName, setConfirmUserName] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const userData = await getMe();
      setIsAdmin(userData?.role === 'admin');
      setIsEmployee(userData?.role === 'admin' || userData?.role === 'employee');

      if (userData?.role !== 'admin') {
        setUsers([]);
        setTotalItems(0);
        setLoading(false);
        return;
      }

      let response;
      
      // Se tiver busca, usa searchUsers (que já filtra por nome)
      if (searchTerm) {
        response = await searchUsers(searchTerm, currentPage, ITEMS_PER_PAGE);
      } else {
        // Se o filtro for 'all', inclui deletados
        const includeDeleted = statusFilter === 'all';
        response = await getAllUsers(currentPage, ITEMS_PER_PAGE, includeDeleted);
      }

      if (response?.data) {
        setUsers(response.data);
        setTotalItems(response.total);
      }
    } catch (error: any) {
      console.error('Erro ao carregar usuários:', error);
      
      if (error.response?.status === 403) {
        setError('Você não tem permissão para visualizar usuários. Apenas administradores podem acessar esta página.');
        toast.error('Acesso negado. Apenas administradores podem visualizar usuários.');
      } else {
        setError('Erro ao carregar usuários');
        toast.error('Erro ao carregar usuários');
      }
    } finally {
      setLoading(false);
    }
  }, [searchTerm, currentPage, statusFilter]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleAddUser = async () => {
    if (!isAdmin) {
      toast.error('Apenas administradores podem criar usuários');
      return;
    }

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }

    setSaving(true);
    try {
      const result = await createUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (result) {
        toast.success('Usuário criado com sucesso!');
        await fetchUsers();
        setShowAddModal(false);
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      } else {
        toast.error('Erro ao criar usuário');
      }
    } catch (error: any) {
      if (error.response?.status === 403) {
        toast.error('Acesso negado. Apenas administradores podem criar usuários.');
      } else if (error.response?.status === 409) {
        toast.error('Este email já está em uso');
      } else {
        toast.error('Erro ao criar usuário');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleEditUser = async () => {
    if (!editingUser) return;

    if (!isAdmin && editingUser.id !== 'me') {
      toast.error('Você só pode editar seu próprio perfil');
      return;
    }

    setSaving(true);
    try {
      const result = await updateUser(editingUser.id, {
        name: formData.name,
        email: formData.email,
      });

      if (result) {
        toast.success('Usuário atualizado com sucesso!');
        await fetchUsers();
        setEditingUser(null);
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      } else {
        toast.error('Erro ao atualizar usuário');
      }
    } catch (error: any) {
      if (error.response?.status === 403) {
        toast.error('Acesso negado. Você não tem permissão para editar este usuário.');
      } else if (error.response?.status === 409) {
        toast.error('Este email já está em uso');
      } else {
        toast.error('Erro ao atualizar usuário');
      }
    } finally {
      setSaving(false);
    }
  };

  const openConfirmModal = (id: string, name: string, action: 'delete' | 'restore') => {
    setConfirmUserId(id);
    setConfirmUserName(name);
    setConfirmAction(action);
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
    setConfirmUserId(null);
    setConfirmUserName('');
  };

  const handleConfirmAction = async () => {
    if (!confirmUserId) return;

    if (confirmAction === 'delete') {
      await handleDeleteUser(confirmUserId);
    } else {
      await handleRestoreUser(confirmUserId);
    }
    closeConfirmModal();
  };

  const handleDeleteUser = async (id: string) => {
    if (!isAdmin) {
      toast.error('Apenas administradores podem desativar usuários');
      return;
    }

    try {
      const result = await deleteUser(id);
      if (result) {
        toast.success('Usuário desativado com sucesso!');
        await fetchUsers();
      } else {
        toast.error('Erro ao desativar usuário');
      }
    } catch (error: any) {
      if (error.response?.status === 403) {
        toast.error('Acesso negado. Apenas administradores podem desativar usuários.');
      } else {
        toast.error('Erro ao desativar usuário');
      }
    }
  };

  const handleRestoreUser = async (id: string) => {
    if (!isAdmin) {
      toast.error('Apenas administradores podem restaurar usuários');
      return;
    }

    try {
      const result = await restoreUser(id);
      if (result) {
        toast.success('Usuário restaurado com sucesso!');
        await fetchUsers();
      } else {
        toast.error('Erro ao restaurar usuário');
      }
    } catch (error: any) {
      if (error.response?.status === 403) {
        toast.error('Acesso negado. Apenas administradores podem restaurar usuários.');
      } else {
        toast.error('Erro ao restaurar usuário');
      }
    }
  };

  const openEditModal = (user: User) => {
    if (!isAdmin && user.id !== 'me') {
      toast.error('Você só pode editar seu próprio perfil');
      return;
    }
    
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      confirmPassword: '',
    });
  };

  const handleFilterChange = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1);
    setShowFilterDropdown(false);
  };

  const getFilterLabel = () => {
    switch(statusFilter) {
      case 'active': return 'Ativos';
      case 'inactive': return 'Inativos';
      default: return 'Todos';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesStatus = statusFilter === 'all' ||
      (statusFilter === 'active' && user.active && !user.deletedAt) ||
      (statusFilter === 'inactive' && (!user.active || user.deletedAt));
    return matchesStatus;
  });

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  return {
    users: filteredUsers,
    loading,
    totalItems: filteredUsers.length,
    totalPages,
    currentPage,
    startIndex,
    searchTerm,
    statusFilter,
    showAddModal,
    editingUser,
    saving,
    isAdmin,
    isEmployee,
    showFilterDropdown,
    formData,
    error,
    showConfirmModal,
    confirmAction,
    confirmUserId,
    confirmUserName,
    setSearchTerm,
    setCurrentPage,
    setShowAddModal,
    setEditingUser,
    setFormData,
    setShowFilterDropdown,
    handleAddUser,
    handleEditUser,
    openEditModal,
    handleFilterChange,
    getFilterLabel,
    fetchUsers,
    openConfirmModal,
    closeConfirmModal,
    handleConfirmAction,
  };
}