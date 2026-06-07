'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { 
  getCart, 
  addToCart as apiAddToCart,
  updateCartItem as apiUpdateCartItem,
  removeCartItem as apiRemoveCartItem,
  clearCart as apiClearCart,
  type CartItem,
  type AddToCartDto
} from '@/lib/modules/cart';
import { getImageUrl } from '@/lib/api.connection';
import { toast } from 'sonner';

interface CartContextType {
  items: CartItem[];
  addItem: (inventoryId: string, quantity: number) => Promise<boolean>;
  removeItem: (itemId: string) => Promise<boolean>;
  updateQuantity: (itemId: string, quantity: number) => Promise<boolean>;
  clearCart: () => Promise<boolean>;
  totalItems: number;
  totalPrice: number;
  loading: boolean;
  usingMock: boolean;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [usingMock, setUsingMock] = useState(false);

  const refreshCart = useCallback(async () => {
    try {
      const cartData = await getCart();
      if (cartData && cartData.cart && cartData.cart.items) {
        const mappedItems: CartItem[] = cartData.cart.items.map((item: any) => ({
          id: item.id,
          productId: item.inventory?.product?.id || '',
          inventoryId: item.inventoryId,
          name: item.inventory?.product?.name || '',
          size: item.inventory?.size || 0,
          color: item.inventory?.color || '',
          price: item.inventory?.product?.price || 0,
          quantity: item.quantity,
          image: getImageUrl(item.inventory?.product?.mainImage),
          sku: item.inventory?.sku || '',
        }));
        
        setItems(mappedItems);
        setTotalItems(cartData.summary?.itemCount || 0);
        setTotalPrice(cartData.summary?.subtotal || 0);
        setUsingMock(false);
      } else {
        setItems([]);
        setTotalItems(0);
        setTotalPrice(0);
        setUsingMock(true);
      }
    } catch (error) {
      setItems([]);
      setTotalItems(0);
      setTotalPrice(0);
      setUsingMock(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const addItem = async (inventoryId: string, quantity: number): Promise<boolean> => {
    if (usingMock) {
      toast.warning('API offline. Não é possível adicionar ao carrinho', { duration: 3000 });
      return false;
    }
    
    try {
      const result = await apiAddToCart({ inventoryId, quantity });
      if (result) {
        await refreshCart();
        toast.success('Produto adicionado ao carrinho!');
        return true;
      }
      toast.error('Erro ao adicionar ao carrinho');
      return false;
    } catch (error) {
      toast.error('Erro ao adicionar ao carrinho');
      return false;
    }
  };

  const removeItem = async (itemId: string): Promise<boolean> => {
    if (usingMock) {
      toast.warning('API offline. Não é possível remover item', { duration: 3000 });
      return false;
    }
    
    try {
      const result = await apiRemoveCartItem(itemId);
      if (result) {
        await refreshCart();
        toast.success('Produto removido do carrinho');
        return true;
      }
      return false;
    } catch (error) {
      toast.error('Erro ao remover item');
      return false;
    }
  };

  const updateQuantity = async (itemId: string, quantity: number): Promise<boolean> => {
    if (usingMock) {
      toast.warning('API offline. Não é possível atualizar quantidade', { duration: 3000 });
      return false;
    }
    
    try {
      const result = await apiUpdateCartItem(itemId, { quantity });
      if (result) {
        await refreshCart();
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const clearCartItems = async (): Promise<boolean> => {
    if (usingMock) {
      setItems([]);
      setTotalItems(0);
      setTotalPrice(0);
      toast.success('Carrinho limpo');
      return true;
    }
    
    try {
      const result = await apiClearCart();
      if (result) {
        await refreshCart();
        toast.success('Carrinho limpo');
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart: clearCartItems,
        totalItems,
        totalPrice,
        loading,
        usingMock,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}