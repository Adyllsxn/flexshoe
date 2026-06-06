'use client';

import { useState } from 'react';
import { useCart } from '@/lib/contexts/CartContext';
import { createOrder, type CreateOrderDto } from '@/lib/modules/order';
import { toast } from 'sonner';
import { SHIPPING_COST, TAX_RATE, STEPS, PAYMENT_METHODS, CART_ITEMS } from '../_constants/carrinho';

export function useCarrinho() {
  const { items: apiItems, removeItem, updateQuantity, clearCart, totalPrice, loading: cartLoading, usingMock: apiUsingMock } = useCart();
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

  const isUsingMock = apiUsingMock || (apiItems.length === 0 && !cartLoading);
  
  const cartItems = apiItems.length > 0 
    ? apiItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image || `/images/placeholder.svg`,
        color: item.color,
        size: String(item.size),
      }))
    : (isUsingMock ? CART_ITEMS.map(item => ({
        id: String(item.id),
        name: item.name,
        price: item.price,
        originalPrice: item.originalPrice,
        quantity: item.quantity,
        image: item.image,
        color: item.color,
        size: item.size,
      })) : []);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 250000 ? 0 : SHIPPING_COST;
  const tax = Math.round(subtotal * TAX_RATE);
  const discount = promoDiscount;
  const total = subtotal + shipping + tax - discount;

  const formatPrice = (price: number) => {
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
      `Taxa: ${formatPrice(tax)}\n` +
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
      setTimeout(() => {
        toast.dismiss();
        const demoOrderId = 'DEMO-' + Math.random().toString(36).substring(2, 10).toUpperCase();
        
        if (formData.paymentMethod === 'whatsapp') {
          const message = generateWhatsAppMessage(demoOrderId);
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
        setSubmitting(false);
      }, 1500);
      return;
    }

    try {
      const orderData: CreateOrderDto = {
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerPhone: formData.phone,
        address: formData.address,
        city: formData.city,
        province: formData.province,
        paymentMethod: formData.paymentMethod,
      };

      const order = await createOrder(orderData);

      toast.dismiss();
      
      if (order) {
        if (formData.paymentMethod === 'whatsapp') {
          const message = generateWhatsAppMessage(order.id);
          const whatsappUrl = `https://wa.me/244900000000?text=${message}`;
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