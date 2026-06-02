'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiPackage,
  FiTag,
  FiDollarSign,
  FiBox,
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiSave
} from 'react-icons/fi';
import { toast } from 'sonner';
import { 
  PRODUTOS_CONFIG, 
  PRODUTOS_DATA, 
  CATEGORIES, 
  BRANDS,
  GENDER,
  getStatusBadge, 
  getStatusText,
  formatPrice
} from './_constants/produtos';

interface Produto {
  id: number;
  name: string;
  category: string;
  brand: string;
  gender: string;
  price: number;
  stock: number;
  status: string;
  image: string;
  createdAt: string;
}

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>(PRODUTOS_DATA);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Produto | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    category: 'tenis',
    brand: 'nike',
    gender: 'unisex',
    price: '',
    stock: '',
    image: ''
  });

  const ITEMS_PER_PAGE = 10;

  let filteredProdutos = produtos.filter(produto => {
    const matchesSearch = produto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      produto.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || produto.status === statusFilter;
    const matchesGender = genderFilter === 'all' || produto.gender === genderFilter;
    return matchesSearch && matchesStatus && matchesGender;
  });

  const totalPages = Math.ceil(filteredProdutos.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProdutos = filteredProdutos.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const activeProducts = produtos.filter(p => p.status === 'active');
  const totalValue = activeProducts.reduce((sum, p) => sum + (p.price * p.stock), 0);

  const handleAddProduct = () => {
    if (!formData.name || !formData.price) {
      toast.error('Preencha os campos obrigatórios');
      return;
    }

    const newProduct: Produto = {
      id: produtos.length + 1,
      name: formData.name,
      category: CATEGORIES.find(c => c.value === formData.category)?.label || 'Tênis',
      brand: BRANDS.find(b => b.value === formData.brand)?.label || 'Nike',
      gender: GENDER.find(g => g.value === formData.gender)?.label || 'Unisex',
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock) || 0,
      status: 'active',
      image: formData.image || '/images/placeholder.png',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setProdutos([newProduct, ...produtos]);
    setShowModal(false);
    setFormData({ name: '', category: 'tenis', brand: 'nike', gender: 'unisex', price: '', stock: '', image: '' });
    toast.success('Produto adicionado com sucesso!');
  };

  const handleEditProduct = () => {
    if (!editingProduct) return;

    setProdutos(produtos.map(p => 
      p.id === editingProduct.id 
        ? { 
            ...p, 
            name: formData.name,
            category: CATEGORIES.find(c => c.value === formData.category)?.label || p.category,
            brand: BRANDS.find(b => b.value === formData.brand)?.label || p.brand,
            gender: GENDER.find(g => g.value === formData.gender)?.label || p.gender,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock) || p.stock,
            image: formData.image || p.image
          }
        : p
    ));
    setEditingProduct(null);
    setFormData({ name: '', category: 'tenis', brand: 'nike', gender: 'unisex', price: '', stock: '', image: '' });
    toast.success('Produto atualizado com sucesso!');
  };

  const handleDeleteProduct = (id: number) => {
    setProdutos(produtos.map(p => 
      p.id === id ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' } : p
    ));
    toast.success('Status do produto alterado!');
  };

  const handleRestoreProduct = (id: number) => {
    setProdutos(produtos.map(p => 
      p.id === id ? { ...p, status: 'active' } : p
    ));
    toast.success('Produto restaurado com sucesso!');
  };

  const openEditModal = (product: Produto) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: CATEGORIES.find(c => c.label === product.category)?.value || 'tenis',
      brand: BRANDS.find(b => b.label === product.brand)?.value || 'nike',
      gender: GENDER.find(g => g.label === product.gender)?.value || 'unisex',
      price: product.price.toString(),
      stock: product.stock.toString(),
      image: product.image
    });
  };

  const handleFilterChange = (setter: any, value: any) => {
    setter(value);
    setCurrentPage(1);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData({ name: '', category: 'tenis', brand: 'nike', gender: 'unisex', price: '', stock: '', image: '' });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{PRODUTOS_CONFIG.title}</h1>
          <nav className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            <Link href="/admin" className="hover:text-black dark:hover:text-white transition">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800 dark:text-gray-200 font-medium">{PRODUTOS_CONFIG.breadcrumb.current}</span>
          </nav>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{PRODUTOS_CONFIG.subtitle}</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all flex items-center gap-2"
        >
          <FiPlus size={16} />
          Novo Produto
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <FiPackage className="text-blue-600 dark:text-blue-400" size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Total de Produtos</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{activeProducts.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <FiBox className="text-green-600 dark:text-green-400" size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Estoque Total</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {activeProducts.reduce((sum, p) => sum + p.stock, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <FiDollarSign className="text-purple-600 dark:text-purple-400" size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Valor em Estoque</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{formatPrice(totalValue)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
              <FiTag className="text-orange-600 dark:text-orange-400" size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Categorias</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{CATEGORIES.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => handleFilterChange(setSearchTerm, e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => handleFilterChange(setStatusFilter, e.target.value)}
          className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        >
          <option value="all">Todos os Status</option>
          <option value="active">Ativos</option>
          <option value="inactive">Inativos</option>
        </select>
        <select
          value={genderFilter}
          onChange={(e) => handleFilterChange(setGenderFilter, e.target.value)}
          className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        >
          <option value="all">Todos os Gêneros</option>
          {GENDER.map((gender) => (
            <option key={gender.value} value={gender.value}>{gender.label}</option>
          ))}
        </select>
      </div>

      {/* Tabela de Produtos */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Imagem</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Nome</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Marca</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Gênero</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Preço</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Estoque</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {paginatedProdutos.map((produto) => (
                <tr key={produto.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-5 py-3">
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                      <Image src={produto.image} alt={produto.name} width={40} height={40} className="object-contain" />
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm font-medium text-gray-900 dark:text-white">{produto.name}</td>
                  <td className="px-5 py-3 text-sm text-gray-600 dark:text-gray-300">{produto.brand}</td>
                  <td className="px-5 py-3">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      {produto.gender}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm font-medium text-gray-900 dark:text-white">{formatPrice(produto.price)}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${produto.stock < 10 ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
                      {produto.stock} unidades
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(produto.status)}`}>
                      {getStatusText(produto.status)}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEditModal(produto)} className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition" title="Editar">
                        <FiEdit2 size={16} />
                      </button>
                      <button onClick={() => handleDeleteProduct(produto.id)} className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition" title="Desativar">
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
              Mostrando {startIndex + 1} a {Math.min(startIndex + ITEMS_PER_PAGE, filteredProdutos.length)} de {filteredProdutos.length} produtos
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition">
                <FiChevronLeft size={16} />
              </button>
              <div className="flex gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) pageNum = i + 1;
                  else if (currentPage <= 3) pageNum = i + 1;
                  else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                  else pageNum = currentPage - 2 + i;
                  return (
                    <button key={pageNum} onClick={() => setCurrentPage(pageNum)} className={`w-8 h-8 rounded-lg text-sm transition ${currentPage === pageNum ? 'bg-black dark:bg-white text-white dark:text-black' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages} className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition">
                <FiChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Melhorado */}
      {(showModal || editingProduct) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-800">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                {editingProduct ? '✏️ Editar Produto' : '✨ Novo Produto'}
              </h2>
              <button onClick={closeModal} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                <FiX size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-4">
                {/* Nome */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Nome do Produto <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Nike Air Max"
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition"
                  />
                </div>

                {/* Categoria, Marca, Gênero - Grid 3 colunas */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Categoria</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Marca</label>
                    <select
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                    >
                      {BRANDS.map((brand) => (
                        <option key={brand.value} value={brand.value}>{brand.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Gênero</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                    >
                      {GENDER.map((gender) => (
                        <option key={gender.value} value={gender.value}>{gender.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Preço e Estoque - Grid 2 colunas */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Preço (Kz) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">Kz</span>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        placeholder="0"
                        className="w-full pl-8 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Estoque</label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      placeholder="0"
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                    />
                  </div>
                </div>

                {/* Imagem */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Imagem (URL)</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="/images/produto.png"
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                  />
                  {formData.image && (
                    <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                      <span>Preview:</span>
                      <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                        <img src={formData.image} alt="preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <button
                onClick={closeModal}
                className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                Cancelar
              </button>
              <button
                onClick={editingProduct ? handleEditProduct : handleAddProduct}
                className="px-5 py-2 bg-black dark:bg-white text-white dark:text-black rounded-xl text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all flex items-center gap-2 shadow-md"
              >
                <FiSave size={16} />
                {editingProduct ? 'Salvar Alterações' : 'Adicionar Produto'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}