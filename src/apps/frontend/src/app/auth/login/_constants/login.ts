export const LOGIN_CONFIG = {
  title: 'Bem-vindo de volta',
  subtitle: 'Entre com suas credenciais para acessar o painel',
  buttonText: 'Entrar',
  loadingText: 'Entrando...',
  forgotPassword: 'Esqueceu a senha?',
  forgotPasswordLink: '/auth/recover',
  copyright: `© ${new Date().getFullYear()} FlexShoe. Todos os direitos reservados.`,
};

export const LOGIN_FORM_FIELDS = {
  email: {
    name: 'email',
    label: 'E-mail',
    type: 'email',
    placeholder: 'admin@flexshoe.ao',
    required: true,
  },
  password: {
    name: 'password',
    label: 'Senha',
    type: 'password',
    placeholder: 'Digite sua senha',
    required: true,
  },
  remember: {
    name: 'remember',
    label: 'Lembrar-me',
  },
};

export const BRAND_PANEL = {
  logoText: 'FlexShoe',
  heading: 'Gerencie sua loja com facilidade',
  description: 'Ferramentas poderosas para gerenciar, analisar e expandir seu negócio de forma eficiente.',
  features: [
    'Produtos e inventário em tempo real',
    'Pedidos e gestão de clientes',
    'Relatórios e análises avançadas',
  ],
};