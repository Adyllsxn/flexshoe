import { 
  FiUsers, 
  FiSmile,
  FiPackage,
  FiClock,
  FiShield,
  FiMessageCircle,
  FiTruck
} from 'react-icons/fi';

export const sobreData = {
  title: 'Sobre',
  subtitle: 'Conheça mais sobre nós',
  
  about: {
    smallTitle: 'Sobre a FlexShoe',
    title: 'Uma nova forma de comprar tênis online',
    description: 'Trabalhamos para oferecer a melhor experiência de compra, com produtos de qualidade e atendimento diferenciado. Nossa missão é conectar você aos melhores tênis do mercado de forma simples e segura.'
  },
  
  cards: [
    {
      icon: FiShield,
      title: 'Qualidade garantida',
      description: 'Trabalhamos apenas com produtos originais e fornecedores confiáveis.'
    },
    {
      icon: FiMessageCircle,
      title: 'Atendimento humano',
      description: 'Suporte real, sem robôs. Estamos aqui para ajudar você.'
    },
    {
      icon: FiTruck,
      title: 'Entrega segura',
      description: 'Enviamos para todo o país com rastreamento em tempo real.'
    }
  ],
  
  stats: [
    { value: 0, finalValue: 232, suffix: '', label: 'Clientes felizes', icon: FiSmile },
    { value: 0, finalValue: 521, suffix: '', label: 'Projetos concluídos', icon: FiPackage },
    { value: 0, finalValue: 1453, suffix: '', label: 'Horas de suporte', icon: FiClock },
    { value: 0, finalValue: 32, suffix: '', label: 'Colaboradores', icon: FiUsers }
  ],
  
  testimonials: [
    {
      quote: 'Ótima experiência de compra. Produto de qualidade e entrega rápida. Recomendo!',
      name: 'Ana Silva',
      position: 'Cliente'
    },
    {
      quote: 'Atendimento excepcional, tiraram todas minhas dúvidas antes da compra. Muito obrigado!',
      name: 'Carlos Mendes',
      position: 'Cliente'
    },
    {
      quote: 'Primeira compra e já me conquistaram. Produto original e chegou antes do prazo.',
      name: 'Mariana Costa',
      position: 'Cliente'
    },
    {
      quote: 'Simplesmente perfeito! Atendimento rápido e produto de primeira qualidade.',
      name: 'Rafael Oliveira',
      position: 'Cliente'
    }
  ]
};