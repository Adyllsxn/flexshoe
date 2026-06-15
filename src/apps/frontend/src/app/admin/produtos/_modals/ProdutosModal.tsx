'use client';

import { useState, useEffect } from 'react';
import { FiX, FiSave, FiTrash2, FiPlus, FiImage } from 'react-icons/fi';
import { getAllBrands, type Brand } from '@/lib/modules/brand';
import { getImageUrl } from '@/lib/api.connection';
import { GENDER_OPTIONS } from '../_constants/produtos';
import type { Product } from '@/lib/modules/product';

interface ProdutosModalProps {
  isOpen: boolean;
  editingProduct: Product | null;
  onClose: () => void;
  onSave: (data: FormData) => void;
  saving: boolean;
}

export default function ProdutosModal({ isOpen, editingProduct, onClose, onSave, saving }: ProdutosModalProps) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    stock: '',
    gender: 'unisex',
    brandId: '',
    featured: false,
  });
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [mainImagePreview, setMainImagePreview] = useState<string>('');
  const [additionalPreviews, setAdditionalPreviews] = useState<string[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      const data = await getAllBrands();
      setBrands(data);
      if (data.length > 0 && !formData.brandId) {
        setFormData(prev => ({ ...prev, brandId: data[0].id }));
      }
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        slug: editingProduct.slug,
        description: editingProduct.description || '',
        price: editingProduct.price.toString(),
        stock: editingProduct.stock.toString(),
        gender: editingProduct.gender,
        brandId: editingProduct.brandId,
        featured: editingProduct.featured,
      });
      if (editingProduct.mainImage) {
        setMainImagePreview(getImageUrl(editingProduct.mainImage));
      }
      if (editingProduct.images && editingProduct.images.length > 0) {
        setExistingImages(editingProduct.images.map(img => getImageUrl(img)));
      }
    } else {
      setFormData({
        name: '',
        slug: '',
        description: '',
        price: '',
        stock: '',
        gender: 'unisex',
        brandId: brands[0]?.id || '',
        featured: false,
      });
      setMainImage(null);
      setAdditionalImages([]);
      setExistingImages([]);
      setMainImagePreview('');
      setAdditionalPreviews([]);
    }
  }, [editingProduct, brands]);

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setMainImage(file);
      setMainImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setAdditionalImages(prev => [...prev, ...files]);
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setAdditionalPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeAdditionalImage = (index: number) => {
    setAdditionalImages(prev => prev.filter((_, i) => i !== index));
    setAdditionalPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index: number) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('slug', formData.slug);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('stock', formData.stock);
    data.append('gender', formData.gender);
    data.append('brandId', formData.brandId);
    data.append('featured', String(formData.featured));
    data.append('active', 'true');
    
    if (mainImage) {
      data.append('mainImage', mainImage);
    }
    
    additionalImages.forEach(img => {
      data.append('images', img);
    });
    
    onSave(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-800">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            {editingProduct ? '✏️ Editar Produto' : '✨ Novo Produto'}
          </h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
            <FiX size={20} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-120px)] p-6">
          <div className="space-y-5">
            {/* Nome e Slug */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Nome <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Slug <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/ /g, '-') })}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                />
              </div>
            </div>

            {/* Descrição */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Descrição</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
              />
            </div>

            {/* Marca, Gênero, Destaque */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Marca</label>
                <select
                  value={formData.brandId}
                  onChange={(e) => setFormData({ ...formData, brandId: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                >
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Gênero</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                >
                  {GENDER_OPTIONS.map((g) => (
                    <option key={g.value} value={g.value}>{g.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <label htmlFor="featured" className="text-sm text-gray-700 dark:text-gray-300">Destaque</label>
              </div>
            </div>

            {/* Preço e Estoque */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Preço (Kz)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Estoque</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                />
              </div>
            </div>

            {/* Imagem Principal */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Imagem Principal</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleMainImageChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer"
              />
              {mainImagePreview && (
                <div className="mt-3">
                  <p className="text-xs text-gray-500 mb-1">Preview:</p>
                  <img src={mainImagePreview} alt="Preview" className="w-24 h-24 object-cover rounded-lg border border-gray-200" />
                </div>
              )}
            </div>

            {/* Imagens Adicionais com lista */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Imagens Adicionais</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleAdditionalImagesChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer"
              />
              
              {/* Lista de imagens existentes (edição) */}
              {existingImages.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs text-gray-500 mb-2">Imagens existentes:</p>
                  <div className="flex gap-2 flex-wrap">
                    {existingImages.map((img, idx) => (
                      <div key={idx} className="relative group">
                        <img src={img} alt={`Imagem ${idx + 1}`} className="w-16 h-16 object-cover rounded-lg border border-gray-200" />
                        <button
                          type="button"
                          onClick={() => removeExistingImage(idx)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition"
                        >
                          <FiTrash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Lista de novas imagens adicionadas */}
              {additionalPreviews.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs text-gray-500 mb-2">Novas imagens:</p>
                  <div className="flex gap-2 flex-wrap">
                    {additionalPreviews.map((preview, idx) => (
                      <div key={idx} className="relative group">
                        <img src={preview} alt={`Preview ${idx + 1}`} className="w-16 h-16 object-cover rounded-lg border border-gray-200" />
                        <button
                          type="button"
                          onClick={() => removeAdditionalImage(idx)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition"
                        >
                          <FiTrash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Botões */}
          <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 bg-black dark:bg-white text-white dark:text-black rounded-xl text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all flex items-center gap-2 shadow-md disabled:opacity-50"
            >
              <FiSave size={16} />
              {saving ? 'Salvando...' : (editingProduct ? 'Salvar Alterações' : 'Adicionar Produto')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}