export type Brand = {
  id: string;
  name: string;
  slug: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  brandId: string;
  gender: 'male' | 'female' | 'unisex' | 'kids';
  mainImage: string | null;
  images: string[];
  price: number;
  stock: number;
  active: boolean;
  featured: boolean;
  views: number;
  deletedAt: string | null;
  createdById: string;
  updatedById: string;
  createdAt: string;
  updatedAt: string;
  brand: Brand;
};

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
  product: Product;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type ProductFilters = {
  page?: number;
  limit?: number;
  brand?: string;
  gender?: string;
  featured?: boolean;
  search?: string;
};