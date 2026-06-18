'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { 
  FiHome, 
  FiTrash2,
  FiPlus,
  FiMinus,
  FiShield,
  FiCheck
} from 'react-icons/fi';
import { useCarrinho } from './_hooks/useCarrinho';
import { carrinhoData } from './_constants/carrinho';
import { PROVINCIAS, getMunicipios } from '@/lib/utils/angola';

export default function CarrinhoPage() {
  const {
    cartItems,
    currentStep,
    formData,
    setFormData,
    promoCode,
    orderPlaced,
    subtotal,
    shipping,
    tax,
    discount,
    total,
    loading,
    submitting,
    formatPrice,
    updateQuantity,
    removeItem,
    applyPromoCode,
    handleInputChange,
    setPromoCode,
    nextStep,
    prevStep,
    placeOrder,
    STEPS,
    PAYMENT_METHODS,
  } = useCarrinho();

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value, city: '' }));
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <div className="border-b border-gray-100">
          <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl md:text-4xl font-bold text-black">{carrinhoData.title}</h1>
          </div>
        </div>
        <div className="container mx-auto px-4 py-20">
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        </div>
      </main>
    );
  }

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <main className="min-h-screen bg-white">
        <div className="border-b border-gray-100">
          <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h1 className="text-3xl md:text-4xl font-bold text-black">{carrinhoData.title}</h1>
              <nav className="flex items-center gap-2 text-sm">
                <ol className="flex items-center gap-2">
                  <li>
                    <Link href="/" className="text-gray-500 hover:text-black transition flex items-center gap-1">
                      <FiHome className="text-xs" />
                      {carrinhoData.breadcrumb.home}
                    </Link>
                  </li>
                  <li className="text-gray-400">/</li>
                  <li className="text-black font-medium">{carrinhoData.breadcrumb.current}</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-black mb-2">Seu carrinho está vazio</h2>
            <p className="text-gray-500 mb-6">Que tal dar uma olhada nos nossos produtos?</p>
            <Link href="/produtos" className="inline-flex px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition">
              Ver produtos
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (orderPlaced) {
    return (
      <main className="min-h-screen bg-white">
        <div className="border-b border-gray-100">
          <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl md:text-4xl font-bold text-black">{carrinhoData.title}</h1>
          </div>
        </div>
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCheck className="text-green-500 text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-black mb-2">Pedido realizado com sucesso!</h2>
            <p className="text-gray-500 mb-6">
              {formData.paymentMethod === 'whatsapp' 
                ? 'Você será redirecionado para o WhatsApp para finalizar o pagamento'
                : 'Em breve você receberá a confirmação via WhatsApp'}
            </p>
            <Link href="/produtos" className="inline-flex px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition">
              Continuar comprando
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-black">{carrinhoData.title}</h1>
            <nav className="flex items-center gap-2 text-sm">
              <ol className="flex items-center gap-2">
                <li>
                  <Link href="/" className="text-gray-500 hover:text-black transition flex items-center gap-1">
                    <FiHome className="text-xs" />
                    {carrinhoData.breadcrumb.home}
                  </Link>
                </li>
                <li className="text-gray-400">/</li>
                <li className="text-black font-medium">{carrinhoData.breadcrumb.current}</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="lg:w-2/3">
            <div className="flex items-center justify-between mb-8">
              {STEPS.map((step, idx) => (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      currentStep >= step.number
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {step.number}
                    </div>
                    <span className={`text-xs mt-2 hidden md:block ${
                      currentStep >= step.number ? 'text-black' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                  {idx < STEPS.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 ${
                      currentStep > step.number ? 'bg-black' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {currentStep === 1 && (
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-black mb-2">Informações Pessoais</h3>
                <p className="text-gray-500 text-sm mb-6">Preencha seus dados de contato</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">Nome</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">Sobrenome</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                      placeholder="Seu sobrenome"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">Telefone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                      placeholder="+244 900 000 000"
                    />
                  </div>
                </div>
                
                <button onClick={nextStep} className="mt-6 w-full md:w-auto px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition">
                  Continuar para Entrega
                </button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-black mb-2">Endereço de Entrega</h3>
                <p className="text-gray-500 text-sm mb-6">Onde devemos entregar seu pedido?</p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">Endereço completo</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                      placeholder="Rua, número, bairro"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">Província</label>
                      <select
                        name="province"
                        value={formData.province}
                        onChange={handleProvinceChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black bg-white"
                      >
                        <option value="">Selecione a província</option>
                        {PROVINCIAS.map((prov) => (
                          <option key={prov.id} value={prov.nome}>{prov.nome}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">Cidade/Município</label>
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black bg-white"
                        disabled={!formData.province}
                      >
                        <option value="">Selecione a cidade</option>
                        {formData.province && getMunicipios(
                          PROVINCIAS.find(p => p.nome === formData.province)?.id || ''
                        ).map((mun) => (
                          <option key={mun} value={mun}>{mun}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  {formData.province && formData.city && (
                    <div className="text-xs text-gray-400">
                      📍 {formData.city}, {formData.province}
                    </div>
                  )}
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button onClick={prevStep} className="px-6 py-3 border border-gray-300 text-gray-600 rounded-lg font-medium hover:border-black hover:text-black transition">
                    Voltar
                  </button>
                  <button onClick={nextStep} className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition">
                    Continuar para Pagamento
                  </button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-black mb-2">Método de Pagamento</h3>
                <p className="text-gray-500 text-sm mb-6">Escolha como deseja pagar</p>
                
                <div className="space-y-4">
                  {PAYMENT_METHODS.map((method) => (
                    <div 
                      key={method.id}
                      className={`border rounded-xl p-4 cursor-pointer transition ${formData.paymentMethod === method.id ? 'border-black bg-white' : 'border-gray-200'}`}
                    >
                      <div className="flex items-center gap-3" onClick={() => handleInputChange({ target: { name: 'paymentMethod', value: method.id } } as any)}>
                        <input type="radio" checked={formData.paymentMethod === method.id} onChange={() => {}} className="w-4 h-4" />
                        <span className="font-medium">{method.icon} {method.name}</span>
                      </div>
                      {formData.paymentMethod === method.id && (
                        <div className="mt-3 pl-7">
                          <p className="text-sm text-gray-500">{method.description}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button onClick={prevStep} className="px-6 py-3 border border-gray-300 text-gray-600 rounded-lg font-medium hover:border-black hover:text-black transition">
                    Voltar
                  </button>
                  <button onClick={nextStep} className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition">
                    Revisar Pedido
                  </button>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-black mb-2">Revisar Pedido</h3>
                <p className="text-gray-500 text-sm mb-6">Confirme os dados antes de finalizar</p>
                
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-4">
                    <h4 className="font-bold text-black mb-2">Informações de Contato</h4>
                    <p className="text-sm text-gray-600">{formData.firstName} {formData.lastName}</p>
                    <p className="text-sm text-gray-600">{formData.phone}</p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4">
                    <h4 className="font-bold text-black mb-2">Endereço de Entrega</h4>
                    <p className="text-sm text-gray-600">{formData.address}</p>
                    <p className="text-sm text-gray-600">{formData.city}, {formData.province}</p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4">
                    <h4 className="font-bold text-black mb-2">Método de Pagamento</h4>
                    <p className="text-sm text-gray-600">
                      {formData.paymentMethod === 'money' && '💵 Pagamento na Entrega (Dinheiro)'}
                      {formData.paymentMethod === 'whatsapp' && '📱 Pagamento via WhatsApp'}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button onClick={prevStep} className="px-6 py-3 border border-gray-300 text-gray-600 rounded-lg font-medium hover:border-black hover:text-black transition">
                    Voltar
                  </button>
                  <button onClick={placeOrder} disabled={submitting} className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50">
                    {submitting ? 'Processando...' : 'Finalizar Pedido'}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="lg:w-1/3">
            <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
              <h3 className="text-xl font-bold text-black mb-4">Resumo do Pedido</h3>
              
              <div className="space-y-4 max-h-80 overflow-auto mb-4">
                {cartItems.map((item: any) => (
                  <div key={item.id} className="flex gap-3 pb-3 border-b border-gray-200">
                    <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                      <Image src={item.image} alt={item.name} width={50} height={50} className="object-contain" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-black text-sm">{item.name}</h4>
                      <p className="text-xs text-gray-400">{item.color} | {item.size}</p>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 border border-gray-200 rounded flex items-center justify-center hover:border-black">
                            <FiMinus size={10} />
                          </button>
                          <span className="text-sm w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 border border-gray-200 rounded flex items-center justify-center hover:border-black">
                            <FiPlus size={10} />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-black">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500">
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Código promocional"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black"
                />
                <button onClick={applyPromoCode} className="px-4 py-2 border border-black text-black rounded-lg text-sm font-medium hover:bg-black hover:text-white transition">
                  Aplicar
                </button>
              </div>
              
              <div className="space-y-2 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-black">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Entrega</span>
                  <span className="text-black">{shipping === 0 ? 'Grátis' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Taxa</span>
                  <span className="text-black">{formatPrice(tax)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Desconto</span>
                    <span className="text-green-600">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-xs text-gray-400 justify-center">
                  <FiShield size={14} />
                  <span>Compra segura - Pagamento protegido</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}