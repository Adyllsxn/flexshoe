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
};

export type InventoryColor = {
  color: string;
  count: number;
};