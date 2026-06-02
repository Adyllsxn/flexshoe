export const INVENTORY_CONFIG = {
  title: 'Inventário',
  subtitle: 'Gerencie o estoque de produtos (tamanhos e cores)',
  breadcrumb: {
    home: 'Início',
    current: 'Inventory'
  }
};

export interface InventoryItem {
  id: string;
  productId: string;
  productName: string;
  brandName: string;
  size: number;
  color: string;
  sku: string;
  stock: number;
  reserved: number;
  available: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export const INVENTORY_DATA: InventoryItem[] = [
  {
    id: '1',
    productId: '1',
    productName: 'Nike Air Max',
    brandName: 'Nike',
    size: 39,
    color: 'Preto',
    sku: 'NIKE-AM-39-PRE',
    stock: 10,
    reserved: 2,
    available: 8,
    active: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    productId: '1',
    productName: 'Nike Air Max',
    brandName: 'Nike',
    size: 40,
    color: 'Preto',
    sku: 'NIKE-AM-40-PRE',
    stock: 15,
    reserved: 3,
    available: 12,
    active: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '3',
    productId: '1',
    productName: 'Nike Air Max',
    brandName: 'Nike',
    size: 41,
    color: 'Branco',
    sku: 'NIKE-AM-41-BRA',
    stock: 8,
    reserved: 1,
    available: 7,
    active: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '4',
    productId: '2',
    productName: 'Adidas Ultraboost',
    brandName: 'Adidas',
    size: 42,
    color: 'Azul',
    sku: 'ADIDAS-UB-42-AZU',
    stock: 12,
    reserved: 2,
    available: 10,
    active: true,
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z'
  },
  {
    id: '5',
    productId: '2',
    productName: 'Adidas Ultraboost',
    brandName: 'Adidas',
    size: 43,
    color: 'Azul',
    sku: 'ADIDAS-UB-43-AZU',
    stock: 20,
    reserved: 5,
    available: 15,
    active: true,
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z'
  },
  {
    id: '6',
    productId: '3',
    productName: 'Puma Suede',
    brandName: 'Puma',
    size: 40,
    color: 'Vermelho',
    sku: 'PUMA-SU-40-VER',
    stock: 5,
    reserved: 0,
    available: 5,
    active: false,
    createdAt: '2024-02-10T10:00:00Z',
    updatedAt: '2024-02-10T10:00:00Z'
  },
  {
    id: '7',
    productId: '4',
    productName: 'Vans Old Skool',
    brandName: 'Vans',
    size: 41,
    color: 'Preto/Branco',
    sku: 'VANS-OS-41-PRB',
    stock: 25,
    reserved: 8,
    available: 17,
    active: true,
    createdAt: '2024-02-15T10:00:00Z',
    updatedAt: '2024-02-15T10:00:00Z'
  }
];

export const SIZES = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46];
export const COLORS = ['Preto', 'Branco', 'Vermelho', 'Azul', 'Verde', 'Amarelo', 'Roxo', 'Rosa', 'Cinza', 'Marrom'];

export const getStockBadge = (stock: number, reserved: number) => {
  const available = stock - reserved;
  if (available <= 0) return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
  if (available < 5) return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
  return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
};

export const getStockText = (stock: number, reserved: number) => {
  const available = stock - reserved;
  if (available <= 0) return 'Esgotado';
  if (available < 5) return 'Estoque Baixo';
  return 'Em Estoque';
};

export const getStatusBadge = (active: boolean) => {
  return active 
    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
    : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
};

export const getStatusText = (active: boolean) => {
  return active ? 'Ativo' : 'Inativo';
};