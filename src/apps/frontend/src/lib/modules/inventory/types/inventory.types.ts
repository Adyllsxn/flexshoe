import type { Product } from '@/lib/modules/product';

export type InventoryItem = {
  id: string;
  productId: string;
  size: number;
  color: string;
  sku: string;
  stock: number;
  reserved: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  product?: Product;
};

export type InventoryColor = {
  color: string;
  count: number;
};