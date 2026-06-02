'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiBox,
  FiPackage,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
  FiSearch,
  FiCheck,
  FiX,
  FiAlertTriangle
} from 'react-icons/fi';
import { toast } from 'sonner';
import { 
  INVENTORY_CONFIG, 
  INVENTORY_DATA, 
  InventoryItem,
  SIZES,
  COLORS,
  getStockBadge,
  getStockText,
  getStatusBadge,
  getStatusText
} from './_constants/inventory';

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>(INVENTORY_DATA);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    productName: '',
    brandName: '',
    size: 39,
    color: 'Preto',
    sku: '',
    stock: 0,
    reserved: 0
  });

  const ITEMS_PER_PAGE = 10;

  // Filtrar inventário
  let filteredInventory = inventory.filter(item => {
    const matchesSearch = item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && item.active) || 
      (statusFilter === 'inactive' && !item.active);
    return matchesSearch && matchesStatus;
  });

  // Paginação
  const totalPages = Math.ceil(filteredInventory.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedInventory = filteredInventory.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const totalStock = inventory.reduce((sum, item) => sum + item.stock, 0);
  const totalReserved = inventory.reduce((sum, item) => sum + item.reserved, 0);
  const totalAvailable = totalStock - totalReserved;
  const activeCount = inventory.filter(i => i.active).length;
  const inactiveCount = inventory.filter(i => !i.active).length;

  const handleAddItem = () => {
    if (!formData.productName || !formData.sku) {
      toast.error('Preencha os campos obrigatórios');
      return;
    }

    const skuExists = inventory.some(i => i.sku === formData.sku);
    if (skuExists) {
      toast.error('SKU já existe');
      return;
    }

    const newItem: InventoryItem = {
      id: Date.now().toString(),
      productId: Date.now().toString(),
      productName: formData.productName,
      brandName: formData.brandName,
      size: formData.size,
      color: formData.color,
      sku: formData.sku,
      stock: formData.stock,
      reserved: formData.reserved,
      available: formData.stock - formData.reserved,
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setInventory([newItem, ...inventory]);
    setShowModal(false);
    setFormData({
      productName: '',
      brandName: '',
      size: 39,
      color: 'Preto',
      sku: '',
      stock: 0,
      reserved: 0
    });
    toast.success('Item adicionado ao inventário!');
  };

  const handleEditItem = () => {
    if (!editingItem) return;

    const skuExists = inventory.some(i => i.sku === formData.sku && i.id !== editingItem.id);
    if (skuExists) {
      toast.error('SKU já existe');
      return;
    }

    setInventory(inventory.map(item => 
      item.id === editingItem.id 
        ? { 
            ...item, 
            productName: formData.productName,
            brandName: formData.brandName,
            size: formData.size,
            color: formData.color,
            sku: formData.sku,
            stock: formData.stock,
            reserved: formData.reserved,
            available: formData.stock - formData.reserved,
            updatedAt: new Date().toISOString()
          }
        : item
    ));
    setEditingItem(null);
    setFormData({
      productName: '',
      brandName: '',
      size: 39,
      color: 'Preto',
      sku: '',
      stock: 0,
      reserved: 0
    });
    toast.success('Item atualizado com sucesso!');
  };

  const handleToggleStatus = (id: string) => {
    setInventory(inventory.map(item => 
      item.id === id ? { ...item, active: !item.active, updatedAt: new Date().toISOString() } : item
    ));
    toast.success('Status do item alterado!');
  };

  const openEditModal = (item: InventoryItem) => {
    setEditingItem(item);
    setFormData({
      productName: item.productName,
      brandName: item.brandName,
      size: item.size,
      color: item.color,
      sku: item.sku,
      stock: item.stock,
      reserved: item.reserved
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
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{INVENTORY_CONFIG.title}</h1>
          <nav className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            <Link href="/admin" className="hover:text-black dark:hover:text-white transition">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800 dark:text-gray-200 font-medium">{INVENTORY_CONFIG.breadcrumb.current}</span>
          </nav>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{INVENTORY_CONFIG.subtitle}</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all flex items-center gap-2"
        >
          <FiPlus size={16} />
          Novo Item
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <FiBox className="text-blue-600 dark:text-blue-400" size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Total em Estoque</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{totalStock}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
              <FiAlertTriangle className="text-yellow-600 dark:text-yellow-400" size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Reservados</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{totalReserved}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <FiCheck className="text-green-600 dark:text-green-400" size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Disponíveis</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{totalAvailable}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <FiPackage className="text-purple-600 dark:text-purple-400" size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Itens Ativos</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{activeCount}</p>
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
            placeholder="Buscar por produto, marca ou SKU..."
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

      {/* Tabela de Inventário */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Produto</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Marca</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Tamanho</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Cor</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">SKU</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Estoque</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Reservado</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Disponível</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {paginatedInventory.map((item) => {
                const available = item.stock - item.reserved;
                return (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-5 py-3 text-sm font-medium text-gray-900 dark:text-white">{item.productName}</td>
                    <td className="px-5 py-3 text-sm text-gray-600 dark:text-gray-300">{item.brandName}</td>
                    <td className="px-5 py-3 text-sm text-gray-600 dark:text-gray-300">{item.size}</td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color === 'Preto' ? '#000' : item.color === 'Branco' ? '#fff' : '#ccc' }} />
                        {item.color}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm font-mono text-gray-500 dark:text-gray-400">{item.sku}</td>
                    <td className="px-5 py-3 text-sm font-medium text-gray-900 dark:text-white">{item.stock}</td>
                    <td className="px-5 py-3 text-sm text-gray-600 dark:text-gray-300">{item.reserved}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStockBadge(item.stock, item.reserved)}`}>
                        {available}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(item.active)}`}>
                        {getStatusText(item.active)}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition"
                          title="Editar"
                        >
                          <FiEdit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(item.id)}
                          className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition"
                          title={item.active ? 'Desativar' : 'Ativar'}
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Mostrando {startIndex + 1} a {Math.min(startIndex + ITEMS_PER_PAGE, filteredInventory.length)} de {filteredInventory.length} itens
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
      {(showModal || editingItem) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              {editingItem ? 'Editar Item' : 'Novo Item no Inventário'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Produto *</label>
                <input
                  type="text"
                  value={formData.productName}
                  onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Marca</label>
                <input
                  type="text"
                  value={formData.brandName}
                  onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tamanho</label>
                  <select
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                  >
                    {SIZES.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cor</label>
                  <select
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                  >
                    {COLORS.map(color => (
                      <option key={color} value={color}>{color}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SKU *</label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value.toUpperCase() })}
                  placeholder="ex: NIKE-AM-39-PRE"
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                />
                <p className="text-xs text-gray-400 mt-1">Identificador único do produto</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Estoque</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reservados</label>
                  <input
                    type="number"
                    value={formData.reserved}
                    onChange={(e) => setFormData({ ...formData, reserved: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingItem(null);
                  setFormData({
                    productName: '',
                    brandName: '',
                    size: 39,
                    color: 'Preto',
                    sku: '',
                    stock: 0,
                    reserved: 0
                  });
                }}
                className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={editingItem ? handleEditItem : handleAddItem}
                className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200"
              >
                {editingItem ? 'Salvar' : 'Adicionar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}