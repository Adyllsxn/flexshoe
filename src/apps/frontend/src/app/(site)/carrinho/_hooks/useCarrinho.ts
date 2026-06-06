'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/lib/contexts/CartContext';
import { getImageUrl } from '@/lib/api.connection';
import { toast } from 'sonner';
import { SHIPPING_COST, TAX_RATE, STEPS, PAYMENT_METHODS } from '../_constants/carrinho';

interface CartItem {
  id: number;
  productId: string;
  name: string;
  price: number;
  originalPrice: number | null;
  quantity: number;
  image: string;
  color: string;
  size: string;
  gender: string;
}

export function useCarrinho() {
  const { items: cartContextItems, updateQuantity: updateContextQuantity, removeItem: removeContextItem, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    paymentMethod: 'money'
  });
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Mapeamento de imagens por nome do produto (fallback)
  const getProductImage = (productName: string): string => {
    const name = productName.toLowerCase();
    if (name.includes('nike')) return '/images/nike_air_max_plus.png';
    if (name.includes('adidas')) return '/images/adidas_ultraboost.png';
    if (name.includes('puma')) return '/images/puma_suede_classic.webp';
    if (name.includes('vans')) return '/images/vans_old_skool.webp';
    return '/images/placeholder.svg';
  };

  // Converter itens do cart context para o formato da página
  useEffect(() => {
    if (cartContextItems.length > 0) {
      const convertedItems: CartItem[] = cartContextItems.map((item, index) => ({
        id: index + 1,
        productId: item.productId,
        name: item.name,
        price: item.price,
        originalPrice: null,
        quantity: item.quantity,
        image: getProductImage(item.name),
        color: item.color,
        size: String(item.size),
        gender: 'Unisex'
      }));
      setCartItems(convertedItems);
    } else {
      setCartItems([]);
    }
  }, [cartContextItems]);

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-AO') + ' Kz';
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const item = cartItems.find(i => i.id === id);
    if (item && item.productId) {
      updateContextQuantity(`${item.productId}-${item.size}-${item.color}`, newQuantity);
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
    toast.success('Quantidade atualizada');
  };

  const removeItem = (id: number) => {
    const item = cartItems.find(i => i.id === id);
    if (item && item.productId) {
      removeContextItem(`${item.productId}-${item.size}-${item.color}`);
    }
    
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast.success('Produto removido do carrinho');
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 250000 ? 0 : SHIPPING_COST;
  const tax = Math.round(subtotal * TAX_RATE);
  const discount = promoDiscount;
  const total = subtotal + shipping + tax - discount;

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'FLEX10') {
      setPromoDiscount(Math.round(subtotal * 0.1));
      toast.success('Código FLEX10 aplicado! 10% de desconto');
      setPromoCode('');
    } else if (promoCode.toUpperCase() === 'FLEX20') {
      setPromoDiscount(Math.round(subtotal * 0.2));
      toast.success('Código FLEX20 aplicado! 20% de desconto');
      setPromoCode('');
    } else {
      toast.error('Código inválido');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (currentStep === 1 && (!formData.firstName || !formData.lastName || !formData.phone)) {
      toast.error('Preencha todos os campos');
      return;
    }
    if (currentStep === 2 && (!formData.address || !formData.city || !formData.province)) {
      toast.error('Preencha todos os campos');
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const generateWhatsAppMessage = () => {
    const itemsList = cartItems.map(item => 
      `• ${item.name} - ${item.color} | Tamanho ${item.size} - ${item.quantity}x = ${formatPrice(item.price * item.quantity)}`
    ).join('\n');
    
    const message = `🛍️ *NOVO PEDIDO - FLEXSHOE* 🛍️\n\n` +
      `*DADOS DO CLIENTE*\n` +
      `Nome: ${formData.firstName} ${formData.lastName}\n` +
      `Telefone: ${formData.phone}\n\n` +
      `*ENDEREÇO DE ENTREGA*\n` +
      `${formData.address}, ${formData.city} - ${formData.province}\n\n` +
      `*ITENS DO PEDIDO*\n` +
      `${itemsList}\n\n` +
      `*RESUMO*\n` +
      `Subtotal: ${formatPrice(subtotal)}\n` +
      `Entrega: ${shipping === 0 ? 'Grátis' : formatPrice(shipping)}\n` +
      `Taxa: ${formatPrice(tax)}\n` +
      `${discount > 0 ? `Desconto: -${formatPrice(discount)}\n` : ''}` +
      `*TOTAL: ${formatPrice(total)}*\n\n` +
      `*PAGAMENTO*\n` +
      `${formData.paymentMethod === 'money' ? '💵 Pagamento na Entrega (Dinheiro)' : '📱 Pagamento via WhatsApp'}\n\n` +
      `_Pedido gerado automaticamente via site_`;
    
    return encodeURIComponent(message);
  };

  const placeOrder = () => {
    toast.loading('Processando pedido...');
    
    setTimeout(() => {
      toast.dismiss();
      
      if (formData.paymentMethod === 'whatsapp') {
        const message = generateWhatsAppMessage();
        const whatsappUrl = `https://wa.me/244900000000?text=${message}`;
        window.open(whatsappUrl, '_blank');
        toast.success('Redirecionando para o WhatsApp...');
      } else {
        toast.success('Pedido realizado com sucesso!');
      }
      
      setOrderPlaced(true);
      setTimeout(() => {
        setOrderPlaced(false);
        setCurrentStep(1);
        clearCart();
        setCartItems([]);
        setFormData({
          firstName: '',
          lastName: '',
          phone: '',
          address: '',
          city: '',
          province: '',
          paymentMethod: 'money'
        });
        setPromoDiscount(0);
        setPromoCode('');
      }, 2000);
    }, 1500);
  };

  return {
    cartItems,
    currentStep,
    formData,
    promoCode,
    promoDiscount,
    orderPlaced,
    subtotal,
    shipping,
    tax,
    discount,
    total,
    formatPrice,
    updateQuantity,
    removeItem,
    applyPromoCode,
    handleInputChange,
    setPromoCode,
    nextStep,
    prevStep,
    placeOrder,
    STEPS,
    PAYMENT_METHODS,
  };
}