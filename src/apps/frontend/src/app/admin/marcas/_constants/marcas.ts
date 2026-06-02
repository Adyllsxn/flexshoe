export const MARCAS_CONFIG = {
  title: 'Marcas',
  subtitle: 'Gerencie as marcas de tênis',
  breadcrumb: {
    home: 'Início',
    current: 'Marcas'
  }
};

export interface Marca {
  id: string;
  name: string;
  slug: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  productsCount?: number;
}

export const MARCAS_DATA: Marca[] = [
  {
    id: '4c72d1df-a25b-4650-8cbd-252fabbad2ac',
    name: 'Nike',
    slug: 'nike',
    active: true,
    createdAt: '2026-05-28T15:33:25.021Z',
    updatedAt: '2026-05-28T15:33:25.021Z',
    productsCount: 12
  },
  {
    id: 'd18506d8-382f-417d-8642-a054dd1e6c1f',
    name: 'Adidas',
    slug: 'adidas',
    active: true,
    createdAt: '2026-05-28T15:33:25.073Z',
    updatedAt: '2026-05-28T15:33:25.073Z',
    productsCount: 10
  },
  {
    id: '17a9fc01-28bc-4d38-82a9-c2ce108e2f59',
    name: 'Puma',
    slug: 'puma',
    active: true,
    createdAt: '2026-05-28T15:33:25.129Z',
    updatedAt: '2026-05-28T15:33:25.129Z',
    productsCount: 8
  },
  {
    id: '3a7bfd25-a24f-482c-ae81-f20a3d4edab2',
    name: 'Vans',
    slug: 'vans',
    active: true,
    createdAt: '2026-05-28T15:33:25.173Z',
    updatedAt: '2026-05-28T15:33:25.173Z',
    productsCount: 6
  },
  {
    id: '8c66d7de-f27d-4cf3-8ba9-586d287239a8',
    name: 'Converse',
    slug: 'converse',
    active: true,
    createdAt: '2026-05-28T15:33:25.217Z',
    updatedAt: '2026-05-28T15:33:25.217Z',
    productsCount: 5
  },
  {
    id: 'd2477892-c40e-4de4-a2c7-9c3f7da12a77',
    name: 'New Balance',
    slug: 'new-balance',
    active: true,
    createdAt: '2026-05-28T15:33:25.261Z',
    updatedAt: '2026-05-28T15:33:25.261Z',
    productsCount: 4
  }
];

export const getStatusBadge = (active: boolean) => {
  return active 
    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
    : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
};

export const getStatusText = (active: boolean) => {
  return active ? 'Ativo' : 'Inativo';
};