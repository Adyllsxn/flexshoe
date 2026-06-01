export const RECOVER_CONFIG = {
  title: 'Recuperar senha',
  subtitle: 'Digite seu email para receber as instruções',
  description: 'Enviaremos um link para você redefinir sua senha.',
  buttonText: 'Enviar instruções',
  loadingText: 'Enviando...',
  backToLogin: 'Voltar para o login',
  copyright: `© ${new Date().getFullYear()} FlexShoe. Todos os direitos reservados.`,
  successTitle: 'Email enviado!',
  successMessage: 'Enviamos as instruções de recuperação para o seu email.',
};

export const RECOVER_FORM_FIELDS = {
  email: {
    name: 'email',
    label: 'E-mail',
    type: 'email',
    placeholder: 'admin@flexshoe.ao',
    required: true,
  },
};

export const BRAND_PANEL_RECOVER = {
  logoText: 'FlexShoe',
  heading: 'Recupere o acesso à sua conta',
  description: 'Informe seu email e enviaremos um link para redefinir sua senha de forma segura.',
  features: [
    'Link seguro e temporário',
    'Redefinição rápida e simples',
    'Suporte 24/7 se precisar',
  ],
};