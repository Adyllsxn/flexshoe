export const HERO_CONTENT = {
  title: {
    light: 'Estilo',
    bold: 'Para Cada Estação',
    prefix: 'Descubra'
  },
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.',
  buttons: {
    primary: { text: 'Comprar Agora', href: '/produtos' },
    secondary: { text: 'Ver Coleções', href: '/marcas' }
  },
  features: [
    { icon: 'bi-shield-check', text: 'Pagamento Seguro' },
    { icon: 'bi-arrow-repeat', text: 'Devolução Fácil' }
  ],
  cards: [
    { title: 'Coleção Verão', price: '89.990 Kz', position: 'left', delay: 0.8 },
    { title: 'Estilo Casual', price: '59.990 Kz', position: 'right', delay: 1 }
  ],
  badge: { discount: '30%', text: 'OFF' },
  image: '/images/puma_cali_dream_leather_gs_white_black.png',
  subimage: '/images/puma_suede_classic.webp',
  animations: {
    floatDuration: '4s',
    floatDistance: '15px'
  }
};