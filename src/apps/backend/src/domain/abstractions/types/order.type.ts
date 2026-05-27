export type OrderStatus = 'pending' | 'approved' | 'delivered' | 'cancelled';

export type IOrder = {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  clientName: string;
  clientPhone: string;
  clientAddress: string | null;
  subtotal: number;
  total: number;
  whatsappMessage: string | null;
  whatsappSentAt: Date | null;
  createdById: string | null;
  updatedById: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type IOrderWithItems = IOrder & {
  items: {
    id: string;
    orderId: string;
    productId: string;
    productName: string;
    brandName: string;
    size: number;
    color: string;
    quantity: number;
    price: number;
    total: number;
    createdAt: Date;
  }[];
};

export type CreateOrderInput = {
  clientName: string;
  clientPhone: string;
  clientAddress?: string;
  cartSessionId: string;
};