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
import { 
  CONTACT_INFO, 
  PAGE_META, 
  FORM_FIELDS, 
  WHATSAPP_CONFIG, 
  FORM_MESSAGES 
} from './_constants/contacto';

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
              <h1 className="text-3xl md:text-4xl font-bold text-black">{PAGE_META.title}</h1>
              <p className="text-gray-500 mt-2">{PAGE_META.subtitle}</p>
            </div>
            <nav className="flex items-center gap-2 text-sm">
              <span className="text-black font-medium">{PAGE_META.breadcrumb.current}</span>
              <FiChevronRight className="text-xs text-gray-400" />
              <Link href="/" className="text-gray-500 hover:text-black transition flex items-center gap-1">
                <FiHome className="text-xs" />
                {PAGE_META.breadcrumb.home}
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          
          {/* Grid 2 colunas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            
            {/* Card de Contato */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="space-y-5">
                {/* Endereço */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <FiMapPin className="text-black text-lg" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-black text-sm">{CONTACT_INFO.address.title}</h4>
                    <p className="text-gray-500 text-sm">{CONTACT_INFO.address.value}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <FiMail className="text-black text-lg" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-black text-sm">{CONTACT_INFO.email.title}</h4>
                    <a href={CONTACT_INFO.email.href} className="text-gray-500 hover:text-black transition text-sm">
                      {CONTACT_INFO.email.value}
                    </a>
                  </div>
                </div>

                {/* Telefone */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <FiPhone className="text-black text-lg" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-black text-sm">{CONTACT_INFO.phone.title}</h4>
                    <a href={CONTACT_INFO.phone.href} className="text-gray-500 hover:text-black transition text-sm">
                      {CONTACT_INFO.phone.value}
                    </a>
                  </div>
                </div>

                {/* Horário */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <FiClock className="text-black text-lg" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-black text-sm">{CONTACT_INFO.hours.title}</h4>
                    {CONTACT_INFO.hours.values.map((hour, idx) => (
                      <p key={idx} className="text-gray-500 text-sm">{hour}</p>
                    ))}
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
                      type={FORM_FIELDS.name.type}
                      name={FORM_FIELDS.name.name}
                      value={formData.name}
                      onChange={handleChange}
                      required={FORM_FIELDS.name.required}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-black transition"
                      placeholder={FORM_FIELDS.name.placeholder}
                    />
                  </div>
                  <div>
                    <input
                      type={FORM_FIELDS.email.type}
                      name={FORM_FIELDS.email.name}
                      value={formData.email}
                      onChange={handleChange}
                      required={FORM_FIELDS.email.required}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-black transition"
                      placeholder={FORM_FIELDS.email.placeholder}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <input
                      type={FORM_FIELDS.phone.type}
                      name={FORM_FIELDS.phone.name}
                      value={formData.phone}
                      onChange={handleChange}
                      required={FORM_FIELDS.phone.required}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-black transition"
                      placeholder={FORM_FIELDS.phone.placeholder}
                    />
                  </div>
                  <div>
                    <input
                      type={FORM_FIELDS.subject.type}
                      name={FORM_FIELDS.subject.name}
                      value={formData.subject}
                      onChange={handleChange}
                      required={FORM_FIELDS.subject.required}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-black transition"
                      placeholder={FORM_FIELDS.subject.placeholder}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <textarea
                    name={FORM_FIELDS.message.name}
                    value={formData.message}
                    onChange={handleChange}
                    required={FORM_FIELDS.message.required}
                    rows={FORM_FIELDS.message.rows}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-black transition resize-none"
                    placeholder={FORM_FIELDS.message.placeholder}
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="mb-4 p-3 bg-gray-100 rounded-lg text-gray-600 text-sm text-center">
                    {FORM_MESSAGES.success}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50 flex items-center justify-center gap-2 group"
                >
                  <span>{isSubmitting ? FORM_MESSAGES.submitting : FORM_MESSAGES.submit}</span>
                  <FiArrowRight className={`text-sm transition ${!isSubmitting && 'group-hover:translate-x-1'}`} />
                </button>
              </form>
            </div>
          </div>

          {/* WhatsApp Banner */}
          <div className="mt-8 max-w-5xl mx-auto">
            <div className="bg-black rounded-2xl p-6 text-center">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    <FaWhatsapp className="text-white text-xl" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-white font-semibold">{WHATSAPP_CONFIG.title}</h3>
                    <p className="text-gray-400 text-sm">{WHATSAPP_CONFIG.description}</p>
                  </div>
                </div>
                <a
                  href={WHATSAPP_CONFIG.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-100 transition"
                >
                  <FaWhatsapp className="text-lg" />
                  {WHATSAPP_CONFIG.buttonText}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}