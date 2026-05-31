export const SITE_NAME = 'FlexShoe';
export const SITE_DESCRIPTION = 'Os melhores tênis originais com finalização via WhatsApp. Nike, Adidas, Puma, Vans e muito mais.';

export const FOOTER_COLUMNS = {
  logo: {
    title: 'FlexShoe',
    description: 'Os melhores tênis originais com finalização via WhatsApp. Nike, Adidas, Puma, Vans e muito mais.'
  },
  navigation: {
    title: 'Navegação',
    links: [
      { href: '/produtos', label: 'Produtos' },
      { href: '/marcas', label: 'Marcas' },
      { href: '/sobre', label: 'Sobre' },
      { href: '/contacto', label: 'Contacto' },
    ]
  },
  contact: {
    title: 'Contato',
    items: [
      { icon: 'MapPin', text: 'Luanda, Angola', href: null },
      { icon: 'Phone', text: '+244 900 000 000', href: 'tel:+244900000000' },
      { icon: 'Mail', text: 'contato@flexshoe.ao', href: 'mailto:contato@flexshoe.ao' },
      { icon: 'Clock', text: 'Seg-Sex: 9h-18h | Sáb: 10h-16h', href: null }
    ]
  },
  newsletter: {
    title: 'Receba novidades',
    description: 'Receba ofertas exclusivas no seu email',
    placeholder: 'Seu melhor email',
    buttonText: 'Cadastrar'
  },
  benefits: [
    { icon: 'Truck', text: 'Entregamos para todo Angola' },
    { icon: 'Shield', text: 'Produtos 100% originais' },
    { icon: 'CreditCard', text: 'Pagamento seguro' }
  ],
  social: [
    { name: 'Instagram', icon: 'FaInstagram', href: 'https://instagram.com/flexshoe' },
    { name: 'WhatsApp', icon: 'FaWhatsapp', href: 'https://wa.me/244900000000' },
    { name: 'Twitter', icon: 'FaTwitter', href: 'https://twitter.com/flexshoe' }
  ],
  legal: [
    { href: '/termos', label: 'Termos' },
    { href: '/privacidade', label: 'Privacidade' }
  ]
};

// Mantendo exports para compatibilidade
export const FOOTER_NAVIGATION = FOOTER_COLUMNS.navigation.links;
export const FOOTER_SOCIAL = FOOTER_COLUMNS.social;
export const FOOTER_LEGAL = FOOTER_COLUMNS.legal;
export const FOOTER_CONTACT = {
  email: FOOTER_COLUMNS.contact.items.find(i => i.icon === 'Mail')?.text || '',
  phone: FOOTER_COLUMNS.contact.items.find(i => i.icon === 'Phone')?.text || '',
  address: FOOTER_COLUMNS.contact.items.find(i => i.icon === 'MapPin')?.text || '',
  hours: FOOTER_COLUMNS.contact.items.find(i => i.icon === 'Clock')?.text || ''
};
export const FOOTER_NEWSLETTER = FOOTER_COLUMNS.newsletter;
export const FOOTER_BENEFITS = FOOTER_COLUMNS.benefits;