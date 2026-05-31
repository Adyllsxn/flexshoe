import { 
  FiCheckCircle, 
  FiShoppingBag, 
  FiCreditCard, 
  FiTruck, 
  FiRepeat, 
  FiShield, 
  FiEdit, 
  FiMail,
  FiPackage,
  FiFileText
} from 'react-icons/fi';

export const SECTIONS = [
  { id: 'aceitacao', label: '1. Aceitação dos Termos', icon: FiCheckCircle },
  { id: 'produtos', label: '2. Produtos e Serviços', icon: FiShoppingBag },
  { id: 'pedidos', label: '3. Pedidos e Pagamentos', icon: FiCreditCard },
  { id: 'entrega', label: '4. Política de Entrega', icon: FiTruck },
  { id: 'trocas', label: '5. Trocas e Devoluções', icon: FiRepeat },
  { id: 'responsabilidade', label: '6. Limitação de Responsabilidade', icon: FiShield },
  { id: 'alteracoes', label: '7. Alterações nos Termos', icon: FiEdit },
  { id: 'contato', label: '8. Contato', icon: FiMail },
];

export const PAGE_META = {
  title: 'Termos de Uso',
  description: 'Por favor, leia estes termos atentamente antes de usar nossos serviços',
  breadcrumb: {
    home: 'Início',
    current: 'Termos de Uso'
  },
  lastUpdated: '30 de Maio, 2025'
};

export const ACEITACAO = {
  title: '1. Aceitação dos Termos',
  content: 'Ao acessar e usar o site da FlexShoe, você concorda em cumprir estes Termos de Serviço e todas as leis e regulamentos aplicáveis. Se você não concordar com qualquer um destes termos, está proibido de usar ou acessar nossos serviços.',
  note: 'Estes termos se aplicam a todos os usuários, visitantes e outros que acessam ou usam nossos serviços.'
};

export const PRODUTOS = {
  title: '2. Produtos e Serviços',
  content: 'A FlexShoe comercializa tênis originais das melhores marcas. Nossos produtos são:',
  features: [
    { icon: FiPackage, text: '100% originais' },
    { icon: FiFileText, text: 'Nota fiscal inclusa' },
    { icon: FiPackage, text: 'Embalagem original' },
  ]
};

export const PEDIDOS = {
  title: '3. Pedidos e Pagamentos',
  content: 'Ao realizar um pedido, você concorda em fornecer informações verdadeiras. O processo de compra é finalizado via WhatsApp.',
  steps: [
    'Confirmação imediata do pedido',
    'Cálculo do valor total com frete',
    'Previsão de entrega e rastreio'
  ],
  note: 'Os preços estão sujeitos a alteração. O valor final será confirmado no momento da finalização do pedido.'
};

export const ENTREGA = {
  title: '4. Política de Entrega',
  content: 'Entregamos para todo o território de Angola. Prazos estimados:',
  locations: [
    { name: 'Luanda', time: '1 a 3 dias úteis' },
    { name: 'Outras províncias', time: '3 a 7 dias úteis' }
  ]
};

export const TROCAS = {
  title: '5. Trocas e Devoluções',
  content: 'Oferecemos 7 dias após o recebimento para troca ou devolução.',
  conditions: [
    'Produto sem uso e na embalagem original',
    'Etiquetas e lacres intactos',
    'Nota fiscal acompanhando o produto'
  ]
};

export const RESPONSABILIDADE = {
  title: '6. Limitação de Responsabilidade',
  content: 'Em nenhum caso a FlexShoe será responsável por quaisquer danos indiretos, incidentais, especiais, consequenciais ou punitivos decorrentes do uso de nossos serviços ou produtos.'
};

export const ALTERACOES = {
  title: '7. Alterações nos Termos',
  content: 'Reservamos o direito de modificar estes Termos a qualquer momento.',
  note: 'Ao continuar a usar nossos serviços após as alterações, você concorda em cumprir os termos revisados.'
};

export const CONTATO_SECTION = {
  title: 'Dúvidas sobre os Termos?',
  description: 'Se você tiver alguma dúvida sobre estes Termos, nossa equipe está disponível para ajudar.',
  buttonText: 'Falar com Suporte',
  buttonLink: '/contacto'
};