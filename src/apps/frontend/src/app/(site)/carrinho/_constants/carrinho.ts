export const carrinhoData = {
  title: 'Carrinho',
  breadcrumb: {
    home: 'Início',
    current: 'Carrinho'
  }
};

export const SHIPPING_COST = 4990;
export const TAX_RATE = 0;

export const STEPS = [
  { number: 1, title: 'Informações' },
  { number: 2, title: 'Entrega' },
  { number: 3, title: 'Pagamento' },
  { number: 4, title: 'Revisão' }
];

export const PAYMENT_METHODS = [
  { id: 'money', name: 'Pagamento na Entrega (Dinheiro)', icon: '💵', description: 'Você paga em dinheiro no momento da entrega do pedido' },
  { id: 'whatsapp', name: 'Pagamento via WhatsApp', icon: '📱', description: 'Você receberá um link para finalizar o pagamento no WhatsApp' }
];