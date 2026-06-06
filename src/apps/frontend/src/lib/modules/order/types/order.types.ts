export interface CreateOrderDto {
  customerName: string;
  customerPhone: string;
  address: string;
  city: string;
  province: string;
  paymentMethod: string;
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
  customerName: string;
  customerPhone: string;
  address: string;
  city: string;
  province: string;
  paymentMethod: string;
  total: number;
  status: string;
  items: OrderItem[];
  createdAt: string;
}