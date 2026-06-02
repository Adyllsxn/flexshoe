export const STORE_CONFIG = {
  title: 'Configuração da Loja',
  subtitle: 'Gerencie as informações da sua loja',
  breadcrumb: {
    home: 'Início',
    current: 'Store'
  }
};

export const DEFAULT_STORE_DATA = {
  id: '',
  name: 'FlexShoe',
  whatsapp: '244900000000',
  email: 'contato@flexshoe.ao',
  address: 'Luanda, Angola',
  logo: null,
  primaryColor: '#000000',
  createdAt: '',
  updatedAt: ''
};

export const FORM_FIELDS = [
  { name: 'name', label: 'Nome da Loja', type: 'text', placeholder: 'Digite o nome da loja', required: true },
  { name: 'whatsapp', label: 'WhatsApp', type: 'tel', placeholder: '244900000000', required: true },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'contato@flexshoe.ao', required: true },
  { name: 'address', label: 'Endereço', type: 'text', placeholder: 'Luanda, Angola', required: true },
];

export const COLOR_PRESETS = [
  { name: 'Preto', value: '#000000' },
  { name: 'Branco', value: '#ffffff' },
  { name: 'Vermelho', value: '#e74c3c' },
  { name: 'Azul', value: '#3498db' },
  { name: 'Verde', value: '#2ecc71' },
  { name: 'Roxo', value: '#9b59b6' },
  { name: 'Laranja', value: '#e67e22' },
  { name: 'Rosa', value: '#fd79a8' },
];