export type ICartItem = {
  id: string;
  cartId: string;
  inventoryId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
};

export type ICart = {
  id: string;
  sessionId: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
  items: ICartItem[];
};

export type ICartWithDetails = {
  id: string;
  sessionId: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
  items: {
    id: string;
    cartId: string;
    inventoryId: string;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
    inventory: {
      id: string;
      size: number;
      color: string;
      stock: number;
      reserved: number;
      product: {
        id: string;
        name: string;
        slug: string;
        price: number;
        mainImage: string | null;
        brand: {
          id: string;
          name: string;
        };
      };
    };
  }[];
};

export type CartItemDto = {
  inventoryId: string;
  productId: string;
  quantity: number;
  productName: string;
  productSlug: string;
  brandName: string;
  size: number;
  color: string;
  price: number;
  subtotal: number;
};
