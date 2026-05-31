export const carrinhoData = {
  title: 'Carrinho',
  breadcrumb: {
    home: 'Início',
    current: 'Carrinho'
  }
};

export const CART_ITEMS = [
  {
    id: 1,
    name: 'Nike Air Max',
    price: 89990,
    originalPrice: 129990,
    quantity: 1,
    image: '/images/nike_air_max_plus.png',
    color: 'Preto',
    size: '42',
    gender: 'Unisex'
  },
  {
    id: 2,
    name: 'Adidas Ultraboost',
    price: 139990,
    originalPrice: 199990,
    quantity: 1,
    image: '/images/adidas_ultraboost.png',
    color: 'Azul',
    size: '43',
    gender: 'Masculino'
  },
  {
    id: 3,
    name: 'Vans Old Skool',
    price: 59990,
    originalPrice: null,
    quantity: 2,
    image: '/images/vans_old_skool.webp',
    color: 'Preto/Branco',
    size: '41',
    gender: 'Unisex'
  }
];

export const SHIPPING_COST = 4990;
export const TAX_RATE = 0.15;

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