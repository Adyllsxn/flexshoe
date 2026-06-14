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

export interface OrderItem {
  id: string;
  orderId: string;
  inventoryId: string;
  productId: string;
  productName: string;
  brandName: string;
  size: number;
  color: string;
  quantity: number;
  price: number;
  total: number;
  createdAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: string;
  clientName: string;
  clientPhone: string;
  clientAddress: string;
  subtotal: number;
  total: number;
  whatsappMessage: string;
  whatsappSentAt: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderDto {
  clientName: string;
  clientPhone: string;
  clientAddress: string;
  cartSessionId: string;
}

export interface OrderResponse {
  id: string;
  orderNumber: string;
  status: string;
  clientName: string;
  clientPhone: string;
  clientAddress: string;
  subtotal: number;
  total: number;
  items: OrderItem[];
  createdAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}