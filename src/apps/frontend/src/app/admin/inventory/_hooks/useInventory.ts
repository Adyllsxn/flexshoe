'use client';

import { useState, useEffect, useCallback } from 'react';
import { getAllProducts, type Product } from '@/lib/modules/product';
import { createInventory, updateInventory, deleteInventory, restoreInventory, type InventoryItem } from '@/lib/modules/inventory';
import { getMe } from '@/lib/modules/user';
import { toast } from 'sonner';
import { ITEMS_PER_PAGE } from '../_constants/inventory';

export function useInventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'delete' | 'restore'>('delete');
  const [confirmItem, setConfirmItem] = useState<{ id: string; name: string } | null>(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [formData, setFormData] = useState({
    productId: '',
    size: 39,
    color: 'Preto',
    sku: '',
    stock: 0,
    active: true,
  });
  const [products, setProducts] = useState<Product[]>([]);

  const fetchInventory = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/inventory?page=1&limit=100');
      const data = await response.json();
      if (data.data) {
        setInventory(data.data);
      }
    } catch (error) {
      toast.error('Erro ao carregar inventário');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      const data = await getAllProducts({ limit: 100 });
      setProducts(data.data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
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
    fetchInventory();
    fetchProducts();
    fetchUserPermissions();
  }, [fetchInventory, fetchProducts, fetchUserPermissions]);

  const filteredInventory = inventory.filter(item => {
    const productName = item.product?.name?.toLowerCase() || '';
    const brandName = item.product?.brand?.name?.toLowerCase() || '';
    const search = searchTerm.toLowerCase();
    
    const matchesSearch = productName.includes(search) ||
      brandName.includes(search) ||
      item.sku.toLowerCase().includes(search);
    
    const matchesStatus = statusFilter === 'all' ||
      (statusFilter === 'active' && item.active) ||
      (statusFilter === 'inactive' && !item.active);
    
    return matchesSearch && matchesStatus;
  });

  const totalItems = filteredInventory.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedInventory = filteredInventory.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const totalStock = inventory.reduce((sum, item) => sum + item.stock, 0);
  const totalReserved = inventory.reduce((sum, item) => sum + item.reserved, 0);
  const totalAvailable = totalStock - totalReserved;
  const activeCount = inventory.filter(i => i.active).length;
  const inactiveCount = inventory.filter(i => !i.active).length;

  const handleAddItem = async () => {
    if (!formData.productId || !formData.sku) {
      toast.error('Preencha os campos obrigatórios');
      return;
    }

    setSaving(true);
    try {
      const result = await createInventory(formData);
      if (result) {
        toast.success('Item adicionado ao inventário!');
        await fetchInventory();
        setShowModal(false);
        setFormData({ productId: '', size: 39, color: 'Preto', sku: '', stock: 0, active: true });
      } else {
        toast.error('Erro ao adicionar item');
      }
    } catch (error) {
      toast.error('Erro ao adicionar item');
    } finally {
      setSaving(false);
    }
  };

  const handleEditItem = async () => {
    if (!editingItem) return;

    setSaving(true);
    try {
      const result = await updateInventory(editingItem.id, formData);
      if (result) {
        toast.success('Item atualizado com sucesso!');
        await fetchInventory();
        setEditingItem(null);
        setShowModal(false);
        setFormData({ productId: '', size: 39, color: 'Preto', sku: '', stock: 0, active: true });
      } else {
        toast.error('Erro ao atualizar item');
      }
    } catch (error) {
      toast.error('Erro ao atualizar item');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      const result = await deleteInventory(id);
      if (result) {
        toast.success('Item desativado com sucesso!');
        await fetchInventory();
      } else {
        toast.error('Erro ao desativar item');
      }
    } catch (error) {
      toast.error('Erro ao desativar item');
    }
    setShowConfirmModal(false);
    setConfirmItem(null);
  };

  const handleRestoreItem = async (id: string) => {
    try {
      const result = await restoreInventory(id);
      if (result) {
        toast.success('Item reativado com sucesso!');
        await fetchInventory();
      } else {
        toast.error('Erro ao reativar item');
      }
    } catch (error) {
      toast.error('Erro ao reativar item');
    }
    setShowConfirmModal(false);
    setConfirmItem(null);
  };

  const openEditModal = (item: InventoryItem) => {
    setEditingItem(item);
    setFormData({
      productId: item.productId,
      size: item.size,
      color: item.color,
      sku: item.sku,
      stock: item.stock,
      active: item.active,
    });
    setShowModal(true);
  };

  const openConfirmModal = (id: string, name: string, action: 'delete' | 'restore') => {
    setConfirmItem({ id, name });
    setConfirmAction(action);
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
    setConfirmItem(null);
  };

  const confirmActionHandler = () => {
    if (confirmItem) {
      if (confirmAction === 'delete') {
        handleDeleteItem(confirmItem.id);
      } else {
        handleRestoreItem(confirmItem.id);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({ productId: '', size: 39, color: 'Preto', sku: '', stock: 0, active: true });
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

  return {
    inventory: paginatedInventory,
    loading,
    totalItems,
    totalPages,
    currentPage,
    startIndex,
    searchTerm,
    statusFilter,
    showModal,
    setShowModal,
    editingItem,
    saving,
    isAdmin,
    isEmployee,
    showConfirmModal,
    confirmAction,
    confirmItem,
    showFilterDropdown,
    formData,
    products,
    totalStock,
    totalReserved,
    totalAvailable,
    activeCount,
    inactiveCount,
    setCurrentPage,
    setSearchTerm,
    setStatusFilter,
    setShowFilterDropdown,
    setFormData,
    handleAddItem,
    handleEditItem,
    openEditModal,
    closeModal,
    openConfirmModal,
    closeConfirmModal,
    confirmActionHandler,
    handleFilterChange,
    getFilterLabel,
    fetchInventory,
  };
}