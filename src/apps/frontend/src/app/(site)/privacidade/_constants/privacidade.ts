import { 
  FiShoppingBag, 
  FiMessageCircle, 
  FiTruck,
  FiDatabase,
  FiBarChart2,
  FiShare2,
  FiEye,
  FiEdit,
  FiTrash2
} from 'react-icons/fi';

export const TABS = [
  { id: 'collection', label: 'Coleta de Dados', icon: FiDatabase },
  { id: 'utilization', label: 'Uso de Dados', icon: FiBarChart2 },
  { id: 'distribution', label: 'Compartilhamento', icon: FiShare2 },
];

export const DIFFERENTIALS = [
  { icon: FiShoppingBag, text: 'Compra sem Cadastro', sub: 'Não precisa criar conta' },
  { icon: FiMessageCircle, text: 'Finalização via WhatsApp', sub: 'Pedido enviado diretamente' },
  { icon: FiTruck, text: 'Entrega Rápida', sub: 'Receba seus tênis em casa' },
];

export const COLLECTION_DATA = {
  left: [
    'Nome e telefone (para contato via WhatsApp)',
    'Endereço de entrega',
    'Produtos adicionados ao carrinho'
  ],
  right: [
    'Dados de navegação (anônimos)',
    'Cookies para carrinho de compras',
    'NÃO coletamos senhas (não há cadastro)'
  ]
};

export const UTILIZATION_DATA = {
  left: [
    'Processar seu pedido via WhatsApp',
    'Coordenar a entrega dos produtos'
  ],
  right: [
    'Melhorar nosso catálogo de produtos',
    'Nunca usamos seus dados para marketing sem consentimento'
  ]
};

export const DISTRIBUTION_DATA = {
  left: [
    'Compartilhado apenas com transportadoras para entrega'
  ],
  right: [
    'Nunca vendemos ou alugamos seus dados'
  ]
};

export const RIGHTS_DATA = [
  { icon: FiEye, title: 'Acesso', desc: 'Solicite os dados do seu pedido' },
  { icon: FiEdit, title: 'Correção', desc: 'Corrija dados de entrega' },
  { icon: FiTrash2, title: 'Exclusão', desc: 'Solicite a remoção de seus dados após o pedido' },
];

export const PAGE_META = {
  title: 'Política de Privacidade',
  description: 'Sua privacidade é importante para nós. Sem cadastro, sem complicações.',
  breadcrumb: {
    home: 'Início',
    current: 'Política de Privacidade'
  },
  lastUpdated: '30/05/2025'
};

export const CONTACT_BANNER = {
  title: 'Dúvidas sobre Privacidade?',
  description: 'Entre em contato conosco para esclarecer qualquer dúvida sobre seus dados.',
  buttonText: 'Falar com Suporte',
  buttonLink: '/contacto'
};