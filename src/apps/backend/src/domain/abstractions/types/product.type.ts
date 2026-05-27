export type IProduct = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  brandId: string;
  gender: 'male' | 'female' | 'unisex' | 'kids';
  mainImage: string | null;
  images: string[];
  active: boolean;
  featured: boolean;
  views: number;
  stock: number;
  createdById: string | null;
  updatedById: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type IProductWithBrand = IProduct & {
  brand: {
    id: string;
    name: string;
    slug: string;
  };
};
