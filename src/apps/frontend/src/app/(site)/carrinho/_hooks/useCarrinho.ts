'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/lib/contexts/CartContext';
import { getCart } from '@/lib/modules/cart';
import { getStore } from '@/lib/modules/store';
import { toast } from 'sonner';
import { SHIPPING_COST, TAX_RATE, STEPS, PAYMENT_METHODS } from '../_constants/carrinho';

export function useCarrinho() {
  const { items: apiItems, removeItem, updateQuantity, clearCart, totalPrice, totalItems, loading: cartLoading, usingMock: apiUsingMock } = useCart();
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
  const [submitting, setSubmitting] = useState(false);
  const [storeWhatsapp, setStoreWhatsapp] = useState('244900000000');

  // Buscar WhatsApp da loja
  useEffect(() => {
    const fetchStore = async () => {
      const store = await getStore();
      if (store && store.whatsapp) {
        setStoreWhatsapp(store.whatsapp);
      }
    };
    fetchStore();
  }, []);

  const isUsingMock = apiUsingMock;
  
  const cartItems = apiItems.map(item => ({
    id: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    image: item.image || '/images/placeholder.svg',
    color: item.color,
    size: String(item.size),
  }));

  const subtotal = totalPrice;
  const shipping = subtotal > 250000 ? 0 : SHIPPING_COST;
  const tax = Math.round(subtotal * TAX_RATE);
  const discount = promoDiscount;
  const total = subtotal + shipping + tax - discount;

  const formatPrice = (price: number) => {
    if (isNaN(price)) return '0 Kz';
    return price.toLocaleString('pt-AO') + ' Kz';
  };

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

  const generateWhatsAppMessage = (orderId: string) => {
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
      `${discount > 0 ? `Desconto: -${formatPrice(discount)}\n` : ''}` +
      `*TOTAL: ${formatPrice(total)}*\n\n` +
      `*PAGAMENTO*\n` +
      `${formData.paymentMethod === 'money' ? '💵 Pagamento na Entrega (Dinheiro)' : '📱 Pagamento via WhatsApp'}\n\n` +
      `*Nº DO PEDIDO: ${orderId}*\n\n` +
      `_Pedido gerado automaticamente via site_`;
    
    return encodeURIComponent(message);
  };

  const placeOrder = async () => {
    if (cartItems.length === 0) {
      toast.error('Seu carrinho está vazio');
      return;
    }

    setSubmitting(true);
    toast.loading('Processando pedido...');

    if (isUsingMock) {
      toast.dismiss();
      toast.error('API offline. Não é possível finalizar o pedido.');
      setSubmitting(false);
      return;
    }

    try {
      const cartData = await getCart();
      const cartSessionId = cartData?.cart?.sessionId;
      
      if (!cartSessionId) {
        toast.error('Erro ao identificar carrinho');
        setSubmitting(false);
        return;
      }

      const orderData = {
        clientName: `${formData.firstName} ${formData.lastName}`,
        clientPhone: formData.phone,
        clientAddress: `${formData.address}, ${formData.city} - ${formData.province}`,
        cartSessionId: cartSessionId
      };

      const response = await fetch('http://localhost:3001/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      const order = await response.json();

      toast.dismiss();
      
      if (order && order.id) {
        if (formData.paymentMethod === 'whatsapp') {
          const message = generateWhatsAppMessage(order.orderNumber || order.id);
          const whatsappUrl = `https://wa.me/${storeWhatsapp}?text=${message}`;
          window.open(whatsappUrl, '_blank');
          toast.success('Redirecionando para o WhatsApp...');
        } else {
          toast.success('Pedido realizado com sucesso!');
        }
        
        setOrderPlaced(true);
        await clearCart();
        
        setTimeout(() => {
          setOrderPlaced(false);
          setCurrentStep(1);
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
        }, 3000);
      } else {
        toast.dismiss();
        toast.error('Erro ao processar pedido. Tente novamente.');
      }
    } catch (error) {
      toast.dismiss();
      toast.error('Erro ao processar pedido. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return {
    cartItems,
    currentStep,
    formData,
    setFormData,
    promoCode,
    orderPlaced,
    subtotal,
    shipping,
    tax,
    discount,
    total,
    loading: cartLoading,
    submitting,
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