'use client';

import { useState, useEffect, useCallback } from 'react';
import { getRoles, getUserPermission, updateUserRole, type UserPermission } from '@/lib/modules/permission';
import { getAllUsers } from '@/lib/modules/user';
import { toast } from 'sonner';

export function usePermissoes() {
  const [users, setUsers] = useState<UserPermission[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<UserPermission | null>(null);
  const [selectedRole, setSelectedRole] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [rolesData, usersData] = await Promise.all([
        getRoles(),
        getAllUsers(1, 100),
      ]);

      if (rolesData) {
        setRoles(rolesData.roles);
      }

      if (usersData?.data) {
        // Buscar permissão de cada usuário
        const usersWithPermissions = await Promise.all(
          usersData.data.map(async (user: any) => {
            const perm = await getUserPermission(user.id);
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: perm?.role || 'employee',
            };
          })
        );
        setUsers(usersWithPermissions);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      toast.error('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openEditModal = (user: UserPermission) => {
    setEditingUser(user);
    setSelectedRole(user.role);
  };

  const closeModal = () => {
    setEditingUser(null);
    setSelectedRole('');
  };

  const handleSaveRole = async () => {
    if (!editingUser) return;

    setSaving(true);
    try {
      const result = await updateUserRole({
        userId: editingUser.id,
        role: selectedRole,
      });

      if (result) {
        toast.success('Permissão atualizada com sucesso!');
        setUsers(prev =>
          prev.map(u =>
            u.id === editingUser.id ? { ...u, role: selectedRole } : u
          )
        );
        closeModal();
      } else {
        toast.error('Erro ao atualizar permissão');
      }
    } catch (error) {
      console.error('Erro ao atualizar permissão:', error);
      toast.error('Erro ao atualizar permissão');
    } finally {
      setSaving(false);
    }
  };

  return {
    users,
    roles,
    loading,
    editingUser,
    selectedRole,
    saving,
    setSelectedRole,
    openEditModal,
    closeModal,
    handleSaveRole,
    fetchData,
  };
}