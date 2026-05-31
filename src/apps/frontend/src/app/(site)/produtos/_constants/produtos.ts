import { 
  FiGrid, 
  FiList,
  FiSearch,
  FiHeart,
  FiRepeat,
  FiEye
} from 'react-icons/fi';

export const produtosData = {
  title: 'Produtos',
  breadcrumb: {
    home: 'Início',
    current: 'Produtos'
  }
};

export const GENDER = [
  { name: 'Unisex', count: 42 },
  { name: 'Masculino', count: 38 },
  { name: 'Feminino', count: 35 },
  { name: 'Kid', count: 12 }
];

export const COLORS = [
  { name: 'Preto', code: '#000000' },
  { name: 'Branco', code: '#ffffff' },
  { name: 'Vermelho', code: '#e74c3c' },
  { name: 'Azul', code: '#3498db' },
  { name: 'Verde', code: '#2ecc71' },
  { name: 'Amarelo', code: '#f1c40f' },
  { name: 'Roxo', code: '#9b59b6' },
  { name: 'Laranja', code: '#e67e22' },
  { name: 'Rosa', code: '#fd79a8' },
  { name: 'Marrom', code: '#795548' }
];

export const BRANDS = [
  { name: 'Nike', count: 24 },
  { name: 'Adidas', count: 18 },
  { name: 'Puma', count: 12 },
  { name: 'Reebok', count: 9 },
  { name: 'Under Armour', count: 7 },
  { name: 'New Balance', count: 6 },
  { name: 'Converse', count: 5 },
  { name: 'Vans', count: 4 }
];

export const PRODUCTS = [
  {
    id: 1,
    name: 'Nike Air Max',
    description: 'Tênis confortável e estiloso para o dia a dia',
    price: 89990,
    originalPrice: 129990,
    rating: 4.5,
    label: '-30%',
    labelType: 'sale',
    image: '/images/nike_air_max_plus.png',
    colors: ['#000000', '#ffffff', '#3b82f6'],
    gender: 'Unisex'
  },
  {
    id: 2,
    name: 'Nike Air Jordan 1',
    description: 'O clássico que dispensa apresentações',
    price: 189990,
    originalPrice: 229990,
    rating: 4.9,
    label: '-17%',
    labelType: 'sale',
    image: '/images/nike_air_Jordan_masculino.webp',
    colors: ['#000000', '#dc2626', '#ffffff'],
    gender: 'Unisex'
  },
  {
    id: 3,
    name: 'Adidas Ultraboost',
    description: 'Tênis com tecnologia de ponta para máximo conforto',
    price: 139990,
    originalPrice: 199990,
    rating: 4.8,
    label: '-30%',
    labelType: 'sale',
    image: '/images/adidas_ultraboost.png',
    colors: ['#000000', '#ffffff', '#3b82f6'],
    gender: 'Masculino'
  },
  {
    id: 4,
    name: 'Adidas NMD',
    description: 'Estilo urbano com conforto máximo',
    price: 119990,
    originalPrice: null,
    rating: 4.3,
    label: 'Novidade',
    labelType: 'new',
    image: '/images/adidas_nmd.webp',
    colors: ['#000000', '#ffffff', '#ec4899'],
    gender: 'Masculino'
  },
  {
    id: 5,
    name: 'Puma Suede Classic',
    description: 'Design clássico e atemporal',
    price: 69990,
    originalPrice: null,
    rating: 4.2,
    label: null,
    labelType: null,
    image: '/images/puma_suede_classic.webp',
    colors: ['#000000', '#ffffff', '#64748b'],
    gender: 'Unisex'
  },
  {
    id: 6,
    name: 'Puma Cali Sport',
    description: 'Inspirado no estilo feminino moderno',
    price: 79990,
    originalPrice: null,
    rating: 4.4,
    label: 'Novidade',
    labelType: 'new',
    image: '/images/puma_cali_sport.png',
    colors: ['#ffffff', '#f97316', '#ec4899'],
    gender: 'Feminino'
  },
  {
    id: 7,
    name: 'Vans Old Skool',
    description: 'O clássico do skate mundial',
    price: 59990,
    originalPrice: 89990,
    rating: 5.0,
    label: '-33%',
    labelType: 'sale',
    image: '/images/vans_old_skool.webp',
    colors: ['#000000', '#ffffff', '#dc2626'],
    gender: 'Unisex'
  },
  {
    id: 8,
    name: 'Vans UltraRange',
    description: 'Conforto para longas caminhadas',
    price: 84990,
    originalPrice: null,
    rating: 4.1,
    label: null,
    labelType: null,
    image: '/images/vans_ultraRange.webp',
    colors: ['#000000', '#64748b', '#22c55e'],
    gender: 'Unisex'
  },
  {
    id: 9,
    name: 'New Balance 574',
    description: 'Conforto e estilo vintage',
    price: 64990,
    originalPrice: null,
    rating: 4.6,
    label: 'Trending',
    labelType: 'hot',
    image: '/images/new_balance_574_white_grey.webp',
    colors: ['#ffffff', '#64748b', '#eab308'],
    gender: 'Masculino'
  },
  {
    id: 10,
    name: 'Puma RS-X',
    description: 'Design ousado e tecnologia de ponta',
    price: 74990,
    originalPrice: null,
    rating: 4.5,
    label: null,
    labelType: null,
    image: '/images/puma_sport_lifestyle.webp',
    colors: ['#000000', '#ffffff', '#3b82f6'],
    gender: 'Unisex'
  },
  {
    id: 11,
    name: 'Nike Air Max Plus',
    description: 'Estilo radical e conforto único',
    price: 149990,
    originalPrice: 179990,
    rating: 4.7,
    label: '-16%',
    labelType: 'sale',
    image: '/images/nike_air_max_plus_silver.webp',
    colors: ['#000000', '#f97316', '#3b82f6'],
    gender: 'Masculino'
  },
  {
    id: 12,
    name: 'Adidas Forum Low',
    description: 'Estilo retrô com conforto moderno',
    price: 129990,
    originalPrice: null,
    rating: 4.3,
    label: 'Novo',
    labelType: 'new',
    image: '/images/adidas_ultraboost.png',
    colors: ['#1a1a1a', '#ffffff', '#3b82f6'],
    gender: 'Masculino'
  }
];

export const ITEMS_PER_PAGE = 9;