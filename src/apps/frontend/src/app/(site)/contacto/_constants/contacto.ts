export const CONTACT_INFO = {
  address: {
    title: 'Endereço',
    value: 'Luanda, Angola',
    icon: 'FiMapPin'
  },
  email: {
    title: 'Email',
    value: 'contato@flexshoe.ao',
    href: 'mailto:contato@flexshoe.ao',
    icon: 'FiMail'
  },
  phone: {
    title: 'Telefone',
    value: '+244 900 000 000',
    href: 'tel:+244900000000',
    icon: 'FiPhone'
  },
  hours: {
    title: 'Horário',
    values: ['Seg-Sex: 9h-18h', 'Sáb: 10h-16h'],
    icon: 'FiClock'
  }
};

export const PAGE_META = {
  title: 'Contacto',
  subtitle: 'Vamos conversar? Estamos aqui para ajudar',
  breadcrumb: {
    home: 'Início',
    current: 'Contact'
  }
};

export const FORM_FIELDS = {
  name: {
    name: 'name',
    placeholder: 'Nome',
    type: 'text',
    required: true
  },
  email: {
    name: 'email',
    placeholder: 'Email',
    type: 'email',
    required: true
  },
  phone: {
    name: 'phone',
    placeholder: 'Telefone',
    type: 'tel',
    required: false
  },
  subject: {
    name: 'subject',
    placeholder: 'Assunto',
    type: 'text',
    required: true
  },
  message: {
    name: 'message',
    placeholder: 'Mensagem',
    type: 'textarea',
    required: true,
    rows: 5
  }
};

export const WHATSAPP_CONFIG = {
  title: 'Atendimento via WhatsApp',
  description: 'Resposta rápida e personalizada',
  buttonText: 'Falar agora',
  phoneNumber: '244900000000',
  whatsappLink: 'https://wa.me/244900000000'
};

export const FORM_MESSAGES = {
  success: 'Mensagem enviada! Responderemos em breve.',
  submitting: 'Enviando...',
  submit: 'Enviar'
};