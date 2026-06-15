'use client';

import { useState, useEffect, useCallback } from 'react';
import { getAllProducts, deleteProduct, restoreProduct, type Product } from '@/lib/modules/product';
import { getMe } from '@/lib/modules/user';
import { toast } from 'sonner';
import { ITEMS_PER_PAGE } from '../_constants/produtos';

export function useProdutosAdmin() {
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'delete' | 'restore'>('delete');
  const [confirmProduto, setConfirmProduto] = useState<{ id: string; name: string } | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);

  const fetchProdutos = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAllProducts({ page: 1, limit: 100 });
      setProdutos(response.data);
    } catch (error) {
      toast.error('Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUserPermissions = useCallback(async () => {
    try {
      const user = await getMe();
      setIsAdmin(user?.role === 'admin');
      setIsEmployee(user?.role === 'admin' || user?.role === 'employee');
    } catch (error) {
      console.error('Erro ao buscar permissões:', error);
    }
  }, []);

  useEffect(() => {
    fetchProdutos();
    fetchUserPermissions();
  }, [fetchProdutos, fetchUserPermissions]);

  const filteredProdutos = produtos.filter(produto => {
    const matchesSearch = produto.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' ||
      (statusFilter === 'active' && produto.active && !produto.deletedAt) ||
      (statusFilter === 'inactive' && !produto.active && !produto.deletedAt) ||
      (statusFilter === 'deleted' && produto.deletedAt);
    const matchesGender = genderFilter === 'all' || produto.gender === genderFilter;
    const matchesBrand = brandFilter === 'all' || produto.brandId === brandFilter;
    return matchesSearch && matchesStatus && matchesGender && matchesBrand;
  });

  const totalItems = filteredProdutos.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProdutos = filteredProdutos.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleAddProduto = async (data: FormData) => {
    setSaving(true);
    try {
      const response = await fetch('http://localhost:3001/product', {
        method: 'POST',
        body: data,
        credentials: 'include',
      });
      if (response.ok) {
        toast.success('Produto criado com sucesso!');
        await fetchProdutos();
        setShowModal(false);
      } else {
        toast.error('Erro ao criar produto');
      }
    } catch (error) {
      toast.error('Erro ao criar produto');
    } finally {
      setSaving(false);
    }
  };

  const handleEditProduto = async (data: FormData) => {
    if (!editingProduct) return;
    setSaving(true);
    try {
      const response = await fetch(`http://localhost:3001/product/${editingProduct.id}`, {
        method: 'PATCH',
        body: data,
        credentials: 'include',
      });
      if (response.ok) {
        toast.success('Produto atualizado com sucesso!');
        await fetchProdutos();
        setEditingProduct(null);
        setShowModal(false);
      } else {
        toast.error('Erro ao atualizar produto');
      }
    } catch (error) {
      toast.error('Erro ao atualizar produto');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProduto = async (id: string) => {
    const result = await deleteProduct(id);
    if (result) {
      toast.success('Produto desativado com sucesso!');
      await fetchProdutos();
    } else {
      toast.error('Erro ao desativar produto');
    }
    setShowConfirmModal(false);
    setConfirmProduto(null);
  };

  const handleRestoreProduto = async (id: string) => {
    const result = await restoreProduct(id);
    if (result) {
      toast.success('Produto restaurado com sucesso!');
      await fetchProdutos();
    } else {
      toast.error('Erro ao restaurar produto');
    }
    setShowConfirmModal(false);
    setConfirmProduto(null);
  };

  const openConfirmModal = (id: string, name: string, action: 'delete' | 'restore') => {
    setConfirmProduto({ id, name });
    setConfirmAction(action);
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
    setConfirmProduto(null);
  };

  const confirmActionHandler = () => {
    if (confirmProduto) {
      if (confirmAction === 'delete') {
        handleDeleteProduto(confirmProduto.id);
      } else {
        handleRestoreProduto(confirmProduto.id);
      }
    }
  };

  const openEditModal = (product: Product | null) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  return {
    produtos: paginatedProdutos,
    loading,
    totalItems,
    totalPages,
    currentPage,
    startIndex,
    searchTerm,
    statusFilter,
    genderFilter,
    brandFilter,
    showModal,
    showConfirmModal,
    confirmAction,
    confirmProduto,
    editingProduct,
    saving,
    isAdmin,
    isEmployee,
    canCreate: isAdmin,
    canEdit: isAdmin,
    canDelete: isAdmin,
    setCurrentPage,
    setSearchTerm,
    setStatusFilter,
    setGenderFilter,
    setBrandFilter,
    handleAddProduto,
    handleEditProduto,
    openEditModal,
    closeModal,
    openConfirmModal,
    closeConfirmModal,
    confirmActionHandler,
  };
}