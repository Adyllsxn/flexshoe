'use client';

import { FiX, FiSave } from 'react-icons/fi';
import { SIZES, COLORS } from '../_constants/inventory';
import type { Product } from '@/lib/modules/product';
import type { InventoryItem } from '@/lib/modules/inventory';

interface InventoryModalProps {
  isOpen: boolean;
  editingItem: InventoryItem | null;
  formData: {
    productId: string;
    size: number;
    color: string;
    sku: string;
    stock: number;
    active: boolean;
  };
  products: Product[];
  saving: boolean;
  onClose: () => void;
  onSave: () => void;
  onFormChange: (data: any) => void;
}

export default function InventoryModal({
  isOpen,
  editingItem,
  formData,
  products,
  saving,
  onClose,
  onSave,
  onFormChange,
}: InventoryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            {editingItem ? '✏️ Editar Item' : '✨ Novo Item no Inventário'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <FiX size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Produto *</label>
            <select
              value={formData.productId}
              onChange={(e) => onFormChange({ ...formData, productId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
            >
              <option value="">Selecione um produto</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} - {product.brand?.name || 'Sem marca'}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tamanho</label>
              <select
                value={formData.size}
                onChange={(e) => onFormChange({ ...formData, size: parseInt(e.target.value) })}
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
                onChange={(e) => onFormChange({ ...formData, color: e.target.value })}
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
              onChange={(e) => onFormChange({ ...formData, sku: e.target.value.toUpperCase() })}
              placeholder="ex: NIKE-AM-39-PRE"
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
            />
            <p className="text-xs text-gray-400 mt-1">Identificador único do produto</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Estoque</label>
            <input
              type="number"
              value={formData.stock}
              onChange={(e) => onFormChange({ ...formData, stock: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="active"
              checked={formData.active}
              onChange={(e) => onFormChange({ ...formData, active: e.target.checked })}
              className="w-4 h-4 rounded border-gray-300"
            />
            <label htmlFor="active" className="text-sm text-gray-700 dark:text-gray-300">Ativo</label>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Cancelar
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50"
          >
            {saving ? 'Salvando...' : (editingItem ? 'Salvar' : 'Adicionar')}
          </button>
        </div>
      </div>
    </div>
  );
}