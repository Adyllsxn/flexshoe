'use client';

import { useState, useEffect, useCallback } from 'react';
import { getAllBrands, createBrand, updateBrand, deleteBrand, restoreBrand, type Brand } from '@/lib/modules/brand';
import { toast } from 'sonner';
import { ITEMS_PER_PAGE } from '../_constants/marcas';

export function useMarcas() {
  const [marcas, setMarcas] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'delete' | 'restore'>('delete');
  const [confirmMarca, setConfirmMarca] = useState<{ id: string; name: string; currentActive: boolean } | null>(null);
  const [editingMarca, setEditingMarca] = useState<Brand | null>(null);

  const fetchMarcas = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllBrands();
      setMarcas(data);
    } catch (error) {
      toast.error('Erro ao carregar marcas');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMarcas();
  }, [fetchMarcas]);

  const filteredMarcas = marcas.filter(marca => {
    const matchesSearch = marca.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      marca.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' ||
      (statusFilter === 'active' && marca.active && !marca.deletedAt) ||
      (statusFilter === 'inactive' && (!marca.active || marca.deletedAt));
    return matchesSearch && matchesStatus;
  });

  const totalItems = filteredMarcas.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedMarcas = filteredMarcas.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const activeCount = marcas.filter(m => m.active && !m.deletedAt).length;
  const inactiveCount = marcas.filter(m => !m.active || m.deletedAt).length;

  const handleAddMarca = async (data: { name: string; slug: string }) => {
    const result = await createBrand({ name: data.name, slug: data.slug, active: true });
    if (result) {
      toast.success('Marca criada com sucesso!');
      await fetchMarcas();
      setShowModal(false);
      setEditingMarca(null);
    } else {
      toast.error('Erro ao criar marca');
    }
  };

  const handleEditMarca = async (data: { name: string; slug: string }) => {
    if (!editingMarca) return;
    const result = await updateBrand(editingMarca.id, { name: data.name, slug: data.slug });
    if (result) {
      toast.success('Marca atualizada com sucesso!');
      await fetchMarcas();
      setEditingMarca(null);
      setShowModal(false);
    } else {
      toast.error('Erro ao atualizar marca');
    }
  };

  const handleToggleStatus = async (id: string, currentActive: boolean) => {
    if (currentActive) {
      const result = await deleteBrand(id);
      if (result) {
        toast.success('Marca desativada com sucesso!');
        await fetchMarcas();
      } else {
        toast.error('Erro ao desativar marca');
      }
    } else {
      const result = await restoreBrand(id);
      if (result) {
        toast.success('Marca reativada com sucesso!');
        await fetchMarcas();
      } else {
        toast.error('Erro ao reativar marca');
      }
    }
    setShowConfirmModal(false);
    setConfirmMarca(null);
  };

  const openConfirmModal = (id: string, name: string, currentActive: boolean) => {
    setConfirmMarca({ id, name, currentActive });
    setConfirmAction(currentActive ? 'delete' : 'restore');
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
    setConfirmMarca(null);
  };

  const confirmToggleStatus = () => {
    if (confirmMarca) {
      handleToggleStatus(confirmMarca.id, confirmMarca.currentActive);
    }
  };

  const openEditModal = (marca: Brand | null) => {
    setEditingMarca(marca);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingMarca(null);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  return {
    marcas: paginatedMarcas,
    loading,
    totalItems,
    totalPages,
    currentPage,
    startIndex,
    activeCount,
    inactiveCount,
    searchTerm,
    statusFilter,
    showModal,
    showConfirmModal,
    confirmAction,
    confirmMarca,
    editingMarca,
    setCurrentPage,
    handleSearch,
    handleStatusFilter,
    handleAddMarca,
    handleEditMarca,
    handleToggleStatus,
    openEditModal,
    closeModal,
    openConfirmModal,
    closeConfirmModal,
    confirmToggleStatus,
    fetchMarcas,
  };
}