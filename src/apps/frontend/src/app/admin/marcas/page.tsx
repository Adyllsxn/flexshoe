'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiTag,
  FiPackage,
  FiCheck,
  FiX,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
  FiSearch
} from 'react-icons/fi';
import { toast } from 'sonner';
import { MARCAS_CONFIG, MARCAS_DATA, Marca, getStatusBadge, getStatusText } from './_constants/marcas';

export default function MarcasPage() {
  const [marcas, setMarcas] = useState<Marca[]>(MARCAS_DATA);
  const [showModal, setShowModal] = useState(false);
  const [editingMarca, setEditingMarca] = useState<Marca | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    slug: ''
  });

  const ITEMS_PER_PAGE = 10;

  // Filtrar marcas
  let filteredMarcas = marcas.filter(marca => {
    const matchesSearch = marca.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      marca.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && marca.active) || 
      (statusFilter === 'inactive' && !marca.active);
    return matchesSearch && matchesStatus;
  });

  // Paginação
  const totalPages = Math.ceil(filteredMarcas.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedMarcas = filteredMarcas.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const activeCount = marcas.filter(m => m.active).length;
  const inactiveCount = marcas.filter(m => !m.active).length;

  const handleAddMarca = () => {
    if (!formData.name || !formData.slug) {
      toast.error('Preencha todos os campos');
      return;
    }

    const slugExists = marcas.some(m => m.slug === formData.slug.toLowerCase());
    if (slugExists) {
      toast.error('Slug já existe');
      return;
    }

    const newMarca: Marca = {
      id: Date.now().toString(),
      name: formData.name,
      slug: formData.slug.toLowerCase(),
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      productsCount: 0
    };

    setMarcas([newMarca, ...marcas]);
    setShowModal(false);
    setFormData({ name: '', slug: '' });
    toast.success('Marca adicionada com sucesso!');
  };

  const handleEditMarca = () => {
    if (!editingMarca) return;

    const slugExists = marcas.some(m => m.slug === formData.slug.toLowerCase() && m.id !== editingMarca.id);
    if (slugExists) {
      toast.error('Slug já existe');
      return;
    }

    setMarcas(marcas.map(m => 
      m.id === editingMarca.id 
        ? { 
            ...m, 
            name: formData.name, 
            slug: formData.slug.toLowerCase(),
            updatedAt: new Date().toISOString()
          }
        : m
    ));
    setEditingMarca(null);
    setFormData({ name: '', slug: '' });
    toast.success('Marca atualizada com sucesso!');
  };

  const handleToggleStatus = (id: string) => {
    setMarcas(marcas.map(m => 
      m.id === id ? { ...m, active: !m.active, updatedAt: new Date().toISOString() } : m
    ));
    toast.success('Status da marca alterado!');
  };

  const openEditModal = (marca: Marca) => {
    setEditingMarca(marca);
    setFormData({
      name: marca.name,
      slug: marca.slug
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

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-AO');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{MARCAS_CONFIG.title}</h1>
          <nav className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            <Link href="/admin" className="hover:text-black dark:hover:text-white transition">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800 dark:text-gray-200 font-medium">{MARCAS_CONFIG.breadcrumb.current}</span>
          </nav>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{MARCAS_CONFIG.subtitle}</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all flex items-center gap-2"
        >
          <FiPlus size={16} />
          Nova Marca
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <FiTag className="text-blue-600 dark:text-blue-400" size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Total de Marcas</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{marcas.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <FiCheck className="text-green-600 dark:text-green-400" size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Ativas</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{activeCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
              <FiX className="text-red-600 dark:text-red-400" size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Inativas</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{inactiveCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Busca e Filtro */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Buscar marcas..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          />
        </div>
        <div className="relative">
          <button
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center gap-2"
          >
            <FiFilter size={16} />
            <span>{getFilterLabel()}</span>
          </button>
          {showFilterDropdown && (
            <div className="absolute right-0 top-full mt-2 w-36 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
              <button
                onClick={() => handleFilterChange('all')}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition rounded-t-lg ${statusFilter === 'all' ? 'text-black dark:text-white font-medium' : 'text-gray-600 dark:text-gray-400'}`}
              >
                Todos
              </button>
              <button
                onClick={() => handleFilterChange('active')}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition ${statusFilter === 'active' ? 'text-black dark:text-white font-medium' : 'text-gray-600 dark:text-gray-400'}`}
              >
                <span className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  Ativos
                </span>
              </button>
              <button
                onClick={() => handleFilterChange('inactive')}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition rounded-b-lg ${statusFilter === 'inactive' ? 'text-black dark:text-white font-medium' : 'text-gray-600 dark:text-gray-400'}`}
              >
                <span className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  Inativos
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tabela de Marcas */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Nome</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Slug</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Produtos</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Criado em</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {paginatedMarcas.map((marca) => (
                <tr key={marca.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-5 py-3 text-sm font-medium text-gray-900 dark:text-white">{marca.name}</td>
                  <td className="px-5 py-3 text-sm text-gray-500 dark:text-gray-400">{marca.slug}</td>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      <FiPackage size={10} />
                      {marca.productsCount || 0}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(marca.active)}`}>
                      {getStatusText(marca.active)}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-500 dark:text-gray-400">{formatDate(marca.createdAt)}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(marca)}
                        className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition"
                        title="Editar"
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(marca.id)}
                        className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition"
                        title={marca.active ? 'Desativar' : 'Ativar'}
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Mostrando {startIndex + 1} a {Math.min(startIndex + ITEMS_PER_PAGE, filteredMarcas.length)} de {filteredMarcas.length} marcas
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <FiChevronLeft size={16} />
              </button>
              <div className="flex gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded-lg text-sm transition ${
                        currentPage === pageNum
                          ? 'bg-black dark:bg-white text-white dark:text-black'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <FiChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Adicionar/Editar */}
      {(showModal || editingMarca) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              {editingMarca ? 'Editar Marca' : 'Nova Marca'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Slug *</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase() })}
                  placeholder="exemplo: nike, adidas, puma"
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                />
                <p className="text-xs text-gray-400 mt-1">Identificador único usado na URL</p>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingMarca(null);
                  setFormData({ name: '', slug: '' });
                }}
                className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={editingMarca ? handleEditMarca : handleAddMarca}
                className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200"
              >
                {editingMarca ? 'Salvar' : 'Adicionar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}