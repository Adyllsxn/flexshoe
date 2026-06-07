export interface CreateOrderDto {
  clientName: string;
  clientPhone: string;
  clientAddress: string;
  cartSessionId: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  size: number;
  color: string;
  price: number;
  quantity: number;
}

export interface OrderResponse {
  id: string;
  orderNumber: string;
  status: string;
  clientName: string;
  clientPhone: string;
  clientAddress: string;
  total: number;
  items: OrderItem[];
  createdAt: string;
}