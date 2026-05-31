export const BRANDS = [
  {
    id: 'nike',
    name: 'Nike',
    logo: '/images/logos/nike-logo.png',
    coverImage: '/images/nike_air_max_plus.png',
    description: 'Inovação e estilo para todas as modalidades esportivas. Os tênis mais icônicos do mundo.',
    products: 24,
    discount: 'Até 30% OFF',
    featured: [
      { name: 'Air Max', price: '89.990 Kz', oldPrice: '129.990 Kz', image: '/images/nike_air_max_plus.png' },
      { name: 'Dunk Low', price: '109.990 Kz', oldPrice: '139.990 Kz', image: '/images/nike_air_Jordan_masculino.webp' },
    ],
    colors: ['#000000', '#e11d48', '#ffffff'],
    popularity: 98
  },
  {
    id: 'adidas',
    name: 'Adidas',
    logo: '/images/logos/adidas-logo.png',
    coverImage: '/images/adidas_ultraboost.png',
    description: 'Performance e conforto com design alemão. Tecnologia de ponta para seu dia a dia.',
    products: 18,
    discount: 'Até 25% OFF',
    featured: [
      { name: 'Ultraboost', price: '79.990 Kz', oldPrice: '119.990 Kz', image: '/images/adidas_ultraboost.png' },
      { name: 'Campus', price: '64.990 Kz', oldPrice: null, image: '/images/adidas_nmd.webp' },
    ],
    colors: ['#000000', '#ffffff', '#1e3a8a'],
    popularity: 95
  },
  {
    id: 'puma',
    name: 'Puma',
    logo: '/images/logos/puma-logo.png',
    coverImage: '/images/puma_suede_classic.webp',
    description: 'Esporte e lifestyle se encontram. Calçados leves e com estilo urbano.',
    products: 15,
    discount: 'Até 20% OFF',
    featured: [
      { name: 'Suede', price: '69.990 Kz', oldPrice: '99.990 Kz', image: '/images/puma_suede_classic.webp' },
      { name: 'RS-X', price: '74.990 Kz', oldPrice: null, image: '/images/puma_cali_sport.png' },
    ],
    colors: ['#000000', '#16a34a', '#ffffff'],
    popularity: 88
  },
  {
    id: 'vans',
    name: 'Vans',
    logo: '/images/logos/vans-logo.png',
    coverImage: '/images/vans_old_skool.webp',
    description: 'Autenticidade e atitude. O símbolo da cultura skate e streetwear.',
    products: 22,
    discount: 'Até 35% OFF',
    featured: [
      { name: 'Old Skool', price: '59.990 Kz', oldPrice: '89.990 Kz', image: '/images/vans_old_skool.webp' },
      { name: 'Slip-On', price: '49.990 Kz', oldPrice: null, image: '/images/vans_ultraRange.webp' },
    ],
    colors: ['#000000', '#ffffff', '#dc2626'],
    popularity: 92
  },
];

export const PAGE_META = {
  title: 'Nossas Marcas',
  subtitle: 'Os melhores tênis das marcas mais icônicas do mundo',
  breadcrumb: {
    home: 'Início',
    current: 'Marcas'
  }
};