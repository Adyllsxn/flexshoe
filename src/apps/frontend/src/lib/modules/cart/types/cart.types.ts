export interface CartItem {
  id: string;
  productId: string;
  inventoryId: string;
  name: string;
  size: number;
  color: string;
  price: number;
  quantity: number;
  image?: string;
  sku?: string;
}

export interface CartSummary {
  totalItems: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface CartResponse {
  cart: {
    id: string;
    sessionId: string;
    items: CartItem[];
    createdAt: string;
    updatedAt: string;
  };
  summary: CartSummary;
}

export interface AddToCartDto {
  inventoryId: string;
  quantity: number;
}

export interface UpdateCartItemDto {
  quantity: number;
}