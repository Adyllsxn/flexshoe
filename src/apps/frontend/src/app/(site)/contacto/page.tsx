'use client';

import Link from 'next/link';
import { useState } from 'react';
import { 
  FiMapPin, 
  FiMail, 
  FiPhone, 
  FiClock, 
  FiArrowRight,
  FiChevronRight,
  FiHome
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Header com título e breadcrumb juntos */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-black">Contacto</h1>
              <p className="text-gray-500 mt-2">Vamos conversar? Estamos aqui para ajudar</p>
            </div>
            <nav className="flex items-center gap-2 text-sm">
              {/* CONTACT na ESQUERDA, INÍCIO na DIREITA */}
              <span className="text-black font-medium">Contact</span>
              <FiChevronRight className="text-xs text-gray-400" />
              <Link href="/" className="text-gray-500 hover:text-black transition flex items-center gap-1">
                <FiHome className="text-xs" />
                Início
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Contact Section - SEM o título "Entre em contato" repetido */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          
          {/* Grid 2 colunas - sem o título removido */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            
            {/* Card de Contato */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <FiMapPin className="text-black text-lg" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-black text-sm">Endereço</h4>
                    <p className="text-gray-500 text-sm">Luanda, Angola</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <FiMail className="text-black text-lg" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-black text-sm">Email</h4>
                    <a href="mailto:contato@flexshoe.ao" className="text-gray-500 hover:text-black transition text-sm">
                      contato@flexshoe.ao
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <FiPhone className="text-black text-lg" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-black text-sm">Telefone</h4>
                    <a href="tel:+244900000000" className="text-gray-500 hover:text-black transition text-sm">
                      +244 900 000 000
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <FiClock className="text-black text-lg" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-black text-sm">Horário</h4>
                    <p className="text-gray-500 text-sm">Seg-Sex: 9h-18h</p>
                    <p className="text-gray-500 text-sm">Sáb: 10h-16h</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulário */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-black transition"
                      placeholder="Nome"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-black transition"
                      placeholder="Email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-black transition"
                      placeholder="Telefone"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-black transition"
                      placeholder="Assunto"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-black transition resize-none"
                    placeholder="Mensagem"
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="mb-4 p-3 bg-gray-100 rounded-lg text-gray-600 text-sm text-center">
                    Mensagem enviada! Responderemos em breve.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50 flex items-center justify-center gap-2 group"
                >
                  <span>{isSubmitting ? 'Enviando...' : 'Enviar'}</span>
                  <FiArrowRight className={`text-sm transition ${!isSubmitting && 'group-hover:translate-x-1'}`} />
                </button>
              </form>
            </div>
          </div>

          {/* WhatsApp Banner - Preto */}
          <div className="mt-8 max-w-5xl mx-auto">
            <div className="bg-black rounded-2xl p-6 text-center">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    <FaWhatsapp className="text-white text-xl" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-white font-semibold">Atendimento via WhatsApp</h3>
                    <p className="text-gray-400 text-sm">Resposta rápida e personalizada</p>
                  </div>
                </div>
                <a
                  href="https://wa.me/244900000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-100 transition"
                >
                  <FaWhatsapp className="text-lg" />
                  Falar agora
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}