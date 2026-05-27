export type IInventoryItem = {
  id: string;
  productId: string;
  size: number;
  color: string;
  sku: string;
  stock: number;
  reserved: number;
  price: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type IInventoryItemWithProduct = IInventoryItem & {
  product: {
    id: string;
    name: string;
    slug: string;
    brand: {
      id: string;
      name: string;
    };
  };
};
