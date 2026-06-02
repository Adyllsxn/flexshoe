export const PRODUTOS_CONFIG = {
  title: 'Produtos',
  subtitle: 'Gerencie o catálogo de produtos',
  breadcrumb: {
    home: 'Início',
    current: 'Produtos'
  }
};

export const GENDER = [
  { value: 'unisex', label: 'Unisex' },
  { value: 'masculino', label: 'Masculino' },
  { value: 'feminino', label: 'Feminino' },
  { value: 'kid', label: 'Kid' },
];

export const PRODUTOS_DATA = [
  {
    id: 1,
    name: 'Nike Air Max',
    category: 'Tênis',
    brand: 'Nike',
    gender: 'Unisex',
    price: 89990,
    stock: 45,
    status: 'active',
    image: '/images/nike_air_max_plus.png',
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    name: 'Adidas Ultraboost',
    category: 'Tênis',
    brand: 'Adidas',
    gender: 'Masculino',
    price: 139990,
    stock: 32,
    status: 'active',
    image: '/images/adidas_ultraboost.png',
    createdAt: '2024-01-20'
  },
  {
    id: 3,
    name: 'Puma Suede',
    category: 'Tênis',
    brand: 'Puma',
    gender: 'Unisex',
    price: 69990,
    stock: 18,
    status: 'active',
    image: '/images/puma_suede_classic.webp',
    createdAt: '2024-02-10'
  },
  {
    id: 4,
    name: 'Vans Old Skool',
    category: 'Tênis',
    brand: 'Vans',
    gender: 'Unisex',
    price: 59990,
    stock: 27,
    status: 'active',
    image: '/images/vans_old_skool.webp',
    createdAt: '2024-02-15'
  },
  {
    id: 5,
    name: 'Nike Dunk Low',
    category: 'Tênis',
    brand: 'Nike',
    gender: 'Masculino',
    price: 109990,
    stock: 5,
    status: 'active',
    image: '/images/nike_air_Jordan_masculino.webp',
    createdAt: '2024-03-05'
  },
  {
    id: 6,
    name: 'Adidas NMD',
    category: 'Tênis',
    brand: 'Adidas',
    gender: 'Masculino',
    price: 119990,
    stock: 0,
    status: 'inactive',
    image: '/images/adidas_nmd.webp',
    createdAt: '2024-03-12'
  },
  {
    id: 7,
    name: 'Puma Cali Sport',
    category: 'Tênis',
    brand: 'Puma',
    gender: 'Feminino',
    price: 79990,
    stock: 12,
    status: 'active',
    image: '/images/puma_cali_sport.png',
    createdAt: '2024-03-20'
  },
  {
    id: 8,
    name: 'Vans Slip-On',
    category: 'Tênis',
    brand: 'Vans',
    gender: 'Unisex',
    price: 49990,
    stock: 23,
    status: 'active',
    image: '/images/vans_ultraRange.webp',
    createdAt: '2024-04-01'
  },
];

export const CATEGORIES = [
  { value: 'tenis', label: 'Tênis' },
  { value: 'roupas', label: 'Roupas' },
  { value: 'acessorios', label: 'Acessórios' },
];

export const BRANDS = [
  { value: 'nike', label: 'Nike' },
  { value: 'adidas', label: 'Adidas' },
  { value: 'puma', label: 'Puma' },
  { value: 'vans', label: 'Vans' },
  { value: 'converse', label: 'Converse' },
  { value: 'newbalance', label: 'New Balance' },
];

export const getStatusBadge = (status: string) => {
  if (status === 'active') {
    return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
  }
  return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
};

export const getStatusText = (status: string) => {
  return status === 'active' ? 'Ativo' : 'Inativo';
};

export const formatPrice = (price: number) => {
  return price.toLocaleString('pt-AO') + ' Kz';
};